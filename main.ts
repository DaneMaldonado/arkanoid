namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const Paddle = SpriteKind.create()
}
function BallSetup () {
    Ball2 = sprites.create(img`
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        `, SpriteKind.Ball)
    Ball2.scale = 0.35
    Ball2.setBounceOnWall(true)
    Ball2.setStayInScreen(true)
    Ball2.setVelocity(-60, 60)
    BallSpeed = 170
    BallMaxVxFactor = 0.75
    BallMaxVx = BallSpeed * BallMaxVxFactor
    Ball2.setPosition(95, 80)
    BallVx = 0
    BallVx = BallSpeed - BallMaxVxFactor
}
function advanceLevel () {
    tiles.setCurrentTilemap(LevelMaps[level])
    level += 1
    game.splash("Level " + level)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ball, function (sprite, otherSprite) {
    bounceBall(otherSprite)
    otherSprite.y = sprite.top - 1
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    advanceLevel()
})
scene.onOverlapTile(SpriteKind.Ball, assets.tile`myTile2`, function (sprite, location) {
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
function bounceBall (BallSprite: Sprite) {
    BallVx = randint(BallSpeed / 3, BallSpeed)
    BallVy = BallSprite.vy * -1
    if (BallSprite.vx < 0) {
        BallVx = BallVx * -1
    }
    BallSprite.setVelocity(BallVx, BallVy)
}
function PaddleReset () {
    Paddle1.setPosition(76, 100)
}
scene.onOverlapTile(SpriteKind.Ball, assets.tile`myTile8`, function (sprite, location) {
    bounceBall(sprite)
    tiles.setTileAt(location, assets.tile`myTile6`)
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.Ball, assets.tile`myTile1`, function (sprite, location) {
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
function Ballinplay () {
    if (info.life() <= 0) {
        game.gameOver(false)
    } else {
        BallSetup()
        PaddleReset()
    }
}
function Paddle2 () {
    Paddle1 = sprites.create(img`
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `, SpriteKind.Player)
    controller.moveSprite(Paddle1, 150, 0)
    Paddle1.setStayInScreen(true)
    Paddle1.setPosition(77, 101)
}
let Paddle1: Sprite = null
let BallVy = 0
let level = 0
let BallMaxVx = 0
let BallMaxVxFactor = 0
let BallSpeed = 0
let BallVx = 0
let Ball2: Sprite = null
let LevelMaps: tiles.TileMapData[] = []
LevelMaps = [tilemap`level13`, tilemap`level0`, tilemap`level14`]
Ball2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level14`)
BallVx = 0
info.setLife(3)
let BrickCount = 24
BrickCount = 0
BallSetup()
Paddle2()
advanceLevel()
