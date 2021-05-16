import './style.css';
import Phaser from 'phaser';

// import { SimpleScene } from './scenes/simple-scene';
const gameScene = new Phaser.Scene('Game');
const gameConfig = {
  width: 680,
  height: 400,
  scene: gameScene,
};
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);