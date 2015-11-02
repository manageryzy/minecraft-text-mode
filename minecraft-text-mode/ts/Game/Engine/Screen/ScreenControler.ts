class ScreenControler {
    screenList: Array<GameScreen>;
    lockList: Array<boolean>;

    currentScreen: string;

    constructor() {
        this.screenList = new Array<GameScreen>();
        this.lockList = new Array<boolean>();
        this.currentScreen = 'Loading';
    }

    init() {
        var i: GameScreen;
        var j: string;

        i = new GameScreenInfoBar();
        j = i.init();
        this.screenList[j] = i;
        this.lockList[j] = true;

        i = new GameScreenLoading();
        j = i.init();
        this.screenList[j] = i;
        this.lockList[j] = false;

        i = new GameScreenWelcome();
        j = i.init();
        this.screenList[j] = i;
        this.lockList[j] = false;
    }

    getScreen(name: string): GameScreen {
        return this.screenList[name] 
    }

    isLock(name: string) {
        return this.lockList[name];
    }

    lockScreen(name: string): boolean {
        var s = this.getScreen(name);
        if (!s) {
            return false;
        }

        this.lockList[name] = true;
        s.onLock();

        return true;  
    }

    unlockScreen(name: string): boolean {
        var s = this.getScreen(name);
        if (!s) {
            return false;
        }

        this.lockList[name] = false;
        s.onUnlock();

        return true;
    }

    show(name: string) {
        if (!this.lockList[name]) {
            this.getScreen(name).show();
        }
    }

    hide(name: string) {
        if (!this.lockList[name]) {
            this.getScreen(name).hide();
        }
    }

    changeScreen(name: string) {
        if (this.currentScreen == name) {
            return;
        }

        if (this.getScreen(name) == null) {
            game.Log.log('Error in changing screen ,screen not found! :' + name);
            return;
        }

        this.unlockScreen(this.currentScreen);
        this.unlockScreen(name);


        for (var p in this.screenList) {
            if (p == name) {
                game.Screen.show(p);
            } else {
                game.Screen.hide(p);
            }
        }

        this.currentScreen = name;
    }
}