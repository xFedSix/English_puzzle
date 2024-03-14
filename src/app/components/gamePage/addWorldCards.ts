import { shuffleArray } from './shuffleArray';
import { addWordCard } from './addWordCard';
// import { nextButtonHandler} from './verifySentence';
import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';

export function addWorldCards() {
    const round = jsonData.rounds[0];
    const wordsArray = round.words;
    const { textExample } = wordsArray[0];
    const words = textExample.split(' ');

    const shuffledWords = shuffleArray(words);
    const sourceBlock = document.getElementById('source-block') as HTMLElement;
    const resultBlock = document.getElementById('result-block') as HTMLElement;
    const nextButton = document.getElementById('next-btn') as HTMLButtonElement;

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
        });
    }
    // nextButtonHandler()
}
