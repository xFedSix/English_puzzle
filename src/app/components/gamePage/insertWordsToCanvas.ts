export function insertWordsToCanvas(ctx: CanvasRenderingContext2D, text: string, row: number, wordsQtn: number) {
    const words = text.split(' ');
    const cellWidth = ctx.canvas.width / words.length;
    const cellHeight = ctx.canvas.height / wordsQtn; // Предположим, что у нас 10 строк

    words.forEach((word, index) => {
        const x = index * cellWidth;
        const y = row * cellHeight + cellHeight / 2; // Центрируем текст по вертикали
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(word, x, y);
    });
}
