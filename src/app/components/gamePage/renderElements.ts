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

// Для примера, roundsCount можно получить из worldCollection (здесь захардкожено, но в реальном коде — из данных)
let roundsCount = 10; // по умолчанию, будет обновляться при смене уровня

/**
 * Получает roundsCount из файла worldCollectionLevelX.json
 * @param {string} fileName - имя файла уровня (например, 'worldCollectionLevel1.json')
 * @returns {Promise<number>} roundsCount
 */
async function getRoundsCountFromLevelFile(fileName: string): Promise<number> {
    try {
        const response = await fetch(`src/worldCollectionData/${fileName}`);
        if (!response.ok) throw new Error('File not found');
        const data = await response.json();
        // roundsCount может быть либо отдельным полем, либо data.rounds.length
        if (typeof data.roundsCount === 'number') return data.roundsCount;
        if (Array.isArray(data.rounds)) return data.rounds.length;
        throw new Error('roundsCount not found');
    } catch (e) {
        // По умолчанию 10, если ошибка
        return 10;
    }
}

export function renderElements(gamePageElements: GamePageElements, parent: HTMLElement) {
    const elements = { ...gamePageElements };
    parent.appendChild(elements.hintsWrapper);
    parent.appendChild(elements.wrapper);
    elements.wrapper.insertBefore(elements.hintsWrapper, elements.wrapper.firstChild);
    elements.hintsWrapper.id = 'game-hints';
    elements.hintsWrapper.appendChild(elements.gameLevel);
    elements.gameLevel.id = 'game-level__wrapper';

    // --- Level dropdown ---
    const levelDropdown = document.createElement('div');
    levelDropdown.className = 'dropdown';
    const levelBtn = document.createElement('button');
    levelBtn.className = 'btn btn-secondary dropdown-toggle';
    levelBtn.type = 'button';
    levelBtn.id = 'dropdownLevelBtn';
    levelBtn.setAttribute('data-bs-toggle', 'dropdown');
    levelBtn.setAttribute('aria-expanded', 'false');
    levelBtn.textContent = 'Level';
    levelDropdown.appendChild(levelBtn);
    const levelMenu = document.createElement('ul');
    levelMenu.className = 'dropdown-menu';
    levelMenu.setAttribute('aria-labelledby', 'dropdownLevelBtn');
    levelDropdown.appendChild(levelMenu);
    elements.gameLevel.appendChild(levelDropdown);

    // --- Rounds dropdown ---
    const roundsDropdown = document.createElement('div');
    roundsDropdown.className = 'dropdown';
    const roundsBtn = document.createElement('button');
    roundsBtn.className = 'btn btn-secondary dropdown-toggle';
    roundsBtn.type = 'button';
    roundsBtn.id = 'dropdownRoundsBtn';
    roundsBtn.setAttribute('data-bs-toggle', 'dropdown');
    roundsBtn.setAttribute('aria-expanded', 'false');
    roundsBtn.textContent = 'Round';
    roundsDropdown.appendChild(roundsBtn);
    const roundsMenu = document.createElement('ul');
    roundsMenu.className = 'dropdown-menu';
    roundsMenu.setAttribute('aria-labelledby', 'dropdownRoundsBtn');
    roundsDropdown.appendChild(roundsMenu);
    elements.gameLevel.appendChild(roundsDropdown);

    // --- Обновление меню раундов ---
    function updateRoundsMenu() {
        roundsMenu.innerHTML = '';
        for (let j = 0; j < roundsCount; j += 1) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.textContent = `Round ${j + 1}`;
            a.onclick = (e) => {
                e.preventDefault();
                roundsBtn.textContent = `Round ${j + 1}`;
                // Здесь логика смены раунда
            };
            li.appendChild(a);
            roundsMenu.appendChild(li);
        }
    }

    // --- Заполнение меню уровней ---
    function handleLevelSelect(levelIdx: number) {
        return async (e: MouseEvent) => {
            e.preventDefault();
            roundsCount = await getRoundsCountFromLevelFile(levelFiles[levelIdx]);
            updateRoundsMenu();
            levelBtn.textContent = `Level ${levelIdx + 1}`;
        };
    }
    for (let i = 0; i < levelCount; i += 1) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = `Level ${i + 1}`;
        a.onclick = handleLevelSelect(i);
        li.appendChild(a);
        levelMenu.appendChild(li);
    }

    updateRoundsMenu();

    // ...остальной код без изменений...
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
