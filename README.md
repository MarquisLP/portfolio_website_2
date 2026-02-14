# Marcelle J.J. Padilla's Portfolio Website

This is the source code for my professional portfolio website as of 2026.

## Project Overview

This project uses the [11ty](https://www.11ty.dev/) static site generator. This allows the website files to be written in plain HTML and CSS, alongside some templating logic to fill in content (such as inserting Markdown content that 11ty will automatically convert to HTML). Running 11ty builds these template files into finalized HTML and CSS files.

Why plain HTML/CSS with 11ty instead of using a framework like React?

- It's a lot lighter weight and more performant. No need to bundle all those React packages and dependency packages. Having the HTML and CSS already fully rendered, instead of having the user's browser run JavaScript to resolve everything, 
- Less complexity. As you'll see in the source code, this is a very small project with only a few pages. The only "reusable components" are the top bar "bookmark" navigation links, and even that can be easily modularized just by having a separate CSS stylesheet for reuse.
- SEO! Most web crawlers don't run JavaScript, so a website built with React or another single-page application framework would just show up as mostly empty to those web crawlers. Technically, you could get around this with server-side rendering, but that's a whole other can of worms. Again, minimizing complexity is key.

### Project Structure

The 11ty config is defined in `eleventy.config.js`. This defines custom filters, shortcodes, plugins, and file passthroughs used in the website source code files. At the bottom of this config file, you'll find general 11ty configs such as what path to use as 11ty's input for processing files.

All website source code is located under `src/` (what a shocker). Under `src/` are sub-directories for the different Markdown files used throughout the site.

- `bodyText`: Long-form text inserted into the body content of web pages. Separating this into dedicated Markdown files makes the HTML tidier and makes edits a lot easier.
- `softwareProjects`: Software projects I've worked on. These show up under the "Software" section on the home page.
- `stories`: Samples of writing I've shared publicly on this website. The latest story shows up on the homepage. All stories show up on the Library page at `{websiteUrl}/library`.

`index.html` defines the home page.

`library.html` and `story.html` correspond to the pages for the Library and each individual Story, respectively. These pages use [11ty pagination](https://www.11ty.dev/docs/pagination/#paging-a-collection) to automatically generate their contents based on the `stories` Markdown files. In the case of `story.html`, a copy of it will be created for each story and named after the story title.

In the generated site, `library.html` is accessible at `{websiteUrl}/library`. Each story page is accessible at `{websiteUrl}/library/{story-title-using-dashes}`.

CSS files for each of the HTML files are defined with the same name as the corresponding HTML file. There is also `global.css` for site-wide styles, and `bookmarks.css` for reusable styling of the top navigation.

`assets/` contains non-source media files, such as images.

## Development

### Building and Running the Website

First, make sure you're on the appropriate Node.js version. If you have `nvm` installed, cd to the root of this repo and run:

```bash
$ nvm use
```

If you don't have `nvm`, you can check the `.nvmrc` file for the required Node.js version, then install and activate it manually.

Afterwards, install dependencies:

```bash
$ npm ci
```

To build the project, run:
```
$ npm run build
```

This will run 11ty and output the generated static site to a `_site/` directory.

For development, you can have 11ty automatically rebuild the static site on file changes. To do this, run:
```
$ npm start
```

### Linting and Formatting

This project uses [Prettier](https://prettier.io/) to enforce consistent JavaScript formatting conventions. The Prettier configurations for this project are defined in `package.json` under the `prettier` key.

During development, you shouldn't need to worry about manually fixing formatting, as we use a [git pre-commit hook](https://prettier.io/docs/precommit#option-1-lint-staged) to automatically run PrettierJS on commit and fix the formatting in all relevant files.
