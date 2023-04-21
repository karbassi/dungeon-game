type ColliderGameObject =
  | Phaser.Types.Physics.Arcade.GameObjectWithBody
  | Phaser.Tilemaps.Tile

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  public healthPoints = 100
  private speed = 100
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number, y: number, speed?: number) {
    super(scene, x, y, 'character')

    this.makeAnimations()

    // Add to scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // check if body is null
    if (this.body === null) {
      throw new Error('Body is null')
    }

    // Scale down body to fit around sprite
    this.body.setSize(this.width * 0.5, this.height * 0.8)

    this.anims.play('character-idle-down', true)

    // Create cursor keys
    if (this.scene.input.keyboard === null) {
      throw new Error('Keyboard is null')
    }

    this.cursors = this.scene.input.keyboard.createCursorKeys()

    // movement speed
    this.speed = speed ?? this.speed
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt)

    // check if body is null
    if (this.body === null) {
      return
    }

    if (this.cursors.left.isDown) {
      this.moveLeft()
    } else if (this.cursors.right.isDown) {
      this.moveRight()
    } else if (this.cursors.up.isDown) {
      this.moveUp()
    } else if (this.cursors.down.isDown) {
      this.moveDown()
    } else {
      this.moveIdle()
    }
  }

  // TODO: What happens with lizard touches player?
  // TODO: remove underscores from parameters
  public hit(_player: ColliderGameObject, _lizards: ColliderGameObject): void {
    // throw new Error('Method not implemented.')
    console.log('Plater hit Lizard', _player, _lizards)
  }

  // PRIVATE

  private makeAnimations() {
    this.anims.create({
      key: 'character-idle-down',
      frames: [{ key: 'character', frame: 'walk-down-3' }],
    })

    this.anims.create({
      key: 'character-idle-up',
      frames: [{ key: 'character', frame: 'walk-up-3' }],
    })

    this.anims.create({
      key: 'character-idle-side',
      frames: [{ key: 'character', frame: 'walk-side-3' }],
    })

    this.anims.create({
      key: 'character-run-down',
      frames: this.anims.generateFrameNames('character', {
        prefix: 'run-down-',
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    })

    this.anims.create({
      key: 'character-run-up',
      frames: this.anims.generateFrameNames('character', {
        prefix: 'run-up-',
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    })

    this.anims.create({
      key: 'character-run-side',
      frames: this.anims.generateFrameNames('character', {
        prefix: 'run-side-',
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    })
  }

  private moveIdle() {
    if (this.anims.currentAnim === null) {
      return
    }

    const direction = this.anims.currentAnim.key.split('-')[2]
    this.anims.play(`character-idle-${direction}`, true)
    this.setVelocity(0)
  }

  private moveDown() {
    this.anims.play('character-run-down', true)
    this.setVelocity(0, this.speed)
  }

  private moveUp() {
    this.anims.play('character-run-up', true)
    this.setVelocity(0, -this.speed)
  }

  private moveRight() {
    if (this.body === null) {
      return
    }

    this.anims.play('character-run-side', true)
    this.scaleX = 1
    this.body.offset.x = 8
    this.setVelocity(this.speed, 0)
  }

  private moveLeft() {
    if (this.body === null) {
      return
    }

    this.anims.play('character-run-side', true)
    this.scaleX = -1
    this.body.offset.x = 24
    this.setVelocity(-this.speed, 0)
  }
}
