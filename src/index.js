import './style.css'
import 'phaser';

// import { SimpleScene } from './scenes/simple-scene';
let gameScene = new Phaser.Scene('Game')
let gameConfig = {
  width: 680,
  height: 400,
  scene: gameScene
};

new Phaser.Game(gameConfig);