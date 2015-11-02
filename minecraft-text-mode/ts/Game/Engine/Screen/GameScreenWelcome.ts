class GameScreenWelcome extends GameScreen {
    container: JQuery;

    init() {
        this.container = $('#screen-welcome');
        this.screenID = 'Welcome';
        return this.screenID;
    }

    show() {
        this.container.css('z-index', 1);
    }

    hide() {
        this.container.css('z-index', 0);
    }
}