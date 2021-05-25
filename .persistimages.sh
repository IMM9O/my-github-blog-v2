#!/bin/sh

cp _site/assets/img/remote/* assets/img/remote/
cp _site/assets/img/* assets/img/
git status
git add assets/img/
git commit -m "Persist images"
