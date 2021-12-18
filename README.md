# starter-hybrids-tailwind

A simple setup for a quick start with [hybridsjs](https://hybrids.js.org) and [tailwindcss](https://tailwindcss.com). Also installs [rescript](https://rescript-lang.org/).

## Installation

I am using [pnpm](https://pnpm.io/) for this project. If you want to use `npm` or `yarn`, adjust the commands accordingly during installation and in the scripts section of the [package.json](package.json) file. The following procedures are just two working cli examples.

### Using [`gh`](https://cli.github.com/):

Use this procedure if you want to create your own repo at the same time.

```zsh
gh repo create -p gourmetseasoningsake/devenv --private myproj
gh repo clone !$
cd !$
pnpm install
pnpm start
```

### Using `curl`:

```zsh
mkdir myproj
cd !$
curl -L https://github.com/gourmetseasoningsake/devenv/tarball/lab | tar --strip=1 -x
pnpm install
pnpm start
```
