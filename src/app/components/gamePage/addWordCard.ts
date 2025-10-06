import { initElements } from '../constants';
import { verifySentence } from './verifySentence';
import { enableContinueButton } from './nextBtnHandler';
import { getRowNumber } from './get&set';

function enableCheckButton() {
    const { checkButton, resultBlock } = initElements();
    const currentRow = resultBlock.querySelector(`#row${getRowNumber()}`);
    if (currentRow && currentRow.children.length > 0) {
        checkButton.disabled = false;
    } else {
        checkButton.disabled = true;
    }
}

export function addWordCard(word: string, sourceBlock: HTMLElement, resultBlock: HTMLElement, fileName: string) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.textContent = word;

    const clickListener = async () => {
        const currentRow = resultBlock.querySelector(`#row${getRowNumber()}`);
        wordCard.classList.add('moving');
        setTimeout(() => {
            wordCard.classList.remove('moving');
        }, 500);
        if (wordCard.parentElement === sourceBlock) {
            sourceBlock.removeChild(wordCard);
            if (currentRow) {
                currentRow.appendChild(wordCard);
            }
        } else {
            if (currentRow) {
                currentRow.removeChild(wordCard);
                wordCard.style.color = 'black';
            }
            sourceBlock.appendChild(wordCard);
        }
        enableCheckButton();
        if (await verifySentence(fileName)) {
            enableContinueButton(resultBlock);
        }
    };

    wordCard.addEventListener('click', clickListener);
    sourceBlock.appendChild(wordCard);
    return clickListener;
}
