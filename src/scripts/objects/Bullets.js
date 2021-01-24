// import Bullet from './Bullet'
//
// export default class Bullets extends Phaser.Physics.Arcade.Group
// {
//   constructor (scene)
//   {
//     super(scene.physics.world, scene);
//   this.checkWorldBounds = true;
//   this.outOfBoundsKill = true;
//
//
//     this.createMultiple({
//       frameQuantity: 5,
//       key: 'bullet',
//       active: false,
//       visible: false,
//       classType: Bullet
//     });
//   }
//
//   fireBullet (gun, target)
//   {
//     let bullet = this.getFirstDead(false);
//
//     if (bullet)
//     {
//       bullet.fire(gun, target);
//     }
//   }
// }