export class GamePage {
    wrapper: HTMLElement;

    p: HTMLElement;

    constructor() {
        this.wrapper = document.createElement('div');
        this.p = document.createElement('p');
    }

    render(parent: HTMLElement) {
        this.wrapper = parent;
        this.wrapper.appendChild(this.p);

        this.p.textContent = 'Game Page';
    }
}
