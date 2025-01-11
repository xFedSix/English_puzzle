import { initElements } from '../constants';
import { GamePageElements } from './gamePageElements';

export function drawGrid(totalRows: number, columnsPerRow: number[], gamePageElements: GamePageElements) {
    const { resultBlock } = initElements();
    const elements = { ...gamePageElements };
    const ctx = resultBlock.getContext('2d') as CanvasRenderingContext2D;
    resultBlock.width = elements.wrapper.clientWidth;
    resultBlock.height = elements.wrapper.clientHeight;
    ctx.clearRect(0, 0, resultBlock.width, resultBlock.height);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Очистка Canvas

    for (let row = 0; row < totalRows; row += 1) {
        const totalColumns = columnsPerRow[row];
        const cellWidth = ctx.canvas.width / totalColumns;
        const cellHeight = ctx.canvas.height / totalRows;

        // Рисуем строки
        ctx.beginPath();
        ctx.moveTo(0, row * cellHeight);
        ctx.lineTo(ctx.canvas.width, row * cellHeight);
        ctx.stroke();

        // Рисуем столбцы
        for (let col = 0; col < totalColumns; col += 1) {
            ctx.beginPath();
            ctx.moveTo(col * cellWidth, row * cellHeight);
            ctx.lineTo(col * cellWidth, (row + 1) * cellHeight);
            ctx.stroke();
        }
    }

    // Рисуем последнюю горизонтальную линию
    ctx.beginPath();
    ctx.moveTo(0, totalRows * (ctx.canvas.height / totalRows));
    ctx.lineTo(ctx.canvas.width, totalRows * (ctx.canvas.height / totalRows));
    ctx.stroke();
}
