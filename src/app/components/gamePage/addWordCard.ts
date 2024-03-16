import { verifySentence } from './verifySentence';
import { enableContinueButton } from './nextBtnHandler';
import { getRowNumber } from './get&set';

export function addWordCard(word: string, sourceBlock: HTMLElement, resultBlock: HTMLElement) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.textContent = word;

    const row = resultBlock.querySelector(`#row${getRowNumber()}`);

    const clickListener = () => {
        wordCard.classList.add('moving');
        setTimeout(() => {
            wordCard.classList.remove('moving');
        }, 500);
        if (wordCard.parentElement === sourceBlock) {
            sourceBlock.removeChild(wordCard);
            if (row) {
                row.appendChild(wordCard);
            }
        } else {
            if (row) {
                row.removeChild(wordCard);
                wordCard.style.color = 'black';
            }
            sourceBlock.appendChild(wordCard);
        }
        if (verifySentence()) {
            enableContinueButton(resultBlock);
        }
    };

    wordCard.addEventListener('click', clickListener);
    sourceBlock.appendChild(wordCard);
    return clickListener;
}
