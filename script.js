document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('tiktok-login-btn');
    if(button) {
        button.addEventListener('click', () => {
            // REPLACE THIS WITH YOUR ACTUAL TIKTOK CLIENT KEY
            const clientKey = "sbawe0zikwb3u4jas7";
            const redirectUri = encodeURIComponent("https://erzed-agent.vercel.app/dashboard.html");
            const scope = "user.info.basic,user.info.profile,user.info.stats,video.list";
            const tiktokAuthUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}&state=demo_state`;
            
            window.location.href = tiktokAuthUrl;
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
