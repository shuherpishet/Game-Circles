'use strict';

//Создать overlay - нужен для того что бы игрок не мог кликнуть по экрану, когда идёт смена цветов
function createOverlay() {
    let wrapper = document.querySelector('.wrapper'),
        overlayBody = document.createElement('div');
        
    overlayBody.classList.add('overlay');
    wrapper.append(overlayBody);
}
createOverlay();
switchOverlay('off');

//Переключает видимость слоя overlay
function switchOverlay(stat) {
    let overlayBody = document.querySelector('.overlay');

    if(stat == 'on') {
        overlayBody.style.display = 'flex';
    }else if(stat == 'off') {
        overlayBody.style.display = 'none';
    }    
}

//Создать интерфейс главной площадки
function createInterfaceMain() {
    let wrapper = document.querySelector('.wrapper'),
        buttonAddCircle = document.createElement('div'),//Кнопка "Добавить круги(+4шт)"
        buttonRemoveCircle = document.createElement('div'),//Кнопка "удалить 4 круга"
        buttonStartGame = document.createElement('div'),//Кнопка СТАРТ
        placeFromCircleMain = document.createElement('div'),//Верхняя шапка меню
        placeFromMainPlace = document.createElement('div'),//Главнй блок куда вставляются строки с кругами
        placeFromColorText = document.createElement('div'),//блок с надписью "найди такой же цвет"
        colorSearch = document.createElement('div');//блок с цветом который искать
    
    buttonAddCircle.classList.add('button_add_circle');
    buttonRemoveCircle.classList.add('button_remove_circle');    
    buttonStartGame.classList.add('button_start_game');
    placeFromCircleMain.classList.add('place_from_top_menu');
    placeFromMainPlace.classList.add('place_from_main_place');
    placeFromColorText.classList.add('place_from_color_text');
    colorSearch.classList.add('color_search');

    buttonAddCircle.innerText = '+';
    buttonRemoveCircle.innerText = '-';
    buttonStartGame.innerText = 'СТАРТ';
    placeFromColorText.innerText = 'найди такой цвет';

    placeFromColorText.append(colorSearch);
    placeFromMainPlace.append(placeFromColorText);
    placeFromCircleMain.append(buttonRemoveCircle,buttonAddCircle,buttonStartGame);
    wrapper.append(placeFromCircleMain,placeFromMainPlace);
}
createInterfaceMain();

//Создать площадку для ряда кругов
function createPlaceFromCircle() {
    let placeFromCircleLength = document.querySelectorAll('.place_from_circle').length,
        placeFromCircle = document.createElement('div');

    placeFromCircle.classList.add('place_from_circle');
    placeFromCircle.id = placeFromCircleLength + 1;
    return placeFromCircle
}
//Создать круг
function createCircle(colorForGame) {
    let circle = document.createElement('div'),
        circleMain = document.createElement('div'),
        circleEyeLeft = document.createElement('div'),
        circleEyeRight = document.createElement('div'),
        speedAnimation = getRandomIntSpeed(0.4, 1);

    circle.classList.add('circle_add_on_place');
    circle.style.animation = 'circleStay ease '+speedAnimation+'s infinite';
    circle.classList.add('circle');
    circleMain.classList.add('circle_main');

    circleEyeLeft.classList.add('eye', 'eye_hover');
    circleEyeRight.classList.add('eye', 'eye_hover');

    if(colorForGame == undefined) {
        circle.style.backgroundColor = getRandColor();
    }else{
        circle.style.backgroundColor = colorForGame;
    }
    circle.append(circleEyeLeft, circleEyeRight);
    circleMain.append(circle);
    
    return circleMain
}

//Присвоим кругам уникальные id
function setCircleId() {
    let placeFromMainPlace = document.querySelector('.place_from_main_place'),
    circleAll = placeFromMainPlace.querySelectorAll('.circle'),
    i = 0;
    circleAll.forEach(item => {
        item.id = 'circle_' + i;
        item.id = 'circle_' + (i + 1);
        i++;
        console.log(item.id)
    });
}

//Выбор рандомного числа
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
//Получение числа с округлением до 1 цифры после запятой.Для скорости анимации
function getRandomIntSpeed(min, max) {
    let num = Math.random() * (max - min) + min;
    return Math.round(num * 10) / 10;
}

