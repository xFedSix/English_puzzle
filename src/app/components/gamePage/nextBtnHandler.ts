import { addWorldCards } from './addWorldCards';
import { levelFiles, readWorldCollection } from './worldCollectionReader';
import {
    getIndex,
    getRound,
    getRowNumber,
    setIndex,
    setRound,
    setRowNumber,
    setSentence,
    getLevel,
    setLevel,
} from './get&set';
import { toggleButtonClasses } from './toggleBtnClasses';
import { initElements } from '../constants';
import { clearBlocks } from './clearBlocks';
import { createResultRows } from './createResultRows';

let clickHandler: () => void;

export function enableContinueButton(resultBlock: HTMLElement) {
    const { checkButton, autoCompleteButton, continueButton } = initElements();
    continueButton.disabled = false;
    continueButton.classList.remove('hidden');
    continueButton.classList.add('visible');
    checkButton.classList.remove('visible');
    checkButton.classList.add('hidden');
    checkButton.disabled = true;
    autoCompleteButton.disabled = true;
    if (clickHandler) {
        continueButton.removeEventListener('click', clickHandler);
    }
    clickHandler = async () => {
        autoCompleteButton.disabled = false;
        continueButton.disabled = true;
        if (resultBlock && resultBlock.children.length > 0) {
            const row = resultBlock.querySelector(`#row${getRowNumber()}`);
            if (row) {
                row.classList.add('disabled');
                toggleButtonClasses(checkButton, 'visible', 'hidden');
                toggleButtonClasses(continueButton, 'hidden', 'visible');
            }
        }
        setSentence('');
        // Получаем данные текущего уровня
        const currentLevelIdx = getLevel() - 1;
        const jsonData = await readWorldCollection(levelFiles[currentLevelIdx]);
        const roundsCount = jsonData.rounds.length;
        const currentRound = getRound();
        const currentWordsCount = jsonData.rounds[currentRound].words.length;

        if (getRowNumber() < currentWordsCount) {
            setIndex(getIndex() + 1);
            setRowNumber(getRowNumber() + 1);
            await addWorldCards(levelFiles[currentLevelIdx]);
        } else if (currentRound < roundsCount - 1) {
            // Есть следующий раунд
            setIndex(0);
            setRound(currentRound + 1);
            setRowNumber(1);
            clearBlocks();
            // Обновляем кнопки и меню
            const { roundsBtn, div } = initElements();
            if (roundsBtn) roundsBtn.textContent = `Round ${currentRound + 2}`;
            const nextWordsCount = jsonData.rounds[currentRound + 1].words.length;
            createResultRows(nextWordsCount, div);
            await addWorldCards(levelFiles[currentLevelIdx]);
        } else if (currentLevelIdx < levelFiles.length - 1) {
            // Последний раунд — переходим к следующему уровню
            setLevel(getLevel() + 1);
            setRound(0);
            setIndex(0);
            setRowNumber(1);
            clearBlocks();
            // Обновляем Level кнопку
            const { levelBtn, roundsBtn, div } = initElements();
            if (levelBtn) levelBtn.textContent = `Level ${getLevel()}`;
            if (roundsBtn) roundsBtn.textContent = `Round 1`;
            // Получаем данные нового уровня
            const nextJson = await readWorldCollection(levelFiles[getLevel() - 1]);
            const firstWordsCount = nextJson.rounds[0].words.length;
            createResultRows(firstWordsCount, div);
            await addWorldCards(levelFiles[getLevel() - 1]);
        } else {
            // Последний уровень и последний раунд — можно показать финальный экран или сбросить игру
            // alert('Поздравляем! Вы прошли все уровни!');
        }
    };
    continueButton.addEventListener('click', clickHandler);
}
