import { addWorldCards } from './addWorldCards';
import { createResultRows } from './createResultRows';
import { clearBlocks } from './clearBlocks';
import { setLevel, getLevel, setRound } from './get&set';
import { GamePageElements } from './gamePageElements';
import { readWorldCollection, levelFiles } from './worldCollectionReader';

const levelCount = levelFiles.length;

// Для примера, roundsCount можно получить из worldCollection (здесь захардкожено, но в реальном коде — из данных)
let roundsCount = 10; // по умолчанию, будет обновляться при смене уровня

export async function renderElements(gamePageElements: GamePageElements, parent: HTMLElement) {
    const elements = { ...gamePageElements };
    parent.appendChild(elements.hintsWrapper);
    parent.appendChild(elements.wrapper);
    elements.wrapper.insertBefore(elements.hintsWrapper, elements.wrapper.firstChild);
    elements.hintsWrapper.id = 'game-hints';
    elements.hintsWrapper.appendChild(elements.gameLevel);
    elements.gameLevel.id = 'game-level__wrapper';
    const levelIdx = 1; // Начальный уровень (может быть любым от 1 до levelCount)
    // --- Level dropdown ---
    const levelDropdown = document.createElement('div');
    levelDropdown.className = 'dropdown';
    const levelBtn = document.createElement('button');
    levelBtn.className = 'btn btn-secondary dropdown-toggle';
    levelBtn.type = 'button';
    levelBtn.id = 'dropdownLevelBtn';
    levelBtn.setAttribute('data-bs-toggle', 'dropdown');
    levelBtn.setAttribute('aria-expanded', 'false');
    levelBtn.textContent = `Level ${levelIdx}`;
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
    const RoundIdx = 1; // Начальный раунд (может быть любым от 1 до roundsCount)
    roundsBtn.textContent = `Round ${RoundIdx}`;
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
            a.onclick = async (e) => {
                e.preventDefault();
                roundsBtn.textContent = `Round ${j + 1}`;
                setRound(j);
                clearBlocks();
                // Получаем количество слов для текущего уровня и раунда
                const jsonData = await readWorldCollection(levelFiles[getLevel() - 1]);
                const round = jsonData.rounds[j];
                const wordsCount = round.words.length;
                createResultRows(wordsCount, elements.div);
                await addWorldCards(levelFiles[getLevel() - 1]);
            };
            li.appendChild(a);
            roundsMenu.appendChild(li);
        }
    }

    // --- Заполнение меню уровней ---
    function handleLevelSelect(idx: number) {
        return async (e: MouseEvent) => {
            e.preventDefault();
            setLevel(idx + 1);
            const collection = await readWorldCollection(levelFiles[idx]);
            roundsCount = collection.roundsCount;
            updateRoundsMenu();
            levelBtn.textContent = `Level ${idx + 1}`;
            clearBlocks();
            // Получаем количество слов для первого раунда нового уровня
            const round = collection.rounds[0];
            const wordsCount = round.words.length;
            createResultRows(wordsCount, elements.div);
            await addWorldCards(levelFiles[idx]);
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
    clearBlocks();
    // Для начального рендера — первый уровень, первый раунд
    const jsonData = await readWorldCollection(levelFiles[getLevel() - 1]);
    const round = jsonData.rounds[0];
    const wordsCount = round.words.length;
    createResultRows(wordsCount, elements.div);
    await addWorldCards(levelFiles[getLevel() - 1]);
}
