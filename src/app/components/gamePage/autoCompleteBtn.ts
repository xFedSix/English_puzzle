import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { getIndex, getRowNumber } from './get&set';
import { enableContinueButton } from './nextBtnHandler';
import { toggleButtonClasses } from './toggleBtnClasses';

let clickHandler: () => void;

export function autoCompleteBtn() {
    const autoComplete = document.getElementById('auto-complete-btn') as HTMLButtonElement;
    const sourceBlock = document.getElementById('source-block') as HTMLDivElement;
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;
    const resultBlock = document.getElementById('result-block') as HTMLDivElement;

    let wordElements: HTMLElement[] = [];
    const targetSentence = jsonData.rounds[0].words[getIndex()].textExample.trim();
    const targetWords = targetSentence.split(' ');
    targetWords.forEach((word) => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElements.push(wordElement);
    });

    clickHandler = () => {
        autoComplete.disabled = true;
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
    autoComplete.addEventListener('click', clickHandler);
}
