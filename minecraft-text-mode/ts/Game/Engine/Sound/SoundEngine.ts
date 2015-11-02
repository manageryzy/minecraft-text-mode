class SoundEngine {
    isAllRegistered: boolean;
    loadingCount: number;
    soundList: Array<HTMLAudioElement>;
    idList: Array<string>;

    constructor() {
        this.isAllRegistered = false;
        this.soundList = new Array<HTMLAudioElement>();
        this.idList = new Array<string>();
        this.loadingCount = 0;
    }

    init() {
        game.Loader.loadRes('./assets/list/sound.html', (res) => {
            $('body').append(res);
            game.Loader.loadRes('./assets/list/sound.js', (res) => {
                try {
                    eval(res);
                } catch (ex) {
                    console.error(ex);
                    game.Sound.onerror();
                }

            }, () => {
                game.Sound.onerror();
            });
        }, () => {
            game.Sound.onerror();
        });
    }

    regSound(id: string) {
        if ($(id).length != 1) {
            game.Log.log('Error loading sound:' + id);
            return;
        }

        var e = $(id)[0];
        this.soundList[id] = e;

        e.oncanplaythrough = () => {

        };
    }

    onAllReg() {
        this.isAllRegistered = true;
        if (this.loadingCount == 0) {
            setTimeout(game.Sound.onAllLoadFinish, 1000);
        }
    }

    onAllLoadFinish() {
        game.Loader.onSoundLoadFinish();
    }

    onerror() {
        game.Loader.initError = true;
        game.Log.info('{{Sound load Error,please refresh page to try again!}}');
        console.error();
    }

    play(id: string) {
        var e: HTMLAudioElement = this.soundList['#'+id];

        if (e == null) {
            return false
        }

        e.play();
        return true;
    }
}