
// let SNAP_INTERVAL = Phaser.Math.PI2 / 8;
//
// export default class Gun extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, player, weaponID) {
//     super(scene, player.x, player.y, weaponID)
//     this.self = scene;
//     scene.add.existing(this)
//     scene.physics.add.existing(this)
//     // this.body.setSize(4,4)
//     // this.body.setOffset(5,5)
//     // this.anchor.set(.5)
//     this.setScale(.9, .9)
//     this.body.allowRotation = true
//     // this.setScale(.25, .15).setOrigin(0.5,1.5)
//
//
//     // scene.input.on('pointermove', function (pointer) {
//     //   this.updateWeaponAngle(pointer, player)
//     // }, this);
//
//
//   }
//
//
//   // updateWeaponAngle(pointer, player) {
//   //   player.rotation = Phaser.Math.Angle.Between(player.x, player.y, pointer.worldX, pointer.worldY)
//   //   let angleSnap = Phaser.Math.Snap.To(angle, SNAP_INTERVAL)
//   //   let angleSnapDeg = Phaser.Math.RadToDeg(angleSnap)
//   //   // let angleSnapDir = directions[angleSnapDeg]
//   //   let degreeAngle = Phaser.Math.RadToDeg(angle)
//   //
//   //   this.setAngle(degreeAngle + 90)
//   // }
// }