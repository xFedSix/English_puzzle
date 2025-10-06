import { getIndex, getRound, getRowNumber } from './get&set';
import { enableContinueButton } from './nextBtnHandler';
import { toggleButtonClasses } from './toggleBtnClasses';
import { initElements } from '../constants';
import { readWorldCollection } from './worldCollectionReader';

let clickHandler: () => void;

export function autoCompleteBtn(fileName: string) {
    const { sourceBlock, resultBlock, checkButton, autoCompleteButton, continueButton } = initElements();

    let wordElements: HTMLElement[] = [];
    let targetWords: string[] = [];

    // Получаем актуальные данные для текущего уровня/раунда
    readWorldCollection(fileName).then((jsonData) => {
        const targetSentence = jsonData.rounds[getRound()].words[getIndex()].textExample.trim();
        targetWords = targetSentence.split(' ');
        targetWords.forEach((word) => {
            const wordElement = document.createElement('div');
            wordElement.textContent = word;
            wordElements.push(wordElement);
        });
    });

    clickHandler = () => {
        autoCompleteButton.disabled = true;
        const gridRow = document.querySelector(`#row${getRowNumber()}`);
        continueButton.disabled = false;
        toggleButtonClasses(continueButton, 'visible', 'hidden');
        toggleButtonClasses(checkButton, 'hidden', 'visible');
        if (gridRow && sourceBlock) {
            // Удалить все слова из текущей строки
            const rowWords = gridRow.querySelectorAll('.word-card');
            rowWords.forEach((word) => {
                word.remove();
            });
            // Удалить все слова из sourceBlock
            const sourceWords = sourceBlock.querySelectorAll('.word-card');
            sourceWords.forEach((word) => {
                word.remove();
            });
            // Вставить только нужные слова в текущую строку
            wordElements.forEach((wordElement) => {
                const wordDiv = document.createElement('div');
                wordDiv.textContent = wordElement.textContent;
                wordDiv.classList.add('word-card');
                gridRow.appendChild(wordDiv);
            });
            wordElements = [];
        }

        enableContinueButton(resultBlock);
    };
    autoCompleteButton.addEventListener('click', clickHandler);
}
