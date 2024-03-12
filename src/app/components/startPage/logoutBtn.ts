import { checkLoginStatus } from '../../app';
import { StartPage } from './startPage';

export class LogoutButton {
    parentElement: HTMLElement;

    button: HTMLButtonElement;

    startPage: StartPage | undefined;

    confirmFunction: ((message?: string | undefined) => boolean) & ((message?: string | undefined) => boolean);

    constructor(parentElement: HTMLElement, startPage: StartPage) {
        this.parentElement = parentElement;
        this.button = document.createElement('button');
        this.button.textContent = 'Logout';
        this.button.addEventListener('click', this.logout.bind(this));
        this.confirmFunction = window.confirm.bind(window);
        this.startPage = startPage;
    }

    logout() {
        const confirmLogout = this.confirmFunction('Are you sure you want to logout?');

        if (confirmLogout) {
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');

            checkLoginStatus();
            if (this.startPage) {
                this.startPage.remove();
            }
        }
    }

    appendToParent() {
        if (this.parentElement) {
            this.parentElement.appendChild(this.button);
        }
    }
}
