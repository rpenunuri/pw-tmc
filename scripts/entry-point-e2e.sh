#!/bin/bash

# Default values
BROWSER=${BROWSER:-}
GROUP=${GROUP:-}

# Parse arguments
while (( "$#" > 0 )); do
  case "$1" in
    -b|--browser)
      BROWSER="$2"
      shift 2
      ;;
    -g|--group)
      GROUP="$2"
      shift 2
      ;;
    -*|--*=) # unsupported flags
      echo "Error: Unsupported flag $1" >&2
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done
# set positional arguments in their proper place
eval set -- "$PARAMS"

if [[ -n "$BROWSER" && -n "$GROUP" ]]; then
    echo "Running all tests in group: '$GROUP' with browser: $BROWSER"
    npx playwright test --project=$BROWSER --grep="$GROUP"
elif [[ -n "$BROWSER" ]]; then
    echo "Running all tests with browser: $BROWSER"
    npx playwright test --project=$BROWSER
elif [[ -n "$GROUP" ]]; then
    echo "Running all tests in group: '$GROUP'"
    npx playwright test --grep="$GROUP"
else
    echo "Running all tests with all configured browsers"
    npx playwright test    
fi
