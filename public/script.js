// Gamestates
var speed = 10
var jump = -30
var maxSpeed = 0.1
var maxJump = -1000
var score = 0
var state = "day"
var delay = 0
var hairlength = 130
var hairwidth = 110

var intervalId = setInterval(randomizeTrees, 7000);

// If it's past seven o'clock, set night
var date = new Date();
var hour = date.getHours();
console.log(hour);
if (hour > 19 || hour < 6) {
  setNight();
}

function randomizeTrees() {
  $('.tree').each(function () {
    var scale;
    if ($(this).closest('.tree-container-distance').length) {
      scale = Math.floor(Math.random() * 20) + 50;
    } else {
      scale = Math.floor(Math.random() * 30) + 70;
    }
    var x = Math.floor(Math.random() * 1200) - 600;
    $(this).css('transform', `scale(${scale}%) translateX(${x}%)`);
    $(this).find('.logtext').text(x);
    $('#debugtext').text('reset');
    setTimeout(function () {
      $('#debugtext').text('');
    }, 1000);
  });
}

function changeSpeed(inc) {
  return function () {
    console.log(speed);
    if ((inc > 0 && speed < 40) || (inc < 0 && speed > 1)) {
      speed = speed + inc;
      $('html').css('--speed', speed/10 + 's');
    }
  }
}

function changeJumpHeight(inc) {
  return function () {
    console.log(jump);
    var nextJump = jump * inc;
    var diff = nextJump - jump;
    var increment = diff / 10; // divide the difference into 10 parts
    for (let i = 0; i < 10; i++) {
      setTimeout(function () {
        jump += increment;

        $('html').css('--jump', jump + 'px');
      }, 20 * i); // delay increases by 100ms for each iteration
    }
  }
}

function reset() {
  speed = 1;
  jump = -30;
  $('html').css({
    '--speed': speed + 's',
    '--jump': jump + 'px'
  });
  clearInterval(intervalId);
  intervalId = setInterval(randomizeTrees, 7000);
}

function resetTypeChallenge() {
  score = 0;
  $('#lisatext span').css('display', 'none');
}

function typeL() {
  if (score === 0) {
    score = 1
    $('#lisatext span:first-child').css('display', 'inline');
    $('#lisatext span:nth-child(2)').css('display', 'none');
    $('#lisatext span:nth-child(3)').css('display', 'none');
    $('#lisatext span:nth-child(4)').css('display', 'none');
  }
}

function typeI() {
  if (score === 1) {
    score = 2
    $('#lisatext span:nth-child(2)').css('display', 'inline');
  }
}

function typeS() {
  if (score === 2) {
    score = 3
    $('#lisatext span:nth-child(3)').css('display', 'inline');
  }
}

function typeA() {
  if (score === 3) {
    score = 4
    $('#lisatext span:nth-child(4)').css('display', 'inline');
    $('.lisa').css('animation', 'rotateLisa calc(var(--speed) / 2) linear');

    setTimeout(function () {
      $('.lisa').css('animation', 'moveLisa calc(var(--speed) / 4) infinite alternate');
    }, speed * 500);
  }
}


function changeClothes() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  $('.body').css('borderBottom', "150px solid #" + randomColor);
}

function changeHairColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  $('.bangs').css('borderBottom', "30px solid #" + randomColor);
  $('.hair').css('backgroundColor', "#" + randomColor);
}

function changeHairLength(heightDiff, widthDiff) {
  return function () {
    hairlength = hairlength + heightDiff;
    hairwidth = hairwidth + widthDiff;

    $('.hair').css({
      'width': hairwidth + 'px',
      'height': hairlength + 'px'
    });
  }
}

function changeTreeColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  $('.tree').each(function () {
    $(this).css('borderBottom', '500px solid #' + randomColor);
  });
}

function changeGroundColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  $('.ground').css('backgroundColor', "#" + randomColor);
}


function setNight() {
  state = "night"
  $('body').addClass('night');
  $('.sun').addClass('moon');
  $('.cloud-body1, .cloud-body2, .cloud-body3').css('backgroundColor', '#aaaaaa');
}

function setDay() {
  state = "day"
  $('body').removeClass('night');
  $('.sun').removeClass('moon');
  $('.cloud-body1, .cloud-body2, .cloud-body3').css('backgroundColor', '#ffffff');
}

function toggleNight() {
  if (state === "day") {
    setNight()
  } else {
    setDay()
  }
}
const keyActions = {
  ArrowLeft: changeSpeed(1),
  ArrowRight: changeSpeed(-1),
  ArrowUp: changeJumpHeight(2),
  ArrowDown: changeJumpHeight(0.5),
  r: reset,
  l: typeL,
  i: typeI,
  s: typeS,
  a: typeA,
  k: changeClothes,
  h: changeHairColor,
  2: changeHairLength(20, 10),
  1: changeHairLength(-20, -10),
  t: changeTreeColor,
  g: changeGroundColor,
  n: toggleNight

}

document.addEventListener("keydown", function (e) {
  for (const key in keyActions) {
    if (e.key === key) {
      keyActions[key]();
    }
  }

  var challengeString = "lisa"
  if (!challengeString.includes(e.key)) {
    resetTypeChallenge();
  }
});
