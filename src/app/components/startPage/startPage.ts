import { LogoutButton } from './logoutBtn';
import { StartPageElements } from './createStartPageElements';
import { getPersonalizedGreeting } from './userGreeting';
import { startBtnHandler } from './startBtnHandler';
import { GamePageElements } from '../gamePage/gamePageElements';

export class StartPage {
    wrapper: HTMLElement;

    header: HTMLElement;

    h1: HTMLElement;

    p: HTMLElement;

    startButton: HTMLElement;

    LogoutButton: LogoutButton | undefined;

    gamePage: GamePageElements;

    constructor() {
        this.wrapper = document.createElement('div');
        this.header = document.createElement('header');
        this.h1 = document.createElement('h1');
        this.p = document.createElement('p');
        this.startButton = document.createElement('button');
        this.gamePage = new GamePageElements();
    }

    addLogoutButton() {
        this.LogoutButton = new LogoutButton(this.header, this);
        this.LogoutButton.appendToParent();
    }

    render(parent: HTMLElement) {
        this.wrapper = StartPageElements.createWrapper(parent);
        this.wrapper.className = 'wrapper';
        this.header = StartPageElements.createHeader(this.wrapper);
        const contentWrapper = StartPageElements.createWrapper(this.wrapper);
        contentWrapper.className = 'content';

        this.h1 = StartPageElements.createH1(contentWrapper, 'ENGLISH PUZZLE GAME');
        this.h1.id = 'game-title';
        this.p = StartPageElements.createP(
            contentWrapper,
            'Playing the game you will learn English, as well as find out who painted famous paintings and when.<br>Click on words.<br>Words can be drag and drops.<br><span>Click on the button below to begin.</span>'
        );
        this.startButton = StartPageElements.createButton(contentWrapper, 'Start');
        startBtnHandler(this.startButton, this, this.gamePage);
        getPersonalizedGreeting();
        this.addLogoutButton();
    }

    remove() {
        if (this.wrapper.parentNode !== null) {
            this.wrapper.parentNode.removeChild(this.wrapper);
        }
    }
}
