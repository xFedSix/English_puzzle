export function initElements() {
    const sourceBlock = document.getElementById('source-block') as HTMLElement;
    const resultBlock = document.getElementById('result-block') as HTMLElement;
    const nextButton = document.getElementById('next-btn') as HTMLButtonElement;
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;
    const autoCompleteButton = document.getElementById('auto-complete-btn') as HTMLButtonElement;
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;

    return {
        sourceBlock,
        resultBlock,
        nextButton,
        checkButton,
        autoCompleteButton,
        continueButton,
    };
}
