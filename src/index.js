import './style.css';
import Phaser from "phaser";

// import { SimpleScene } from './scenes/simple-scene';
const gameScene = new Phaser.Scene('Game');
const gameConfig = {
  width: 680,
  height: 400,
  scene: gameScene,
};

new Phaser.Game(gameConfig);