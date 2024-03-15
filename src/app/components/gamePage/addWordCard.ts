import { verifySentence } from './verifySentence';
import { enableContinueButton } from './nextBntHandler';

export function addWordCard(word: string, sourceBlock: HTMLElement, resultBlock: HTMLElement) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.textContent = word;
    // const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    // const width = sourceBlock.scrollWidth / baseFontSize;
    // console.log(sourceBlock.scrollWidth);
    // console.log(width);

    // wordCard.style.width = `${width}rem`;
    const clickListener = () => {
        wordCard.classList.add('moving');
        setTimeout(() => {
            wordCard.classList.remove('moving');
        }, 500);
        if (wordCard.parentElement === sourceBlock) {
            sourceBlock.removeChild(wordCard);
            resultBlock.appendChild(wordCard);
        } else {
            resultBlock.removeChild(wordCard);
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
