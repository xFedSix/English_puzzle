import { addWorldCards } from './addWorldCards';

export class GamePageElements {
    wrapper: HTMLElement;

    resultBlock: HTMLElement;

    sourceBlock: HTMLElement;

    constructor() {
        this.wrapper = document.createElement('div');
        this.resultBlock = document.createElement('section');
        this.sourceBlock = document.createElement('section');
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.wrapper);
        this.wrapper.id = 'game-page__wrapper';
        this.wrapper.appendChild(this.resultBlock);
        this.resultBlock.id = 'result-block';
        this.wrapper.appendChild(this.sourceBlock);
        this.sourceBlock.id = 'source-block';
        addWorldCards();
    }
}
