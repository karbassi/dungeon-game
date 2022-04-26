export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Set base folder
    this.load.setBaseURL('./assets/img/');

    this.load.image('tiles', 'tiles/dungeon_tiles_extruded.png');
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json');
    this.load.atlas(
      'character',
      'character/character.png',
      'character/character.json'
    );
    this.load.atlas('lizard', 'enemies/lizard.png', 'enemies/lizard.json');
  }

  create() {
    this.scene.start('MainScene');
  }
}
