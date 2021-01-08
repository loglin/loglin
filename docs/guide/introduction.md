# Introduction

## Motivation

I searched for an easy, fast and lightweight logger with a simple and typed API for my Node.js project, but I didn't find one that satisfied me.
Alternatives were either too slow when logging or too complex to configure. Also the extensibility wasn't that great.
So I created `loglin` which is exactly what I searched for.

## How it works

`loglin` decouples the core logging functionality from the actual logging process to make it more flexible and extensible.
It uses so-called [**Reporters**](/reporters/) to process an incoming log, **Filters** to filter out only specific logs and **Formatters** to format your data before using it. Besides the Filters, there are also integrated [**Log Levels**]() which control the global log output and only processes allowed logs.

For example, you can add a reporter that logs the message to the console and another reporter that saves it to a file/database or an external error tracking system like [**Sentry**](https://sentry.io). There are no limits to how many reporters can be used, it's all up to you.

## You just want getting started?

Check out the [Guide](/guide/).
