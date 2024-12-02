#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <day-number>"
  exit 1
fi

DAY=$1

yarn ts-node -r tsconfig-paths/register src/day${DAY}/index.ts