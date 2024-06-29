import './style.css';
document.querySelectorAll<HTMLElement>('.menu_element').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

const carousel = document.querySelector<HTMLElement>('.cards');
const cards = document.querySelectorAll<HTMLElement>('.card');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0;

if (prevButton) {
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        if (currentIndex < (carousel?.children.length || 0) - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
}

function updateCarousel() {
    if (carousel) {
        cards.forEach(card => {
            const offset = -currentIndex * (card.clientWidth + 2 * parseFloat(getComputedStyle(card).borderRightWidth) + parseFloat(getComputedStyle(carousel).gap));
            card.style.transform = `translateX(${offset}px)`;
        });
    }
}

const comic = document.getElementById('comic');
if (comic) {
    comic.addEventListener('click', () => {
        window.open('./comic.html', '_blank');
    });
}