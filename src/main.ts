import 'phaser';

import PreloaderScene from './scenes/PreloaderScene';
import MainScene from './scenes/MainScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#483B3A',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 400,
    height: 250,
    zoom: 2,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [PreloaderScene, MainScene],
};

export default new Phaser.Game(config);
