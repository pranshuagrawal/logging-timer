# logging-timer

Better time logging in your Javascript application. This is a more comprehensive way to log timestamps than the native `console.time` APIs as this being equally performant with better messages in logging.

## Installation

In terminal, navigate to your project directory and run
```
npm install logging-timer
```

Then in your project's `.js/.ts` file, do
```javascript
import LoggingTimer from 'logging-timer';

const timer1 = new LoggingTimer();
```

## Usage

```javascript
const timer1 = new LoggingTimer({
    name: "Timer 1"
});

timer1.start(); // Will print a start messages

setTimeout(() => {
    timer1.lap(); // First Lap
}, 2000);

setTimeout(() => {
    timer1.lap(); // Second Lap
}, 4000);

setTimeout(() => {
    timer1.stop(); // Stop the timer
}, 4000);

// You can start timer1 here again.

```

## Options

This package supports various options to configure how the logger works. Use these to suit your needs.

| Parameter | Type                              | Default                                    | Description                                   |
|-----------|-----------------------------------|--------------------------------------------|-----------------------------------------------|
| name      | string                            | ""                                         | Name of the timer                             |
| logging   | boolean                           | true                                       | Decides if you want log on every lap and stop |
| logger    | \{log: Function; warn: Function\} | \{log: console\.log, warn: console\.warn\} | Pass custom logger methods                    |

For example:

```javascript
const timer1 = new LoggingTimer({
    name: "Timer 1",
    logging: true,
    logger: {
        log: console.log,
        warn: console.log
    }
})
```


## Support

[Log a issue](https://github.com/pranshuagrawal/logging-timer/issues) or reach out to me at <me@pranshu.works>