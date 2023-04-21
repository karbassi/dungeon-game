import type { Tilemaps, Scene, Types } from 'phaser'
import { Display } from 'phaser'

function debugDraw(layer: Tilemaps.TilemapLayer, scene: Scene) {
  const debugGraphics = scene.add.graphics().setAlpha(0.75)

  const styleConfig: Types.Tilemaps.StyleConfig = {
    tileColor: null,
    collidingTileColor: new Display.Color(243, 134, 48, 255),
    faceColor: new Display.Color(40, 39, 37, 255),
  }

  layer.renderDebug(debugGraphics, styleConfig)
}

export { debugDraw }
