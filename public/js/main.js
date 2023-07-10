const backdrop = document.querySelector('.backdrop');
const sideDrawser = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#toggle');

function backdropClickHandler() {
    backdrop.style.display = 'none';
    sideDrawser.classList.remove('open');
}

function menuToggleClickHandler () {
    backdrop.style.display = 'block';
    sideDrawser.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);

menuToggle.addEventListener('click', menuToggleClickHandler);
