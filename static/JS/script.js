const player = document.querySelector('.player');
const wheel = document.querySelector('.wheel');
const clouds = document.querySelector('.clouds')
const coin = document.querySelector('.coin')
const progress = document.querySelector('.progress')
const numberXP = document.querySelector('.numberXP')
const levelName = document.querySelector('.levelName')
const fogos = document.querySelector('.fogos')
const textStart = document.querySelector('.textStart')
const explan = document.querySelector('.explan')
const limit = document.querySelector('.limit')
const popup = document.querySelector('.popup')

const valueNivel = document.querySelector('.valueNivel')
const valueCoins = document.querySelector('.valueCoins')
const valueXP = document.querySelector('.valueXP')
const valueBonus = document.querySelector('.valueBonus')
const valueTotal = document.querySelector('.valueTotal')

const best = document.querySelector('.best')
const best_valueNivel = document.querySelector('.best_valueNivel')
const best_valueCoins = document.querySelector('.best_valueCoins')
const best_valueXP = document.querySelector('.best_valueXP')
const best_valueBonus = document.querySelector('.best_valueBonus')
const best_valueTotal = document.querySelector('.best_valueTotal')

var countCoin = 0
var countProgress = 0
var level = 0
var start = 0
var XP = 0
var BONUS = 0
var totalXP = 0
var nivelName = '--'

// popup.style.display = 'flex';
popup.style.display = 'none';

// CONFIG GAME PLAY
function gamePlay(){
    start = 1
    textStart.classList.add('textHidden')
    explan.classList.add('explanHidden')
    setTimeout(() => {
        textStart.style.display = 'none'
        explan.style.display = 'none'
    }, 1500)
}
document.addEventListener('keydown', gamePlay);
document.addEventListener('touchstart', gamePlay);

const jump = () => {
    player.classList.add('jump');

    setTimeout(() => {
        player.classList.remove('jump');
    }, 500)
}

