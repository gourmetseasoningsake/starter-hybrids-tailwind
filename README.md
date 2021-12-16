# devenv

Not an actual development environment, but rather a super simple setup for a quick start with hybridsjs and tailwindcss. Also installs rescript.

## Installation

Just two working examples:

### Using `gh`:

```
$ gh repo create -p gourmetseasoningsake/devenv --private myproj
$ gh repo clone !$
$ cd !$
$ pnpm install
$ pnpm start
```

### Using `curl`:

```
$ mkdir myproj
$ cd !$
$ curl -L https://github.com/gourmetseasoningsake/devenv/tarball/lab | tar --strip=1 -x
$ pnpm install
$ pnpm start
```
