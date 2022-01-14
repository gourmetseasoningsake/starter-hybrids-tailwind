# starter-hybrids-tailwind

A simple setup for a quick start with [hybridsjs](https://hybrids.js.org), [tailwindcss](https://tailwindcss.com) and [rescript](https://rescript-lang.org/).

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
curl -L https://github.com/gourmetseasoningsake/starter-hybrids-tailwind/tarball/lab | tar --strip=1 -x
pnpm install
```

## Configuration

### Custom environment variables

Custom environment variables must have the prefix specified in the `envPrefix` constant in `/vite.config.js`.

The root folder contains `sample.env.*` files for common environments with predefined effective variables. Remove the `sample` part of the filename so that vite automatically inserts the variables into the `import.meta.env` object by mode.

Note that the custom variables are all of type `string`, unlike some variables provided by vite, e.g. `boolean import.meta.env.DEV`. You will need to parse your own variables yourself if you need types other than `string`.

#### Example
Given<br>
`const envPrefix = PUBLIC_` in `/vite.config.js`,<br>
`PUBLIC_API_URL=https://example.org/api/v2` in `/.env.staging`,<br>

Then CLI command `vite build --mode staging` would make `https://example.org/api/v2` available in `import.meta.env.PUBLIC_API_URL`.

Note that the command `vite` has `--mode development` and the command `vite build` has `--mode production` by default.




### Preconfigured environment variables

Given `envPrefix` is set to `EXP_`.

| Name | Value | Description |
| ---- | ----- | ----------- |
| EXP_BROWSER	| `firefox \| google chrome \| edge`<br>_optional_ | Automatically opens the app in the specified browser on development and preview server start. | 
| EXP_HMR_FORCE_RELOAD | `any`<br>_optional_ | | 
| EXP_ASS_DISABLE	| `any`<br>_optional_ | | 
| EXP_ROUTER_DEBUG | `any`<br>_optional_ | | 
| EXP_BUILD_MINIFY | `any`<br>_optional_ | |

### Templating index.html 

## Usage

### Development

```bash
pnpm dev
```

## References

### Icons

- [How to Favicon in 2021: Six files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
