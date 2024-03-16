import { getIndex, getRowNumber } from './get&set';
import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';

let clickHandler: () => void;

export function enableCheckButton() {
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;
    checkButton.disabled = false;
    clickHandler = () => {
        const targetSentence = jsonData.rounds[0].words[getIndex()].textExample.trim().toLowerCase();
        const targetWords = targetSentence.split(' ');

        const row = document.querySelector(`#row${getRowNumber()}`);
        if (row) {
            Array.from(row.children).forEach((child, index) => {
                if (index < targetWords.length) {
                    const wordCard = child as HTMLElement;
                    if (wordCard.textContent) {
                        const word = wordCard.textContent.toLocaleLowerCase().trim();
                        if (word === targetWords[index]) {
                            wordCard.style.color = 'green';
                        } else {
                            wordCard.style.color = 'red';
                        }
                    }
                }
            });
        }
    };
    checkButton.addEventListener('click', clickHandler);
}
