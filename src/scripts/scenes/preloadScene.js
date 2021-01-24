// import {WeaponPlugin}  from 'phaser3-weapon-plugin'


import { WeaponPlugin } from '../../node_modules/phaser3-weapon-plugin/dist/WeaponPlugin.js'
let directions = {
  '-180': 'w',
  '-135': 'nw',
  '-90': 'n',
  '-45': 'ne',
  '0': 'e',
  '45': 'se',
  '90': 's',
  '135': 'sw',
  '180': 'w'
};

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }


  preload() {
    this.load.image('tiles', 'assets/img/tileset-main.png');
    this.load.image('bushes', 'assets/img/bushes.png');
    this.load.image('pistol', 'assets/img/pistol.png');
    this.load.image('bullet', 'assets/img/bullet.png');
    this.load.image('aim', 'assets/img/aim.png');
    this.load.tilemapTiledJSON('map', "assets/maps/mainMap.json")

    this.load.spritesheet('ash',
      'assets/img/ash.png',
      { frameWidth: 16, frameHeight: 24 })
     // this.load.script('WeaponPlugin', '../node_modules/phaser3-weapon-plugin/dist/WeaponPlugin.js', 'weaponPlugin', 'weapons');

    // this.load.scenePlugin('WeaponPlugin', WeaponPlugin.WeaponPlugin, 'weapons')
    // function preload () {
    //   // Load the script
    // }
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
