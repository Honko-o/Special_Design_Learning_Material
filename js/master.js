const landingPageContainer = document.querySelector('.landing-page');
let randomImageStatus = true;
let interval;

const imageArr = [
    'img-1.jpg',
    'img-2.jpg',
    'img-3.jpg',
    'img-4.jpg',
    'img-5.jpg',
];
const isRandomImageOption = localStorage.getItem('random-image-option');
const randomBGOptions = document.querySelectorAll('.random-bg-option span');

if (isRandomImageOption !== null) {
    randomBGOptions.forEach((span) => span.classList.remove('active'));

    if (isRandomImageOption === 'true ') {
        randomBGOptions[0].classList.add('active');
    } else {
        randomBGOptions[1].classList.add('active');
    }
} else {
    randomizeBgImages();
}

// Color Pick Logic
const colorsList = Array.from(document.querySelectorAll('.colors li'));

if (localStorage.getItem('color-option') !== null) {
    document.documentElement.style.setProperty(
        '--main-color',
        localStorage.getItem('color-option')
    );
    document
        .querySelector(`[data-color='${localStorage.getItem('color-option')}']`)
        .classList.add('active');
} else {
    colorsList[0].classList.add('active');
}

colorsList.forEach((color) => {
    color.addEventListener('click', (event) => {
        handleActive(event);

        document.documentElement.style.setProperty(
            '--main-color',
            event.target.dataset.color
        );
        localStorage.setItem('color-option', event.target.dataset.color);
    });
});

// Active Class on Random Images Option

randomBGOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
        handleActive(event);

        // Logic To Change Randomize BG Images
        if (event.target.dataset.background === 'yes') {
            randomImageStatus = true;
            localStorage.setItem('random-image-option', randomImageStatus);

            randomizeBgImages();
        } else if (event.target.dataset.background === 'no') {
            randomImageStatus = false;
            localStorage.setItem('random-image-option', randomImageStatus);

            randomizeBgImages();
        }
    });
});

// Show Bullets
// Navigation Bullets
const navBulletsContainer = document.querySelector('.navigation-bullets');
const navBullets = document.querySelectorAll('.navigation-bullets .bullet');
const navigationLinks = document.querySelectorAll('.landing-page ul a');
const bulletShowStorage = localStorage.getItem('show-bullets-option');
const showBulletOptions = document.querySelectorAll(
    '.show-bullets-option span'
);
let bulletShow;

if (bulletShowStorage !== null) {
    showBulletOptions.forEach((option) => option.classList.remove('active'));
    if (bulletShowStorage === 'true') {
        bulletShow = true;
        navBulletsContainer.style.display = 'block';
        showBulletOptions[0].classList.add('active');
    } else {
        bulletShow = false;
        navBulletsContainer.style.display = 'none';
        showBulletOptions[1].classList.add('active');
    }
} else {
    bulletShow = true;
    navBulletsContainer.style.display = 'block';
}

showBulletOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
        handleActive(event);

        if (event.target.dataset.display === 'block') {
            bulletShow = true;

            navBulletsContainer.style.display = 'block';

            localStorage.setItem('show-bullets-option', bulletShow);
        } else if (event.target.dataset.display === 'none') {
            bulletShow = false;

            navBulletsContainer.style.display = 'none';

            localStorage.setItem('show-bullets-option', bulletShow);
        }
    });
});

console.log(showBulletOptions);

// Open Setting Box Logic
document.querySelector('.gear').addEventListener('click', function () {
    document.querySelector('.setting-box').classList.toggle('open');
    document.querySelector('.gear svg').classList.toggle('fa-spin');
});

// Skills Animation
const skills = document.querySelector('.skills');

window.onscroll = function () {
    // Skills Offset top
    let skillsOffsetTop = skills.offsetTop;
    // console.log(`skillsOffsetTop = ${skillsOffsetTop}`);

    // Skills Outer Height
    let skillsOuterHeight = skills.offsetHeight;
    // console.log(`skillsOuterHeight = ${skillsOuterHeight}`);

    // Window Height
    let windowHeight = this.innerHeight;
    // console.log(`windowHeight = ${windowHeight}`);

    // Window Scroll top
    let windowScrollTop = this.scrollY;
    // console.log(`windowScrollTop = ${windowScrollTop}`);

    if (windowScrollTop > skillsOuterHeight + skillsOffsetTop - windowHeight) {
        let allSkills = document.querySelectorAll('.skill-progress span');

        allSkills.forEach((skill) => (skill.style.width = skill.dataset.width));
    }
};

// Start Galley Box Popup
const galleryBoxContainer = document.querySelector('.gallery-box');
const galleryBoxes = Array.from(
    galleryBoxContainer.querySelectorAll('div img')
);

galleryBoxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        generateGalleryPopup(e);
    });
});

// Close Button Event Listener
document.addEventListener('click', (e) => {
    if (e.target.classList == 'close') {
        e.target.parentElement.remove();
        document.querySelector('.gallery-overlay').remove();
    } else if (e.target.classList == 'gallery-overlay') {
        e.target.nextSibling.remove();
        e.target.remove();
    }
});

// Reset Options
document.querySelector('.reset-options').addEventListener('click', () => {
    localStorage.clear();

    window.location.reload();
});

//  Burger Menu Link Logic
const linksContainer = document.querySelector('.links-container');
const toggleMenuBtn = document.querySelector('.toggle-menu');
toggleMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    linksContainer.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (e.target !== linksContainer && e.target !== toggleMenuBtn) {
        if (linksContainer.classList.contains('open')) {
            linksContainer.classList.remove('open');
        }
    }
});

document
    .querySelector('.links-container')
    .addEventListener('click', (e) => e.stopPropagation());

scrollToElement(navBullets);
scrollToElement(navigationLinks);

// Randomize BG Images Function
function randomizeBgImages() {
    if (randomImageStatus) {
        interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * imageArr.length);

            landingPageContainer.style.backgroundImage = `url('../imgs/${imageArr[randomNumber]}')`;
        }, 5000);
        randomImageStatus = true;
    } else {
        clearInterval(interval);
        randomImageStatus = false;
    }
}
function scrollToElement(element) {
    element.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            document
                .querySelector(e.target.dataset.section)
                .scrollIntoView({ behavior: 'smooth' });
        });
    });
}
function handleActive(event) {
    event.target.parentElement
        .querySelectorAll('.active')
        .forEach((element) => {
            element.classList.remove('active');
        });

    event.target.classList.add('active');
}
function generateGalleryPopup(event) {
    const overlay = document.createElement('div');
    let altTitle = event.target.alt !== '' ? event.target.alt : 'Image';

    overlay.classList.add('gallery-overlay');
    document.body.appendChild(overlay);

    const galleryPopup = document.createElement('div');

    galleryPopup.classList.add('gallery-popup');

    const galleryImageContainer = document.createElement('div');

    galleryImageContainer.classList.add('image');

    const galleryImageTitle = document.createElement('h2');

    const galleryImageTitleText = document.createTextNode(altTitle);

    galleryImageTitle.appendChild(galleryImageTitleText);

    galleryImageContainer.appendChild(galleryImageTitle);

    const galleryImage = document.createElement('img');
    galleryImage.src = event.target.src;

    galleryImageContainer.appendChild(galleryImage);

    const closeButton = document.createElement('div');
    closeButton.classList.add('close');

    closeButton.appendChild(document.createTextNode('X'));

    galleryImageContainer.appendChild(closeButton);

    galleryPopup.appendChild(galleryImageContainer);

    document.body.appendChild(galleryPopup);
}
