import { createSmartThunk } from 'redux-smart-actions';
import {
	// API_METHOD,
	API_URL,
} from 'utils/constants';
import { setParamsUrl } from 'utils/helper';

export const getUsers: any = createSmartThunk(
	(params: any) => (dispatch, getState, extraArguments) => {
		const state = getState();
		return {
			request: {
				url: `${API_URL}/api?` + setParamsUrl(params),
			},
			meta: {
				asMutation: false,
			},
		};
	},
);
