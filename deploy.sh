#!/usr/bin/sh
if node -v ; then
    npm i
    npm start
else
    echo "Install nodejs!"
fi
