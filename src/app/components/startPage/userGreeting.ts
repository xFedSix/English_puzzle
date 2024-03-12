import { StartPageElements } from './createStartPageElements';

export function getPersonalizedGreeting() {
    const firstName = localStorage.getItem('firstName');

    const lastName = localStorage.getItem('lastName');

    const greeting =
        firstName && lastName ? `Hello <span>${firstName} ${lastName}</span>, glad to see you again!` : 'Welcome!';

    const gameTitle = document.getElementById('game-title');
    if (gameTitle) {
        const personalizedGreeting = StartPageElements.createP(gameTitle, 'p');
        personalizedGreeting.innerHTML = greeting;
        gameTitle.insertAdjacentElement('beforebegin', personalizedGreeting);
        personalizedGreeting.classList.add('greeting');
    }
}
