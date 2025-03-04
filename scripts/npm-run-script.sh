#!/bin/bash
# This script runs npm scripts concurrently across all workspaces, 
# from within the package.json file at the root of the monorepo.

# Usage: ./run-script.sh <script-name> [--excludeWs <workspace1,workspace2,...>]
# Example: ./run-script.sh dev --excludeWs frontend,backend

# Get the script command to run (default to "dev" if not provided)
SCRIPT_NAME=""
EXCLUDE_WS=()

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --excludeWs)
      IFS=',' read -r -a EXCLUDE_WS <<< "$2"
      shift 2
      ;;
    *)
      if [ -z "$SCRIPT_NAME" ]; then
        SCRIPT_NAME="$1"
      else
        echo "⛔️ Error: Unknown argument '$1'"
        exit 1
      fi
      shift
      ;;
  esac
done

# Default to "dev" if no script name is provided
SCRIPT_NAME="${SCRIPT_NAME:-dev}"

# Ensure script stops on errors
set -e

# Error if this script wasn't run from the root of the monorepo
if [ ! -f "package.json"  ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then 
  echo "⛔️ Error: This script must be run from the root of the monorepo"
  exit 1
fi

# Error if concurrently is not installed 
if ! npx --no-install concurrently --version > /dev/null 2>&1; then
  echo "⛔️ Error: 'concurrently' is not installed. Please run 'npm install --save-dev concurrently'"
  exit 1
fi

# From the root package.json, get the list of all workspaces as JSON, 
WORKSPACES=$(npm pkg get workspaces --json | jq -r '.[]')

# Error if the workspaces field is not set in package.json
if [ -z "$WORKSPACES" ]; then
  echo "⛔️ Error: workspaces field is not set in the root package.json"
  exit 1
fi

# Create arrays of commands and labels for each workspace's 
# 'npm run dev --workspace=<workspace>'  command
COMMANDS=()
LABELS=()
VALID_WORKSPACES=()

# Check each workspace for the required script and add to the command list if it exists
echo "Checking workspaces for '$SCRIPT_NAME' script..."
for WORKSPACE in $WORKSPACES; do

  # Check if the workspace has the requested script
  if npm pkg get scripts.$SCRIPT_NAME --workspace=$WORKSPACE >/dev/null 2>&1; then
    VALID_WORKSPACES+=("$WORKSPACE")
    LABEL=$(basename "$WORKSPACE")
    LABELS+=("$LABEL")
    COMMANDS+=("npm run $SCRIPT_NAME --workspace=$WORKSPACE")
  else
    echo "⚠️ Warning: '$WORKSPACE' does not have a '$SCRIPT_NAME' script" - skipping
  fi
done

# If no workspaces have the requested script, exit
if [ ${#COMMANDS[@]} -eq 0 ]; then
  echo "⛔️ Error: No workspaces have a '$SCRIPT_NAME' script defined"
  exit 1
fi

# Join labels with commas
LABELS_STRING=$(IFS=,; echo "${LABELS[*]}")

# Print the commands we're about to run
echo "Starting '$SCRIPT_NAME' for: $LABELS_STRING"

# Run concurrently with all the commands
npx concurrently \
  --names "$LABELS_STRING" \
  --prefix-colors "blue.bold,green.bold,red.bold,yellow.bold,magenta.bold,cyan.bold" \
  --prefix "[{name}]" \
  "${COMMANDS[@]}"
