import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { getIndex, getRowNumber } from './get&set';
import { enableContinueButton } from './nextBtnHandler';
import { toggleButtonClasses } from './toggleBtnClasses';
import { initElements } from '../constants';

let clickHandler: () => void;

export function autoCompleteBtn() {
    const { sourceBlock, resultBlock, checkButton, autoCompleteButton, continueButton } = initElements();

    let wordElements: HTMLElement[] = [];
    const targetSentence = jsonData.rounds[0].words[getIndex()].textExample.trim();
    const targetWords = targetSentence.split(' ');
    targetWords.forEach((word) => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElements.push(wordElement);
    });

    clickHandler = () => {
        autoCompleteButton.disabled = true;
        const gridRow = document.querySelector(`#row${getRowNumber()}`);
        continueButton.disabled = false;
        toggleButtonClasses(continueButton, 'visible', 'hidden');
        toggleButtonClasses(checkButton, 'hidden', 'visible');
        if (gridRow && sourceBlock) {
            const rowWords = gridRow.querySelectorAll('.word-card');
            rowWords.forEach((word) => {
                word.classList.add('fade-out');
                setTimeout(() => {
                    word.remove();
                }, 1000);
            });
            const sourceWords = sourceBlock.querySelectorAll('.word-card');
            sourceWords.forEach((word) => {
                word.classList.add('fade-out');
                setTimeout(() => {
                    word.remove();
                }, 1000);
            });
            setTimeout(() => {
                wordElements.forEach((wordElement) => {
                    gridRow.appendChild(wordElement);
                    wordElement.classList.add('word-card');
                });
                wordElements = [];
            }, 1000);
        }

        enableContinueButton(resultBlock);
    };
    autoCompleteButton.addEventListener('click', clickHandler);
}
