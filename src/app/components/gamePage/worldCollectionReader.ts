// Получение списка файлов уровней динамически (если потребуется)
export const levelFiles = [
    'worldCollectionLevel1.json',
    'worldCollectionLevel2.json',
    'worldCollectionLevel3.json',
    'worldCollectionLevel4.json',
    'worldCollectionLevel5.json',
    'worldCollectionLevel6.json',
];
/**
 * Типы для структуры worldCollectionLevel файлов
 */
export interface Word {
    audioExample?: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
}

export interface LevelData {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
}

export interface Round {
    levelData: LevelData;
    words: Word[];
}

export interface WorldCollection {
    rounds: Round[];
    roundsCount: number;
}

/**
 * Асинхронно читает и парсит worldCollectionLevelX.json
 * @param fileName имя файла (например, 'worldCollectionLevel1.json')
 * @returns Promise<WorldCollection>
 * @returns {Promise<number>} roundsCount
 */
export async function readWorldCollection(fileName: string): Promise<WorldCollection> {
    const response = await fetch(`/worldCollectionData/${fileName}`);
    if (!response.ok) throw new Error('File not found');
    const data = await response.json();
    // roundsCount может быть отдельным полем или вычисляться по длине массива rounds
    const rounds: Round[] = Array.isArray(data.rounds) ? data.rounds : [];
    let roundsCount: number;
    if (typeof data.roundsCount === 'number') {
        roundsCount = data.roundsCount;
    } else if (Array.isArray(data.rounds)) {
        roundsCount = data.rounds.length;
    } else {
        roundsCount = 0;
    }
    return {
        rounds,
        roundsCount,
    };
}
