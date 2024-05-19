"use strict";
const animalsCont = document.querySelector('.animals');
const startGameButton = document.querySelector('.startGameButton');
const chooseAnimalDiv = document.querySelector('.chooseAnimal');
const level = document.querySelector('.level');
const startedGameDiv = document.querySelector('.startedGameDiv');
const pet = document.querySelector('.petCont');
const imgAnimalElement = pet.querySelector('img');
const hpBarColored = document.querySelector('.hpBarColored');
const hungryBarColored = document.querySelector('.hungryBarColored');
const funBarColored = document.querySelector('.funBarColored');
const gameOverDiv = document.querySelector('.gameOver');
const feedBtn = document.querySelector('.feed');
const playBtn = document.querySelector('.play');
const snack = document.querySelector('.snack');
const memoryGameDiv = document.querySelector('.memoryGameDiv');
const tilesContainer = document.querySelector('.tiles');
const colors = ['aqua', 'aquamarine', 'crimson', 'blue', 'dodgerblue', 'gold', 'greenyellow', 'teal'];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;
// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
const foodImgArr = ["https://cdn.icon-icons.com/icons2/1529/PNG/512/u10t-render_106717.png", "https://cdn.icon-icons.com/icons2/1529/PNG/512/q-mark-copy_106724.png", "https://static.vecteezy.com/system/resources/thumbnails/013/743/633/small/banana-pixel-art-png.png", "https://www.pikpng.com/pngl/b/526-5262846_pixels-cute-kawaii-bunny-tumblr-food-snacks-kawaii.png", "https://64.media.tumblr.com/e991a29b07be29e3dd03786a1246290b/tumblr_o7y9of6xHm1uosm2eo1_400.png"];
const animalImgArr = ["https://tamagotchi-official.com/tamagotchi/jp/character/2023/06/03/F4WxefuBqQy3sq2g/%E3%81%86%E3%83%BC%E3%81%B1%E3%81%A3%E3%81%A1_%E6%9B%B8%E3%81%8D%E5%87%BA%E3%81%97%E6%AD%A3%E6%96%B9%E5%BD%A2.png?_=fbe8e1d70c59de270f8ccebd25b27811", "https://tamagotchi-official.com/tamagotchi/jp/character/2023/06/03/bfBUa57Abv7s6Aon/%E3%82%81%E3%82%81%E3%81%A3%E3%81%A1_%E6%9B%B8%E3%81%8D%E5%87%BA%E3%81%97%E6%AD%A3%E6%96%B9%E5%BD%A2.png?_=fbe8e1d70c59de270f8ccebd25b27811", "https://tamagotchi-official.com/tamagotchi/jp/character/2023/06/03/CgoIIIEPHSIiOR8d/%E3%81%B4%E3%81%93%E3%81%A1%E3%82%85%E3%81%A3%E3%81%A1_%E6%9B%B8%E3%81%8D%E5%87%BA%E3%81%97%E6%AD%A3%E6%96%B9%E5%BD%A2.png", "https://tiermaker.com/images/template_images/2022/15436473/tamagotchi-all-characters-v2-15436473/chamametchipng.png", "https://tamagotchi-official.com/tamagotchi/jp/character/2023/06/01/vmvwFIfcQhNWer4p/%E3%81%BE%E3%82%81%E3%81%A3%E3%81%A1_%E6%9B%B8%E3%81%8D%E5%87%BA%E3%81%97%E6%AD%A3%E6%96%B9%E5%BD%A2.png?_=fbe8e1d70c59de270f8ccebd25b27811", "https://cdn.comic.studio/images/tamagotchi/characters/fcd3399712dff3e9678b20f215f105f7/Melodytchi_blue_large.png", "https://tamagotchi-official.com/tamagotchi/jp/character/2023/06/04/f9DbkrXpku85kzN9/%E3%81%AD%E3%82%8A%E3%81%82%E3%81%A3%E3%81%A1_%E6%9B%B8%E3%81%8D%E5%87%BA%E3%81%97%E6%AD%A3%E6%96%B9%E5%BD%A2.png", "https://i.pinimg.com/originals/cb/6c/59/cb6c59bb9c4dc15d89aa864379988258.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg2Godx3IZDQzIuWZLZx-RIp4TcujDv-wDEHqIFKt7Fg&s", "https://toy.bandai.co.jp/assets/tamagotchi/images/smart/character/75/character.png"];
let animalLevel = 0;
let hp = 100;
let hunger = 5;
let fun = 5;
let isEating = false;
function updateAnimalLevel() {
    level.innerHTML = `<h2>Animal level: ${animalLevel}</h2>`;
}
function appendAnimals() {
    animalImgArr.forEach((animal, index) => {
        animalsCont.innerHTML += `
            <div class="animal">
                    <img src=${animal} alt="">
            </div>
    
    `;
    });
}
function chooseAnimal() {
    const animals = document.querySelectorAll('.animal');
    [...animals].forEach((animal, index) => {
        animal.onclick = () => {
            animals.forEach(animal => animal.classList.remove('chosenOne'));
            animal.classList.add('chosenOne');
        };
    });
}
function getImgSrc(callback) {
    startGameButton.onclick = () => {
        const chosenAnimal = document.querySelector('.animal.chosenOne');
        if (chosenAnimal) {
            const imgElement = chosenAnimal.querySelector('img');
            if (imgElement) {
                const src = imgElement.src;
                callback(src); // Pass the src to the callback
                chooseAnimalDiv.style.display = "none";
                startedGameDiv.style.display = "flex";
                pet.innerHTML = `
                    <img src="${src}" alt="">
                `;
                // console.log(src)
            }
        }
    };
}
function updateStats() {
    hpBarColored.style.width = `${hp}%`;
    funBarColored.style.width = `${fun}%`;
    hungryBarColored.style.width = `${hunger}%`;
    if (hp < 30) {
        hpBarColored.style.backgroundColor = "black";
    }
    else {
        hpBarColored.style.backgroundColor = "red";
    }
    if (fun < 30) {
        funBarColored.style.backgroundColor = "red";
    }
    else {
        funBarColored.style.backgroundColor = "#ffe79d";
    }
    if (hunger < 30) {
        hungryBarColored.style.backgroundColor = "red";
    }
    else {
        hungryBarColored.style.backgroundColor = "#a96100";
    }
}
getImgSrc((src) => {
    console.log(src); // You can log the src or perform any other action if needed
});
appendAnimals();
chooseAnimal();
updateAnimalLevel();
updateStats();
setInterval(() => {
    hunger -= 10;
    fun -= 10;
    if (hunger <= 0 || fun <= 0) {
        hp -= 10;
        if (hp <= 0) {
            gameOverDiv.style.display = "flex";
        }
    }
    updateStats();
}, 100000);
feedBtn.onclick = () => {
    if (hunger <= 100) {
        if (!isEating) {
            isEating = true;
            hunger += 5;
            snack.innerHTML = `
        <img src=${foodImgArr[Math.floor(Math.random() * foodImgArr.length)]} alt="">
        `;
            snack.style.display = "block";
            setTimeout(() => {
                snack.style.display = "none";
                isEating = false;
                updateStats();
            }, 2000);
        }
        else {
            alert(`I'm still eating!!!!!!`);
        }
    }
    else {
        alert("I'm not hungry!");
    }
};
playBtn.onclick = () => {
    if (fun <= 100) {
        memoryGameDiv.style.display = "flex";
        playGame();
    }
};
function playGame() {
    function buildTile(color) {
        const element = document.createElement('div');
        element.classList.add('tile');
        element.setAttribute("data-color", color);
        element.setAttribute("data-revealed", 'false');
        element.addEventListener("click", () => {
            const revealed = element.getAttribute('data-revealed');
            if (awaitingEndOfMove || revealed === 'true' || element === activeTile) {
                return;
            }
            element.style.backgroundColor = color;
            if (!activeTile) {
                activeTile = element;
                return;
            }
            const colorToMatch = activeTile.getAttribute("data-color");
            if (colorToMatch === color) {
                activeTile.setAttribute("data-revealed", 'true');
                element.setAttribute("data-revealed", 'true');
                activeTile = null;
                awaitingEndOfMove = false;
                revealedCount += 2;
                if (revealedCount === tileCount) {
                    alert('You win!');
                    memoryGameDiv.style.display = "none";
                    fun = 100;
                    updateStats();
                }
                return;
            }
            awaitingEndOfMove = true;
            setTimeout(() => {
                if (element && activeTile) {
                    // @ts-ignore
                    element.style.backgroundColor = null;
                    // @ts-ignore
                    activeTile.style.backgroundColor = null;
                    awaitingEndOfMove = false;
                    activeTile = null;
                }
            }, 1000);
        });
        return element;
    }
    for (let i = 0; i < tileCount; i++) {
        const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
        const color = colorsPicklist[randomIndex];
        const tile = buildTile(color);
        colorsPicklist.splice(randomIndex, 1);
        if (tilesContainer) {
            tilesContainer.appendChild(tile);
        }
    }
}
