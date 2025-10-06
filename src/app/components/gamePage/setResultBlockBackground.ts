import { readWorldCollection, levelFiles } from './worldCollectionReader';
import { getLevel, getRound } from './get&set';
import { initElements } from '../constants';

/**
 * Устанавливает фон для result-block по imageSrc для текущего level и round
 */
export async function setResultBlockBackground() {
    const fileName = levelFiles[getLevel() - 1];
    const jsonData = await readWorldCollection(fileName);
    const round = jsonData.rounds[getRound()];
    const imageSrc = round.levelData?.imageSrc;
    const { resultBlock } = initElements();
    console.log('setResultBlockBackground called', { resultBlock, imageSrc });
    if (resultBlock && imageSrc) {
        resultBlock.style.backgroundImage = `url('/images/${imageSrc}')`;
        console.log(`Background image set to: /images/${imageSrc}`);
        // overlay и стили теперь задаются через SCSS
        let overlay = resultBlock.querySelector('.result-block-overlay') as HTMLDivElement;
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'result-block-overlay';
            resultBlock.appendChild(overlay);
        }
    } else {
        if (!resultBlock) console.warn('resultBlock not found');
        if (!imageSrc) console.warn('imageSrc not found');
    }
}
