export type UserForm = {
    firstName: string;
    lastName: string;
};

export class UserNameEntryPage {
    public formState: UserForm;

    public form: HTMLFormElement;

    public firstNameInput: HTMLInputElement;

    public lastNameInput: HTMLInputElement;

    public submitButton: HTMLButtonElement;

    constructor() {
        this.formState = {
            firstName: '',
            lastName: '',
        };

        this.form = document.createElement('form');
        this.form.classList.add('user-form');
        this.firstNameInput = this.createInput('text', 'firstName', 'First Name:');
        this.lastNameInput = this.createInput('text', 'lastName', 'Last Name:');
        this.submitButton = document.createElement('button');
        this.initializeForm();
    }

    private createInput(type: string, name: string, labelText: string): HTMLInputElement {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.required = true;

        const label = document.createElement('label');
        label.textContent = labelText;

        this.form.appendChild(label);
        this.form.appendChild(input);

        return input;
    }

    public initializeForm(): void {
        this.submitButton.type = 'submit';
        this.submitButton.textContent = 'Login';
        this.form.appendChild(this.submitButton);

        document.body.appendChild(this.form);
    }
}
