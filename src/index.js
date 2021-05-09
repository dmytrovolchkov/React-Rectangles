import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import randomColor from "randomcolor";

//переменные
var onClickClass = 'square';
var random = []
var randColor = []
for (var a = [0, 1, 2, 3, 4, 5], i = a.length; i--; ) {
  random.push(a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
}

//получение количества синих квадратов
var n = Math.floor(Math.random() * (4 - 1)) + 1;
console.log('Blue : ', n, ' pieces')

//получение цвета квадратов
for (let i = 0; i < 6; i++) {
  if (i < n ) { randColor[i] = '#00f' }
  else { randColor[i] = randomColor() }
}

var colorStyle = []
for (let i = 0; i < 6; i++) {
  colorStyle[i] = {
  background: randColor[i]
}};
console.log('Styles ', colorStyle)

//счетчик выбранных квадратов
var blue = 0
var other = 0

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      isClicked: false};
    this.handleClick = this.handleClick.bind(this);
  }

  //проверка нажатого квадрата
  handleClick() {
    const isClicked = this.state.isClicked;
    this.setState(() => ({
      isClicked: true,
    }))
    onClickClass = 'square-on'
    if (!isClicked) {
      if (this.state.value.background === '#00f') {
        blue++
      }
      else {
        other++
      }
    }
}

  render() {
    return (
      <button className={onClickClass} onClick={this.handleClick}
      style = {this.props.value}>
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Choose all blue squares';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(colorStyle[random[0]])}
          {this.renderSquare(colorStyle[random[1]])}
          {this.renderSquare(colorStyle[random[2]])}
        </div>
        <div className="board-row">
          {this.renderSquare(colorStyle[random[3]])}
          {this.renderSquare(colorStyle[random[4]])}
          {this.renderSquare(colorStyle[random[5]])}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      isClicked: false};
    this.submitClick = this.submitClick.bind(this);
  }

  //проверка результата
  submitClick() {
if (other === 0 && blue === n) {
  alert('Квадраты выбраны правильно!')
  window.location.reload();
}
else {
  alert('Error')
  window.location.reload();
}
}

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
          <button onClick={this.submitClick}
          style={{marginTop: 15}} >Submit</button>
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
