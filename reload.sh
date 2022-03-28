#!/bin/bash

rm -rf node_modules/fansion-*
rm -rf node_modules/fasm-*
rm package-lock.json
npm cache clean --force
npm install
