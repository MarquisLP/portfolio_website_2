import { RenderPlugin } from '@11ty/eleventy';
import { DateTime } from 'luxon';

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

	eleventyConfig.addCollection('latestStory', (collectionsApi) => {
		return collectionsApi.getFilteredByTag('story').toReversed().slice(0, 1);
	});

	eleventyConfig.addPairedShortcode('excerpt', function (content) {
		let sliceEnd;
		const maxWordCount = 80;
		const maxParagraphCount = 3;

		let charIndex = 0;
		let wordCount = 0;
		let paragraphCount = 0;
		const trimmedContent = content.trim();
		while (
			wordCount < maxWordCount &&
			paragraphCount < maxParagraphCount &&
			charIndex < trimmedContent.length
		) {
			if (
				trimmedContent[charIndex] === ' ' ||
				trimmedContent[charIndex] === '\n'
			) {
				wordCount++;
			}
			if (trimmedContent[charIndex] === '\n') {
				paragraphCount++;
			}
			charIndex++;
		}
		sliceEnd = charIndex - 1;

		return trimmedContent.slice(0, sliceEnd).trim() + '…';
	});

	eleventyConfig.addShortcode('currentYear', () => {
		return new Date().getFullYear();
	});

	eleventyConfig.addFilter(
		'formatDateLocale',
		(dateObj, locale = 'en-US', options = {}) => {
			if (!dateObj) return '';
			const dt = DateTime.fromJSDate(dateObj);
			return dt.setLocale(locale).toLocaleString({
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZone: 'America/New_York',
			});
		},
	);

	eleventyConfig.addFilter('wordCount', (text) => {
		if (!text) return 0;
		const words = text.trim().split(/\s+/);
		return words.length;
	});

	eleventyConfig.addFilter('capitalizeEachWord', (text) => {
		if (!text) return '';
		return text
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	});

	eleventyConfig.addFilter('modFour', (numString) => {
		const num = Number(numString);
		if (isNaN(num)) return 0;
		return num % 4;
	});

	return {
		templateFormats: ['html', 'css', 'js', 'md', 'liquid', 'png'],
		htmlTemplateEngine: 'liquid',
		markdownTemplateEngine: 'liquid',
		dataTemplateEngine: 'liquid',
		dir: {
			input: 'src',
			data: '_data',
		},
	};
}
