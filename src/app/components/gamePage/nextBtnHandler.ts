import { addWorldCards } from './addWorldCards';
import { getIndex, getRowNumber, setIndex, setRowNumber, setSentence } from './get&set';

let clickHandler: () => void;

export function enableContinueButton(resultBlock: HTMLElement) {
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;
    continueButton.disabled = false;
    checkButton.classList.remove('visible');
    continueButton.classList.remove('hidden');
    checkButton.classList.add('hidden');
    continueButton.classList.add('visible');
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
                checkButton.classList.add('visible');
                checkButton.classList.remove('hidden');
                continueButton.classList.add('hidden');
                continueButton.classList.remove('visible');
            }
        }

        setSentence('');
        setIndex(getIndex() + 1);
        setRowNumber(getRowNumber() + 1);
        addWorldCards();
    };
    continueButton.addEventListener('click', clickHandler);
}
