import jsonData from '../../../worldCollectionData/worldCollectionLevel1.json';

export function addWorldCards() {
    const round = jsonData.rounds[0];
    const wordsArray = round.words;
    const { textExample } = wordsArray[0];
    const words = textExample.split(' ');

    function shuffleArray<T>(array: T[]): T[] {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const shuffledWords = shuffleArray(words);
    const sourceBlock = document.getElementById('source-block') as HTMLElement;
    const resultBlock = document.getElementById('result-block') as HTMLElement;

    if (sourceBlock && resultBlock) {
        shuffledWords.forEach((word) => {
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
            const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const width = sourceBlock.scrollWidth / baseFontSize;
            const height = sourceBlock.scrollHeight / baseFontSize;
            resultBlock.style.minWidth = `${width}rem`;
            sourceBlock.style.minWidth = `${width}rem`;
            sourceBlock.style.minHeight = `${height}rem`;
        });
    }
}
addWorldCards();
