export function createElements() {
    const div = document.createElement('div');
    const wrapper = document.createElement('div');
    const resultBlock = document.createElement('section');
    const sourceBlock = document.createElement('section');
    const lineNumberBlock = document.createElement('section');
    const nextButton = document.createElement('button');
    const checkButton = document.createElement('button');
    const autoCompleteButton = document.createElement('button');

    return {
        div,
        wrapper,
        resultBlock,
        sourceBlock,
        lineNumberBlock,
        nextButton,
        checkButton,
        autoCompleteButton,
    };
}
