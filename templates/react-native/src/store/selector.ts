import { getQuery } from '@redux-requests/core';
import { useSelector } from 'react-redux';
import { common } from 'store/mutationAction';

export const useCommon = (key: any, defaultValue: any) => {
	return useSelector(
		(state: any) => getQuery<any>(state, { type: common })?.data?.[key] ?? defaultValue,
	);
};
