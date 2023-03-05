#!/bin/bash

CUR_DIR=$(pwd)
cd $CUR_DIR
GET_ALL_VIDEOS=$(find . -name "*.mp4")
for i in $GET_ALL_VIDEOS; do
    echo "Resize $i"
    OUT_FILE=$(echo $i | sed 's/.mp4/_resized.mp4/g')
    ffmpeg -i $i -vf scale=1024:576 $OUT_FILE
    rm $i
    mv $OUT_FILE $i
done
