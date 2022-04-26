enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export default class LizardSprite extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.RIGHT;
  private speed = 50;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.makeAnimations();

    this.anims.play('lizard-idle');

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Allows body to have collision
    this.body.onCollide = true;

    // What to do when colliding with the world
    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision,
      this
    );
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    switch (this.direction) {
      case Direction.UP:
        this.setVelocity(0, -this.speed);
        break;

      case Direction.DOWN:
        this.setVelocity(0, this.speed);
        break;

      case Direction.LEFT:
        this.setVelocity(-this.speed, 0);
        this.scaleX = -1;
        this.body.offset.x = this.body.width;
        break;

      case Direction.RIGHT:
        this.setVelocity(this.speed, 0);
        this.scaleX = 1;
        this.body.offset.x = 0;
        break;
    }
  }

  makeAnimations() {
    this.anims.create({
      key: 'lizard-idle',
      frames: this.anims.generateFrameNames('lizard', {
        start: 0,
        end: 3,
        prefix: 'lizard_m_idle_anim_f',
        suffix: '.png',
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'lizard-run',
      frames: this.anims.generateFrameNames('lizard', {
        start: 0,
        end: 3,
        prefix: 'lizard_m_run_anim_f',
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  randomDirection(exclude: number) {
    let newDirection = Phaser.Math.Between(0, 3);
    while (newDirection === exclude) {
      newDirection = Phaser.Math.Between(0, 3);
    }

    return newDirection;
  }

  handleTileCollision(item: Phaser.Physics.Arcade.Sprite) {
    if (item !== this) {
      return;
    }

    this.direction = this.randomDirection(this.direction);
  }
}
