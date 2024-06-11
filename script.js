let profile = document.querySelector('.profile');
let children = profile.children;
let maxHeight = 0;
for(let i = 0; i < children.length; i++){
    if (children[i].clientHeight > maxHeight){
        maxHeight = children[i].clientHeight;
    }
}
profile.style.height = maxHeight + 'px';


document.querySelectorAll('.menu_element').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});

const carousel = document.querySelector('.cards');
const cards = document.querySelectorAll('.card');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0;

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < carousel.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

function updateCarousel() {
    cards.forEach(a => {
        let offset = -currentIndex * (a.clientWidth +  2*parseFloat(window.getComputedStyle(a).borderRightWidth) + parseFloat(window.getComputedStyle(carousel).gap));
        a.style.transform = `translateX(${offset}px)`;
    })
}
 

