type UserForm = {
    firstName: string;
    lastName: string;
};

export class UserNameEntryPage {
    private formState: UserForm;

    private form: HTMLFormElement;

    private firstNameInput: HTMLInputElement;

    private lastNameInput: HTMLInputElement;

    private submitButton: HTMLButtonElement;

    constructor() {
        this.formState = {
            firstName: '',
            lastName: '',
        };

        this.form = document.createElement('form');
        this.form.classList.add('user-form');
        this.firstNameInput = document.createElement('input');
        this.lastNameInput = document.createElement('input');
        this.submitButton = document.createElement('button');
    }

    public initializeForm(): void {
        this.firstNameInput.type = 'text';
        this.firstNameInput.name = 'firstName';
        this.firstNameInput.required = true;
        const firstNameLabel = document.createElement('label');
        firstNameLabel.textContent = 'First Name:';
        this.form.appendChild(firstNameLabel);
        this.form.appendChild(this.firstNameInput);
        this.lastNameInput.type = 'text';
        this.lastNameInput.name = 'lastName';
        this.lastNameInput.required = true;
        const lastNameLabel = document.createElement('label');
        lastNameLabel.textContent = 'Last Name:';
        this.form.appendChild(lastNameLabel);
        this.form.appendChild(this.lastNameInput);

        this.submitButton.type = 'submit';
        this.submitButton.textContent = 'Login';
        this.form.appendChild(this.submitButton);

        document.body.appendChild(this.form);
    }
}
