# loglin

> Super fast, lightweight and extensible logger for Node.js

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

## Why loglin?

⚡️&nbsp; Lightning Fast Logging<br>
🛠️&nbsp; Rich Features<br>
🔌&nbsp; Pluggable Reporters<br>
🍃&nbsp; Lightweight<br>
👶&nbsp; Easy To Use<br>
🔑&nbsp; Fully Typed

## Installation

### 1. Core

```bash
# pnpm
pnpm install loglin

# npm
npm i loglin

# yarn
yarn add loglin
```

### 2. Minimum one reporter (e.g. [reporter-console](packages/reporter-console))

See all [Available Reporters](#available-reporters)

```bash
# pnpm
pnpm install @loglin/reporter-console

# npm
npm i @loglin/reporter-console

# yarn
yarn add @loglin/reporter-console
```

## Getting Started

```ts
// With imports
import { createLogger } from 'loglin'
import { consoleReporter } from '@loglin/reporter-console'

// With require
const { createLogger } = require('loglin')
const { consoleReporter } = require('@loglin/reporter-console')

// Create logger instance
const logger = createLogger({
    reporters: [
        consoleReporter()
    ]
})

// Use log methods
logger.success('Successfully built')
logger.fatal(new Error('Something bad happend'))
logger.info('Some info', { foo: 'bar' })
// ...
```

## Log Methods

- `logger.fatal()`
- `logger.error()`
- `logger.warn()`
- `logger.log()`
- `logger.info()`
- `logger.success()`
- `logger.debug()`

Each log method can receive the actual log data as the first argument
and optional meta data as the second argument. 
The meta data is for providing some additional information which you can check/print/process in your reporter's log function.

Example:
```ts
logger.info('Received info', { name: 'Foo Bar' })
```

## Log Levels

- `LogLevel.Fatal`
- `LogLevel.Error`
- `LogLevel.Warn`
- `LogLevel.Log`
- `LogLevel.Info`
- `LogLevel.Success`
- `LogLevel.Debug`

## Available Reporters

- [Console Reporter](packages/reporter-console)

## Available Filters

### `isMinimumLevel(level)`

#### `level`

- **Type:** `LogLevel`

Minimum level where the logger should execute the log function. Can be any of the [Log Levels](#log-levels).

## API

### `createLogger(options)`

#### `reporters`

- **Type:** `Reporter[]`
- **Default:** `[]`

Specify the reporters the logger should use. **Minimum one is required**.

#### `filters`

- **Type:** `Filter[]`
- **Default:** `[]`

Global filters for filtering out logs of **all** reporters.
Perfect for filtering logs based on the log level.<br>See [Available Filters](#available-filters).

## License

MIT

[npm-version-src]: https://flat.badgen.net/npm/v/loglin/latest
[npm-version-href]: https://npmjs.com/package/loglin

[npm-downloads-src]: https://flat.badgen.net/npm/dt/loglin
[npm-downloads-href]: https://npmjs.com/package/loglin