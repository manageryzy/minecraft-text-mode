class GameScreenLoading extends GameScreen {
    container: JQuery;

    init() {
        this.container = $('#screen-loading');
        this.screenID = 'Loading';
        return this.screenID;
    }

    show() {
        this.container.css('z-index', 1);
    }

    hide() {
        this.container.css('z-index', 0);
    }
}