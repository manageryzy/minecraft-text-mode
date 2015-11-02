class Game {
    Log: Logger;
    Loader: ResLoader;
    Lang: Language;
    Screen: ScreenControler;

    constructor() {
        this.Log = new Logger();
        this.Log.isDebug = true;

        this.Loader = new ResLoader();
        this.Lang = new Language();

        this.Screen = new ScreenControler();
    }

    init() {
        this.Lang.init();
        this.Screen.init();
    }
}