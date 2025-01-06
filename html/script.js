const galleryBox = document.getElementById('gallery-box');
const rulesBox = document.getElementById('rules-box');
const teamBox = document.getElementById('team-box');
const socialBox = document.getElementById('social-box');
const minigamesBox = document.getElementById('minigames-box');
const updatesBox = document.getElementById('updates-box');
const backgroundAudio = document.getElementById('background-audio');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const galleryImages = document.querySelectorAll('#gallery .content-image');
const minigamesImages = document.querySelectorAll('#minigames .content-image');
const gameContainer = document.getElementById('game-container');
const gameIframe = document.getElementById('game-iframe');

const toggleGalleryButton = document.getElementById('toggle-gallery-button');
const toggleRulesButton = document.getElementById('toggle-rules-button');
const toggleUpdatesButton = document.getElementById('toggle-updates-button');
const toggleTeamButton = document.getElementById('toggle-team-button');
const toggleSocialButton = document.getElementById('toggle-social-button');
const toggleMinigamesButton = document.getElementById('toggle-minigames-button');

let isGalleryVisible = true;
let isRulesVisible = true;
let isTeamVisible = true;
let isSocialVisible = true;
let isMinigamesVisible = true;
let isUpdatesVisible = true;

window.addEventListener('DOMContentLoaded', () => {
    try {
        backgroundAudio.play().catch(error => {
            console.warn('Ses otomatik oynatılamadı:', error);
        });
    } catch (error) {
        console.error('Ses oynatma hatası:', error);
    }

    let count = 0;
    const totalAssets = GetParentResourceName();

    const updateProgress = (progress) => {
        const progressBar = document.querySelector('.progress');
        const progressText = document.querySelector('.progress-text');
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.floor(progress)}%`;
    };

    window.addEventListener('onResourceLoadTick', (data) => {
        count++;
        const progress = (count / totalAssets) * 100;
        updateProgress(progress);
    });
});

const toggleBox = (box, button, isVisible, visibilityState) => {
    box.classList.toggle('hidden');
    button.textContent = visibilityState ? '>' : '<';
    return !visibilityState;
};

toggleGalleryButton.addEventListener('click', () => {
    isGalleryVisible = toggleBox(galleryBox, toggleGalleryButton, isGalleryVisible, isGalleryVisible);
});

toggleUpdatesButton.addEventListener('click', () => {
    isUpdatesVisible = toggleBox(updatesBox, toggleUpdatesButton, isUpdatesVisible, isUpdatesVisible);
});

toggleRulesButton.addEventListener('click', () => {
    isRulesVisible = toggleBox(rulesBox, toggleRulesButton, isRulesVisible, isRulesVisible);
});

toggleTeamButton.addEventListener('click', () => {
    isTeamVisible = toggleBox(teamBox, toggleTeamButton, isTeamVisible, isTeamVisible);
});

toggleSocialButton.addEventListener('click', () => {
    isSocialVisible = toggleBox(socialBox, toggleSocialButton, isSocialVisible, isSocialVisible);
});

toggleMinigamesButton.addEventListener('click', () => {
    isMinigamesVisible = toggleBox(minigamesBox, toggleMinigamesButton, isMinigamesVisible, isMinigamesVisible);
});

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        modalImage.src = image.src;
        modal.classList.add('visible');
    });
});

const createInfoDiv = () => {
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('developer-info');
    document.body.appendChild(infoDiv);
    return infoDiv;
};

const infoDiv = createInfoDiv();

const handleImageHover = (images) => {
    images.forEach(image => {
        let isMouseOver = false;

        image.addEventListener('mouseenter', (e) => {
            const title = e.target.getAttribute('data-title');
            const name = e.target.getAttribute('data-name');

            infoDiv.style.opacity = 0;
            setTimeout(() => {
                infoDiv.style.display = 'none';
            }, 300);

            setTimeout(() => {
                infoDiv.innerHTML = `<strong>${title}</strong><br>${name}`;
                const rect = e.target.getBoundingClientRect();
                infoDiv.style.left = `${rect.left + rect.width / 2 - infoDiv.offsetWidth / 2}px`;
                infoDiv.style.top = `${rect.top + window.scrollY + rect.height + 10}px`;
                infoDiv.style.display = 'block';
                setTimeout(() => {
                    infoDiv.style.opacity = 1;
                }, 10);
            }, 300);

            isMouseOver = true;
        });

        image.addEventListener('mousemove', (e) => {
            if (isMouseOver) {
                const rect = e.target.getBoundingClientRect();
                infoDiv.style.left = `${rect.left + rect.width / 2 - infoDiv.offsetWidth / 2}px`;
                infoDiv.style.top = `${rect.top + window.scrollY + rect.height + 10}px`;
            }
        });

        image.addEventListener('mouseleave', () => {
            if (isMouseOver) {
                infoDiv.style.opacity = 0;
                setTimeout(() => {
                    infoDiv.style.display = 'none';
                }, 300);
            }
            isMouseOver = false;
        });
    });
};

handleImageHover(document.querySelectorAll('#social .content-image'));

const gameLinks = [
    'https://subway-surfers.org/winter-holiday/',
    'https://html5.gamedistribution.com/2d44a0c8ce704965b2031bcc4ae6a9a8/?utm_source=bubbleshooter.net&utm_medium=going-balls&utm_campaign=block-and-redirect',
    'https://www.bubbleshooter.net/embed.php?id=1652',
    'https://html5.gamedistribution.com/d02120780e594158ab61869028223cf1/?utm_source=bubbleshooter.net&utm_medium=8-ball-pool&utm_campaign=block-and-redirect'
];

minigamesImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        gameIframe.src = gameLinks[index];
        gameContainer.classList.add('visible');
    });
});

document.getElementById('close-modal').addEventListener('click', () => {
    modal.classList.remove('visible');
});

document.getElementById('close-game').addEventListener('click', () => {
    gameContainer.classList.remove('visible');
    gameIframe.src = '';
});

window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        modal.classList.remove('visible');
        gameContainer.classList.remove('visible');
        gameIframe.src = '';
    } else if (e.code === 'Space') {
        e.preventDefault(); 

        if (backgroundAudio.paused) {
            backgroundAudio.play()
                .catch((error) => {
                    console.error('Ses oynatılamadı:', error);
                });
        } else {
            backgroundAudio.pause();
        }
    }
});

document.querySelectorAll('.scroll-container').forEach(container => {
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });
});
