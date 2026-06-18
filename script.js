document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.cta-button');
    if(button) {
        button.addEventListener('click', () => {
            alert('Welcome to erzed agent! In a real app, this would trigger the authentication flow.');
        });
    }

    const cards = document.querySelectorAll('.feature-card');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });
    }
});
