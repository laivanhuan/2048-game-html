const screen = document.querySelector('.screen');
const btnReset = document.querySelector('.btn-reset');
const message = document.querySelector('.message');

let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

init();

btnReset.addEventListener('click', init);

addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 38:
      //up
      pressButton(pressArrowUp);
      break;
    case 40:
      //down
      pressButton(pressArrowDown);
      break
    case 37:
      //left
      pressButton(pressArrowLeft);
      break;
    case 39:
      //right
      pressButton(pressArrowRight);
      break;
  }
});

function init() {
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  message.innerHTML = '';
  randomBox();
  randomBox();
  render();
}


function isGameOver(){
  let temp = copy(grid);
  let temp2 = copy(grid);
  let check = true;

  pressArrowUp(temp2);
  pressArrowDown(temp2);
  pressArrowLeft(temp2);
  pressArrowRight(temp2);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(grid[i][j] === 0){
        check = false;
      }
    }
  }

  if(compareTwoArray(temp,temp2) && check) return true;

  return false;
}

function pressButton(func){
  let pass = copy(grid);
  func(grid);
  if(!compareTwoArray(pass,grid)){
    randomBox();
    render();
  }
  if(isGameOver()){
    message.innerHTML = 'Game Over!'
  }
}

function render() {
  let templateStr = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if(grid[i][j] === 0){
        templateStr += '<div class="box"></div>';
      }else{
        templateStr += `<div class="box"><div class="box-item color-${grid[i][j]}">${grid[i][j]}</div></div>`
      }
    }
  }
  screen.innerHTML = templateStr;
}

function pressArrowRight(grid) {
  for (let i = 0; i < 4; i++) {
    grid[i] = slide(grid[i]);
  }
}

function pressArrowLeft(grid) {
  for (let i = 0; i < 4; i++) {
    grid[i] = wrap(slide(grid[i]));
  }
}

function pressArrowDown(grid) {
  for (let i = 0; i < 4; i++) {
    let arr = slide(getColumn(grid, i));
    for (let j = 0; j < 4; j++) {
      grid[j][i] = arr[j];
    }
  }
}

function pressArrowUp(grid) {
  for (let i = 0; i < 4; i++) {
    let arr = wrap(slide(getColumn(grid, i)));
    for (let j = 0; j < 4; j++) {
      grid[j][i] = arr[j];
    }
  }
}

function randomBox() {
  let x = Math.floor(Math.random() * 4);
  let y = Math.floor(Math.random() * 4);
  if (grid[x][y] === 0) {
    grid[x][y] = random([2, 4]);
    return;
  } else {
    randomBox();
  }
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slide(arr) {
  let result = [...arr];
  for (let i = 0; i < 3; i++) {
    if (result[i] === result[i + 1]) {
      result[i + 1] += result[i];
      result[i] = 0;
      i++;
    } else if (result[i + 1] === 0) {
      result[i + 1] = result[i];
      result[i] = 0;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (result[i] === 0) {
      result.splice(i, 1);
      result.unshift(0);
    }
  }
  return result;
}

function wrap(a) {
  for (let i = 0; i < 4; i++) {
    if (a[0] === 0) {
      a.shift();
      a.push(0);
    } else break;
  }
  return a;
}

function getColumn(grid, index) {
  let column = [];
  for (let i = 0; i < 4; i++) {
    column.push(grid[i][index]);
  }
  return column;
}

function compareTwoArray(a,b){
  return JSON.stringify(a)==JSON.stringify(b);
}

function copy(a){
  return JSON.parse(JSON.stringify(a));
}