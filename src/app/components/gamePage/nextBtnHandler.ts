import { addWorldCards } from './addWorldCards';
import { getIndex, getRowNumber, setIndex, setRowNumber, setSentence } from './get&set';
import { toggleButtonClasses } from './toggleBtnClasses';

let clickHandler: () => void;

export function enableContinueButton(resultBlock: HTMLElement) {
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;
    const autoComplete = document.getElementById('auto-complete-btn') as HTMLButtonElement;
    continueButton.disabled = false;

    toggleButtonClasses(continueButton, 'visible', 'hidden');
    toggleButtonClasses(checkButton, 'hidden', 'visible');
    if (clickHandler) {
        continueButton.removeEventListener('click', clickHandler);
    }
    clickHandler = () => {
        autoComplete.disabled = false;
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
