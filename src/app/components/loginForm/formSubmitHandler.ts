import { clearErrors } from './clearErrors';
import { UserForm } from './login';
import { validateForm } from './loginFormValidation';

export function formSubmitHandler(
    form: HTMLFormElement,
    firstNameInput: HTMLInputElement,
    lastNameInput: HTMLInputElement,
    formState: UserForm
) {
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        clearErrors(firstNameInput);
        clearErrors(lastNameInput);
        const validationMessage = validateForm(firstNameInput.value, lastNameInput.value);
        const firstNameError = document.createElement('span');
        const lastNameError = document.createElement('span');
        if (typeof validationMessage === 'string') {
            if (
                validationMessage !== 'Form submitted successfully!' &&
                firstNameInput.parentNode !== null &&
                lastNameInput.parentNode !== null
            ) {
                firstNameError.textContent = validationMessage;
                firstNameInput.parentNode.insertBefore(firstNameError, firstNameInput.nextSibling);

                lastNameError.textContent = validationMessage;
                lastNameInput.parentNode.insertBefore(lastNameError, lastNameInput.nextSibling);
                return;
            }
            const userForm = { ...formState };
            userForm.firstName = firstNameInput.value;
            userForm.lastName = lastNameInput.value;
            alert('Form submitted successfully!');
            return;
        }
        if (
            !(
                typeof validationMessage === 'object' &&
                firstNameInput.parentNode !== null &&
                lastNameInput.parentNode !== null
            )
        ) {
            return;
        }
        firstNameError.textContent = validationMessage.firstName;
        firstNameInput.parentNode.insertBefore(firstNameError, firstNameInput.nextSibling);

        lastNameError.textContent = validationMessage.lastName;
        lastNameInput.parentNode.insertBefore(lastNameError, lastNameInput.nextSibling);
    });
}
