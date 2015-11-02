declare var JQueryXHR;

class ResLoader {
    resList: Array<Function>;
    waitList: Array<Function>;

    constructor() {
        this.resList = new Array<Function>();
        this.waitList = new Array<Function>();
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
        }).fail(function () {
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
}
