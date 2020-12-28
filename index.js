const sumCheckForm = document.querySelector('#checkSum');
const triangleOrNotEl = document.querySelector('#triangleOrNot');//output  el
const calcAreaForm = document.querySelector('#calcArea');
const calcAreaWithSideForm = document.querySelector('#calcAreaWithSides');
const areaEl = document.querySelector('#area');//outputEl
const calcHypotenuseForm = document.querySelector('#calcHypotenuse');
const hypotenuseEl = document.querySelector('#hypotenuse');//outputEl
const checkObtuseTriangleForm = document.querySelector('#checkObtuseTriangle');
const obtuseTriangleEl = document.querySelector('#obtuseTriangle');//outputEl
const checkRightTriangleForm = document.querySelector('#checkRightTriangle');
const rightTriangleEl = document.querySelector('#rightTriangle');//outputEl
const checkAcuteTriangleForm = document.querySelector('#checkAcuteTriangle');
const acuteTriangleEl = document.querySelector('#acuteTriangle');//outputEl
const findThirdAngleForm = document.querySelector('#findThirdAngle');
const thirdAngleEl = document.querySelector('#thirdAngle');//outputEl
const scoreEl = document.querySelector('#score');
//calculator functions
const checkAngleSum = (e) => {
    e.preventDefault();
    let angle1 = parseInt(document.querySelector('#angleOne').value, 10);
    let angle2 = parseInt(document.querySelector('#angleTwo').value, 10);
    let angle3 = parseInt(document.querySelector('#angleThree').value, 10);
    let sum = angle1 + angle2 + angle3;
    //don't accept negative input
    if(angle1<1 || angle2<1 || angle3<1) return alert('please enter positive values only');
    
    if (sum !== 180) triangleOrNotEl.innerText = "don't make a triangle";
    else triangleOrNotEl.innerText = 'make a triangle';
}

const calculateArea = (e) => {
    e.preventDefault();
    let base = parseInt(document.querySelector('#b').value, 10);
    let height = parseInt(document.querySelector('#h').value, 10);
    let area = (base * height)/2;
     //dont accept negative inputs
    if(base < 1 || height < 1) return areaEl.innerText = 'please enter positive values only';

    areaEl.innerText = area;
}

const calculateAreaWithSides = (e) =>{
    e.preventDefault();
    let sideOne = parseInt(document.querySelector('#firstSide').value, 10);
    let sideTwo = parseInt(document.querySelector('#secondSide').value, 10);
    let sideThree = parseInt(document.querySelector('#thirdSide').value, 10);
    let semiPerimeter = (sideOne + sideTwo + sideThree) / 2;
    let product = semiPerimeter * (semiPerimeter-sideOne) * (semiPerimeter-sideTwo) * (semiPerimeter-sideThree);
    let area = Math.sqrt(product);
    //dont accept negative inputs
    if (sideOne<1 || sideTwo < 1 || sideThree<1) return areaEl.innerText = 'please enter positive values only';

    {area? areaEl.innerText = area: areaEl.innerText='a triangle cannot have these 3 sides'};
}

const calculateHypotenuse = (e) => {
    e.preventDefault();
    let perpendicular = parseInt(document.querySelector('#perpendicular').value, 10);
    let base = parseInt(document.querySelector('#base').value, 10);
    let hypotenuse = Math.sqrt((perpendicular * perpendicular) + (base * base));
    //don't accept negative input
    if (perpendicular < 0 || base < 0) return hypotenuseEl.textContent = 'please enter positive values only';

    hypotenuseEl.textContent = hypotenuse;
}

//quiz section
let score=0;
let randomAngleOne = Math.floor(Math.random() * 80 + 5);
let randomAngleTwo = Math.floor(Math.random() * 80 + 5);
let angleThree = 180 - (randomAngleOne + randomAngleTwo);

const increaseScore = () => {
    score += 4;
    scoreEl.textContent=score;
    scoreEl.style.color='green';
}

const decreaseScore = () => {
    score -=1;
    scoreEl.textContent=score;
    scoreEl.style.color='red';
}

const checkMCQ = (corretOptionId, outputEl, e) => {
    e.preventDefault();
    if(document.querySelector(corretOptionId).checked){
        outputEl.textContent='Your answer was correct !';
        increaseScore();
    }else {
        outputEl.textContent = 'Your answer was incorrect :(';
        decreaseScore();
    }
    e.currentTarget.style.display='none';//prevent user from changing answer to mess with score
}

const checkThirdAngle = (e) => {
    e.preventDefault();
    let userAnswer = parseInt(document.querySelector('#thirdAngleInput').value, 10);
    if (userAnswer === angleThree) {
        thirdAngleEl.textContent = 'Your answer was correct !';
        increaseScore();
    }else {
        thirdAngleEl.textContent = 'Your answer was incorrect :(';
        decreaseScore();
    }
    e.currentTarget.style.display='none';//prevent user from changing answer to mess with score
}

//change tabs
const changeTabs = (event, tabId) =>{
    //hide previously visible(all) tabs and remove active class from (all) buttons
    document.querySelectorAll('.tabContent').forEach(tabContentEl => tabContentEl.style.display='none');
    document.querySelectorAll('.tabButton').forEach(tabButtonEl => tabButtonEl.className= tabButtonEl.className.replace('tabActive', ''));
    //show tab and add active class
    document.querySelector(tabId).style.display='block';
    event.currentTarget.className += ' tabActive';
}

//some rendering and setup
document.querySelector('#defaultButton').click();//open default tab
document.querySelector('#randomAngOne').textContent = randomAngleOne;
document.querySelector('#randomAngTwo').textContent = randomAngleTwo;
//event listeners
sumCheckForm.addEventListener('submit', checkAngleSum);
calcAreaForm.addEventListener('submit', calculateArea);
calcAreaWithSideForm.addEventListener('submit', calculateAreaWithSides);
calcHypotenuseForm.addEventListener('submit', calculateHypotenuse);
checkObtuseTriangleForm.addEventListener('submit', e => checkMCQ('#isObtuse', obtuseTriangleEl, e) );
checkRightTriangleForm.addEventListener( 'submit', e => checkMCQ('#isNotRight', rightTriangleEl, e) );
checkAcuteTriangleForm.addEventListener('submit', e => checkMCQ('#isNotAcute', acuteTriangleEl, e) );
findThirdAngleForm.addEventListener('submit', checkThirdAngle);