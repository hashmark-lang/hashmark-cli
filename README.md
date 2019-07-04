# Hashmark CLI
[![npm version](https://badge.fury.io/js/%40hashmark%2Fcli.svg)](https://www.npmjs.com/package/@hashmark/cli)
[![Build Status](https://travis-ci.org/hashmark-lang/hashmark-cli.svg?branch=master)](https://travis-ci.org/hashmark-lang/hashmark-cli)

## Installation
```
sudo npm install -g @hashmark/cli
```

## Usage
Once installed, the CLI is available through the `hm` command. Currently, the only available command  is `hm convert`, which parses a hashmark document:

```
$ hm convert --help
hm convert [options] <file>

Convert Hashmark files

Positionals:
  file  Path to a Hashmark file                              [string] [required]

Options:
  --version, -v  Show version number                                   [boolean]
  --help, -h     Show help                                             [boolean]
  --format, -f
   [string] [choices: "auto", "json", "xml"] [default: "auto": infers the format
                                       from the output file. Defaults to "json"]
  --output, -o   Write output to a file                                 [string]
```

## Development
Clone the repository, and install dependencies with:

```
npm install
```

To build the project, run:

```
npm run build
```

To run the build, you can link the built files to your `PATH` by running:

```
sudo npm link
```

This will make the built files available under the `hm` command. You can run `npm run build` to re-build, and `hm` will now run your latest build. To unlink the `hm` command from the built file, run:

```
sudo npm unlink
```
