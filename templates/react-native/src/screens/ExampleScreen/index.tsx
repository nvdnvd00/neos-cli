import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@redux-requests/react';
import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import React from 'react';
import { Trans } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { getUsers } from 'store/apiAction';

const HomeScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch<any>();
	const { data } = useQuery({ type: getUsers });
	console.log('redux fetch payload', data);

	return (
		<Box flex={1} alignItems='center' justifyContent='center' backgroundColor='white'>
			<Text variant='heading' color='blue' textDecorationLine='underline'>
				<Trans i18nKey='Home Screen'>Home Screen</Trans>
			</Text>
			<Button
				variant='example'
				marginRight='xl'
				onPress={() =>
					dispatch(getUsers({ results: 10 })).then((res: any) => {
						console.log({ data: res.data });
					})
				}>
				<Text variant='heading' color='white'>
					Button
				</Text>
			</Button>
			<ScrollView>
				<Text variant='heading' color='blue'>
					{JSON.stringify(data)}
				</Text>
			</ScrollView>
		</Box>
	);
};
export default HomeScreen;
