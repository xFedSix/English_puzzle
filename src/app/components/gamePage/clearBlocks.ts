import { initElements } from '../constants';

/**
 * Очищает содержимое блоков resultBlock и sourceBlock
 */
export function clearBlocks() {
    const { resultBlock, sourceBlock } = initElements();
    if (resultBlock) {
        resultBlock.innerHTML = '';
    }
    if (sourceBlock) {
        sourceBlock.innerHTML = '';
    }
}
