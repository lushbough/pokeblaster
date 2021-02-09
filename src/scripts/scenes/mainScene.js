import preloadScene from './preloadScene'
import { Scene } from 'phaser'

import Phaser from 'phaser'
import { WeaponPlugin, consts } from 'phaser3-weapon-plugin'

let pistol;

export default class MainScene extends Phaser.Scene {


  constructor() {
    super({ key: 'MainScene' })
  }
  // preload ()
  // {
  //   // Install it into a scene
  //   this.plugins.installScenePlugin(
  //     'WeaponPlugin',
  //     WeaponPlugin,
  //     'weapons',
  //     this
  //   );
  // }



  create() {

    this.socket = io();
 


    this.map = this.make.tilemap({key: 'map'})

    this.tileset = this.map.addTilesetImage('tileset-main', 'tiles')
    this.belowLayer = this.map.createStaticLayer('bottom', this.tileset, 0, 0)
    this.worldLayer = this.map.createStaticLayer('top', this.tileset, 0, 0)
    // this.objectsLayer = this.map.createStaticLayer('objects', this.tileset, 0, 0)

    this.player = this.physics.add.sprite(16, 95 * 16, 'ash', 6);
    this.player.setCollideWorldBounds(true)
    this.player.tint= 0xffffff

    this.gun = this.physics.add.sprite(0, 0, 'pistol')
    this.gun.setPosition(this.player.x + 10, this.player.y + 10)
    this.gun.body.allowRotation = true

    this.bullet = this.physics.add.sprite(this.gun.x, this.gun.y, 'bullet')
    this.bullet.setCollideWorldBounds(true)



    this.cursors = this.input.keyboard.createCursorKeys();

    this.worldLayer.setCollisionByProperty({
      collided: true
    })

    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels
    this.physics.add.collider(this.player, this.worldLayer)
    this.physics.add.collider(this.bullet, this.worldLayer, (bullet, layer) => {
      bullet.disableBody(true, true)
    });



    // this.weapon = this.add.weapon(10, 'bullet')
    // this.weapon.debugPhysics = true;
    // this.weapon.bulletKillType = consts.KillType.KILL_WORLD_BOUNDS
    // this.weapon.bulletSpeed = 600
    // this.weapon.bulletLifespan = 600
    // this.weapon.fireRate = 300;
    // this.weapon.trackSprite(this.gun, 0 , 0, true)

    //
    // this.physics.add.collider(this.worldLayer, this.weapon.bullets, (layer, bullet) => {
    //   bullet.kill()
    // });



    this.input.setDefaultCursor('url(assets/img/aim.png), pointer')

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8)

    // this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet').setScale(.4)
    this.angle = 0;
    this.bullet.disableBody(true, true);

    //point gun towards pointer
    this.input.on('pointermove', function (pointer) {
      let cursor = pointer
      // this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
      this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, cursor.worldX, cursor.worldY);
      // this.angle = this.physics.arcade.angleBetween(this.player.x, this.player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
      this.gun.rotation = this.angle

      this.input.on('pointerup', function () {
        // this.weapon.fireAtXY(cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
        this.bullet.enableBody(true, this.gun.x, this.gun.y, true, true);
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

    this.gun.setPosition(this.player.x + 10, this.player.y + 10)
    // this.gun.body.rotation = Phaser.Math.Angle.BetweenPoints(this.gun, this.input.activePointer)
    // this.gun.rotation = this.physics.a.angleToPointer(this.gun)
    // this.gun.setOffset(10, 10)






    this.player.body.setVelocity(0);
    const speed = 200;


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
