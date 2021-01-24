import PhaserLogo from '../objects/phaserLogo'
import Text from '../objects/fpsText'
import preloadScene from './preloadScene'
import { Scene } from 'phaser'
import Bullet from '../objects/Bullet'
// import Bullets from '../objects/Bullets'
import Gun from '../objects/Gun'
// import {WeaponPlugin}  from 'phaser3-weapon-plugin'
import { WeaponPlugin } from '../../node_modules/phaser3-weapon-plugin/dist/WeaponPlugin.js'

// let map;
// let tileset;
// let belowLayer
// worldLayer
// objectsLayer

// var SNAP_INTERVAL = Phaser.Math.PI2 / 8;
//
// var directions = {
//   '-180': 'w',
//   '-135': 'nw',
//   '-90': 'n',
//   '-45': 'ne',
//   '0': 'e',
//   '45': 'se',
//   '90': 's',
//   '135': 'sw',
//   '180': 'w'
// };
export default class MainScene extends Scene {


  constructor() {
    super({ key: 'MainScene' })
  }
  fire() {
    let nextFire = 0;
    let fireRate = 100

    if (this.time.now > nextFire && this.bullets.countDead() > 0)
    {
      nextFire = this.time.now + fireRate;

      let bullet = this.bullets.getFirstDead();

      bullet.reset(this.gun.x - 8, this.gun.y - 8);

      this.physics.moveToPointer(bullet, 300);
    }

  }
  create(config) {
    this.map = this.make.tilemap({key: 'map'})

    this.tileset = this.map.addTilesetImage('tileset-main', 'tiles')
    this.belowLayer = this.map.createStaticLayer('floor', this.tileset, 0, 0)
    this.worldLayer = this.map.createStaticLayer('top', this.tileset, 0, 0)
    this.objectsLayer = this.map.createStaticLayer('objects', this.tileset, 0, 0)
    this.map.setCollisionByProperty({catch: 'catch'})

    this.player = this.physics.add.sprite(400, 1000, 'ash', 6);
    this.player.setCollideWorldBounds(true)

    // this.target = this.physics.add.sprite()

    this.gun = new Gun(this, this.player, 'pistol')
    // this.weapon = this.make.weapon({bulletLimit: 30, key: 'bullet'});

    // this.input.on('pointermove', function (pointer) {
    //   let angle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, pointer.worldX, pointer.worldY)
    //   let angleSnap = Phaser.Math.Snap.To(angle, SNAP_INTERVAL)
    //   let angleSnapDeg = Phaser.Math.RadToDeg(angleSnap)
    //   let angleSnapDir = directions[angleSnapDeg]
    //
    //   this.gun.rotation = angle;
    // }, this);

    // this.bullets = new Bullets(this);

    // Install it into a scene
    // this.plugins.installScenePlugin(
    //   'WeaponPlugin',
    //   WeaponPlugin.WeaponPlugin,
    //   'weapons',
    //   this
    // );

    // this.playerBullets = this.physics.add.group(new Bullet(this))
    // this.input.setDefaultCursor('assets/img/aim.png, pointer')
    this.cursors = this.input.keyboard.createCursorKeys();
    //originally worked
    this.target = this.physics.add.sprite(0, 0, 'aim')

    this.target.setCollideWorldBounds(true)
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.Arcade;
    this.bullets.createMultiple(50, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);






    // originally worked
    this.input.on('pointermove', function (pointer) {

      if(this.input.mouse.locked) {
        this.target.x += pointer.movementX;
        this.target.y += pointer.movementY
      }
      // this.target.x = pointer.x
      // this.target.y = pointer.y
      // this.target.setPosition(pointer.x, pointer.y)

    }, this);

    this.weapons(10, 'bullet')
    //
    this.weapons.fireFrom.set(300, 300)
    this.input.keyboard.on('keydown-' + 'X', (weapon) => {
    this.weapons.fire.this
    });


    this.worldLayer.setCollisionByProperty({
      collided: true
    })

    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels
    this.physics.add.collider(this.player, this.worldLayer)

    // this.physics.add.collider(this.bullets, this.worldLayer, function(bullets, worldLayer) {
    //   bullets.setActive(false)
    //   bullets.setVisible(false)
    //   // this.map.removeTileAt(bullets.body.x, bullets.body.y)
    // }, null, this);

    // this.input.keyboard.on('keydown-' + 'X', (pointer) => {
    //   this.bullets.fireBullet(this.gun.x, this.gun.y, this.vec.x *200, this.vec.y * 200);
    // });
   // this.input.on('pointerdown', () => {
   //    // this.bullets.fireBullet(this.gun, this.target)
   //
   //  //  console.log("shoot")
   //  // let bullet = this.playerBullets.get().setActive(true).setVisible(true);
   //  //
   //  //  if (bullet)
   //  //  {
   //  //    // this.playerBullets.Bullet.fire(this.gun, this.target)
   //  //    // this.physics.add.collider(enemy, bullet, enemyHitCallback);
   //  //    this.physics.add.collider(this.worldLayer, this.playerBullets, function() {
   //  //      this.playerBullets.setActive(false)
   //  //      this.playerBullets.setVisible(false)
   //  //    });
   //  //  }
   //
   //
   //   let bullet = this.physics.add.sprite(this.gun.x, this.gun.y, 'bullet');
   //
   //   bullet.rotation = this.angleToPointer;
   //   this.bullets_array.push(bullet);
   //   this.physics.add.collider(bullet, walls, function(){
   //     bullet.destroy();
   //   });
   //   this.physics.velocityFromRotation(this.angleToPointer, 450, bullet.body.velocity);d
   // }, this);

    // this.physics.add.overlap(this.player, belowLayer, function(player, layer) {
    //
    //   let tile = this.map.getTileAt(200, 200, true, layer)
    //   let index = tile.index
    //   // let value = properties['catch']
    //
    //   if (index === 8) {
    //     this.txt = new Text(this, this.player.x, this.player.y, 'hello', {color: 'white', fontsize: '24px'});
    //   }
    // })

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)

