class GameScreenInfoBar extends GameScreen{
    container: JQuery;
    info: JQuery;
    isShow: boolean;

    init() {
        this.container = $('#screen-info');
        this.info = $('#screen-info-scroll');
        this.screenID = 'InfoBar';
        this.isShow = true;

        $('#screen-info-tag').click(function () {
            if (game.Screen.isLock('InfoBar')) {
                return;
            }

            var s: any = game.Screen.getScreen('InfoBar');
            if (s.isShow) {
                s.hide();
            } else {
                s.show();
            }

        });
        return this.screenID;
    }

    show() {
        this.container.animate({ left: '0' }, 'fast', 'swing');
        this.isShow = true;
    }

    hide() {
        this.container.animate({ left: '-300px' }, 'fast', 'swing');
        this.isShow = false;
    }

    addInfo(info: string) {
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
    }

    onLock() {
        $('#screen-info-tag').css('cursor', 'not-allowed');
    }

    onUnlock() {
        $('#screen-info-tag').css('cursor', 'pointer');
    }
}