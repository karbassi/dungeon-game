import LizardSprite from '../objects/LizardSprite'
import PlayerSprite from '../objects/PlayerSprite'

export default class MainScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  character!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  lizards!: Phaser.Physics.Arcade.Group
  speed!: number
  player!: PlayerSprite
  wallsLayer!: Phaser.Tilemaps.TilemapLayer | null

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    // Check if keyboard is null
    if (this.input.keyboard === null) {
      throw new Error('Keyboard is null')
    }

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.createMap()
    this.createPlayer()
    this.createLizards()
    this.createCollisions()
    this.createCamera()
  }

  // update() {}

  // #region Private methods

  private createCamera() {
    // Camera follow player
    this.cameras.main.startFollow(this.player, true)
  }

  private createCollisions() {
    // Check if player is null
    if (this.player === null) {
      throw new Error('Player is null')
    }

    // Check if wallsLayer is null
    if (this.wallsLayer === null) {
      throw new Error('Walls layer is null')
    }

    // Check if lizards is null
    if (this.lizards === null) {
      throw new Error('Lizards is null')
    }

    // Player collides with walls
    this.physics.add.collider(this.player, this.wallsLayer)

    // Lizards collides with walls
    this.physics.add.collider(this.lizards, this.wallsLayer)

    // Lizards collides with player
    this.physics.add.collider(this.player, this.lizards, this.player.hit)
  }

  private createLizards() {
    // lizard

    this.lizards = this.physics.add.group({
      classType: LizardSprite,
    })

    this.lizards.get(206, 108)
    this.lizards.get(356, 256)
    this.lizards.get(356, 512)
  }

  private createPlayer() {
    this.player = new PlayerSprite(this, 428, 128)
  }

  private createMap() {
    const map = this.make.tilemap({ key: 'level-01' })
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2)

    // Check if tileset is null
    if (tileset === null) {
      throw new Error('Tileset is null')
    }

    // !NOTE: Order of layers is important. Reverse order of layers in Tiled
    map.createLayer('Ground', tileset)
    this.wallsLayer = map.createLayer('Walls', tileset)
    map.createLayer('Above', tileset)

    if (this.wallsLayer === null) {
      throw new Error('Walls layer is null')
    }

    this.wallsLayer.setCollisionByProperty({ collides: true })

    this.debug()
  }

  private async debug() {
    if (!this.game.config.physics.arcade?.debug) {
      return
    }

    if (this.wallsLayer === null) {
      throw new Error('Walls layer is null')
    }

    // dynamic import
    const debug = await import('../utils/debug')
    debug.debugDraw(this.wallsLayer, this)
  }

  // #endregion
}
