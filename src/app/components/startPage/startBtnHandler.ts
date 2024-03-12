import { GamePage } from '../gamePage/gamePage';
import { StartPage } from './startPage';

export function startBtnHandler(startButton: HTMLElement, startPage: StartPage, gamePage: GamePage) {
    startButton.addEventListener('click', () => {
        startPage.remove();
        gamePage.render(document.body);
    });
}
