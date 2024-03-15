let clickHandler: () => void;

export function enableCheckButton() {
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;
    checkButton.disabled = false;
    // if (clickHandler) {
    //     checkButton.removeEventListener('click', clickHandler);
    // }
    clickHandler = () => {
        // const gridElement = document.getElementById('result-block');
        // for (let i = 0; i < targetWords.length; i += 1) {
        //     let wordElement = document.getElementById('word-card' + i);
        //     if (targetWords[i] === currentWords[i]) {
        //         wordElement.style.color = 'green';
        //     } else {
        //         wordElement.style.color = 'red';
        //     }
        // }
    };
    checkButton.addEventListener('click', clickHandler);
}
