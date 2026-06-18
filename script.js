// =============================
// erzed agent - TikTok Login Kit
// =============================

const TIKTOK_CONFIG = {
    clientKey: "sbawe0zikwb3u4jas7",
    redirectUri: "https://erzed-agent.vercel.app/dashboard.html",
    // Scopes: Login Kit + Content Posting API
    scope: "user.info.basic,user.info.profile,user.info.stats,video.list"
};

// --- PKCE Helper Functions (for secure OAuth without backend) ---
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return hash;
}

function base64UrlEncode(buffer) {
    const bytes = new Uint8Array(buffer);
    let str = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function startTikTokLogin() {
    const codeVerifier = generateRandomString(64);
    sessionStorage.setItem('tiktok_code_verifier', codeVerifier);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64UrlEncode(hashed);
    const state = generateRandomString(16);
    sessionStorage.setItem('tiktok_state', state);

    const params = new URLSearchParams({
        client_key: TIKTOK_CONFIG.clientKey,
        response_type: 'code',
        scope: TIKTOK_CONFIG.scope,
        redirect_uri: TIKTOK_CONFIG.redirectUri,
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
    });

    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
    window.location.href = authUrl;
}

// --- Main Page Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Login button
    const loginBtn = document.getElementById('tiktok-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            loginBtn.innerHTML = '⏳ Connecting to TikTok...';
            loginBtn.disabled = true;
            loginBtn.style.opacity = '0.7';
            await startTikTokLogin();
        });
    }

    // Feature card animations
    const cards = document.querySelectorAll('.feature-card');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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
