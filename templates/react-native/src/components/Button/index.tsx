import {
	backgroundColor,
	BackgroundColorProps,
	BackgroundColorShorthandProps,
	BorderProps,
	createRestyleComponent,
	createVariant,
	layout,
	LayoutProps,
	opacity,
	OpacityProps,
	PositionProps,
	shadow,
	ShadowProps,
	spacing,
	SpacingProps,
	SpacingShorthandProps,
	VariantProps,
} from '@shopify/restyle';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Theme } from '~theme';

type BtnProps = VariantProps<Theme, 'touchableVariants'> &
	BackgroundColorProps<Theme> &
	BackgroundColorShorthandProps<Theme> &
	BorderProps<Theme> &
	LayoutProps<Theme> &
	OpacityProps<Theme> &
	PositionProps<Theme> &
	ShadowProps<Theme> &
	SpacingProps<Theme> &
	SpacingShorthandProps<Theme> &
	React.ComponentProps<typeof TouchableOpacity> & {
		children?: any;
		loading?: boolean;
	};

const Button = createRestyleComponent<BtnProps, Theme>(
	[
		spacing,
		layout,
		opacity,
		backgroundColor,
		shadow,
		createVariant({ themeKey: 'touchableVariants' }),
	],
	TouchableOpacity,
);
export default Button;
