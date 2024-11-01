import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { createElements } from './createElements';
import { renderElements } from './renderElements';

export class GamePageElements {
    div: HTMLDivElement;

    wrapper: HTMLElement;

    gameLevel: HTMLElement;

    hintsWrapper: HTMLElement;

    gameHintTranslate: HTMLElement;

    gameHintSound: HTMLElement;

    resultBlock: HTMLElement;

    sourceBlock: HTMLElement;

    lineNumberBlock: HTMLElement;

    checkButton: HTMLElement;

    autoCompleteButton: HTMLElement;

    nextButton: HTMLElement;

    link: HTMLElement;

    ul: HTMLElement;

    li: HTMLElement;

    json: typeof jsonData;

    constructor(json: typeof jsonData) {
        const elements = createElements();
        this.div = elements.div;
        this.wrapper = elements.wrapper;
        this.gameLevel = elements.gameLevel;
        this.gameHintTranslate = elements.gameHintTranslate;
        this.gameHintSound = elements.gameHintSound;
        this.hintsWrapper = elements.hintsWrapper;
        this.resultBlock = elements.resultBlock;
        this.sourceBlock = elements.sourceBlock;
        this.lineNumberBlock = elements.lineNumberBlock;
        this.nextButton = elements.nextButton;
        this.checkButton = elements.checkButton;
        this.autoCompleteButton = elements.autoCompleteButton;
        this.link = elements.link;
        this.ul = elements.ul;
        this.li = elements.li;
        this.json = json;
    }

    render(parent: HTMLElement) {
        renderElements(this, parent);
    }
}
