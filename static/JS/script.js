const player = document.querySelector('.player');
const wheel = document.querySelector('.wheel');
const clouds = document.querySelector('.clouds')
const coin = document.querySelector('.coin')
const progress = document.querySelector('.progress')
const numberCoins = document.querySelector('.numberCoins')

var countCoin = 0
var countProgress = 0

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
    coin.style.display = 'block'; 
    
    //  COUNT COINS
    if (playerPosition < coinPosition && playerPosition < coinPosition + 40){
        if (coinPositionInterval >= 15 && coinPositionInterval <= 100){
            countCoin += 1;
            countProgress += 1;
            coin.style.display = 'none';
            changeCoinStyle()
            changeProgress()
            numberCoins.innerHTML = countCoin
            console.log('COIN: '+ countCoin)
            if (countProgress % 10 == 0){
                countProgress = 0
            };            
        };
    };


    // VERIFICAR GAME OVER
    if (wheelPositionInterval <= 115 && wheelPositionInterval > 0 && playerPositionInterval < 55){
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
    const coinSpeed = [1, 2, 3, 4, 5, 6, 7, 8]
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

document.addEventListener('keydown', jump);