import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';

import { enableCheckButton } from './checkBtnHandler';

import { getIndex } from './nextBtnHandler';

export function getCurrentSentenceFromGrid() {
    const gridElement = document.getElementById('result-block');
    if (!gridElement) {
        return '';
    }
    const row = gridElement.children;

    let sentence = '';
    for (let i = 0; i < row.length; i += 1) {
        if (i !== 0) {
            sentence += ' ';
        }
        sentence += row[i].textContent;
    }
    return sentence;
}
export function verifySentence() {
    let currentSentenceString = '';
    let targetSentence = jsonData.rounds[0].words[getIndex()].textExample;
    let currentSentence = getCurrentSentenceFromGrid();
    currentSentence = currentSentence.toLowerCase();
    targetSentence = targetSentence.toLowerCase();
    currentSentenceString += currentSentence;
    currentSentence = currentSentence.trim();
    targetSentence = targetSentence.trim();
    console.log(currentSentenceString.length);
    console.log(targetSentence.length);

    if (currentSentenceString.length === targetSentence.length) {
        enableCheckButton();
    }
    return currentSentenceString === targetSentence;
}
