# ci-report

This program generates a CI report from the `gotests.json` generated by `go test -json` (we use `gotestsum` as a frontend).

## Limitations

We won't generate any report/stats for tests that weren't run. To find all existing tests, we could use: `go test ./... -list=. -json`, but the time it takes is probably not worth it. Usually most tests will run, even if there are errors and we're using `-failfast`.
