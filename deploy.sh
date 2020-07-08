#!/usr/bin/bash
if node -v ; then
    if npm -v ; then
        sudo npm i
    else
        echo "Install npm!"
    fi
else
    echo "Install nodejs!"
fi
