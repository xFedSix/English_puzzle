import { addWorldCards } from './addWorldCards';
import { GamePageElements } from './gamePageElements';

export function renderElements(gamePageElements: GamePageElements, parent: HTMLElement) {
    const elements = { ...gamePageElements };
    parent.appendChild(elements.wrapper);
    elements.wrapper.id = 'game-page__wrapper';
    elements.wrapper.appendChild(elements.lineNumberBlock);
    elements.lineNumberBlock.id = 'line-number-block';
    elements.wrapper.appendChild(elements.resultBlock);
    elements.resultBlock.id = 'result-block';
    elements.wrapper.appendChild(elements.sourceBlock);
    elements.sourceBlock.id = 'source-block';
    elements.wrapper.appendChild(elements.nextButton);
    elements.nextButton.id = 'next-btn';
    elements.wrapper.appendChild(elements.checkButton);
    elements.checkButton.id = 'check-btn';
    elements.wrapper.appendChild(elements.autoButton);
    elements.autoButton.id = 'auto-complete-btn';

    let total = 0;
    for (let i = 0; i < elements.json.rounds.length; i += 1) {
        total = elements.json.rounds[i].words.length;
    }
    for (let i = 1; i <= total; i += 1) {
        const newRowDiv = elements.div.cloneNode(true) as HTMLElement;
        newRowDiv.style.gridRow = `${i}`;
        newRowDiv.classList.add('sourceRow');
        newRowDiv.id = `row${i}`;
        elements.resultBlock.appendChild(newRowDiv);
    }

    const gridTemplateRows = `repeat(${total}, auto)`;
    elements.resultBlock.style.display = 'grid';
    elements.resultBlock.style.gridTemplateRows = gridTemplateRows;
    setTimeout(() => {
        const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const height = elements.sourceBlock.scrollHeight / baseFontSize;
        elements.resultBlock.style.minHeight = `${height * total}rem`;
    }, 0);

    elements.lineNumberBlock.style.display = 'grid';
    for (let i = 1; i <= total; i += 1) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i.toString();
        elements.lineNumberBlock.appendChild(lineNumber);
    }
    addWorldCards();
}
