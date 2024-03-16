export function toggleButtonClasses(button: HTMLElement, classToAdd: string, classToRemove: string) {
    button.classList.add(classToAdd);
    button.classList.remove(classToRemove);
}
