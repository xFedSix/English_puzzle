import { addWorldCards } from './addWorldCards';
import { getIndex, getRowNumber, setIndex, setRowNumber, setSentence } from './get&set';

let clickHandler: () => void;

export function enableContinueButton(resultBlock: HTMLElement) {
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;
    continueButton.disabled = false;
    if (clickHandler) {
        continueButton.removeEventListener('click', clickHandler);
    }
    clickHandler = () => {
        continueButton.disabled = true;
        const gridElement = document.getElementById('result-block');
        if (gridElement && gridElement.children.length > 0) {
            const row = resultBlock.querySelector(`#row${getRowNumber()}`);
            if (row) {
                row.classList.add('disabled');
            }
        }
        setSentence('');
        setIndex(getIndex() + 1);
        setRowNumber(getRowNumber() + 1);
        addWorldCards();
    };
    continueButton.addEventListener('click', clickHandler);
}
