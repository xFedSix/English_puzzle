export function initElements() {
    const sourceBlock = document.getElementById('source-block') as HTMLElement;
    const resultBlock = document.getElementById('result-block') as HTMLElement;
    const nextButton = document.getElementById('next-btn') as HTMLButtonElement;
    const checkButton = document.getElementById('check-btn') as HTMLButtonElement;
    const autoCompleteButton = document.getElementById('auto-complete-btn') as HTMLButtonElement;
    const continueButton = document.getElementById('next-btn') as HTMLButtonElement;
    const levelBtn = document.getElementById('dropdownLevelBtn') as HTMLButtonElement;
    const roundsBtn = document.getElementById('dropdownRoundsBtn') as HTMLButtonElement;
    const div = document.getElementById('row-template-div') as HTMLDivElement;

    return {
        sourceBlock,
        resultBlock,
        nextButton,
        checkButton,
        autoCompleteButton,
        continueButton,
        levelBtn,
        roundsBtn,
        div,
    };
}
