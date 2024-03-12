import { LogoutButton } from './logoutBtn';

export class StartPage {
    element: HTMLElement;

    LogoutButton: LogoutButton | undefined;

    constructor(parent: HTMLElement) {
        this.element = document.createElement('header');
        parent.appendChild(this.element);
    }

    addLogoutButton() {
        this.LogoutButton = new LogoutButton(this.element, this);
        this.LogoutButton.appendToParent();
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element);
        const startPage = new StartPage(document.body);
        startPage.addLogoutButton();
    }

    remove() {
        if (this.element.parentNode !== null) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
