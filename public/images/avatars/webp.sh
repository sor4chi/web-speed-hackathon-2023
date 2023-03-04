#!/bin/bash

for f in *.jpg; do
    squoosh-cli --webp '{quality:60}' $f
done
