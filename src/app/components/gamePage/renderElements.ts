import { addWorldCards } from './addWorldCards';
import { GamePageElements } from './gamePageElements';

// Статический массив файлов уровней
const levelFiles = [
    'worldCollectionLevel1.json',
    'worldCollectionLevel2.json',
    'worldCollectionLevel3.json',
    'worldCollectionLevel4.json',
    'worldCollectionLevel5.json',
    'worldCollectionLevel6.json',
];
const levelCount = levelFiles.length;

export function renderElements(gamePageElements: GamePageElements, parent: HTMLElement) {
    const elements = { ...gamePageElements };
    parent.appendChild(elements.hintsWrapper);
    parent.appendChild(elements.wrapper);
    elements.wrapper.insertBefore(elements.hintsWrapper, elements.wrapper.firstChild);
    elements.hintsWrapper.id = 'game-hints';
    elements.hintsWrapper.appendChild(elements.gameLevel);
    elements.gameLevel.id = 'game-level__wrapper';
    const levelTextNode = document.createTextNode('Level');
    elements.gameLevel.appendChild(levelTextNode);

    for (let i = 0; i < levelCount; i += 1) {
        const link = document.createElement('a');
        link.id = `game-link-${i}`;
        link.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
        link.href = '#';
        link.role = 'button';
        link.setAttribute('data-bs-toggle', 'dropdown');
        link.setAttribute('aria-expanded', 'false');
        link.textContent = `${i + 1}`;
        elements.gameLevel.appendChild(link);

        const ul = document.createElement('ul');
        ul.id = `game-ul-${i}`;
        ul.classList.add('dropdown-menu');
        elements.gameLevel.appendChild(ul);

        for (let j = 0; j < levelCount; j += 1) {
            const li = document.createElement('li');
            li.classList.add('dropdown-item');
            li.textContent = `${j + 1}`;
            ul.appendChild(li);
        }
        if (i === 0) {
            const pageTextNode = document.createTextNode('Round');
            elements.gameLevel.appendChild(pageTextNode);
        }
    }
    elements.hintsWrapper.appendChild(elements.gameHintTranslate);
    elements.gameHintTranslate.id = 'game-hint_translate';
    elements.hintsWrapper.appendChild(elements.gameHintSound);
    elements.gameHintSound.id = 'game-hint_sound';
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
    elements.wrapper.appendChild(elements.autoCompleteButton);
    elements.autoCompleteButton.id = 'auto-complete-btn';

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
