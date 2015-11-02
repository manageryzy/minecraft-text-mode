class GameScreenInfoBar extends GameScreen{
    container: JQuery;

    init() {
        this.container = $('#screen-info');
        this.screenID = 'InfoBar';
        return this.screenID;
    }

    show() {
        this.container.animate({left:'0'},'fast','swing');
    }

    hide() {
        this.container.animate({ left: '-300px' }, 'fast', 'swing');
    }
}