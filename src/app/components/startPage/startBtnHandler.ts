import { GamePageElements } from '../gamePage/gamePageElements';
import { StartPage } from './startPage';

export function startBtnHandler(startButton: HTMLElement, startPage: StartPage, gamePageElements: GamePageElements) {
    startButton.addEventListener('click', () => {
        startPage.remove();
        gamePageElements.render(document.body);
    });
}
