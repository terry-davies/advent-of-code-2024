#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <day-number>"
  exit 1
fi

DAY=$1

yarn jest src/day${DAY}