# Playwright with Page Object Model Demo

This project demonstrates how to use [Playwright](https://playwright.dev/) with the Page Object Model (POM) for end-to-end testing. It also includes Docker support for running tests in both local and CI environments.

## Project Structure

The project is structured as follows:

- `tests`: This directory contains the test files.
- `pages`: This directory contains the Page Object Model files.
- `scripts`: This directory contains scripts for running the tests.

## Running Tests
Tests can be executed using docker, bash script or the playwright test runner. Tests run in headless mode by default meaning no browser window will be opened while running the tests and results will be seen in the terminal. After test execution the results will be stored in the `test-results` folder, in addition to this a detailed test report is generated and stored in the `playwright-report` folder.

### Docker Support
This project includes a Dockerfile and a docker-compose.yml file that are used for running the tests in a Docker container. This allows you to run the tests in any environment that supports Docker, including most CI environments.

To run the tests in a Docker container, use the following command:

```
docker-compose up --build
```

You can also provide specific url, browser, and group to run tests a command like this:

```
BASE_URL=https://www.toyota.com BROWSER=chromium GROUP=@smoke docker-compose up --build
```

### Bash script

To facilitate test execution on local environments, you can run tests using the `run-e2e-tests.sh` script in the `scripts` directory. This script accepts the following arguments:

- `-u|--url`: The base URL used for all of the test cases. If not provided, `https://www.toyota.com` is used.
- `-b|--browser`: The browser to use for the tests. If not provided, all configured browsers from playwright.config.ts are used.
- `-g|--group`: The group of tests to run. If not provided, all tests are run.

This script uses docker compose to run tests, passing the provided arguments as environment variables.

For example, to run all tests in the '@smoke' group with the 'chromium' browser, you would use the following command:

```
./scripts/run-e2e-tests.sh -b chromium -g @smoke
```

### Playwright test runner
You can run your tests with the playwright test command, here are some examples:

#### Run all tests
```
npx playwright test
```

#### Run tests with webkit browser only
```
npx playwright test --project webkit
```

#### Run tests in headed mode
```
npx playwright test --headed
```

## CI Support
This project can be easily integrated with popular CI environments like GitHub Actions and GitLab CI. You can reuse the existing `run-e2e-tests` script or `docker-compose` for this.

### GitHub Actions
To use this project with GitHub Actions (see: `.github/workflows/run-e2e-tests-chromium.yml`), you can create a .github/workflows/yourworkflow.yml file with the following content:

```
name: Run e2e tests

on: [push, pull_request]

jobs:
    test:
        runs-on: ubuntu-latest

        steps:
        - name: Checkout code
          uses: actions/checkout@v4
    
        - name: Run tests with chromium browser
          run: BROWSER=chromium docker-compose up --build --exit-code-from e2e-tests
   ```

### GitLab CI
To use this project with GitLab CI, you can create a .gitlab-ci.yml file with the following content:


```
test:
  script:
    - docker-compose up --build --exit-code-from e2e-tests
```