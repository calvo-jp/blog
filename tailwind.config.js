import {withTV} from 'tailwind-variants/transformer';
import defaultTheme from 'tailwindcss/defaultTheme';

export default withTV({
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				body: ["'Source Sans 3'", ...defaultTheme.fontFamily.sans],
				heading: ["'Titillium Web'", ...defaultTheme.fontFamily.sans],
			},
			data: {
				selected: 'selected',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
});
