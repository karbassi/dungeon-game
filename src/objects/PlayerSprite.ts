export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  healthPoints: number = 100;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  speed: number = 100;

  constructor(scene: Phaser.Scene, x: number, y: number, speed?: number) {
    super(scene, x, y, 'character');

    this.makeAnimations();

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Scale down body to fit around sprite
    this.body.setSize(this.width * 0.5, this.height * 0.8);

    this.anims.play('character-idle-down', true);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // movement speed
    this.speed = speed ?? this.speed;
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    if (this.cursors.left.isDown) {
      this.anims.play('character-run-side', true);
      this.scaleX = -1;
      this.body.offset.x = 24;
      this.setVelocity(-this.speed, 0);
    } else if (this.cursors.right.isDown) {
      this.anims.play('character-run-side', true);
      this.scaleX = 1;
      this.body.offset.x = 8;
      this.setVelocity(this.speed, 0);
    } else if (this.cursors.up.isDown) {
      this.anims.play('character-run-up', true);
      this.setVelocity(0, -this.speed);
    } else if (this.cursors.down.isDown) {
      this.anims.play('character-run-down', true);
      this.setVelocity(0, this.speed);
    } else {
      const direction = this.anims.currentAnim.key.split('-')[2];
      this.anims.play(`character-idle-${direction}`, true);
      this.setVelocity(0);
    }
  }

  // TODO: What happens with lizard touches player?
  // TODO: remove underscores from parameters
  hit(
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    _lizards: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    // throw new Error('Method not implemented.');
  }

  makeAnimations() {
    this.anims.create({
      key: 'character-idle-down',
      frames: [{ key: 'character', frame: 'walk-down-3' }],
    });

    this.anims.create({
      key: 'character-idle-up',
      frames: [{ key: 'character', frame: 'walk-up-3' }],
    });

    this.anims.create({
      key: 'character-idle-side',
      frames: [{ key: 'character', frame: 'walk-side-3' }],
    });

    this.anims.create({
      key: 'character-run-down',
      frames: this.anims.generateFrameNames('character', {
        prefix: 'run-down-',
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-run-up',
      frames: this.anims.generateFrameNames('character', {
        prefix: 'run-up-',
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-run-side',
      frames: this.anims.generateFrameNames('character', {
        prefix: 'run-side-',
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }
}
