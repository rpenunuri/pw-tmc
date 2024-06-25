#!/bin/bash

# Default values
BASE_URL=${BASE_URL:-}
BROWSER=${BROWSER:-}
GROUP=${GROUP:-}

# Parse arguments
    while (( "$#" > 0 )); do
        case "$1" in
            -u|--url)
            BASE_URL="$2"
            shift 2
            ;;
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

# Run the docker-compose command with the environment variables
echo "Building e2e-tests image"
docker-compose build --no-cache --force-rm

echo "Running e2e tests"
BASE_URL=$BASE_URL BROWSER=$BROWSER GROUP=$GROUP docker-compose up --no-build --exit-code-from e2e-tests

echo "removing old images"
docker images -a | grep 'e2e-tests-playwright' | awk '{print $3}' | xargs docker rmi -f