export const namePattern: RegExp = /^[A-Za-z-]+$/;

export const uppercaseFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const minFirstNameLength: number = 3;
export const minLastNameLength: number = 4;

export function validateForm(firstName: string, lastName: string): string | { firstName: string; lastName: string } {
    const errors = {
        firstName: '',
        lastName: '',
    };
    if (!namePattern.test(firstName)) {
        errors.firstName = 'Names can only contain English alphabet letters and the hyphen symbol.';
    }
    if (!namePattern.test(lastName)) {
        errors.lastName = 'Names can only contain English alphabet letters and the hyphen symbol.';
    }

    if (firstName !== uppercaseFirstLetter(firstName)) {
        errors.firstName = 'The first letter of each field must be in uppercase.';
    }
    if (lastName !== uppercaseFirstLetter(lastName)) {
        errors.lastName = 'The first letter of each field must be in uppercase.';
    }

    if (firstName.length < minFirstNameLength) {
        errors.firstName = `The first name must be at least ${minFirstNameLength} characters long.`;
    }
    if (lastName.length < minLastNameLength) {
        errors.lastName = `The surname must be at least ${minLastNameLength} characters long.`;
    }
    return errors.firstName === '' && errors.lastName === '' ? 'Form submitted successfully!' : errors;
}
