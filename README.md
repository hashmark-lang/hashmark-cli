# Hashmark CLI

## Installation
```
sudo npm install -g @hashmark/cli
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
