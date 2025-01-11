import { initElements } from '../constants';

export function setResultBlockBackground(imageUrl: string) {
    const { resultBlock } = initElements();
    const ctx = resultBlock.getContext('2d') as CanvasRenderingContext2D;
    const background = new Image();
    background.src = imageUrl;
    background.onload = () => {
        ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
}
