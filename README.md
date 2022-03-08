# starter-hybrids-tailwind


A setup for a start with [hybrids](https://hybrids.js.org), [tailwindcss](https://tailwindcss.com) and [Rescript](https://rescript-lang.org/).

<br><br><br>

## _Installation_

<br>

I use [pnpm](https://pnpm.io/) for this project. If you want to use `npm` or `yarn`, delete the pnpm-lock.json file and adjust the commands accordingly during installation and usage. The following procedures are just two working examples.

<br>

### Using [`gh`](https://cli.github.com/):

<br>

Use this procedure if you want to create your own repo at the same time.

```bash
gh repo create --template gourmetseasoningsake/starter-hybrids-tailwind --private my-project-name
gh repo clone !$
cd !$
pnpm install
```

<br>

### Using `curl`:

```bash
mkdir myproj
cd !$
curl -L https://github.com/gourmetseasoningsake/starter-hybrids-tailwind/tarball/main | tar --strip=1 -x
pnpm install
```

<br><br><br>

## _Configuration_

<br>

### Custom environment variables

<br>

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

<br>

### Preconfigured custom environment variables

<br>

_Given_<br>
`envPrefix` is set to `EXP_`,<br>
_with_<br>
non-empty is truthy,<br>
empty is falsy

| Name | Value | Description |
| ---- | ----- | ----------- |
| EXP_BROWSER	| `firefox \| google chrome \| edge` or empty | What browser to automatically open the app on development server start. | 
| EXP_HMR_FORCE_RELOAD | non-empty or empty | Wether to force a page reload when modules change. | 
| EXP_ASS_DISABLE	| non-empty or empty  | Wether to force the use of link nodes to apply styles instead of constructed stylesheets even if the browser supports them. | 
| EXP_ROUTER_DEBUG | non-empty or empty | Wether to console-log the current view that was navigated to. | 
| EXP_BUILD_MINIFY | non-empty or empty | Wether to minify the build output. |
| EXP_TEST_VERBOSE | non-empty or empty | Wether stdout for tests should be verbose. (Does not have a significant effect yet.) |

<br>

### Templating index.html

<br>

You can template the `index.html` file with liquid [tags](https://liquidjs.com/tags/overview.html), outputs and [filters](https://liquidjs.com/filters/overview.html). The data passed to the template can be populated in `index.config.js`. You can set a data item value in two ways, as primitive
```javascript
...
lang: "en",
...
```
or as object with properties per mode:
```javascript
...
robots: {
  staging: "noindex,nofollow",
  production: "index,nofollow"
},
...
```
Accessing `{{ robots }}` in the template would render the value according the mode Vite is running in.
If no property matches the mode, the value is `null`.

You can loop through object entries

```javascript
// index.config.js

const config = {
  ...
  og: {
    title: "Title",
    type: "website",
    ...
  }
  ...
}
```

in your index.html file,

```liquid
<!-- index.html -->
...
{%- for item in og -%}
  {%- if item[1] -%}

  <meta property="og:{{ item[0] }}" content="{{ item[1] }}">

  {%- endif -%}
{%- endfor -%}
```

where `item[0]` is the key and `item[1]` is the value.

<br><br><br>

## _Usage_

<br>

### Development

```bash
pnpm dev
```

mode: `development`<br>
node env: `development`

<br>

### Staging

```bash
pnpm build
```

mode: `staging`<br>
node env: `production`

<br>

### Production

```bash
pnpm build:production
```

mode: `production`<br>
node env: `production`

<br>

### Preview

```bash
pnpm preview
```

mode: `production`<br>
node env: `production`

Serves build from the dist folder.


<br><br><br>

## _References_

<br>

### Tools

<br>

- [hybrids](https://hybrids.js.org)
- [tailwindcss](https://tailwindcss.com)
- [Rescript](https://rescript-lang.org/)
- [Vite](https://vitejs.dev/)
- [liquidjs](https://liquidjs.com/)
- [AVA](https://github.com/avajs/ava)
- [Puppeteer](https://pptr.dev/)

<br>

### Icons

<br>

- [How to Favicon in 2021: Six files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)