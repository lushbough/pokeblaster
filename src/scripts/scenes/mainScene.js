import preloadScene from './preloadScene'
import { Scene } from 'phaser'

import Phaser from 'phaser'
import { WeaponPlugin } from 'phaser3-weapon-plugin'


export default class MainScene extends Phaser.Scene {


  constructor() {
    super({ key: 'MainScene' })
  }
  preload ()
  {
    // Install it into a scene
    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin,
      'weapons',
      this
    );
  }

  create() {

    console.log(this.weapons, this.weapons.add, this.add.weapon)

    this.map = this.make.tilemap({key: 'map'})

    this.tileset = this.map.addTilesetImage('tileset-main', 'tiles')
    this.belowLayer = this.map.createStaticLayer('floor', this.tileset, 0, 0)
    this.worldLayer = this.map.createStaticLayer('top', this.tileset, 0, 0)
    // this.objectsLayer = this.map.createStaticLayer('objects', this.tileset, 0, 0)

    this.player = this.physics.add.sprite(400, 1000, 'ash', 6);
    this.player.setCollideWorldBounds(true)

    // this.gun = this.physics.add.sprite(0,0, 'gun')

    this.cursors = this.input.keyboard.createCursorKeys();

    this.worldLayer.setCollisionByProperty({
      collided: true
    })

    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels
    this.physics.add.collider(this.player, this.worldLayer)


    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8)

    this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet').setScale(.4)
    this.angle = 0;
    this.bullet.disableBody(true, true);

    //point gun towards pointer
    this.input.on('pointermove', function (pointer) {
      let cursor = pointer
      this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
       // this.gun.angle = this.angle
      this.input.on('pointerup', function () {
        this.bullet.enableBody(true, this.player.x, this.player.y, true, true);
        this.physics.velocityFromRotation(this.angle, 600, this.bullet.body.velocity);
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

    // this.gun.setPosition(this.player.x, this.player.y)
    // this.gun.body.rotation = Phaser.Math.Angle.BetweenPoints(this.gun, this.input.activePointer)
    // this.gun.rotation = game.physics.arcade.angleToPointer(this.gun)

    this.player.body.setVelocity(0);
    const speed = 200;
    // this.add.circle(this.player.body.x * 16, this.player.body.y * 16, 5, 0xffffff, 1)


    if (this.cursors.left.isDown)
    {
      this.player.flipX = false;
      this.player.anims.play('left', true);
      this.player.body.setVelocityX(-speed);
      // this.player.body.angle = 180
    }
    else if (this.cursors.right.isDown)
    {
      this.player.flipX = true;
      this.player.anims.play('right', true);
      this.player.body.setVelocityX(speed);
      // this.player.body.angle = 0

    }
    else if (this.cursors.up.isDown)
    {
      this.player.anims.play('up', true);
      this.player.body.setVelocityY(-speed);
      // this.player.body.angle = 90

    }
    else if (this.cursors.down.isDown)
    {
      this.player.anims.play('down', true);
      this.player.body.setVelocityY(speed);
      // this.player.body.angle = 270

    }
    else
    {
      this.player.anims.stop();
    }


  }



}
