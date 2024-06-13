import data from './data.json' with {type: 'json'};

const container = document.querySelector('.cards');
const timeframeButtons = document.querySelectorAll('.btn');
const cardTemplate = document.getElementById('card-template').content;

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const getPreviousTimeLabel = (timeframe, previousTime) => {
    let label;
    switch (timeframe) {
        case 'daily':
            label = 'Yesterday';
            break
        case 'weekly':
            label= 'Last Week';
            break
        case 'monthly':
            label= 'Last Month';
            break
        default:
            label= '';
    }
    // Determine if the previous time is plural or singular
    const hoursLabel = previousTime === 1 ? 'hr' : 'hrs';
    return `${label} - ${previousTime}${hoursLabel}`;
}

const renderCards = (timeframe) => {
    container.innerHTML = '';

    data.forEach(item => {
        const cardClone = document.importNode(cardTemplate, true);
        cardClone.querySelector('.card--title').textContent = item.title;
        cardClone.querySelector('.card--current-time').textContent = `${item.timeframes[timeframe].current}hrs`;

        const previousTimeLabel = getPreviousTimeLabel(timeframe, item.timeframes[timeframe].previous);

        cardClone.querySelector('.card--previous-time').textContent = previousTimeLabel;

        const category = item.title.toLowerCase().replace(/\s+/g, '-');
        cardClone.querySelector('.card').setAttribute('data-category', category);

        container.appendChild(cardClone);
    });
};

    timeframeButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeframeButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        renderCards(button.dataset.timeframe); // Pulls this from the button's data attribute
        });
    });
    
renderCards('daily');


