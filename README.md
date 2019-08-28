# Hashml CLI
[![npm version](https://badge.fury.io/js/%40hashml%2Fcli.svg)](https://www.npmjs.com/package/@hashml/cli)
[![Build Status](https://travis-ci.org/hashml/hashml-cli.svg?branch=master)](https://travis-ci.org/hashml/hashml-cli)

## Installation
```
sudo npm install -g @hashml/cli
```

## Usage
Once installed, the CLI is available through the `hm` command. This command has two subcommands available:

```
$ hm -h
hm <command>

Commands:
  hm convert [options] <file> <schema>  Convert Hashml files
  hm validate <file> <schema>           Validate a Hashml file with a Hashml
                                        schema

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

### `hm convert`
This command converts a Hashml document to JSON or XML:

```
$ hm convert -h
hm convert [options] <file> <schema>

Convert Hashml files

Positionals:
  file    Path to the Hashml file                            [string] [required]
  schema  Path to the schema file (JSON)                     [string] [required]

Options:
  -f, --format
   [string] [choices: "auto", "json", "xml"] [default: "auto": infers the format
                                       from the output file. Defaults to "json"]
  -o, --output   Write output to a file                                 [string]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

### `hm validate`
This command verifies that a document respects a given schema:

```
hm validate <file> <schema>

Validate a Hashml file with a Hashml schema

Positionals:
  file    Path to the Hashml file to validate              [string] [required]
  schema  Path to the Hashml schema file                   [string] [required]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

## Development
Clone the repository, and install dependencies with:

```bash
npm install
```

To build the project, run:

```bash
npm run build
```

To run the build, you can link the built files to your `PATH` by running:

```bash
chmod +x ./dist/index.js
npm link
```

This will make the built files available under the `hm` command. You can run `npm run build` to re-build, and `hm` will now run your latest build. To unlink the `hm` command from the built file, run:

```bash
npm unlink
```
