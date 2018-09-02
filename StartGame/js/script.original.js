/* |Task for the future| Супер е, че си изкарала конфигурацият на картите в масив от обекти.
Следващата стъпка е да ги изкараш в отделен .json файл и да ги заредиш асинхронно. (Лекция 22 слайд 30).
Много е удобно за такива неща да се използват конфигурационни файлове. Едно от предимствата е, че не смесваш бизнес логиката с данните*/
const cardsArray = [{
    'name': 'shell',
    'img': 'img/blueshell.png',
  },
  {
    'name': 'star',
    'img': 'img/star.png',
  },
  {
    'name': 'bobomb',
    'img': 'img/bobomb.png',
  },
  {
    'name': 'mario',
    'img': 'img/mario.png',
  },
  {
    'name': 'luigi',
    'img': 'img/luigi.png',
  },
  {
    'name': 'peach',
    'img': 'img/peach.png',
  },
  {
    'name': '1up',
    'img': 'img/1up.png',
  },
  {
    'name': 'mushroom',
    'img': 'img/mushroom.png',
  },
  {
    'name': 'thwomp',
    'img': 'img/thwomp.png',
  },
  {
    'name': 'bulletbill',
    'img': 'img/bulletbill.png',
  },
  {
    'name': 'coin',
    'img': 'img/coin.png',
  },
  {
    'name': 'goomba',
    'img': 'img/goomba.png',
  },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;    // |Advice| - Слагай малко по-описателни имена на променливите. В момента не знам това брой познати карти ли е, брой грешни или общ брой
let previousTarget = null;
let delay = 1200; // |Advice| - Супер е, че си изкарала това число да е горе в апликацията а не hardcoded долу. Не мислиш ли, че е по-оферта да е const ?

const game = document.getElementById('game'); // |Advice| - За това нещо имахме спор с един колега. Но за мен ако използвш const не би трябвало да редактираш дадения елемент по никъкъв начин
// а ти буквално два реда по-надолу добавяш child-ове и сменяш атрибути. Чисто логически не е коректно. 
// А причина поради, която изобщо раоти е, че game e референция към DOM node-а, а не самия DOM node. И ти релно не променяш самата референция а това към което сочи.
const grid = document.createElement('section');
grid.setAttribute('class', 'grid'); //|Advice| - по добре използвай classList. От една страна се чете по-лесно от друга страна е една идея по-бързо (вярно говорим си за части от милисекундата, но все пак)
game.appendChild(grid);
// Защо просто не си добавиш елемента <section class="grid"></section> директно в HTML-a ?
// Не виждам причина да генерираш дом елементи с JS при все, че винаги DOM елемента е един и същи. 
// Имай в предвид, че генерирането на DOM елементи с JS е в пъти по-бавна процедура от просто HTML.


// Можеш ли да ми обясниш защо използваш arrow funciton а не обикновенна функция? (не казвам че е грешно, но искам да видя дали ти знаеш каква е разликата) 
gameGrid.forEach(item => {
  const { name, img } = item;   // |Advice| - Този оператор е доста хубав, но в момента не виждам защо просто не използваш item.name и item.img по-надолу.
  // От една страна ще имаш по-малко код. От друга страна ще е по-бърз кода за изпълнение. Това отново е по-скоро мое лично мнение, не казвам че е лошо това, което си написала

  const card = document.createElement('div');   // По скоро var/let а не const
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');  // По скоро var/let а не const
  front.classList.add('front');

  const back = document.createElement('div');   // По скоро var/let а не const
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);

  /* --- Алтернативен начин да направиш същото нещо като горе, което според мен е малко по-лесно за четене: 

    var card = document.createElement('div');

    card.innerHTML = `<div class="card" data-name="${name}">
                        <div class="front"></div>
                        <div class="back" style="background-image:url${img}"></div>
                      </div>`

    grid.appendChild(card.firstElementChild);

  Попринцип за това си има специализирани template engines, но ако го направиш така също е супер лесно за четене и същевеременно доста добро
  от гледна точнка performance. Даже е по-бързо от варянта, който ти си написала.
  */

});

/* |Advice !!!|  
  Това лично аз много го мразя. Не знам кой го разпоространява ама имам много колеги които го правят. Причината поради която мразя това нещо
  (говоря за const name = () => {} ) е че почти никой не знае какво прави реално и за какво се използва.
  Тъй като по това което чета изглежда, че и ти не разбираш какво точно е предимството на този запис бих ти препоръчал да си го заместиш със 
  обикновен function definition:

  function match (){ .... }

  Тааа, все пак да ти обясня какво точно прави записа долу и защо смятам, че не го знаеш;
  Използването на arrow function bind-ва контекста на функцията към контекста в който се намира дефиницията.
  Ти в момента си в global scope и контекста ти е window. Така написано ти bind-ваш window към твоята фунцкия.
  Това е единственото предимство на arrow function пред обикновенна funciton definition. 
  Вътре в твоята фунцкия ти така или инак изибщо не използваш this. Следователно е безсмислено да използваш arrow function.
  Да остравим на страна, че ако искаш да извикаш фунцкията си с друг контекст (да речем с call или apply) не можеш, тъй като няма как да презапишеш implicit bind-а, който е направил arrow funciton-a.
  Демек по този начин, не само че не използваш предимството на arrow function а и ако икаш да изшплзваш някой от основните функционалности на JS не можеш.
  Тази техника с "const name = () => {}" e доста полезна когато използваш класове и искаш да имаш private фунцкия, която да бъде bind-ната към контекста на класа.Като не използваш класове, е тотално излишна.
  Когато питах един колега, които използва този запис за щяло и нещяло "Защо си го написал така?" той ми отговори "Това е новия начин на писане на JS"
  Което е абсурдно, понеже те не правят едно и също нещо и не са взаимно заменими. 
  Всеки един запис има предимства и недостатъци, и според мен човек трябва да и избира правилния инструмент за конкретната задача.
  Както ви казвах повреме на курса, не използвайте нищо, което не сте на 100% сигурни че знаете как работи (поне докъто се учиш. Повреме на работа е малко по-различно)
  (сори, че малко си изкарах яда на теб, ама наистина много хора го ползват това без да го разбират :) )
*/

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;
    /* |Advice| |Readability| - 
      вместо да излизаш от фунцкията с retrun (даже не връщаш стойност на return-а) защо просто не сложиш всичко долу в else?
      Още по-добра идея, защо не инвертираш условията си в if-а и не поставиш реалното съдържание на функцията в него:

      if(clicked.nodeName !== 'SECTION' &&
         clicked !== previousTarget && 
         .....
      ){
        if (count < 2) { .....

      По този начин ще е доста по-лесно на четящия да разбере кога ще се изпъл ни кода по-долу и кога не.
    */
  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {  //Един трик. Понеже count++ първо взима стойността на count а после му добявя 1 можеш да замениш двата реда с if(count++ < 2)
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');   
      /* |Advice| |Future proofing| - Не е добра идея да използваш за такива неща parentNode. Причината е че си обвързваш логиката с HTML структурата
      Най-добрия варянт е да си смениш логиката за селектиране на елементите за да не се налага изобщо да достъпваш до parent елемента, но ако все пак ти се налага да го направиш
      виж как работи closest(). Ако използваш closest() ще е по-бавно като performance от parentNode, но пък си връзваш гащите, че каквото и да се прави по HTML-a
      ( да се добавят разни елементи, да се местят други и т.н.) винаги твоята UI логика ще работи.
      За проект от типът на този можеби няма значение, но в един реален проект супер често се променя HTML структурата и подобно обвързване на UI логика с HTML структура
      се създава доста главоболия. */
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
