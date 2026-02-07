import { RenderPlugin } from '@11ty/eleventy';

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPlugin(RenderPlugin);

	eleventyConfig.addFilter('yearsSince', (startDate) => {
		if (!startDate) return 0;

		const start = new Date(startDate);
		const now = new Date();

		if (isNaN(start) || isNaN(now)) return 0;

		const diffMs = now - start;
		const msPerYear = 1000 * 60 * 60 * 24 * 365;
		return Math.floor(diffMs / msPerYear);
	});

	eleventyConfig.addWatchTarget('./_includes');

	return {
		templateFormats: ['html', 'css', 'js', 'md', 'png'],
		htmlTemplateEngine: 'liquid',
		markdownTemplateEngine: 'liquid',
		dataTemplateEngine: 'liquid',
		dir: {
			input: 'src',
			data: '_data',
		},
	};
}
