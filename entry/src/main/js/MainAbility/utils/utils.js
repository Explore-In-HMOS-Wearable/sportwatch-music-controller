import { PHONE_APP_FINGERPRINT, PHONE_APP_PACKAGE_NAME } from '../constants/constants.js';
import { Builder, Message, P2pClient } from '../wearenginesdk/wearengine.js';
import file from '@system.file';

let p2pClient = new P2pClient();
let messageClient = new Message();
let builderClient = new Builder();

function setFingerprint() {
    p2pClient.setPeerPkgName(PHONE_APP_PACKAGE_NAME);
    p2pClient.setPeerFingerPrint(PHONE_APP_FINGERPRINT);
}

function registerMessageReceiver() {
    p2pClient.registerReceiver({
        onSuccess: function () {
            console.info('Register message successfully')
        },
        onFailure: function () {
            console.error('Register message fail')
        },
        onReceiveMessage: function (data) {
            if (data && data.isFileType) {
                console.info(`Receive file name: ${data.name}`)
                const content = getPlaylist('internal://app/playlist.json')
                content !== '' ?
                    this.playlist = JSON.parse(content) :
                    this.playlist = ''
                return
            }
            console.info(`Receive message: ${data}`);
        },
    });
}

function unregisterMessage() {
    p2pClient.unregisterReceiver({
        onSuccess: function () {
            console.info('Stop receiving messages is sent')
        },
    });
}

function sendMusicAction(actionType) {
    const command = {
        action: actionType,
    };
    builderClient.setDescription(JSON.stringify(command));
    messageClient.builder = builderClient;
    p2pClient.send(messageClient, {
        onSuccess: function () {
            console.info('success');
        },
        onFailure: function () {
            console.info(`${actionType} command failed`);
        },
        onSendResult: function (resultCode) {
            console.info(resultCode.data + resultCode.code);
        },
        onSendProgress: function (count) {
            console.info(`send proccess: ${count}`);
        },
    });
}

function getPlaylist(path) {
    let accumulate = '';
    let finished = false;
    let idx = 0;
    while (!finished) {
        file.readText({
            uri: path,
            length: 4000,
            position: 4000 * idx,
            success: (x) => {
                idx++;
                accumulate = accumulate + x.text;
                if (x.text.length < 4000) {
                    finished = true;
                }
            },
            fail: (data, err) => {
                return accumulate;
            },
        })

    }
    return accumulate;
}

function unregisterMessageReceiver() {
    p2pClient.unregisterReceiver({
        onSuccess: function () {
            console.info('Stop receiving messages is sent')
        },
    });
}

export {
    registerMessageReceiver,
    setFingerprint,
    unregisterMessage,
    sendMusicAction,
    getPlaylist,
    unregisterMessageReceiver
}