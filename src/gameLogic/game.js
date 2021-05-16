import './../style.css';
import Phaser, { AUTO } from 'phaser';

import SceneMain from './SceneMain'
import SceneMainMenu from './SceneMainMenu'
import SceneGameOver from './SceneGameOver'



let config = {
  type: AUTO,
  width: 480,
  height: 640,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver
  ],
  pixelArt: true,
  roundPixels: true
};
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);