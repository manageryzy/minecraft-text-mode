﻿declare var JQueryXHR;

class ResLoader {    

    resList: Array<Function>;
    waitList: Array<Function>;

    waitText: Array<String>;
    initError: boolean;

    isSoundLoad: boolean;
    isMusicLoad: boolean;

    constructor() {
        this.resList = new Array<Function>();
        this.waitList = new Array<Function>();
        this.initError = false;

        this.isSoundLoad = false;
        this.isMusicLoad = false;

        this.waitText = [
            '{{Adding fuel to the engine}}',
            '{{Preparing to time leap}}',
            '{{Calculating targe position}}',
            '{{Engine overheating}}',
            '{{Preparing brain-computer interface}}',
            '{{Connecting to the Matrix}}',
            '{{Found the black monolith}}',
            '{{Found the answer to life the universe and everything}}',
            '42',
            '{{Secure,Contain,Protect}}',
            '{{Preparing to dementional hitting}}',
            '{{Rendering Items}}',
            '{{Rendering Blocks}}',
            '{{Rendering Enities}}',
        ];
    }

    init() {
        setTimeout(this.checkLoadingFinish, 2000);
    }

    loadRes(url: string, succeed: Function, error?: Function) {
        if (!error) {
            error = null;
        }
        this.waitList[url] = error;
        this.resList[url] = succeed;

        game.Log.log('getting res :' + url);

        $.get(url, function (res) {
            //send to callback
            game.Log.log('got res :' + url);
            game.Loader.resList[url](res);

            try {
                delete game.Loader.resList[url];
                delete game.Loader.waitList[url];
            } catch (ex) {
                console.error(ex);
            }
        }, () => { },'text').fail(function (e) {
            console.error(e);
            console.error('failed to get:' + url);
            game.Loader.waitList[url]();
            try {
                delete game.Loader.resList[url];
                delete game.Loader.waitList[url];
            } catch (ex) {
                console.error(ex);
            }
        });
    }

    checkLoadingFinish() {
        if (game.Loader.initError) {
            return;
        }

        var timeout = Math.floor(Math.random() * 10000);

        game.Log.info(game.Loader.waitText[timeout % game.Loader.waitText.length]);

        if (!game.Loader.isLoadingFinish()) {
            setTimeout(game.Loader.checkLoadingFinish, timeout);
        } else {
            game.Screen.unlockScreen('InfoBar');
            game.Screen.changeScreen('Welcome');
            game.Log.clear();
            game.Log.info('{{Resource has been loaded successfully}}');
        }
    }

    isLoadingFinish(): boolean {
        return this.isMusicLoad && this.isSoundLoad;
    }

    onSoundLoadFinish() {
        this.isSoundLoad = true;
    }

    onMusicLoadFinish() {
        this.isMusicLoad = true;
    }
}
