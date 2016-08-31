#/bin/bash

PACKAGE=$(sed -n '/<widget /s/.*id="\([^"]*\)"[^\n]*/\1/p' config.xml)
ANDROID_PROCESSOR_ARCH=${ANDROID_PROCESSOR_ARCH:-armv7}

adb connect 192.168.1.13
npm run build
cordova build android
adb install -r \
    $(pwd)/platforms/android/build/outputs/apk/android-${ANDROID_PROCESSOR_ARCH}-debug.apk
adb shell am start -n ${PACKAGE}/${PACKAGE}.MainActivity
