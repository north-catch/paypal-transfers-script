# paypal-transfers-script

## Prerequisites

- [clasp](https://github.com/google/clasp)
- login with clasp and copy the authentication file to the local directory

    ```
    clasp login
    cp ~/.clasprc.json .
    ```

## Development notes

Run the following to watch local files for changes and push every few seconds

```
clasp push --watch
```
