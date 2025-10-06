import { readWorldCollection, levelFiles } from './worldCollectionReader';
import { getLevel, getRound, getIndex } from './get&set';

/**
 * Воспроизводит audioExample для текущего предложения
 */
export async function playAudioExample() {
    const fileName = levelFiles[getLevel() - 1];
    const jsonData = await readWorldCollection(fileName);
    const round = jsonData.rounds[getRound()];
    const word = round.words[getIndex()];
    let audioSrc = word.audioExample;
    if (audioSrc) {
        // Если путь относительный (начинается с 'files/'), добавим '/worldCollectionData/'
        if (audioSrc.startsWith('files/')) {
            audioSrc = `/worldCollectionData/${audioSrc}`;
        }
        const audio = new Audio(audioSrc);
        audio.play();
    }
}
