#!/bin/bash

CUR_DIR=`pwd`
cd $CUR_DIR
GET_ALL_IMAGES_IN_DEEP=`find . -name "*.jpg"`
for i in $GET_ALL_IMAGES_IN_DEEP
do
    echo "Resize $i"
   if [ `identify -format "%w" $i` -gt `identify -format "%h" $i` ]; then
        convert $i -resize x52 -gravity center -crop 52x52+0+0 +repage $i
    else
        convert $i -resize 52x -gravity center -crop 52x52+0+0 +repage $i
    fi
done
