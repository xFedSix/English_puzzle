export class StartPageElements {
    parent: HTMLElement;

    element: HTMLElement;

    constructor(parent: HTMLElement, elementType: string, text?: string) {
        this.parent = parent;
        this.element = document.createElement(elementType);
        if (text) this.element.innerHTML = text;
        this.parent.appendChild(this.element);
    }

    static createWrapper(parent: HTMLElement): HTMLElement {
        return new StartPageElements(parent, 'div').element;
    }

    static createHeader(parent: HTMLElement): HTMLElement {
        return new StartPageElements(parent, 'header').element;
    }

    static createH1(parent: HTMLElement, text: string): HTMLElement {
        return new StartPageElements(parent, 'h1', text).element;
    }

    static createP(parent: HTMLElement, text: string): HTMLElement {
        return new StartPageElements(parent, 'p', text).element;
    }

    static createButton(parent: HTMLElement, text: string): HTMLElement {
        return new StartPageElements(parent, 'button', text).element;
    }

    addStartPageElement(elementType: string, text?: string) {
        return new StartPageElements(this.parent, elementType, text).element;
    }
}
