#!/bin/bash

CUR_DIR=$(pwd)
cd $CUR_DIR
ALL_DIRS=$(find . -type d)
for d in $ALL_DIRS; do
    cd $CUR_DIR/$d
    squoosh-cli --webp '{quality:60}' *.jpg
done
