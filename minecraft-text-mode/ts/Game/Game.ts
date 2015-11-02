class Game {
    Log: Logger;
    Loader: ResLoader;
    Lang: Language;
    Screen: ScreenControler;
    Music: MusicEngine;
    Sound: SoundEngine;

    constructor() {
        this.Log = new Logger();
        this.Log.isDebug = true;

        this.Loader = new ResLoader();
        this.Lang = new Language();

        this.Screen = new ScreenControler();

        this.Music = new MusicEngine();
        this.Sound = new SoundEngine();
    }

    init() {
        this.Lang.init();
        this.Screen.init();
        this.Loader.init();

        this.Music.init();
        this.Sound.init();
    }
}