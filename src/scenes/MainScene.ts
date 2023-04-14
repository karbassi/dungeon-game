import LizardSprite from '../objects/LizardSprite'
import PlayerSprite from '../objects/PlayerSprite'

export default class MainScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  character!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  lizards!: Phaser.Physics.Arcade.Group
  speed!: number
  player!: PlayerSprite

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
    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2)

    // Check if tileset is null
    if (tileset === null) {
      throw new Error('Tileset is null')
    }

    // !NOTE: Order of layers is important
    map.createLayer('Ground', tileset)
    const wallsLayer = map.createLayer('Walls', tileset)
    map.createLayer('Above', tileset)

    if (wallsLayer === null) {
      throw new Error('Walls layer is null')
    }

    wallsLayer.setCollisionByProperty({ collides: true })

    // debugDraw(wallsLayer, this);

    this.player = new PlayerSprite(this, 428, 128)

    // lizard
    this.lizards = this.physics.add.group({
      classType: LizardSprite,
    })

    this.lizards.get(206, 108)
    this.lizards.get(356, 256)
    this.lizards.get(356, 512)

    // Collisions
    this.physics.add.collider(this.player, wallsLayer)
    this.physics.add.collider(this.lizards, wallsLayer)
    this.physics.add.collider(this.player, this.lizards, this.player.hit)

    // Camera follow player
    this.cameras.main.startFollow(this.player, true)
  }

  update() {}
}
