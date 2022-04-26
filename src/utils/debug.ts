function debugDraw(layer: Phaser.Tilemaps.TilemapLayer, scene: Phaser.Scene) {
  const debugGraphics = scene.add.graphics().setAlpha(0.75);

  const styleConfig: Phaser.Types.Tilemaps.StyleConfig = {
    tileColor: null,
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255),
  };

  layer.renderDebug(debugGraphics, styleConfig);
}

export { debugDraw };
