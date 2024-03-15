import { shuffleArray } from './shuffleArray';
import { addWordCard } from './addWordCard';
import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { getIndex } from './nextBtnHandler';

export function addWorldCards() {
    const round = jsonData.rounds[0];
    const wordsArray = round.words;
    const { textExample } = wordsArray[getIndex()];
    const words = textExample.split(' ');
    const shuffledWords = shuffleArray(words);
    const sourceBlock = document.getElementById('source-block') as HTMLElement;
    const resultBlock = document.getElementById('result-block') as HTMLElement;
    const nextButton = document.getElementById('next-btn') as HTMLButtonElement;
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;

    nextButton.textContent = 'Continue';
    nextButton.disabled = true;
    checkButton.textContent = 'Check';
    checkButton.disabled = true;

    if (sourceBlock && resultBlock) {
        shuffledWords.forEach((word) => {
            const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const height = sourceBlock.scrollHeight / baseFontSize;
            sourceBlock.style.minHeight = `${height}rem`;
            addWordCard(word, sourceBlock, resultBlock);
        });
    }
}
