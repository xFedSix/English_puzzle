import { shuffleArray } from './shuffleArray';
import { addWordCard } from './addWordCard';
import { readWorldCollection } from './worldCollectionReader';
import { getIndex, getRound } from './get&set';
import { autoCompleteBtn } from './autoCompleteBtn';
import { initElements } from '../constants';

export async function addWorldCards(fileName: string) {
    const { sourceBlock, resultBlock, nextButton, checkButton, autoCompleteButton } = initElements();
    const jsonData = await readWorldCollection(fileName);
    const round = jsonData.rounds[getRound()];
    const wordsArray = round.words;
    const { textExample } = wordsArray[getIndex()];
    const words = textExample.split(' ');
    const shuffledWords = shuffleArray(words);
    // Сбросить состояние кнопок
    nextButton.textContent = 'Continue';
    nextButton.classList.remove('visible');
    nextButton.classList.add('hidden');
    nextButton.disabled = true;
    checkButton.textContent = 'Check';
    checkButton.classList.remove('hidden');
    checkButton.classList.add('visible');
    checkButton.disabled = true;
    autoCompleteButton.textContent = 'Auto Complete';
    autoCompleteButton.disabled = false;

    if (sourceBlock && resultBlock) {
        shuffledWords.forEach((word) => {
            const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const height = sourceBlock.scrollHeight / baseFontSize;
            sourceBlock.style.minHeight = `${height}rem`;
            addWordCard(word, sourceBlock, resultBlock, fileName);
        });
    }
    autoCompleteBtn(fileName);
}
