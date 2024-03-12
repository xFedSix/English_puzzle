import { StartPage } from '../startPage/startPage';

export function removeForm(form: HTMLFormElement) {
    if (form.parentNode !== null) {
        form.parentNode.removeChild(form);
        const startPage = new StartPage(document.body);
        startPage.render(document.body);
    }
}
