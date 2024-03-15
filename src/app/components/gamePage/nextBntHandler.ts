// import { removeClickListener } from './addWordCard';

import { addWorldCards } from './addWorldCards';

let clickHandler: () => void;

let index = 0;
export function setIndex(value: number) {
    index = value;
}
export function getIndex() {
    return index;
}
export function enableContinueButton() {
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;
    continueButton.disabled = false;
    if (clickHandler) {
        continueButton.removeEventListener('click', clickHandler);
    }
    clickHandler = () => {
        continueButton.disabled = true;
        const gridElement = document.getElementById('result-block');
        if (gridElement && gridElement.children.length > 0) {
            const row = gridElement.children[getIndex()];
            console.log(row);
            row.setAttribute('disabled', 'disabled');
        }
        setIndex(getIndex() + 1);
        console.log(getIndex());
        addWorldCards();
    };
    continueButton.addEventListener('click', clickHandler);
    // const wordCard = document.getElementsByClassName('word-card') as HTMLCollectionOf<HTMLElement>;
    // Array.from(wordCard).forEach((elem) => {
    //     console.log(wordCard);
    //     removeClickListener(elem, clickHandler);
    // });
}
