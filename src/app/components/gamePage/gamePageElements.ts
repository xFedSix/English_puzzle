import { addWorldCards } from './addWorldCards';

import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';

export class GamePageElements {
    wrapper: HTMLElement;

    resultBlock: HTMLElement;

    sourceBlock: HTMLElement;

    lineNumberBlock: HTMLElement;

    json: typeof jsonData;

    constructor(json: typeof jsonData) {
        this.wrapper = document.createElement('div');
        this.resultBlock = document.createElement('section');
        this.sourceBlock = document.createElement('section');
        this.lineNumberBlock = document.createElement('section');
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

        let total = 0;
        for (let i = 0; i < this.json.rounds.length; i += 1) {
            total = this.json.rounds[i].words.length;
        }
        let totalWords = 0;
        const wordsInTextExample = this.json.rounds[0].words[0].textExample.split(' ').length;
        totalWords = wordsInTextExample;

        const gridTemplateRows = Array(total).fill('auto').join(' ');
        const gridTemplateColumns = Array(totalWords).fill('auto').join(' ');
        this.resultBlock.style.display = 'grid';
        this.resultBlock.style.gridTemplateRows = gridTemplateRows;
        this.resultBlock.style.gridTemplateColumns = gridTemplateColumns;
        setTimeout(() => {
            const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const height = this.sourceBlock.scrollHeight / baseFontSize;
            this.resultBlock.style.minHeight = `${height * total}rem`;
            this.resultBlock.style.gridTemplateRows = `${height}rem`;
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
