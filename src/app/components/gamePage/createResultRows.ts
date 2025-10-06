import { initElements } from '../constants';

/**
 * Создаёт строки rowX в resultBlock
 * @param count количество строк
 * @param div шаблонный div для клонирования
 */
export function createResultRows(count: number, div: HTMLElement) {
    const { resultBlock } = initElements();
    if (!resultBlock) return;
    for (let i = 1; i <= count; i += 1) {
        const newRowDiv = div.cloneNode(true) as HTMLElement;
        newRowDiv.style.display = '';
        newRowDiv.style.gridRow = `${i}`;
        newRowDiv.classList.add('sourceRow');
        newRowDiv.id = `row${i}`;
        resultBlock.appendChild(newRowDiv);
    }
}
