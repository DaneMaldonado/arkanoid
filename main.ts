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
    BallSpeed = 500
    BallMaxVxFactor = 0.75
    BallMaxVx = BallSpeed * BallMaxVxFactor
    Ball2.setPosition(95, 80)
    BallVx = 0
    BallVx = BallSpeed - BallMaxVxFactor
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ball, function (sprite, otherSprite) {
    bounceBall(otherSprite)
    otherSprite.y = sprite.top - 1
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
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
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(PowerUp)
    controller.moveSprite(Paddle1, 300, 0)
})
sprites.onOverlap(SpriteKind.Ball, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Ball, assets.tile`myTile8`, function (sprite, location) {
    bounceBall(sprite)
    tiles.setTileAt(location, assets.tile`myTile1`)
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.Ball, assets.tile`myTile1`, function (sprite, location) {
    bounceBall(sprite)
    tiles.setTileAt(location, assets.tile`myTile2`)
    info.changeScoreBy(1)
})
function PowerUp2 () {
    PowerUp = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 9 6 . . . . . . . 
        . . . . . . 6 9 9 9 . . . . . . 
        . . . . . . 9 9 9 6 . . . . . . 
        . . . . . . . 6 9 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    PowerUp.setPosition(randint(15, 145), 0)
    PowerUp.setVelocity(0, 50)
    PowerUp.setFlag(SpriteFlag.AutoDestroy, true)
}
function advancelevel () {
    TotalScoreNeeded += LevelScoreNeeded[level]
    tiles.setCurrentTilemap(LevelMaps[level])
    level += 1
    game.splash("Level " + level)
    sprites.destroyAllSpritesOfKind(SpriteKind.Ball)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    Paddle2()
    BallSetup()
}
info.onScore(118, function () {
    game.gameOver(true)
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
        222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
        `, SpriteKind.Player)
    controller.moveSprite(Paddle1, 150, 0)
    Paddle1.setStayInScreen(true)
    Paddle1.setPosition(77, 101)
}
let PowerUp: Sprite = null
let Paddle1: Sprite = null
let BallVy = 0
let BallMaxVx = 0
let BallMaxVxFactor = 0
let BallSpeed = 0
let BallVx = 0
let level = 0
let LevelScoreNeeded: number[] = []
let LevelMaps: tiles.TileMapData[] = []
let Ball2: Sprite = null
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
    `, SpriteKind.Ball)
LevelMaps = [tilemap`level13`, tilemap`level0`, tilemap`level14`]
LevelScoreNeeded = [16, 57, 118]
let TotalScoreNeeded = 0
level = 0
let Barrier = sprites.create(img`
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ........................................................................................................................................................................................................
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `, SpriteKind.Enemy)
Barrier.setPosition(78, 115)
Ball2.setPosition(randint(5, 150), randint(0, 50))
BallVx = 0
info.setScore(0)
Paddle2()
BallSetup()
advancelevel()
game.onUpdate(function () {
    if (info.score() >= TotalScoreNeeded) {
        advancelevel()
    } else if (info.score() >= 57) {
        advancelevel()
    } else {
    	
    }
})
game.onUpdateInterval(5000, function () {
    controller.moveSprite(Paddle1, 150, 0)
})
game.onUpdateInterval(15000, function () {
    PowerUp2()
})
