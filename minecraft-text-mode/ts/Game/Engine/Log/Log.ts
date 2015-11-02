class Logger {
    isDebug: boolean;

    Logger() {
        this.isDebug = false;
    }

    log(msg) {
        if (this.isDebug) {
            console.log(msg);
        }
    }

    info(msg) {
        //TODO: 
        var info = game.Lang.trans(msg);
        var t: any = game.Screen.getScreen('InfoBar');
        t.addInfo(info);

        console.log(info);
    }
}