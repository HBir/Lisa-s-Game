function randomizeTrees() {
  var trees = document.querySelectorAll('.tree');
  trees.forEach(function (tree) {
      // if tree has parent tree-container-distance then scale between 50 and 70
      if (tree.closest('.tree-container-distance')) {
          var scale = Math.floor(Math.random() * 20) + 50;
      } else {
          var scale = Math.floor(Math.random() * 30) + 70;
      }
      var x = Math.floor(Math.random() * 1200)-600;
      tree.style.transform = `scale(${scale}%) translateX(${x}%)`;
      // Change logtext to the new x value
      tree.querySelector('.logtext').textContent = x;
      // write reset in debugtext for a second
      document.getElementById('debugtext').textContent = 'reset';
      setTimeout(function () {
          document.getElementById('debugtext').textContent = '';
      }, 1000);
  });
}

function setNight() {
  state = "night"
  // document.querySelector('body').style.backgroundImage = 'linear-gradient(to bottom, #000000, #aaaaaa)';
  document.querySelector('body').classList.add('night');
  document.querySelector('.sun').classList.add('moon');
  // Change clouds to gray. loop through the children of cloud. Don't use grayscale since it's white
  var clouds = document.querySelectorAll('.cloud-body1, .cloud-body2, .cloud-body3');
  clouds.forEach(function (cloud) {
      cloud.style.backgroundColor = '#aaaaaa';
  });
}
function setDay() {
  state = "day"
  // document.querySelector('body').style.backgroundImage = 'linear-gradient(to bottom, #87CEEB, #f0f0f0)';
  document.querySelector('body').classList.remove('night');
  document.querySelector('.sun').classList.remove('moon');
  var clouds = document.querySelectorAll('.cloud-body1, .cloud-body2, .cloud-body3');
  clouds.forEach(function (cloud) {
      cloud.style.backgroundColor = '#ffffff';
  });
}

// If it's past seven o'clock, set night
var date = new Date();
var hour = date.getHours();
console.log(hour);
if (hour > 19 || hour < 6) {
  setNight();
}

var speed = 1
var jump = -30
var maxSpeed = 0.1
var maxJump = -1000
var score = 0
var state = "day"
var delay = 0
var hairlength = 130
var hairwidth = 110

var intervalId = setInterval(randomizeTrees, 7000);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && speed < 4) {
      speed = speed + 0.05
      document.documentElement.style.setProperty('--speed', speed + 's');
      document.getElementById('speed').textContent = speed + "-" + speed * 7000;

      var elements = document.getElementsByClassName('tree-container');
  } else if (e.key === "ArrowRight" && speed >= 0.2) {
      speed = speed - 0.1
      document.documentElement.style.setProperty('--speed', speed + 's');
      document.getElementById('speed').textContent = speed + "-" + speed * 7000;
      var elements = document.getElementsByClassName('tree-container');

  } else if (e.key === "ArrowUp" && jump > -1000) {
      var nextJump = jump * 2;
      var diff = nextJump - jump;
      var increment = diff / 10; // divide the difference into 10 parts
      for (let i = 0; i < 10; i++) {
          setTimeout(function () {
              jump += increment;
              document.documentElement.style.setProperty('--jump', jump + 'px');
          }, 20 * i); // delay increases by 100ms for each iteration
      }
  } else if (e.key === "ArrowDown" && jump < -1) {
      var nextJump = jump / 2;
      var diff = nextJump - jump;
      var increment = diff / 10; // divide the difference into 10 parts
      for (let i = 0; i < 10; i++) {
          setTimeout(function () {
              jump += increment;
              document.documentElement.style.setProperty('--jump', jump + 'px');
          }, 20 * i); // delay increases by 100ms for each iteration
      }
  } else if (e.key === "r") {
      speed = 1
      jump = -30
      document.documentElement.style.setProperty('--speed', speed + 's');
      document.documentElement.style.setProperty('--jump', jump + 'px');
      clearInterval(intervalId);
      intervalId = setInterval(randomizeTrees, 7000);
  } else if (e.key === "l") {
      score = 1
      document.querySelector('#lisatext span:first-child').style.display = 'inline';
      document.querySelector('#lisatext span:nth-child(2)').style.display = 'none';
      document.querySelector('#lisatext span:nth-child(3)').style.display = 'none';
      document.querySelector('#lisatext span:nth-child(4)').style.display = 'none';

  } else if (e.key === "i" && score === 1) {
      score = 2
      document.querySelector('#lisatext span:nth-child(2)').style.display = 'inline';
  } else if (e.key === "s" && score === 2) {
      score = 3
      document.querySelector('#lisatext span:nth-child(3)').style.display = 'inline';
  } else if (e.key === "a" && score === 3) {
      score = 4
      document.querySelector('#lisatext span:nth-child(4)').style.display = 'inline';
      document.querySelector('.lisa').style.animation = 'rotateLisa calc(var(--speed) / 2) linear';

      setTimeout(function () {
          document.querySelector('.lisa').style.animation = 'moveLisa calc(var(--speed) / 4) infinite alternate';
      }, speed * 500);
  } else if (e.key === "k") {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector('.body').style.borderBottom = "150px solid #" + randomColor;
  } else if (e.key === "h") {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector('.bangs').style.borderBottom = "30px solid #" + randomColor;
    document.querySelector('.hair').style.backgroundColor = "#" + randomColor;
  } else if (e.key === "2") {
      hairlength = hairlength + 20;
      hairwidth = hairwidth + 10;

      document.querySelector('.hair').style.width = hairwidth + 'px';
      document.querySelector('.hair').style.height = hairlength + 'px';

  } else if (e.key === "1") {
      hairlength = hairlength - 20;
      hairwidth = hairwidth - 10;

      document.querySelector('.hair').style.width = hairwidth + 'px';
      document.querySelector('.hair').style.height = hairlength + 'px';
  } else if (e.key === "t") {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var trees = document.querySelectorAll('.tree');
    trees.forEach(function (tree) {
        tree.style.borderBottom = "500px solid #" + randomColor;
    });
  } else if (e.key === "g") {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector('.ground').style.backgroundColor = "#" + randomColor;
  } else if (e.key === "n") {
      if (state === "day") {
          setNight()
      } else {
          setDay()
      }

  } else {
      score = 0
      document.querySelector('#lisatext span:first-child').style.display = 'none';
      document.querySelector('#lisatext span:nth-child(2)').style.display = 'none';
      document.querySelector('#lisatext span:nth-child(3)').style.display = 'none';
      document.querySelector('#lisatext span:nth-child(4)').style.display = 'none';
  }
});