    this.cameras.main.startFollow(this.player, true, 0.8, 0.8)

    // this.cursors = this.input.keyboard.createCursorKeys();

    // let playerVector = this.physics.velocityFromAngle(this.player.angle, 16)
    //
    // this.add.circle(this.player.x + playerVector.x, this.player.y + playerVector.y, 5, 0xffffff, 1)



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


  // constrainTarget(target) {
    //
    // let distX = target.x-this.player.x; // X distance between player & reticle
    // let distY = target.y-this.player.y; // Y distance between player & reticle
    //
    // // Ensures reticle cannot be moved offscreen (player follow)
    // if (distX > 800)
    //   target.x = this.player.x+800;
    // else if (distX < -800)
    //   target.x = this.player.x-800;
    //
    // if (distY > 600)
    //   target.y = this.player.y+600;
    // else if (distY < -600)
    //   target.y = this.player.y-600;
  // }


  update(time, delta) {

    this.gun.updatePosition(this.player, this.target);
    this.gun.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.target.x, this.target.y);
    this.target.body.velocity.x = this.player.body.velocity.x;
    this.target.body.velocity.y = this.player.body.velocity.y;

    this.player.body.setVelocity(0);
    const speed = 100;
    // this.add.circle(this.player.body.x * 16, this.player.body.y * 16, 5, 0xffffff, 1)


    if (this.cursors.left.isDown)
    {
      this.player.flipX = false;
      this.player.anims.play('left', true);
      this.player.body.setVelocityX(-speed);
      this.player.body.angle = 180
    }
    else if (this.cursors.right.isDown)
    {
      this.player.flipX = true;
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

    // this.constrainTarget(this.target)

    // constrainVelocity(this.player, 500)

    // this.playerVector = this.physics.velocityFromAngle(this.player.angle, 1)


      // if (this.map.getTileAtWorldXY(this.player.x, this.player.y, true, this.cameras.main, 'floor').index === 8) {
      //   this.player.setPosition(200, 200)
      //   console.log('ok')
      // }

  }



}
