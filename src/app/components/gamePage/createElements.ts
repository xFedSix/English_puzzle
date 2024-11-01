export function createElements() {
    const div = document.createElement('div');
    const wrapper = document.createElement('div');
    const gameLevel = document.createElement('div');
    const hintsWrapper = document.createElement('section');
    const gameHintTranslate = document.createElement('button');
    const gameHintSound = document.createElement('button');
    const resultBlock = document.createElement('section');
    const sourceBlock = document.createElement('section');
    const lineNumberBlock = document.createElement('section');
    const nextButton = document.createElement('button');
    const checkButton = document.createElement('button');
    const autoCompleteButton = document.createElement('button');
    const link = document.createElement('a');
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    return {
        div,
        wrapper,
        hintsWrapper,
        gameHintTranslate,
        gameHintSound,
        gameLevel,
        resultBlock,
        sourceBlock,
        lineNumberBlock,
        nextButton,
        checkButton,
        autoCompleteButton,
        link,
        ul,
        li,
    };
}
