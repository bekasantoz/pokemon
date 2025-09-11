// Seleciona elementos do DOM
const body = document.querySelector('body');
const ash = document.querySelector('#ash');
const audio = document.querySelector('#audio');
const reset = document.querySelector('#reset');
const musicControl = document.querySelector('#music-control');
const scoreElement = document.querySelector('#score');

// Pokémons
const pikachu = document.querySelector('#pikachu');
const zubat = document.querySelector('#zubat');
const charmander = document.querySelector('#charmander');
const pokemons = [pikachu, zubat, charmander];

// Configurações iniciais
audio.volume = 0.1; // volume inicial
let score = 0;

// Atualiza o placar
function updateScore() {
    scoreElement.textContent = `Pokémons capturados: ${score}`;
}

// Obter posições do Ash
function getLeftPosition() {
    return parseInt(ash.style.left) || 2;
}

function getBottomPosition() {
    return parseInt(ash.style.bottom) || 100;
}

// Detecta colisão entre Ash e um Pokémon
function isCollision(pokemon) {
    const ashRect = ash.getBoundingClientRect();
    const pokeRect = pokemon.getBoundingClientRect();

    return !(
        ashRect.right < pokeRect.left ||
        ashRect.left > pokeRect.right ||
        ashRect.bottom < pokeRect.top ||
        ashRect.top > pokeRect.bottom
    );
}

// Checa se Ash encontrou algum Pokémon
function checkPokemons() {
    pokemons.forEach((pokemon) => {
        if (!pokemon.captured && isCollision(pokemon) && pokemon.style.display !== "none") {
            pokemon.captured = true;
            pokemon.style.display = "none"; // esconde ao capturar
            score += 10;
            updateScore();
        }
    });
}

// Inicializa placar
updateScore();

// Movimento do Ash com setas
body.addEventListener("keydown", (event) => {
    const maxLeft = 1200;
    const maxBottom = 625;
    const minEdge = 0;

    switch (event.code) {
        case "ArrowLeft":
            if (getLeftPosition() > minEdge) {
                ash.src = "assets/left.png";
                ash.style.left = `${getLeftPosition() - 8}px`;
            }
            break;
        case "ArrowRight":
            if (getLeftPosition() < maxLeft) {
                ash.src = "assets/right.png";
                ash.style.left = `${getLeftPosition() + 8}px`;
            }
            break;
        case "ArrowDown":
            if (getBottomPosition() > minEdge) {
                ash.src = "assets/front.png";
                ash.style.bottom = `${getBottomPosition() - 8}px`;
            }
            break;
        case "ArrowUp":
            if (getBottomPosition() < maxBottom) {
                ash.src = "assets/back.png";
                ash.style.bottom = `${getBottomPosition() + 8}px`;
            }
            break;
        default:
            break;
    }

    // Verifica colisões após o movimento
    setTimeout(checkPokemons, 0);
});

// Controle da música
musicControl.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOn = event.target.src.includes('on');
    event.target.src = isOn ? 'assets/icons/music-off.png' : 'assets/icons/on.png';
    audio.paused ? audio.play() : audio.pause();
});

// Botão de reset
reset.addEventListener('click', () => {
    // Reset posição Ash
    ash.style.left = "2px";
    ash.style.bottom = "100px";
    ash.src = "assets/front.png";

    // Reset placar
    score = 0;
    updateScore();

    // Reset Pokémons
    pokemons.forEach(pokemon => {
        pokemon.captured = false;
        pokemon.style.display = "none";
    });
});
