import { addWorldCards } from './addWorldCards';
import { getIndex, getRound, getRowNumber, setIndex, setRound, setRowNumber, setSentence } from './get&set';
import { toggleButtonClasses } from './toggleBtnClasses';
import { initElements } from '../constants';

let clickHandler: () => void;

export function enableContinueButton(resultBlock: HTMLElement) {
    const { checkButton, autoCompleteButton, continueButton } = initElements();
    continueButton.disabled = false;

    toggleButtonClasses(continueButton, 'visible', 'hidden');
    toggleButtonClasses(checkButton, 'hidden', 'visible');
    if (clickHandler) {
        continueButton.removeEventListener('click', clickHandler);
    }
    clickHandler = () => {
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
        if (getRowNumber() <= 9) {
            setIndex(getIndex() + 1);
        } else {
            setIndex(0);
            setRound(getRound() + 1);
            setRowNumber(1);
            while (resultBlock.firstChild) {
                resultBlock.removeChild(resultBlock.firstChild);
            }
        }
        setRowNumber(getRowNumber() + 1);
        addWorldCards();
    };
    continueButton.addEventListener('click', clickHandler);
}
