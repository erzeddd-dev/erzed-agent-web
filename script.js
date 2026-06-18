document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('tiktok-login-btn');
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate UI/UX loading state
            button.innerHTML = '<span class="loading-spinner"></span> Authenticating...';
            button.style.opacity = '0.8';
            button.style.cursor = 'wait';

            // Bypass real TikTok Auth for Sandbox Demo video recording
            // Direct user straight to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = "dashboard.html?code=sandbox_demo_success";
            }, 1500);
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
