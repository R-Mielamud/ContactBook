#!/usr/bin/sh
if node -v ; then
    sudo npm i
    cd client
    sudo npm i
    cd ..
else
    echo "Install nodejs!"
fi
