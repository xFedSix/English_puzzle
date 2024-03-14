import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';

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
    let currentSentence = getCurrentSentenceFromGrid();
    let targetSentence = jsonData.rounds[0].words[0].textExample;
    currentSentence = currentSentence.toLowerCase();
    targetSentence = targetSentence.toLowerCase();
    currentSentence = currentSentence.trim();
    targetSentence = targetSentence.trim();
    console.log(currentSentence);
    console.log(targetSentence);
    return currentSentence === targetSentence;
}

export function enableContinueButton() {
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;
    continueButton.disabled = false;
}

// export function nextButtonHandler() {
//     if (continueButton) {
//         continueButton.addEventListener("click", () => {
//         });
//     }
// }
