export function storeUser(firstName: string, lastName: string) {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
}
