import { readWorldCollection, levelFiles } from './worldCollectionReader';
import { getLevel, getRound, getIndex } from './get&set';

/**
 * Показывает всплывающее окно с переводом предложения (textExampleTranslate)
 */
export async function showTranslateHint() {
    // Получаем актуальный файл уровня
    const fileName = levelFiles[getLevel() - 1];
    const jsonData = await readWorldCollection(fileName);
    const round = jsonData.rounds[getRound()];
    const word = round.words[getIndex()];
    const translate = word.textExampleTranslate;

    // Создаём оверлей
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.3)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    // Создаём окно
    const modal = document.createElement('div');
    modal.style.background = '#fff';
    modal.style.padding = '2rem 2.5rem';
    modal.style.borderRadius = '12px';
    modal.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
    modal.style.maxWidth = '90vw';
    modal.style.maxHeight = '80vh';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';

    // Текст перевода
    const text = document.createElement('div');
    text.textContent = translate;
    text.style.fontSize = '1.3rem';
    text.style.marginBottom = '1.5rem';
    text.style.textAlign = 'center';
    modal.appendChild(text);

    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Закрыть';
    closeBtn.style.padding = '0.5rem 1.5rem';
    closeBtn.style.fontSize = '1rem';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '6px';
    closeBtn.style.background = '#007bff';
    closeBtn.style.color = '#fff';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.transition = 'background 0.2s';
    closeBtn.onmouseenter = () => {
        closeBtn.style.background = '#0056b3';
    };
    closeBtn.onmouseleave = () => {
        closeBtn.style.background = '#007bff';
    };
    closeBtn.onclick = () => {
        document.body.removeChild(overlay);
    };
    modal.appendChild(closeBtn);

    overlay.appendChild(modal);
    overlay.onclick = (e) => {
        if (e.target === overlay) document.body.removeChild(overlay);
    };
    document.body.appendChild(overlay);
}
