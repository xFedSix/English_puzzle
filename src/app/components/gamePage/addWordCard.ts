import { verifySentence } from './verifySentence';
import { enableContinueButton } from './nextBtnHandler';

export function addWordCard(word: string, sourceBlock: HTMLElement, resultBlock: HTMLElement) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.textContent = word;
    const row1 = resultBlock.querySelector('#row1');
    const clickListener = () => {
        wordCard.classList.add('moving');
        setTimeout(() => {
            wordCard.classList.remove('moving');
        }, 500);
        if (wordCard.parentElement === sourceBlock) {
            sourceBlock.removeChild(wordCard);
            if (row1) {
                row1.appendChild(wordCard);
            }
        } else {
            if (row1) {
                row1.removeChild(wordCard);
            }
            sourceBlock.appendChild(wordCard);
        }
        if (verifySentence()) {
            enableContinueButton();
        }
    };

    wordCard.addEventListener('click', clickListener);
    sourceBlock.appendChild(wordCard);
    return clickListener;
}

export function removeClickListener(element: HTMLElement, clickListener: () => void) {
    element.removeEventListener('click', clickListener);
}