const loop = setInterval(() =>{
    
    const wheelPositionInterval = wheel.offsetLeft;
    const coinPositionInterval = coin.offsetLeft;
    const coinPosition = coin.offsetTop;
    const playerPositionInterval = +window.getComputedStyle(player).bottom.replace('px', '');
    const playerPosition = +window.getComputedStyle(player).top.replace('px', '');
    const cloudPositionInterval = clouds.offsetLeft;
    const limitPosition = limit.offsetLeft;

    if (wheelPositionInterval < limitPosition ){
        BONUS += 1
    }

    if(!start){        
        wheel.style.display = 'none';
    }

    if (level || !start){
        coin.style.display = 'none';
    }else{
        coin.style.display = 'block';
        wheel.style.display = 'block';
    }
    
    //  GET COINS
    if (playerPosition < coinPosition && playerPosition < coinPosition + 40){
        if (coinPositionInterval >= 15 && coinPositionInterval <= 100){
            countCoin += 1;
            XP += 10;
            countProgress += 1;
            numberXP.innerHTML = XP;
            coin.style.display = 'none';

            velocity()
            changeCoinStyle()
            changeProgress()
            nextLevel()            

            if (countProgress % 10 == 0){
                XP += 50;
                numberXP.innerHTML = XP
                countProgress = 0
            };            
        };
    };

    //  VERIFY GAME OVER
    if (!level && wheelPositionInterval <= 115 && wheelPositionInterval > 0 && playerPositionInterval < 55){
        wheel.style.animation = 'none';
        wheel.src = './static/img/wheel_stop.png';
        wheel.style.left = `${wheelPositionInterval}px`;
        
        coin.style.animation = 'none';
        coin.style.left = `${coinPositionInterval}px`

        player.style.animation = 'none';
        player.style.bottom = `${playerPositionInterval}px`;
        

        player.src = './static/img/game-over.png';
        player.style.width = '100px';
        player.style.marginLeft = '26px';

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudPositionInterval}px`;
        
        clearInterval(loop)
        popupGameover()
        reload()
    }

    //  VERIFY LEVEL
    if (level && wheelPositionInterval <= 115 && wheelPositionInterval > 0 && playerPositionInterval < 55){

        const levelSound = document.querySelector('.levelSound');
        levelSound.correntTime = 0;
        levelSound.volume = 0.05;
        levelSound.play()

        wheel.style.display = 'none'
        wheel.src = './static/img/wheel.gif';
        wheel.style.width = '60px'
        wheel.style.animation = 'wheel-animation 2s infinite linear'
        level = 0
        fogos.style.display = 'none'
        changeLevel()
        velocity()
    }
}, 10);  

function changeCoinStyle(){

    // COIN SOUND
    const soundCoin = document.querySelector('.coinSound');
    soundCoin.correntTime = 0;
    soundCoin.volume = 0.05;
    soundCoin.play()

    // COIN SPEED AND HEIGHT
    const coinHeight = [10, 15, 25, 28, 30, 40, 45, 50]
    const coinSpeed = [1, 2.5, 3, 4, 5, 6, 7, 8]
    coinHeightValue = Math.floor(Math.random() * 7)
    coinSpeedValue = Math.floor(Math.random() * 7)
    coin.style.bottom = `${coinHeight[coinHeightValue]}%`
    coin.style.animation = `coin-animation ${coinSpeed[coinSpeedValue]}s infinite linear`;
}

function changeProgress(){
    switch (countProgress){
        case 1:
            progress.src = './static/img/progress/01.png';
            break;
        case 2:
            progress.src = './static/img/progress/02.png';
            break;
        case 3:
            progress.src = './static/img/progress/03.png';
            break;
        case 4:
            progress.src = './static/img/progress/04.png';
            break;
        case 5:
            progress.src = './static/img/progress/05.png';
            break;
        case 6:
            progress.src = './static/img/progress/06.png';
            break;
        case 7:
            progress.src = './static/img/progress/07.png';
            break;
        case 8:
            progress.src = './static/img/progress/08.png';
            break;
        case 9:
            progress.src = './static/img/progress/09.png';
            break;
        case 10:
            progress.src = './static/img/progress/10.png';
            break;
    }
}

function nextLevel(){
    switch (countCoin){
        case 10:
            level = 1
            wheel.src = './static/img/company/company_wood.png';
            wheel.style.width = '90px'
            wheel.style.animation = 'wheel-animation 5s infinite linear'
            coin.style.display = 'none'
            fogos.style.display = 'block'
            break;
        case 20:
            level = 1
            wheel.src = './static/img/company/company_stone.png';
            wheel.style.width = '90px'
            wheel.style.animation = 'wheel-animation 5s infinite linear'
            coin.style.display = 'none'
            fogos.style.display = 'block'
            break;
        case 35:
            level = 1
            wheel.src = './static/img/company/company_bronze.png';
            wheel.style.width = '90px'
            wheel.style.animation = 'wheel-animation 5s infinite linear'
            coin.style.display = 'none'
            fogos.style.display = 'block'
            break;
        case 50:
            level = 1
            wheel.src = './static/img/company/company_prata.png';
            wheel.style.width = '90px'
            wheel.style.animation = 'wheel-animation 5s infinite linear'
            coin.style.display = 'none'
            fogos.style.display = 'block'
            break;
        case 100:
            level = 1
            wheel.src = './static/img/company/company_ouro.png';
            wheel.style.width = '90px'
            wheel.style.animation = 'wheel-animation 5s infinite linear'
            coin.style.display = 'none'
            fogos.style.display = 'block'
            break;        
    }
}

function changeLevel(){
    switch (countCoin){
        case 10:
            levelName.innerHTML = 'Madeira'
            nivelName = 'Madeira';
            break;
        case 20:
            levelName.innerHTML = 'Pedra'
            nivelName = 'Pedra';
            break;
        case 35:
            levelName.innerHTML = 'Bronze'
            nivelName = 'Bronze';
            break;
        case 50:
            levelName.innerHTML = 'Prata'
            nivelName = 'Prata';
            break;
        case 100:
            levelName.innerHTML = 'Ouro'
            nivelName = 'Ouro';
            break;        
    }
}

function velocity(){
    switch (countCoin){
        case 50:
            wheel.style.animation = 'wheel-animation 1.6s infinite linear'
            break;
        case 100:
            wheel.style.animation = 'wheel-animation 1.5s infinite linear'
            break;
        case 110:
            wheel.style.animation = 'wheel-animation 1.4s infinite linear'
            break;
        case 120:
            wheel.style.animation = 'wheel-animation 1.3s infinite linear'
            break;
        case 130:
            wheel.style.animation = 'wheel-animation 1.2s infinite linear'
            break;
        case 140:
            wheel.style.animation = 'wheel-animation 1s infinite linear'
            break;
        case 150:
            wheel.style.animation = 'wheel-animation 0.9s infinite linear'
            break;
    }
}

function popupGameover(){

        // GAMEOVER SOUND
        const overSound = document.querySelector('.overSound');
        overSound.correntTime = 0;
        overSound.volume = 0.05;
        overSound.play()

    popup.style.display = 'flex';

    setTimeout(() => {        
        result = XP * (BONUS / 2);
        temp_total = result + countCoin + XP
        valueNivel.innerHTML = nivelName;
        valueCoins.innerHTML = countCoin;
        valueXP.innerHTML = XP;
        valueBonus.innerHTML = result;
        valueTotal.innerHTML = temp_total;
        
        if (localStorage.getItem('Total')){
            if(localStorage.getItem('Total') < temp_total){
                localStorage.setItem('Level', nivelName)
                localStorage.setItem('Coin', countCoin)
                localStorage.setItem('XP', XP)
                localStorage.setItem('Bonus', result)
                localStorage.setItem('Total', temp_total)
            }
        }else{
            localStorage.setItem('Level', nivelName)
            localStorage.setItem('Coin', countCoin)
            localStorage.setItem('XP', XP)
            localStorage.setItem('Bonus', result)
            localStorage.setItem('Total', temp_total)
        }

        best.style.background = '#d1be1786';
        best_valueNivel.innerHTML = localStorage.getItem('Level')
        best_valueCoins.innerHTML = localStorage.getItem('Coin')
        best_valueXP.innerHTML = localStorage.getItem('XP')
        best_valueBonus.innerHTML = localStorage.getItem('Bonus')
        best_valueTotal.innerHTML = localStorage.getItem('Total')
    }, 1400)

}

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

function reload(){
    document.addEventListener("keydown", function (evt) {
          if(evt.keyCode == 82){
            document.location.reload()
        }
    });
    document.addEventListener('touchstart', function(evt){
        if(evt){
            document.location.reload()
        }
    });
}