import { shuffleArray } from './shuffleArray';
import { addWordCard } from './addWordCard';
import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { getIndex, getRound } from './get&set';
import { autoCompleteBtn } from './autoCompleteBtn';
import { initElements } from '../constants';

export function addWorldCards() {
    const { sourceBlock, resultBlock, nextButton, checkButton, autoCompleteButton } = initElements();
    const round = jsonData.rounds[getRound()];
    const wordsArray = round.words;
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
