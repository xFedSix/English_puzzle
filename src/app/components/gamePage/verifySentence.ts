import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';
import { getIndex } from './nextBntHandler';

function getCurrentSentenceFromGrid() {
    const gridElement = document.getElementById('result-block');
    if (!gridElement) {
        return '';
    }
    const columns = gridElement.children;
    let sentence = '';
    for (let i = 0; i < columns.length; i += 1) {
        if (i !== 0) {
            sentence += ' ';
        }
        sentence += columns[i].textContent;
    }
    return sentence;
}
export function verifySentence() {
    let targetSentence = jsonData.rounds[0].words[getIndex()].textExample;
    let currentSentence = getCurrentSentenceFromGrid();
    currentSentence = currentSentence.toLowerCase();
    targetSentence = targetSentence.toLowerCase();
    currentSentence = currentSentence.trim();
    targetSentence = targetSentence.trim();
    console.log(currentSentence);
    console.log(targetSentence);
    return currentSentence === targetSentence;
}
