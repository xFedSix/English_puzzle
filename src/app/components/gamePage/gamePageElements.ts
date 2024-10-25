import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { createElements } from './createElements';
import { renderElements } from './renderElements';

export class GamePageElements {
    div: HTMLDivElement;

    wrapper: HTMLElement;

    resultBlock: HTMLElement;

    sourceBlock: HTMLElement;

    lineNumberBlock: HTMLElement;

    checkButton: HTMLElement;

    autoCompleteButton: HTMLElement;

    nextButton: HTMLElement;

    json: typeof jsonData;

    constructor(json: typeof jsonData) {
        const elements = createElements();
        this.div = elements.div;
        this.wrapper = elements.wrapper;
        this.resultBlock = elements.resultBlock;
        this.sourceBlock = elements.sourceBlock;
        this.lineNumberBlock = elements.lineNumberBlock;
        this.nextButton = elements.nextButton;
        this.checkButton = elements.checkButton;
        this.autoCompleteButton = elements.autoCompleteButton;
        this.json = json;
    }

    render(parent: HTMLElement) {
        renderElements(this, parent);
    }
}
