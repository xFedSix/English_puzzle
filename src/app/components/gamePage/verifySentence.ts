import { readWorldCollection } from './worldCollectionReader';

import { enableCheckButton } from './checkBtnHandler';

import { getIndex, getRowNumber, getSentence, setSentence } from './get&set';

export function getCurrentSentenceFromGrid() {
    const gridRow = document.querySelector(`#row${getRowNumber()}`);
    if (!gridRow) {
        return '';
    }
    const row = gridRow.children;
    let sentence = getSentence();
    for (let i = 0; i < row.length; i += 1) {
        if (i !== 0) {
            sentence += ' ';
        }
        sentence += row[i].textContent;
        setSentence(sentence);
    }
    const finalSentence = getSentence();
    setSentence('');
    return finalSentence;
}

export async function verifySentence(fileName: string) {
    const jsonData = await readWorldCollection(fileName);
    let currentSentenceString = '';
    let targetSentence = jsonData.rounds[0].words[getIndex()].textExample;
    let currentSentence = getCurrentSentenceFromGrid();
    currentSentence = currentSentence.toLowerCase();
    targetSentence = targetSentence.toLowerCase();
    currentSentenceString += currentSentence;
    currentSentence = currentSentence.trim();
    targetSentence = targetSentence.trim();

    if (currentSentenceString.length === targetSentence.length) {
        enableCheckButton();
    }
    return currentSentenceString === targetSentence;
}
