export function addWordCard(word: string, sourceBlock: HTMLElement, resultBlock: HTMLElement) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.textContent = word;
    wordCard.addEventListener('click', () => {
        wordCard.classList.add('moving');
        setTimeout(() => {
            wordCard.classList.remove('moving');
        }, 500);
        if (wordCard.parentElement === sourceBlock) {
            sourceBlock.removeChild(wordCard);
            resultBlock.appendChild(wordCard);
        } else {
            resultBlock.removeChild(wordCard);
            sourceBlock.appendChild(wordCard);
        }
    });
    sourceBlock.appendChild(wordCard);
}
