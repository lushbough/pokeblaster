


export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    // super(scene, x, y, 'bullet')

    super(scene, 0, 0, 'bullet')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.speed = 1;
    this.xSpeed =0
    this.ySpeed = 0;
    this.lifespan = 0;
    this.direction = 0;

    //
    scene.checkWorldBounds = true;
    scene.outOfBoundsKill = true;
  }

  fire(gun, target) {
    // this.body.reset(gun.x, gun.y);
    this.setPosition(gun.x, gun.y); //initial position
    //
    // this.setActive(true);
    // this.setVisible(true);
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    }
    else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }

    this.rotation = gun.rotation;
    // this.angle = gun.angle
    // this.setVelocityY(vy);
    // this.setVelocityX(vx)
    // let angle = Phaser.Math.DegToRad(gun.body.rotation);
    // this.setVelocity(gun.velocity.x * 2, gun.velocity.y * 2)

    // this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity)
    // this.body.velocity.x *= 2;
    // this.body.velocity.y *= 2;
    this.lifespan = 0;
  }
    update(time, delta)
  {
    this.x += this.xSpeed * delta
    this.y += this.ySpeed * delta
    this.lifespan += delta
    // super.preUpdate(time, delta);


    if (this.lifespan > 1500)
    {
      this.setActive(false);
      this.setVisible(false);
      // this.body.stop();

    }
  }
}


