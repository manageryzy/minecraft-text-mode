class MusicEngine {
    isAllRegistered: boolean;
    loadingCount: number;
    musicList: Array<HTMLAudioElement>;
    idList: Array<string>;

    current: HTMLAudioElement;
    isPlaying: boolean;

    constructor() {
        this.isAllRegistered = false;
        this.loadingCount = 0;
        this.musicList = new Array<HTMLAudioElement>();
        this.idList = new Array<string>();
        this.isPlaying = false;
        this.current = null;
    }

    init() {
        game.Loader.loadRes('./assets/list/music.html', (res) => {
            $('body').append(res);
            game.Loader.loadRes('./assets/list/music.js', (res) => {
                try {
                    eval(res);
                } catch (ex) {
                    console.error(ex);
                    game.Music.onerror();
                }
                
            }, () => {
                game.Music.onerror();
            });
        }, () => {
            game.Music.onerror();
        });
    }

    regMusic(id: string) {
        if ($(id).length != 1) {
            game.Log.log('Error loading music:' + id);
            return;
        }

        var t: any = $(id)[0];
        var e: HTMLAudioElement = t;
        this.musicList[id] = e;
        this.idList.push(id);
        

        if (e.readyState <= 3) {
            this.loadingCount++;

            e.oncanplaythrough = () => {
                game.Music.loadingCount--;

                if (game.Music.loadingCount == 0 && game.Music.isAllRegistered) {
                    game.Music.onAllLoadFinish();
                }
            };
        }
        

        e.onended = () => {
            game.Music.randomPlay();
        }

    }

    onerror() {
        game.Loader.initError = true;
        game.Log.info('{{Music load Error,please refresh page to try again!}}');
        console.error();
    }

    randomPlay() {
        if (!this.isPlaying) {
            return;
        }
        var id = this.idList[Math.floor(Math.random() * 1000 % this.idList.length)];
        var e = this.musicList[id];
        e.play();
        game.Log.log('Playing music : ' + id);
        this.current = e;
    }

    play() {
        if (this.isPlaying) {
            return;
        }

        this.isPlaying = true;
        this.randomPlay();
        game.Log.info('{{Music Start}}');
    }

    stop() {
        if (!this.isPlaying) {
            return;
        }

        this.isPlaying = false;
        this.current.pause();
        game.Log.info('{{Music Stop}}');
    }

    onAllReg() {
        this.isAllRegistered = true;
        if (this.loadingCount == 0) {
            setTimeout(game.Music.onAllLoadFinish, 1000);
        }
    }

    onAllLoadFinish() {
        game.Loader.onMusicLoadFinish();
        game.Music.play();
    }
}