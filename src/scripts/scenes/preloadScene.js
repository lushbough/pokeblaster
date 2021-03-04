// import { WeaponPlugin } from 'phaser3-weapon-plugin'


export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }
  preload() {
    this.load.image('tiles', 'assets/img/tilesethope.png');
    this.load.image('bushes', 'assets/img/bushes.png');
    this.load.image('pistol', 'assets/img/pistol.png');
    this.load.image('bullet', 'assets/img/fireBullet.png');
    this.load.image('aim', 'assets/img/aim.png');
    this.load.tilemapTiledJSON('map', "assets/maps/tilemap.json")

    this.load.spritesheet('ash',
      'assets/img/ash.png',
      { frameWidth: 16, frameHeight: 24 })
      this.load.audio('shoot', 'assets/audio/shoot.mp3')
      this.load.audio('bg', 'assets/audio/bg.mp3')
  }

  create() {
    this.scene.start('MainScene')
  }
}
