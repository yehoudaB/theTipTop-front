#!/bin/bash 
version= "npm run env | grep npm_package_name | cut -d '=' -f 2"
echo $version
