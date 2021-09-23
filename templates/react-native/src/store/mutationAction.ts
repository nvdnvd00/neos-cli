import { createSmartAction } from 'redux-smart-actions';

const defaultValue = {
	counter: 0,
};

export const common = createSmartAction(() => {
	return {
		request: {
			url: '/',
		},
		meta: {
			getData: () => defaultValue,
		},
	};
});

export const updateCommon = createSmartAction((key, update) => {
	return {
		meta: {
			mutations: {
				// @ts-ignore
				[common]: {
					updateData: (data: any) => {
						return {
							...data,
							[key]: typeof update === 'function' ? update?.(data[key]) : update,
						};
					},
					local: true,
				},
			},
		},
	};
});
