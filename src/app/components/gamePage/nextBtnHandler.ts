import { addWorldCards } from './addWorldCards';
import { getIndex, getRowNumber, setIndex, setRowNumber, setSentence } from './get&set';
import { toggleButtonClasses } from './toggleBtnClasses';
import { initElements } from '../constants';

const { checkButton, autoCompleteButton, continueButton } = initElements();

let clickHandler: () => void;

export function enableContinueButton(resultBlock: HTMLElement) {
    continueButton.disabled = false;

    toggleButtonClasses(continueButton, 'visible', 'hidden');
    toggleButtonClasses(checkButton, 'hidden', 'visible');
    if (clickHandler) {
        continueButton.removeEventListener('click', clickHandler);
    }
    clickHandler = () => {
        autoCompleteButton.disabled = false;
        continueButton.disabled = true;
        const gridElement = document.getElementById('result-block');
        if (gridElement && gridElement.children.length > 0) {
            const row = resultBlock.querySelector(`#row${getRowNumber()}`);
            if (row) {
                row.classList.add('disabled');
                toggleButtonClasses(checkButton, 'visible', 'hidden');
                toggleButtonClasses(continueButton, 'hidden', 'visible');
            }
        }
        setSentence('');
        setIndex(getIndex() + 1);
        setRowNumber(getRowNumber() + 1);
        addWorldCards();
    };
    continueButton.addEventListener('click', clickHandler);
}
