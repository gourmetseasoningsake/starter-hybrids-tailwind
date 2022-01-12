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

## Config

...

## Usage

### Development

```bash
pnpm dev
```

## References

### Icons

- [How to Favicon in 2021: Six files that fit most needs](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
