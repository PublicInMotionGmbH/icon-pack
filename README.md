# Talixo Icon Pack

We use our custom icons available in this repository,
as well as [Material UI](https://github.com/google/material-design-icons) icons.

## Format

We've got generated icons at `icons` directory. Also there are sprites in `sprites` directory, and icon font in `fonts`.

### Generated icons

We store them in `icons` directory, grouped by output type.

- `svg` - optimized SVGs
- `android` - Android Drawable Vectors
- `ios` - Raster icons ready for iOS

## Requirements

- Install Python 2.7 with PIP and run `pip install icon_font_to_png`
- Install Node.js 7+ with NPM

## How to run?

Firstly, you will need to install package dependencies using `npm install` command.
There are few Gulp tasks prepared already, so you can run them using NPM scripts.
You can run them using `npm run TASK_NAME` command.

- `optimize-svg` - Optimize SVG from `icons/svg` directory
- `android` - Build Android Vector Drawables in `icons/drawables` directory
- `ios` - Build raster images for iOS
- `webfont` - Build icon font
- `meta` - Generate meta file with information about all files
- `build` - Build everything!

## How to add new icons?

- Icon should have underscores (`_` instead of `-` characters)
- Add desired SVG icons into `icons/svg` directory
- Run `npm run build`
- Change version in `package.json` and run `npm publish --access=public`

## Changelog

- **1.2.2** - add new icons, handle errors better way
- **1.2.1** - generate new stylesheets
- **1.2.0** - change formatting of stylesheets
- **1.1.2** - bugfix for analysing codepoints
- **1.1.1** - generate additional stylesheet with font only stylesheet
- **1.1.0** - change `icons` in metadata from list of icons (`string[]`) to map of icon codepoints (`object`)
- **1.0.0** - initial version
