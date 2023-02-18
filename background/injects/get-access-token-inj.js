async function run() {
    const res = await fetch('https://chat.openai.com/api/auth/session');
    const data = await res.json().catch(() => ({}));
    return res.status === 200 && data.accessToken;
}
run();