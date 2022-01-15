# starter-hybrids-tailwind

A setup for a start with [hybrids](https://hybrids.js.org), [tailwindcss](https://tailwindcss.com) and [Rescript](https://rescript-lang.org/).

## Installation

I use [pnpm](https://pnpm.io/) for this project. If you want to use `npm` or `yarn`, delete the pnpm-lock.json file and adjust the commands accordingly during installation and usage. The following procedures are just two working examples.

### Using [`gh`](https://cli.github.com/):

Use this procedure if you want to create your own repo at the same time.

```bash
gh repo create --template gourmetseasoningsake/starter-hybrids-tailwind --private my-project-name
gh repo clone !$
cd !$
pnpm install
```

### Using `curl`:

```bash
mkdir myproj
cd !$
curl -L https://github.com/gourmetseasoningsake/starter-hybrids-tailwind/tarball/main | tar --strip=1 -x
pnpm install
```

## Configuration

### Custom environment variables

Custom environment variables must have the prefix specified in the `envPrefix` constant in `vite.config.js`.

```javascript
// vite.config.js
...
const envPrefix = "EXP_"
...
```
This does not only set the `envPrefix` option of [Vite](https://vitejs.dev/). Some variables are used to configure Vite in the `vite.config.js` file.

The root folder contains `sample.env.*` files for common environments with predefined effective variables. Remove the `sample` part of the filename so that Vite automatically inserts the variables into the `import.meta.env` object by mode.

Custom variables are all of type `string`, unlike some variables provided by Vite. You will need to parse your own variables yourself if you need types other than `string`.

By default `vite` runs in `development` mode and `vite build` in `production` mode.

### Preconfigured custom environment variables

Given<br>
`envPrefix` is set to `EXP_`,<br>
non-empty is truthy,<br>
empty is falsy

| Name | Value | Description |
| ---- | ----- | ----------- |
| EXP_BROWSER	| `firefox \| google chrome \| edge` or empty | What browser to automatically open the app on development server start. | 
| EXP_HMR_FORCE_RELOAD | non-empty or empty | Wether to force a page reload when modules change. | 
| EXP_ASS_DISABLE	| non-empty or empty  | Wether to force the use of link nodes to apply styles instead of constructed stylesheets even if the browser supports them. | 
| EXP_ROUTER_DEBUG | non-empty or empty | Wether to console-log the current view that was navigated to. | 
| EXP_BUILD_MINIFY | non-empty or empty | Wether to minify the build output. |

### Templating index.html

You can template the `index.html` file with liquid [tags](https://liquidjs.com/tags/overview.html), outputs and [filters](https://liquidjs.com/filters/overview.html). The data passed to the template can be populated in `index.config.js`. You can set a data item in two ways, directly:
```javascript
...
ogType: "website",
...
```
or per mode:
```javascript
...
title: {
  development: "Title (development)",
  staging: "Title (staging)",
  production: "Title"
},
...
```
Accessing `{{ title }}` in the template would render the value according the mode Vite is running in.

## Usage

### Development

```bash
pnpm dev
```

mode: `development`<br>
env: `development`

### Staging

```bash
pnpm build
```

mode: `staging`<br>
env: `production`

### Production

```bash
pnpm build:production
```

mode: `production`<br>
env: `production`

### Preview

```bash
pnpm preview
```

Serves the dist folder.

## References

### Tools

- [hybrids](https://hybrids.js.org)
- [tailwindcss](https://tailwindcss.com)
- [Rescript](https://rescript-lang.org/)
- [Vite](https://vitejs.dev/)
- [liquidjs](https://liquidjs.com/)

### Icons

- [How to Favicon in 2021: Six files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
