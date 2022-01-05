import arg from "arg";
import inquirer from "inquirer";
import { PROJECT_TYPES } from "./constants";
import { createProject } from "./main";
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      // "--yes": Boolean,
      // "-y": "--yes",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args._[0],
  };
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: PROJECT_TYPES.map((i) => i.name),
    });
  }
  if (!options.name) {
    questions.push({
      type: "input",
      name: "name",
      message: "Please input project name",
      default: "AwesomeProject",
      validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();
        // Do async stuff
        const regex = new RegExp(/^[a-zA-Z0-9]+$/);

        const validateName = regex.test(input.trim());
        if (!validateName)
          return done(
            "Project name cannot contain white space and special character"
          );
        else done(null, true);
      },
    });
  }
  // if (!options.rnversion) {
  //   questions.push({
  //     type: "input",
  //     name: "rnversion",
  //     message: "Please input react native version",
  //     default: RN_VERSION,
  //   });
  // }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: PROJECT_TYPES.find((i) => i.name === answers.template).template,
    name: options.name || answers.name.trim(),
    // rnversion: options.rnversion || answers.rnversion,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