function getRandColor() {
    let arrColors = [
        'rgb(236, 229, 27)',
        'rgb(109, 223, 64)',
        'rgb(248, 85, 26)',
        'rgb(127, 99, 190)',
        'rgb(0, 228, 209)',
        'rgb(50, 120, 204)',
        'rgb(243, 140, 22)',
        'rgb(255, 115, 150)',
        'rgb(37,42,52)',
        'rgb(36, 109, 108)',
        'rgb(124, 89, 8)',
        'rgb(134, 17, 86)',
        'rgb(121, 121, 121)'],
        randColorNum = getRandomIntInclusive(0, arrColors.length - 1);
        // console.log('Кол-во цветов'+arrColors.length)
        return arrColors[randColorNum];
}

//Выбор рандобного действия ЛАЛКИ
function getRandAnim() {
    let arrAnim = ['circleWiggle', 'circleWiggleLR', 'circleWiggleAmorph', 'circleMinAmorph', 'circleBig', 'circleScale'],
        randAnimNum = getRandomIntInclusive(0, arrAnim.length - 1);
        return arrAnim[randAnimNum];
}

//Переключение режимов отображения кнопок Добавить и Удалить Круги
function switchButtonState() {
    let circleLength = document.querySelectorAll('.circle').length,
        buttonAddCircle = document.querySelector('.button_add_circle'),
        buttonRemoveCircle = document.querySelector('.button_remove_circle');

    // console.log('circleLength: ' + circleLength)

    if(circleLength > 4) {
        buttonRemoveCircle.style.display = 'flex';
    }
    
    if(circleLength > 0){
        buttonAddCircle.style.backgroundColor = 'rgb(133, 236, 138)';
        buttonAddCircle.style.color = 'ivory';
    }
    if(circleLength > 12) {
        buttonAddCircle.style.backgroundColor = 'lightgrey';
        buttonAddCircle.style.color = 'grey';
    }
}

//Создание строки с кружочками. numCircle - количество кругов в строке
function createRowWithCircle(numCircle) {    
    let placeFromMainPlace = document.querySelector('.place_from_main_place'),
        circleAll = placeFromMainPlace.querySelectorAll('.circle');

    if(numCircle == 0) {
        numCircle = 4;
    }
    if(circleAll.length == 16) {
        console.log('ХАРЭ')
        return
    }
    if(circleAll.length >= 0) {
        let createPlaceFromCircleBom = createPlaceFromCircle();
        for(let i = 0;i < numCircle; i++) {
            createPlaceFromCircleBom.append(createCircle());
        }
        placeFromMainPlace.append(createPlaceFromCircleBom);
    }
    switchButtonState();
}
createRowWithCircle(4);

//Удаляем строки с кругами. Кнопка buttonRemoveCircle
function removeRowWithCircle() {
    let buttonRemoveCircle = document.querySelector('.button_remove_circle');
    buttonRemoveCircle.addEventListener('click', ()=> {
        let placeFromCircleAll = document.querySelectorAll('.place_from_circle');
        if(placeFromCircleAll.length == 2) {
            buttonRemoveCircle.style.display = 'none';
            placeFromCircleAll[placeFromCircleAll.length-1].remove();
        }else{
            placeFromCircleAll[placeFromCircleAll.length-1].remove();
        }
        switchButtonState();

        setColorSearch();
        getItemPlayer();
    });
}
removeRowWithCircle();

//Добавим рандомную анимацию рандомному кругу 1 раз в 2 секунды
function randAnimCircle() {
    let circleAll = document.querySelectorAll('.circle'),
        speedAnimation = getRandomIntSpeed(0.4, 1);
        if(circleAll.length > 0) {
            setInterval(() => {
                circleAll = document.querySelectorAll('.circle');
                let randAnimName = getRandAnim(),
                    randCircleNum = getRandomIntInclusive(0, circleAll.length - 1),
                    randNumForScaleEye = getRandomIntInclusive(0,1);//получим рандомное число.0-не увеличивать глаза,1-увеличить
                    // console.log(randCircleNum)
                    circleAll[randCircleNum].style.animation = randAnimName +' ease '+speedAnimation+'s infinite';
                    if(randNumForScaleEye == 1) {
                        circleAll[randCircleNum].querySelectorAll('.eye')[0].style.transform = 'scale(1.9)';
                        circleAll[randCircleNum].querySelectorAll('.eye')[1].style.transform = 'scale(1.9)';
                    }
                        setTimeout(() => {
                            if(circleAll[randCircleNum] !== undefined) {
                                // console.log(circleAll[randCircleNum])
                                circleAll[randCircleNum].style.animation = 'circleStay ease '+speedAnimation+'s infinite';
    
                                circleAll[randCircleNum].querySelectorAll('.eye')[0].style.transform = 'scale(1)';
                                circleAll[randCircleNum].querySelectorAll('.eye')[1].style.transform = 'scale(1)';
                            }

                        }, 3000);
            },1000);
        }
}


