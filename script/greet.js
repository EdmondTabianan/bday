// greet.js
window.addEventListener('DOMContentLoaded', () => {
    const flowers = document.querySelectorAll('.flower');
    const card = document.querySelector('.greet');

    // Get card dimensions and position
    const cardRect = card.getBoundingClientRect();
    const margin = 20; // safe distance from the card

    const placed = [];

    flowers.forEach(flower => {
        let attempts = 0;
        let maxAttempts = 50;
        let pos;
        let size;

        do {
            size = 60 + Math.random() * 80; // flower size: 60px - 140px
            const top = Math.random() * (window.innerHeight - size);
            const left = Math.random() * (window.innerWidth - size);

            pos = { top, left, size };

            attempts++;
        } while (
            isOverlappingCard(pos, cardRect, margin) || 
            isOverlappingFlowers(pos, placed) && attempts < maxAttempts
        );

        flower.style.width = `${pos.size}px`;
        flower.style.height = `${pos.size}px`;
        flower.style.top = `${pos.top}px`;
        flower.style.left = `${pos.left}px`;

        placed.push(pos);
    });

    function isOverlappingCard(flower, cardRect, margin) {
        return !(
            flower.left + flower.size < cardRect.left - margin ||
            flower.left > cardRect.right + margin ||
            flower.top + flower.size < cardRect.top - margin ||
            flower.top > cardRect.bottom + margin
        );
    }

    function isOverlappingFlowers(flower, others) {
        return others.some(other => {
            const dx = flower.left + flower.size/2 - (other.left + other.size/2);
            const dy = flower.top + flower.size/2 - (other.top + other.size/2);
            const distance = Math.sqrt(dx*dx + dy*dy);
            return distance < (flower.size/2 + other.size/2 + 10); // 10px buffer
        });
    }
});
