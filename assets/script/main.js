const tweetInput = document.getElementById('tweetInput');
const tweetButton = document.getElementById('tweetButton');
const tweetsContainer = document.getElementById('tweetsContainer');
const toggleThemeBtn = document.getElementById('toggleTheme');
const errorMessage = document.getElementById('errorMessage');
const charCount = document.getElementById('charCount');

const LIMITE = 150;

function atualizarContador() {
    const restante = LIMITE - tweetInput.value.length;
    charCount.textContent = `${restante} caracteres restantes`;
    charCount.classList.toggle('alerta', restante === 0);
}

function criarTweet(texto) {
    const tweet = document.createElement('div');
    tweet.className = 'tweet';

    const conteudo = document.createElement('p');
    const textoFormatado = texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
    conteudo.innerHTML = `<strong>@Tu ai</strong>:<br>${textoFormatado}`;

    const botao = document.createElement('button');
    botao.textContent = 'Apagar';
    botao.className = 'delete-btn';
    botao.onclick = () => tweet.remove();

    tweet.append(conteudo, botao);
    return tweet;
}

tweetInput.oninput = () => {
    if (tweetInput.value.length > LIMITE) {
        tweetInput.value = tweetInput.value.slice(0, LIMITE);
    }
    atualizarContador();
};

tweetButton.onclick = () => {
    const texto = tweetInput.value.trim();
    if (!texto) {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    tweetsContainer.prepend(criarTweet(texto));
    tweetInput.value = '';
    atualizarContador();
};

toggleThemeBtn.onclick = () => {
    const escuro = document.body.classList.toggle('dark-theme');
    toggleThemeBtn.textContent = escuro ? 'Tema Claro' : 'Tema Escuro';
};

window.onload = atualizarContador;
