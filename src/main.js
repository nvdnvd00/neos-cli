import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import { Listr } from "listr2";
import ncp from "ncp";
import path from "path";
import { getPackageManager, install } from "pkg-install";
import { promisify } from "util";
import { PROJECT_TYPES, RN_DEV_PKG, RN_PKG } from "./constants";
const VerboseRenderer = require("listr-verbose-renderer");

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.projectDirectory, {
    clobber: true,
  });
}

async function initReactNativeProject(options) {
  const result = await execa.command(
    `npx react-native init ${options.name} --template react-native-template-typescript`,
    {
      cwd: options.targetDirectory,
    }
  );
  if (result.failed) {
    return Promise.reject(new Error("Failed to init react native project"));
  }
  return Promise.resolve("Success");
}

async function installPods(options) {
  const result = await execa.command(`npx pod-install`, {
    cwd: options.projectDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to install Pods"));
  }
  return Promise.resolve("Success");
}

async function getReactNativeTasks(options) {
  return new Listr(
    [
      {
        title: "Init project",
        task: () => initReactNativeProject(options),
      },
      {
        title: "Copy template files",
        task: () => copyTemplateFiles(options),
      },
      {
        title: "Install dependencies",

        task: async () => {
          const pkgManager = await getPackageManager({ prefer: "yarn" });
          return install(RN_PKG, {
            prefer: pkgManager || "yarn",
            dev: false,
            cwd: options.projectDirectory,
          });
        },
      },
      {
        title: "Install dev dependencies",
        task: async () => {
          const pkgManager = await getPackageManager({ prefer: "yarn" });
          return install(RN_DEV_PKG, {
            prefer: pkgManager || "yarn",
            dev: true,
            cwd: options.projectDirectory,
          });
        },
      },
      {
        title: "Install pod",
        task: () => installPods(options),
      },
    ],
    {
      // renderer: VerboseRenderer,
    }
  );
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: `${options.targetDirectory || process.cwd()}`,
    projectDirectory: `${options.targetDirectory || process.cwd()}/${
      options.name
    }`,
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }
  let task;
  if (options.template === PROJECT_TYPES[0].template) {
    task = await getReactNativeTasks(options);
  }
  try {
    const context = await task.run();
    console.log(
      `%s Project ready: [${JSON.stringify(context)}]`,
      chalk.green.bold("DONE")
    );
  } catch (e) {
    console.error(e);
  }
  return true;
}
