class Language {
    language: string;
    isInit: boolean;
    transFunc: Function;

    saveCurrectLanguage() {
        localStorage.setItem('lang', this.language);
    }

    getCurrentLanguage() {
        var lang = localStorage.getItem('lang');
        if (lang) {
            this.language = lang;
        } else {
            lang = navigator.language ? navigator.language : "en-US";
            this.language = lang;
        }

        this.saveCurrectLanguage();
    }

    trans(str: string): string {
        if (this.isInit) {
            return this.transFunc(str);
        } else {
            game.Log.log('language engine is not ready');
            return str;
        }
    }

    init() {
        game.Loader.loadRes('./assets/js/lang/' + this.language + '.js',
            function (res) {
                try {
                    game.Lang.transFunc = eval(res);
                    game.Lang.isInit = true;
                    game.Log.info('{{Language Engine Inited}}:' + game.Lang.language);
                } catch (e) {
                    console.error(e);
                }
                
            },
            function () {
                game.Log.info('{{language engine init failed!}}');
                if (game.Lang.language != 'en-US') {
                    game.Log.info('try to use English!');
                    game.Lang.language = 'en-US';
                    game.Lang.init();
                }
            });
    }

    constructor() {
        this.language = '';
        this.isInit = false;
        this.getCurrentLanguage();
    }
}