#!/bin/bash

for f in *.mp4; do
    echo "Converting $f"
    OUT_FILE=$(echo $f | sed 's/.mp4/.webm/g')
    ffmpeg -i $f -strict -2 $OUT_FILE
done
