//class Greeter {
//    element: HTMLElement;
//    span: HTMLElement;
//    timerToken: number;
//    constructor(element: HTMLElement) {
//        this.element = element;
//        this.element.innerHTML += "The time is: ";
//        this.span = document.createElement('span');
//        this.element.appendChild(this.span);
//        this.span.innerText = new Date().toUTCString();
//    }
//    start() {
//        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
//    }
//    stop() {
//        clearTimeout(this.timerToken);
//    }
//}
var game;
window.onload = function () {
    //check the browser  
    //ie below 11 is not supported
    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }
    if (isIE() && isIE() < 11) {
        // is IE version less than 11
        alert('You are using IE below 11,Please use more MODERN BROWSER!');
    }
    game = new Game();
    game.init();
};
var Language = (function () {
    function Language() {
        this.language = '';
        this.isInit = false;
        this.getCurrentLanguage();
    }
    Language.prototype.saveCurrectLanguage = function () {
        localStorage.setItem('lang', this.language);
    };
    Language.prototype.getCurrentLanguage = function () {
        var lang = localStorage.getItem('lang');
        if (lang) {
            this.language = lang;
        }
        else {
            lang = navigator.language ? navigator.language : "en-US";
            this.language = lang;
        }
        this.saveCurrectLanguage();
    };
    Language.prototype.trans = function (str) {
        if (this.isInit) {
            return this.transFunc(str);
        }
        else {
            game.Log.log('language engine is not ready');
            return str;
        }
    };
    Language.prototype.init = function () {
        game.Loader.loadRes('./assets/js/lang/' + this.language + '.js', function (res) {
            try {
                game.Lang.transFunc = eval(res);
                game.Lang.isInit = true;
                game.Log.info('{{Language Engine Inited}}:' + game.Lang.language);
            }
            catch (e) {
                console.error(e);
            }
        }, function () {
            game.Log.info('{{language engine init failed!}}');
            if (game.Lang.language != 'en-US') {
                game.Log.info('try to use English!');
                game.Lang.language = 'en-US';
                game.Lang.init();
            }
        });
    };
    return Language;
})();
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.Logger = function () {
        this.isDebug = false;
    };
    Logger.prototype.log = function (msg) {
        if (this.isDebug) {
            console.log(msg);
        }
    };
    Logger.prototype.info = function (msg) {
        //TODO: 
        var info = game.Lang.trans(msg);
        var t = game.Screen.getScreen('InfoBar');
        t.addInfo(info);
        console.log(info);
    };
    return Logger;
})();
var ResLoader = (function () {
    function ResLoader() {
        this.resList = new Array();
        this.waitList = new Array();
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
    ResLoader.prototype.init = function () {
        setTimeout(this.checkLoadingFinish, 2000);
    };
    ResLoader.prototype.loadRes = function (url, succeed, error) {
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
            }
            catch (ex) {
                console.error(ex);
            }
        }).fail(function () {
            console.error('failed to get:' + url);
            game.Loader.waitList[url]();
            try {
                delete game.Loader.resList[url];
                delete game.Loader.waitList[url];
            }
            catch (ex) {
                console.error(ex);
            }
        });
    };
    ResLoader.prototype.checkLoadingFinish = function () {
        var timeout = Math.floor(Math.random() * 10000);
        game.Log.info(game.Loader.waitText[timeout % game.Loader.waitText.length]);
        if (!game.Loader.isLoadingFinish()) {
            setTimeout(game.Loader.checkLoadingFinish, timeout);
        }
        else {
            game.Screen.unlockScreen('InfoBar');
            game.Screen.changeScreen('Welcome');
        }
    };
    ResLoader.prototype.isLoadingFinish = function () {
        //TODO : 
        return false;
    };
    return ResLoader;
})();
var GameScreen = (function () {
    function GameScreen() {
    }
    GameScreen.prototype.init = function () {
        this.screenID = '';
        return this.screenID;
    };
    GameScreen.prototype.show = function () {
    };
    GameScreen.prototype.hide = function () {
    };
    GameScreen.prototype.onLock = function () {
    };
    GameScreen.prototype.onUnlock = function () {
    };
    return GameScreen;
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScreenInfoBar = (function (_super) {
    __extends(GameScreenInfoBar, _super);
    function GameScreenInfoBar() {
        _super.apply(this, arguments);
    }
    GameScreenInfoBar.prototype.init = function () {
        this.container = $('#screen-info');
        this.info = $('#screen-info-scroll');
        this.screenID = 'InfoBar';
        this.isShow = true;
        $('#screen-info-tag').click(function () {
            if (game.Screen.isLock('InfoBar')) {
                return;
            }
            var s = game.Screen.getScreen('InfoBar');
            if (s.isShow) {
                s.hide();
            }
            else {
                s.show();
            }
            s.isShow = !s.isShow;
        });
        return this.screenID;
    };
    GameScreenInfoBar.prototype.show = function () {
        this.container.animate({ left: '0' }, 'fast', 'swing');
    };
    GameScreenInfoBar.prototype.hide = function () {
        this.container.animate({ left: '-300px' }, 'fast', 'swing');
    };
    GameScreenInfoBar.prototype.addInfo = function (info) {
        this.info.html(this.info.html() + '<div class="game-info">' + info + '</div>');
        if (this.info.children().length > 50) {
            this.info.children()[0].remove();
        }
        var infoHeight = this.info.height();
        var containerHeight = this.container.height();
        if (infoHeight > containerHeight) {
            this.info.animate({
                top: (containerHeight - infoHeight - 40) + 'px'
            }, 'fast', 'swing');
        }
    };
    GameScreenInfoBar.prototype.onLock = function () {
        $('#screen-info-tag').css('cursor', 'not-allowed');
    };
    GameScreenInfoBar.prototype.onUnlock = function () {
        $('#screen-info-tag').css('cursor', 'pointer');
    };
    return GameScreenInfoBar;
})(GameScreen);
var GameScreenLoading = (function (_super) {
    __extends(GameScreenLoading, _super);
    function GameScreenLoading() {
        _super.apply(this, arguments);
    }
    GameScreenLoading.prototype.init = function () {
        this.container = $('#screen-loading');
        this.screenID = 'Loading';
        return this.screenID;
    };
    GameScreenLoading.prototype.show = function () {
        this.container.css('z-index', 1);
    };
    GameScreenLoading.prototype.hide = function () {
        this.container.css('z-index', 0);
    };
    return GameScreenLoading;
})(GameScreen);
var GameScreenWelcome = (function (_super) {
    __extends(GameScreenWelcome, _super);
    function GameScreenWelcome() {
        _super.apply(this, arguments);
    }
    GameScreenWelcome.prototype.init = function () {
        this.container = $('#screen-welcome');
        this.screenID = 'Welcome';
        return this.screenID;
    };
    GameScreenWelcome.prototype.show = function () {
        this.container.css('z-index', 1);
    };
    GameScreenWelcome.prototype.hide = function () {
        this.container.css('z-index', 0);
    };
    return GameScreenWelcome;
})(GameScreen);
var ScreenControler = (function () {
    function ScreenControler() {
        this.screenList = new Array();
        this.lockList = new Array();
        this.currentScreen = 'Loading';
    }
    ScreenControler.prototype.init = function () {
        var i;
        var j;
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
    };
    ScreenControler.prototype.getScreen = function (name) {
        return this.screenList[name];
    };
    ScreenControler.prototype.isLock = function (name) {
        return this.lockList[name];
    };
    ScreenControler.prototype.lockScreen = function (name) {
        var s = this.getScreen(name);
        if (!s) {
            return false;
        }
        this.lockList[name] = true;
        s.onLock();
        return true;
    };
    ScreenControler.prototype.unlockScreen = function (name) {
        var s = this.getScreen(name);
        if (!s) {
            return false;
        }
        this.lockList[name] = false;
        s.onUnlock();
        return true;
    };
    ScreenControler.prototype.show = function (name) {
        if (!this.lockList[name]) {
            this.getScreen(name).show();
        }
    };
    ScreenControler.prototype.hide = function (name) {
        if (!this.lockList[name]) {
            this.getScreen(name).hide();
        }
    };
    ScreenControler.prototype.changeScreen = function (name) {
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
            }
            else {
                game.Screen.hide(p);
            }
        }
        this.currentScreen = name;
    };
    return ScreenControler;
})();
var Game = (function () {
    function Game() {
        this.Log = new Logger();
        this.Log.isDebug = true;
        this.Loader = new ResLoader();
        this.Lang = new Language();
        this.Screen = new ScreenControler();
    }
    Game.prototype.init = function () {
        this.Lang.init();
        this.Screen.init();
        this.Loader.init();
    };
    return Game;
})();
//# sourceMappingURL=app.js.map