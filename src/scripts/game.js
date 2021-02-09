import Phaser from 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 420
const DEFAULT_HEIGHT = 720



const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
      parent: 'phaser-game',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    }
  // plugins: {
  //   scene: [{ key: "WeaponPlugin", plugin: WeaponPlugin, mapping: "weapons" }]
  // }
  // loader: {
  //   baseURL: "https://labs.phaser.io",
  //   crossOrigin: "anonymous"
  // },
  // plugins: {
  //   scene: [
  //     { key: "WeaponPlugin", plugin: WeaponPlugin.WeaponPlugin }
  //   ]
  // }
  };


window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