//Создать круги для второго фрейма и анимацию для них
let buttonAddCircle = document.querySelector('.button_add_circle');
buttonAddCircle.addEventListener('click', ()=> {
    createRowWithCircle(4);
    setCircleId();
});




//ИГРОВАЯ ЛОГИКА

let buttonStartGame = document.querySelector('.button_start_game'),
    placeFromColorText = document.querySelector('.place_from_color_text');
buttonStartGame.addEventListener('click', ()=> {
    setColorSearch();
    getItemPlayer();
    randAnimCircle();
    setCircleId();
    buttonStartGame.style.display = 'none';
    placeFromColorText.style.display = 'flex';
});

//Получим цвет, который сейчас нужно найти среди кругов
function getColorForGame() {
    let placeFromMainPlace = document.querySelector('.place_from_main_place'),/* Главнй блок куда вставляются строки с кругами */
        circleAll = placeFromMainPlace.querySelectorAll('.circle'),
        circleAllArr = [];

    circleAll.forEach(item => {
        // console.log('item color: '+item.style.backgroundColor)
        circleAllArr.push(item.style.backgroundColor);
    });
    let randColorForGame = getRandomIntInclusive(0, circleAll.length-1);
    return circleAllArr[randColorForGame]
}

//Создадим круг в шапке для показа цвета который ищем
function setColorSearch() {
    let colorSearch = document.querySelector('.color_search');
    colorSearch.style.backgroundColor = getColorForGame();
}

//Отследим нажатия игрока при выборе одинакового цвета
function getItemPlayer() {
    let placeFromMainPlace = document.querySelector('.place_from_main_place'),
        clickCircleId = '';
        placeFromMainPlace.addEventListener('click', (e)=> {
            if(e.target.classList.contains('circle') || e.target.classList.contains('eye')) {
                let colorSearch = document.querySelector('.color_search').style.backgroundColor,
                clickColor = '',//Цвет круга, по которому кликнули
                clickCircle = '';//Круг, по которому кликнули
                if(e.target.classList.contains('circle')) {
                    clickCircleId = e.target.id;
                    clickColor = e.target.style.backgroundColor;
                    clickCircle = e.target;
                }else if(e.target.classList.contains('eye')) {
                    clickCircleId = e.target.parentNode.id;
                    clickColor = e.target.parentNode.style.backgroundColor;
                    clickCircle = e.target.parentNode;
                }
                if(colorSearch == clickColor) {
                    setAnimWrongSuccTurn('circleSuccessEyes', clickCircleId);
                    console.log('РАВНЫ')
                    clickCircle.style.animation = 'successGetColorCircle ease .5s';
                    clickCircle.style.boxShadow = '0px 0px 30px 0px lightyellow';
                    switchOverlay('on');

                    let timeForShadow = setTimeout(() => {console.log('sdsdsd')
                        switchOverlay('off');
                        clickCircle.style.boxShadow = '';
                        clickCircle.style.animation = 'circleStay ease 0.8s infinite';
                        
                        clearTimeout(timeForShadow);
                    }, 500);
                    restartColor();
                    setColorSearch();
                }else{
                    setAnimWrongSuccTurn('circleWrongEyes', clickCircleId);
                    console.log('НЕ РАВНЫ')
                }
                console.log('*************')
            }
        });
}

//Обновление цветов кругов после правильно угаданного цвета
function restartColor() {
    let placeFromMainPlace = document.querySelector('.place_from_main_place'),
        circleAll = placeFromMainPlace.querySelectorAll('.circle');

    circleAll.forEach(item => {
        item.style.backgroundColor = getRandColor();
    });
}

//Добавляем анимацию махания и кивания головой, когда игрок ошибся в выборе цвета или угадал
function setAnimWrongSuccTurn(animName, idCircle) {
// console.log('Добавляю анимацию: '+animName)
            let circleWithId = document.querySelector('#'+idCircle),
            eyesAll = circleWithId.querySelectorAll('.eye');
            eyesAll[0].style.animation = animName + ' ease 0.4s infinite';
            eyesAll[1].style.animation = animName + ' ease 0.4s infinite';
            let timeWromg = setTimeout(() => {
                eyesAll[0].style.animation = '';
                eyesAll[1].style.animation = '';
                clearTimeout(timeWromg);
            }, 1500);
}
