# Hashmark CLI

## Installation
```
sudo npm install -g @hashmark/cli
```

## Development
To build the project, run:

```
npm run build
```

To run the build, you can link the built files to your `PATH` by running:

```
chmod +x dist/index.js
sudo npm run link
```

This will make the built files available under the `hm` command. You can run `npm run build` to re-build, and `hm` will now run your latest build.
