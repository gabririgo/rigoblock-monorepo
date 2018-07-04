# RigoBlock Protocol

## Available Scripts

In the project directory, you can run:

### `yarn ganache`

Starts the Ganache-cli server on port 8545 and with network Id 5777.

### `yarn compile`

Compiles all solidity contracts and generates the JSON artifacts. The contract's abi and address are stored under `networks[networkId]`.

### `yarn build`

In order: compiles all contracts, deleted *dist* folder, bootstraps contract on ganache, builds with webpack. **Requires Ganache to be up prior to running the command.**

### `yarn test`

Runs tests for the solidity contracts. **Ganache must not be up** when running this command as it will automatically start it before each test suite.

### `yarn lint`

Lints all JS files.

### `yarn prepublish`

Same as `yarn build` gets called automatically by lerna when publishing packages.

## Writing Tests

Read the [testing documentation.](docs/TESTING.md)