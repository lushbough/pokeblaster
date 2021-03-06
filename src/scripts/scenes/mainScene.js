import Phaser from 'phaser'

let bulletSound;

export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    // this.socket = io();
    this.map = this.make.tilemap({key: 'map'})

    this.tileset = this.map.addTilesetImage('tilesethope', 'tiles')
    this.belowLayer = this.map.createDynamicLayer('bottom', this.tileset, 0, 0)
    this.worldLayer = this.map.createDynamicLayer('top', this.tileset, 0, 0)

    this.player = this.physics.add.sprite(16, 95 * 16, 'ash', 6);
    this.player.setCollideWorldBounds(true)
    this.player.tint= 0xffffff

    this.gun = this.physics.add.sprite(0, 0, 'pistol')
    this.gun.setPosition(this.player.x + 10, this.player.y + 10)
    this.gun.body.allowRotation = true

    this.bullet = this.physics.add.sprite(this.gun.x, this.gun.y, 'bullet')
    this.bullet.setCollideWorldBounds(true)
    this.bullet.setScale(.5)

    bulletSound = this.sound.add('shoot')
    bulletSound.setVolume(.4)
    this.bg = this.sound.add('bg')
    this.bg.setLoop(true);
    this.bg.play();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.worldLayer.setCollisionByProperty({
      collided: true
    })

    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels
    this.physics.add.collider(this.player, this.worldLayer)

    this.physics.add.overlap(this.bullet, this.worldLayer, (bullet, worldLayer) => {
      this.worldLayer.removeTileAtWorldXY(this.bullet.x, this.bullet.y, this.cameras.main)
      console.log("layer bullet collision at " + this.bullet.x+ " " + this.bullet.y )
    });

    this.input.setDefaultCursor('url(assets/img/aim.png), pointer')

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8)

    this.angle = 0;
    this.bullet.disableBody(true, true);

    //point gun towards pointer
    this.input.on('pointermove', function (pointer) {
      let cursor = pointer
      this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, cursor.worldX, cursor.worldY);
      this.gun.rotation = this.angle

      this.input.on('pointerup', function () {

        bulletSound.play();
        this.bullet.enableBody(true, this.gun.x, this.gun.y, true, true);
        this.physics.velocityFromRotation(this.angle, 400, this.bullet.body.velocity);
      }, this);
    }, this);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('ash', { start: 6, end: 8}),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('ash', { start: 6, end: 8 }),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('ash', { start: 0, end: 2 }),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('ash', { start: 3, end: 5 }),
      frameRate: 15,
      repeat: -1
    })

  } //END CREATE METHOD

  update(time, delta) {

    this.gun.setPosition(this.player.x + 10, this.player.y + 10)

    this.player.body.setVelocity(0);
    const speed = 200

    if (this.cursors.left.isDown)
    {
      this.player.flipX = false;
      this.gun.flipY = true;
      this.player.anims.play('left', true);
      this.player.body.setVelocityX(-speed);
      this.player.body.angle = 180
    }
    else if (this.cursors.right.isDown)
    {
      this.player.flipX = true;
      this.gun.flipY = false;
      this.player.anims.play('right', true);
      this.player.body.setVelocityX(speed);
      this.player.body.angle = 0

    }
    else if (this.cursors.up.isDown)
    {
      this.player.anims.play('up', true);
      this.player.body.setVelocityY(-speed);
      this.player.body.angle = 90

    }
    else if (this.cursors.down.isDown)
    {
      this.player.anims.play('down', true);
      this.player.body.setVelocityY(speed);
      this.player.body.angle = 270
    }
    else
    {
      this.player.anims.stop();
    }
  } //end of update method
}
