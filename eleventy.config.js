export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('assets');

	return {
		templateFormats: ['html', 'css', 'js', 'png'],
		dir: {
			input: 'src',
		},
	};
}
