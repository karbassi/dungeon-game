import PreloadScene from './scenes/PreloaderScene'
import MainScene from './scenes/MainScene'
import { AUTO, Game, Scale } from 'phaser'
import type { Types } from 'phaser'

const config: Types.Core.GameConfig = {
  banner: false,
  type: AUTO,
  backgroundColor: '#483B3A',
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
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
  audio: {
    noAudio: true,
  },
  scene: [PreloadScene, MainScene],
}

export default new Game(config)
