namespace SpriteKind {
    export const Ball = SpriteKind.create()
}
function BallSetup () {
    Ball = sprites.create(img`
        . . . . . b b b b b b . . . . . 
        . . . b b 9 9 9 9 9 9 b b . . . 
        . . b b 9 9 9 9 9 9 9 9 b b . . 
        . b b 9 d 9 9 9 9 9 9 9 9 b b . 
        . b 9 d 9 9 9 9 9 1 1 1 9 9 b . 
        b 9 d d 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 d 9 9 9 9 9 9 1 1 1 9 9 9 b 
        b 9 3 9 9 9 9 9 9 9 9 9 1 9 9 b 
        b 5 3 d 9 9 9 9 9 9 9 9 9 9 9 b 
        b 5 3 3 9 9 9 9 9 9 9 9 9 d 9 b 
        b 5 d 3 3 9 9 9 9 9 9 9 d d 9 b 
        . b 5 3 3 3 d 9 9 9 9 d d 5 b . 
        . b d 5 3 3 3 3 3 3 3 d 5 b b . 
        . . b d 5 d 3 3 3 3 5 5 b b . . 
        . . . b b 5 5 5 5 5 5 b b . . . 
        . . . . . b b b b b b . . . . . 
        `, SpriteKind.Projectile)
    Ball.setBounceOnWall(true)
    Ball.setStayInScreen(true)
    Ball.setVelocity(-60, 60)
    BallSpeed = 90
    BallMaxVxFactor = 0.75
    BallMaxVx = BallSpeed * BallMaxVxFactor
    Ball.setPosition(95, 80)
    BallVx = 0
    BallVx = BallSpeed - BallMaxVxFactor
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let ballinplay1 = 0
    if (!(ballinplay1)) {
        Ballinplay()
        Paddle1 = 1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    BallMaxVx = Ball.x + Paddle1.x
    if (xDiff == 0) {
        xDiff = 2
    }
    BallVx = Math.abs(xDiff) * (BallMaxVx + (Paddle1.width + 2))
    BallVy = BallVx - BallSpeed
    if (xDiff < 0) {
        BallVx = BallVx * -1
    }
    Ball.setVelocity(BallVx, BallVy)
})
function PaddleReset () {
    Paddle1.setPosition(76, 100)
}
function BounceBall () {
	
}
function Paddle () {
    Paddle1 = sprites.create(img`
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `, SpriteKind.Player)
    controller.moveSprite(Paddle1, 150, 0)
    Paddle1.setStayInScreen(true)
    Paddle1.setPosition(77, 101)
}
function Ballinplay () {
    if (info.life() <= 0) {
        game.gameOver(false)
    } else {
        BallSetup()
        PaddleReset()
    }
}
let BallVy = 0
let xDiff = 0
let Paddle1 = 0
let BallMaxVx = 0
let BallMaxVxFactor = 0
let BallSpeed = 0
let BallVx = 0
let Ball: Sprite = null
Ball = sprites.create(img`
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
tiles.setCurrentTilemap(tilemap`level4`)
BallVx = 0
info.setLife(3)
let BrickCount = 24
BrickCount = 0
Paddle()
