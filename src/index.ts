import './style.css';
import { UserNameEntryPage } from './app/components/loginForm/login';
import { formSubmitHandler } from './app/components/loginForm/formSubmitHandler';

const userNameEntryPage = new UserNameEntryPage();
userNameEntryPage.initializeForm();
formSubmitHandler(
    userNameEntryPage.form,
    userNameEntryPage.firstNameInput,
    userNameEntryPage.lastNameInput,
    userNameEntryPage.formState
);
