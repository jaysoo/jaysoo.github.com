#!/bin/sh
BASEDIR=$(dirname $0)
rm -rf $BASEDIR/../tweets-built
node $BASEDIR/r.js -o $BASEDIR/build.js
