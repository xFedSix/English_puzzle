export function clearErrors(inputElement: HTMLInputElement) {
    if (inputElement.parentNode !== null) {
        const nextElement = inputElement.nextSibling;
        if (nextElement && nextElement.nodeName === 'SPAN') {
            inputElement.parentNode.removeChild(nextElement);
        }
    }
}
