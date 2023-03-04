#!/bin/bash

for f in *.png; do
    squoosh-cli --webp '{quality:60}' $f
done
