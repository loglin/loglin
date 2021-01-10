# loglin📋

[![npm][npm-img]][npm-url]
[![downloads][downloads-img]][downloads-url]
[![codecov][codecov-img]][codecov-url]
[![license][license-img]][license-url]

> Super fast & lightweight Node.js logger

- ⚡️ Lightning Fast Logging
- 🔌 Pluggable Reporters
- ✨ Rich [API](https://loglin.dev/api/)
- 🍃 Lightweight like a leaf
- 👶 Easy To Use
- 🔑 Fully Typed (even in JavaScript)

## Motivation

I searched for an easy, fast and lightweight logger with a simple and typed API for my Node.js project, but I didn't find one that satisfied me.
Alternatives were either too slow when logging or too complex to configure. Also the extensibility wasn't that great.
So I created `loglin` which is exactly what I searched for.

## How it works

`loglin` decouples the core logging functionality from the actual logging process to make it more flexible and extensible.
It uses so-called [**Reporters**](https://loglin.dev/reporters/) to process an incoming log, **Filters** to filter out only specific logs and **Formatters** to format your data before using it. Besides the Filters, there are also integrated [**Log Levels**](https://loglin.dev/log-levels/) which control the global log output and only processes allowed logs.

For example, you can add a reporter that logs the message to the console and another reporter that saves it to a file/database or an external error tracking system like [**Sentry**](https://sentry.io). There are no limits to how many reporters can be used, it's all up to you.

## You just want getting started?

[Read the Docs to learn more](https://loglin.dev)

## License

MIT

[npm-img]: https://img.shields.io/npm/v/loglin.svg
[npm-url]: https://npmjs.com/package/loglin
[downloads-img]: https://badgen.net/npm/dm/loglin
[downloads-url]: https://npmjs.com/package/loglin
[codecov-img]: https://badgen.net/codecov/c/github/loglin/loglin/main
[codecov-url]: https://codecov.io/gh/loglin/loglin
[license-img]: https://badgen.net/npm/license/loglin
[license-url]: https://npmjs.com/package/loglin
