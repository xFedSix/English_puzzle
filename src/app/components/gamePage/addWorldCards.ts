import { shuffleArray } from './shuffleArray';
import { addWordCard } from './addWordCard';
import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { getIndex } from './nextBntHandler';

export function addWorldCards() {
    const round = jsonData.rounds[0];
    const wordsArray = round.words;
    const { textExample } = wordsArray[getIndex()];
    const words = textExample.split(' ');
    const shuffledWords = shuffleArray(words);
    const sourceBlock = document.getElementById('source-block') as HTMLElement;
    const resultBlock = document.getElementById('result-block') as HTMLElement;
    const nextButton = document.getElementById('next-btn') as HTMLButtonElement;
    const wordCard = document.getElementsByClassName('word-card') as HTMLCollectionOf<HTMLElement>;

    nextButton.textContent = 'Continue';
    nextButton.disabled = true;

    if (sourceBlock && resultBlock) {
        shuffledWords.forEach((word) => {
            addWordCard(word, sourceBlock, resultBlock);
            const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const width = sourceBlock.scrollWidth / baseFontSize;
            const height = sourceBlock.scrollHeight / baseFontSize;

            resultBlock.style.minWidth = `${width}rem`;
            sourceBlock.style.minWidth = `${width}rem`;
            sourceBlock.style.minHeight = `${height}rem`;
            Array.from(wordCard).forEach((elem) => {
                const newElem = { ...elem, style: { ...elem.style } };
                const wordCardWidth = word.length * baseFontSize;
                newElem.style.width = `${wordCardWidth}px`;
            });
        });
    }
}
