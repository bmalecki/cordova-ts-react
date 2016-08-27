#/bin/bash

PACKAGE=$(sed -n '/<widget /s/.*id="\([^"]*\)"[^\n]*/\1/p' config.xml)

npm run build
adb connect 192.168.1.13
cordova build android
adb install -r $(pwd)/platforms/android/build/outputs/apk/android-armv7-debug.apk
adb shell am start -n ${PACKAGE}/${PACKAGE}.MainActivity
