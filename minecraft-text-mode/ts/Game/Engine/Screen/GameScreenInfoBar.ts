class GameScreenInfoBar extends GameScreen{
    container: JQuery;
    info: JQuery;

    init() {
        this.container = $('#screen-info');
        this.info = $('#screen-info-scroll');
        this.screenID = 'InfoBar';
        return this.screenID;
    }

    show() {
        this.container.animate({left:'0'},'fast','swing');
    }

    hide() {
        this.container.animate({ left: '-300px' }, 'fast', 'swing');
    }

    addInfo(info: string) {
        this.info.html(this.info.html() + '<div>' + info + '</div>');
        if (this.info.children().length > 99) {
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
}