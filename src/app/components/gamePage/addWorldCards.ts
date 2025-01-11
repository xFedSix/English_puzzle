import { shuffleArray } from './shuffleArray';
import { addWordCard } from './addWordCard';
import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { getIndex, getRound } from './get&set';
import { autoCompleteBtn } from './autoCompleteBtn';
import { initElements } from '../constants';

interface Word {
    textExample: string;
}
let wordsArray: Word[] = [];
const round = jsonData.rounds[getRound()];
export function addWorldCards() {
    const { sourceBlock, resultBlock, nextButton, checkButton, autoCompleteButton } = initElements();
    wordsArray = round.words;
    const { textExample } = wordsArray[getIndex()];
    const words = textExample.split(' ');
    const shuffledWords = shuffleArray(words);
    nextButton.textContent = 'Continue';
    nextButton.classList.add('hidden');
    nextButton.disabled = true;
    checkButton.textContent = 'Check';
    checkButton.classList.add('visible');
    checkButton.disabled = true;
    autoCompleteButton.textContent = 'Auto Complete';

    if (sourceBlock && resultBlock) {
        shuffledWords.forEach((word) => {
            const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const height = sourceBlock.scrollHeight / baseFontSize;
            sourceBlock.style.minHeight = `${height}rem`;
            addWordCard(word, sourceBlock, resultBlock);
        });
    }
    autoCompleteBtn();
}
export function getWordsArray(): Word[] {
    return wordsArray;
}
const importAll = (r: __WebpackModuleApi.RequireContext): { [key: string]: string } => {
    const images: { [key: string]: string } = {};
    r.keys().forEach((item: string) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
};

const images = importAll(require.context('../../../images/', true, /\.(png|jpe?g|svg)$/));

export function getBackgroundSrc(): string {
    const { imageSrc } = round.levelData;
    if (!images[imageSrc]) {
        throw new Error(`Image not found: ${imageSrc}`);
    }
    return images[imageSrc];
}
