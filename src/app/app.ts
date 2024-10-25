import { UserNameEntryPage } from './components/loginForm/login';
import { formSubmitHandler } from './components/loginForm/formSubmitHandler';
import { StartPage } from './components/startPage/startPage';

export function checkLoginStatus() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    if (firstName && lastName) {
        const startPage = new StartPage();
        startPage.render(document.body);
        return;
    }
    const userNameEntryPage = new UserNameEntryPage();
    userNameEntryPage.initializeForm();
    formSubmitHandler(
        userNameEntryPage.form,
        userNameEntryPage.firstNameInput,
        userNameEntryPage.lastNameInput,
        userNameEntryPage.formState
    );
}
