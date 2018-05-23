#!/bin/bash
lang=$1
if [ -z "$*" ]; then echo "No language args"; exit 1; fi;

echo "Converting $lang json to js..."

rm -rf ./src/locales/$lang/translations.js
echo -en "export const $lang = " > ./src/locales/$lang/translations.js
cat ./src/locales/$lang/translations.json >> ./src/locales/$lang/translations.js
node_modules/acorn/bin/acorn --silent --module ./src/locales/$lang/translations.js
if [[ $? != 0 ]]; then 
    echo "in ./src/locales/$lang/translations.js";
    exit $?;
else
    echo "DONE";
fi
