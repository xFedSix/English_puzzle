import { addWorldCards } from './addWorldCards';

import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';

export class GamePageElements {
    wrapper: HTMLElement;

    resultBlock: HTMLElement;

    sourceBlock: HTMLElement;

    lineNumberBlock: HTMLElement;

    nextButton: HTMLElement;

    checkButton: HTMLElement;

    div: HTMLDivElement;

    autoButton: HTMLElement;

    json: typeof jsonData;

    constructor(json: typeof jsonData) {
        this.wrapper = document.createElement('div');
        this.div = document.createElement('div');
        this.resultBlock = document.createElement('section');
        this.sourceBlock = document.createElement('section');
        this.lineNumberBlock = document.createElement('section');
        this.nextButton = document.createElement('button');
        this.checkButton = document.createElement('button');
        this.autoButton = document.createElement('button');
        this.json = json;
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.wrapper);
        this.wrapper.id = 'game-page__wrapper';
        this.wrapper.appendChild(this.lineNumberBlock);
        this.lineNumberBlock.id = 'line-number-block';
        this.wrapper.appendChild(this.resultBlock);
        this.resultBlock.id = 'result-block';
        this.wrapper.appendChild(this.sourceBlock);
        this.sourceBlock.id = 'source-block';
        this.wrapper.appendChild(this.nextButton);
        this.nextButton.id = 'next-btn';
        this.wrapper.appendChild(this.checkButton);
        this.checkButton.id = 'check-btn';
        this.wrapper.appendChild(this.autoButton);
        this.autoButton.id = 'auto-complete-btn';

        let total = 0;
        for (let i = 0; i < this.json.rounds.length; i += 1) {
            total = this.json.rounds[i].words.length;
        }
        for (let i = 1; i <= total; i += 1) {
            const newRowDiv = this.div.cloneNode(true) as HTMLElement;
            newRowDiv.style.gridRow = `${i}`;
            newRowDiv.classList.add('sourceRow');
            newRowDiv.id = `row${i}`;
            this.resultBlock.appendChild(newRowDiv);
        }

        const gridTemplateRows = `repeat(${total}, auto)`;
        this.resultBlock.style.display = 'grid';
        this.resultBlock.style.gridTemplateRows = gridTemplateRows;
        setTimeout(() => {
            const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const height = this.sourceBlock.scrollHeight / baseFontSize;
            this.resultBlock.style.minHeight = `${height * total}rem`;
        }, 0);

        this.lineNumberBlock.style.display = 'grid';
        for (let i = 1; i <= total; i += 1) {
            const lineNumber = document.createElement('div');
            lineNumber.textContent = i.toString();
            this.lineNumberBlock.appendChild(lineNumber);
        }

        addWorldCards();
    }
}
