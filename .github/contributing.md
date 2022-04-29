# Contributing to CSS GUI

## Code of Conduct

By participating in our community and interacting with this repository, you agree
to abide by our [code of conduct][].

## Contributions

Code is not the only way to contribute to an open-source project.
We appreciate any and all contributions which include, but are not limited to:

- **Bug reports**: If something doesn't work like expected, documentation is incorrect,
  or you see error messages we welcome you to [create an issue][issue].
- **Documentation**: If you're using CSS GUI, especially when getting started, you're
  in a perfect spot to help us with the docs. Correct a typo, clarify a concept, or add
  an example.
- **Support**: Work with us triaging issues and answering questions.
- **Development and design**: Contribute to the codebase by implementing features, improving
  design, or fixing bugs.

### Development

Follow the instructions below to get the project running locally, and learn about some
of the primary scripts/tasks in dev/design workflows.

#### Installation

```sh
git clone https://github.com/components-ai/css.gui
cd css-gui
yarn
```

#### Running the development server

```sh
yarn dev
```

#### Running the tests

```sh
yarn test
```

#### Reinstalling dependencies and clearing caches

On rare ocassions, especially when changing configurations, you might
need to clear the cache and reinstall the dependencies:

```sh
yarn nuke
```

[code of conduct]: https://github.com/components-ai/css.gui/blob/main/code-of-conduct.md
[issue]: https://github.com/components-ai/css.gui/issues/new
