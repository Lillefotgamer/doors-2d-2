namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const Hiding = SpriteKind.create()
    export const Pill = SpriteKind.create()
    export const Fear = SpriteKind.create()
    export const Anxiety = SpriteKind.create()
    export const Silence = SpriteKind.create()
    export const Crusifix = SpriteKind.create()
    export const Smiley = SpriteKind.create()
    export const IDK = SpriteKind.create()
}
namespace StatusBarKind {
    export const FearrBar = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Smiley, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    SmileyActivated = 0
    HealthBar.value += -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Anxiety, function (sprite, otherSprite) {
    if (Crusifixes == 0) {
        sprites.destroy(sprite)
        game.showLongText("You died too who we call Anxiety ", DialogLayout.Bottom)
        game.showLongText("Anxiety comes randomly", DialogLayout.Bottom)
        game.showLongText("The screen shakes when he is coming", DialogLayout.Bottom)
        game.showLongText("And if he touches you and you are not hiding in a closet", DialogLayout.Bottom)
        game.showLongText("You die", DialogLayout.Bottom)
        game.showLongText("Thats it", DialogLayout.Bottom)
    } else {
        sprites.destroy(Anxiety)
        Crusifixes += -1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    if (FearActivated == 0) {
        if (DarkRoom == 0) {
            multilights.toggleLighting(false)
        }
    }
})
statusbars.onStatusReached(StatusBarKind.FearrBar, statusbars.StatusComparison.GT, statusbars.ComparisonType.Percentage, 99, function (status) {
    FearActivated = 1
    timer.after(5000, function () {
        Fear = sprites.create(img`
            ......33333333333......
            ....332222222222233....
            ...322fffffffffff223...
            ..32ff3333fff3333ff23..
            .32ff322223f322223ff23.
            .32f3223223f3223223f23.
            .32f3233323f3233323f23.
            32fff32323fff32323fff23
            32fff32323fff32323fff23
            32fff3223fffff3223fff23
            32ffff323fffff323ffff23
            32fffff3fffffff3fffff23
            32fff3fffffffffff3fff23
            32ff3233fffffff3323ff23
            32f32122333333322123f23
            32321d11222222211d12323
            32321d1d1111111d1d12323
            32321d1d1d1d1d1d1d12323
            32f321dd1d1d1d1dd123f23
            32ff3211dd1d1dd1123ff23
            .32ff3221111111223ff23.
            .32fff33222222233fff23.
            .32fffff3333333fffff23.
            ..32fffffffffffffff23..
            ...322fffffffffff223...
            ....332222222222233....
            ......33333333333......
            `, SpriteKind.Fear)
        tiles.placeOnRandomTile(Fear, assets.tile`myTile9`)
        Fear.follow(Playero, 150)
        Fear.setFlag(SpriteFlag.GhostThroughWalls, true)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fear, function (sprite, otherSprite) {
    if (Crusifixes == 0) {
        sprites.destroy(sprite)
        FearActivated = 0
        scene.cameraFollowSprite(Fear)
        multilights.toggleLighting(true)
        timer.after(500, function () {
            game.showLongText("Looks like you died too who we call Fear", DialogLayout.Bottom)
            game.showLongText("He comes when your fearbar is full", DialogLayout.Bottom)
            game.showLongText("When he comes the only way of surviving is having a Crusifix", DialogLayout.Bottom)
            game.showLongText("Your fearbar increases in dark areas", DialogLayout.Bottom)
            game.showLongText("The only way to decrease it is surviving Fear or taking a pill", DialogLayout.Bottom)
            game.showLongText("Thats it", DialogLayout.Bottom)
        })
    } else {
        sprites.destroy(Fear)
        FearActivated = 0
        Crusifixes += -1
        FearBar.value += -350
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    info.changeScoreBy(1)
    SmileyActivated = 0
    IdkActivated = 0
    sprites.destroy(IDK)
    sprites.destroyAllSpritesOfKind(SpriteKind.IDK)
    sprites.destroy(Smiley)
    if (FearActivated == 0) {
        sprites.destroy(PILL)
        sprites.destroy(Crusifix)
        RandomLevel += randint(2, 5)
        if (RandomLevel == 2) {
            tiles.setCurrentTilemap(tilemap`level5`)
        }
        if (RandomLevel == 3) {
            tiles.setCurrentTilemap(tilemap`level6`)
        }
        if (RandomLevel == 4) {
            tiles.setCurrentTilemap(tilemap`level3`)
        }
        if (RandomLevel == 5) {
            tiles.setCurrentTilemap(tilemap`level13`)
            IDK = sprites.create(img`
                ......6666666666......
                ....66777777777766....
                ...6777777777777776...
                ..677777777777777776..
                .6777ffff7777ffff7776.
                .6777f88f7777f88f7776.
                67777f81f7777f18f77776
                67777f88f7777f88f77776
                67777ffff7777ffff77776
                6777777777777777777776
                677fff7777777777fff776
                677f1f7777777777f1f776
                677f1f7ffffffff7f1f776
                677f9f7f666666f7f9f776
                677f9f7f699996f7f9f776
                677f9f7f691196f7f9f776
                677f6f7f691196f7f6f776
                677f6f7f691196f7f6f776
                677f6f7f691196f7f6f776
                677f8f7f691196f7f8f776
                677f8f7f691196f7f8f776
                .67f8f7f699996f7f8f76.
                .67fff7f666666f7fff76.
                ..67777ffffffff77776..
                ...6777777777777776...
                ....66777777777766....
                ......6666666666......
                `, SpriteKind.IDK)
            IDK.follow(Playero, 20)
            IdkActivated = 1
        }
        if (Math.percentChance(25)) {
            PILL = sprites.create(img`
                . . . 4 4 4 . . . . . . . . . . 
                . . 4 2 2 2 4 . . . . . . . . . 
                . 4 2 2 2 2 2 4 . . . . . . . . 
                4 2 2 2 2 2 2 2 4 . . . . . . . 
                4 2 2 2 2 2 2 2 2 4 . . . . . . 
                4 2 2 2 2 2 2 2 2 2 9 . . . . . 
                . 4 2 2 2 2 2 2 2 6 6 9 . . . . 
                . . 4 2 2 2 2 2 6 6 6 6 9 . . . 
                . . . 4 2 2 2 6 6 6 6 6 6 9 . . 
                . . . . 4 2 6 6 6 6 6 6 6 6 9 . 
                . . . . . 9 6 6 6 6 6 6 6 6 6 9 
                . . . . . . 9 6 6 6 6 6 6 6 6 9 
                . . . . . . . 9 6 6 6 6 6 6 6 9 
                . . . . . . . . 9 6 6 6 6 6 9 . 
                . . . . . . . . . 9 6 6 6 9 . . 
                . . . . . . . . . . 9 9 9 . . . 
                `, SpriteKind.Pill)
            tiles.placeOnRandomTile(PILL, assets.tile`myTile`)
        }
        if (Math.percentChance(5)) {
            Crusifix = sprites.create(img`
                . . 9 9 9 9 9 9 . . 
                . . 9 3 3 3 3 9 . . 
                9 9 9 3 e e 3 9 9 9 
                9 3 3 3 e e 3 3 3 9 
                9 3 e e e e e e 3 9 
                9 3 e e e e e e 3 9 
                9 3 3 3 e e 3 3 3 9 
                9 9 9 3 e e 3 9 9 9 
                . . 9 3 e e 3 9 . . 
                . . 9 3 e e 3 9 . . 
                . . 9 3 e e 3 9 . . 
                . . 9 3 e e 3 9 . . 
                . . 9 3 3 3 3 9 . . 
                . . 9 9 9 9 9 9 . . 
                `, SpriteKind.Crusifix)
            tiles.placeOnRandomTile(Crusifix, assets.tile`myTile`)
        }
        RandomLevel = 0
        tiles.placeOnRandomTile(Playero, assets.tile`myTile16`)
    }
    if (Math.percentChance(15)) {
        RandomEntity = randint(1, 2)
    }
    if (RandomEntity == 1) {
        scene.cameraShake(4, 5000)
        timer.after(2500, function () {
            Anxiety = sprites.create(img`
                ......444444......
                ....4455555544....
                ...455555555554...
                ..455fff55fff554..
                .455f11f55f11f554.
                .455f11f55f11f554.
                4555fff5555fff5554
                455555555555555554
                4555555ffff5555554
                455555ffffff555554
                45555ff1ff1ff55554
                45555ffffffff55554
                45555f1ffff1f55554
                45555ffffffff55554
                45555f1ffff1f55554
                45555ffffffff55554
                45555f1ffff1f55554
                .4555ffffffff5554.
                .4555ff1ff1ff5554.
                ..4555ffffff5554..
                ...4555ffff5554...
                ....4455555544....
                ......444444......
                `, SpriteKind.Anxiety)
            tiles.placeOnRandomTile(Anxiety, assets.tile`myTile9`)
            Anxiety.follow(Playero, 100)
            Anxiety.setFlag(SpriteFlag.GhostThroughWalls, true)
        })
    } else if (RandomEntity == 2) {
        scene.cameraShake(2, 1000)
        timer.after(2000, function () {
            Sillence = sprites.create(img`
                ........fffffffffff........
                ......ffcccccccccccff......
                .....fcccbbbbbbbbbcccf.....
                ....fccbbdddddddddbbccf....
                ...fcbbfff1111111fffbbcf...
                ..fcbdfffff11111fffffdbcf..
                .fccbfffffff111fffffffbccf.
                .fcbdfff1fff111fff1fffdbcf.
                fccbdfffffff111fffffffdbccf
                fcbd11fffff11111fffff11dbcf
                fcbd111fff1111111fff111dbcf
                fcbd1111111111111111111dbcf
                fcbd11111ddddddddd11111dbcf
                fcbd1111dfffffffffd1111dbcf
                fcbd111dfffffffffffd111dbcf
                fcbd11dfffffffffffffd11dbcf
                fcbd11dfffffffffffffd11dbcf
                fcbd11dfffffffffffffd11dbcf
                fccbd11dfffffffffffd11dbccf
                .fcbd111dfffffffffd111dbcf.
                .fccbd111ddddddddd111dbccf.
                ..fcbdd1111111111111ddbcf..
                ...fcbbdd111111111ddbbcf...
                ....fccbbdddddddddbbccf....
                .....fcccbbbbbbbbbcccf.....
                ......ffcccccccccccff......
                ........fffffffffff........
                `, SpriteKind.Silence)
            scene.cameraShake(2, 12000)
            tiles.placeOnRandomTile(Sillence, assets.tile`myTile9`)
            Sillence.follow(Playero, 10)
            Sillence.setFlag(SpriteFlag.GhostThroughWalls, true)
            SilenceActivated = 1
            timer.after(10000, function () {
                SilenceActivated = 0
                sprites.destroy(Sillence)
                PILL = sprites.create(img`
                    . . . 4 4 4 . . . . . . . . . . 
                    . . 4 2 2 2 4 . . . . . . . . . 
                    . 4 2 2 2 2 2 4 . . . . . . . . 
                    4 2 2 2 2 2 2 2 4 . . . . . . . 
                    4 2 2 2 2 2 2 2 2 4 . . . . . . 
                    4 2 2 2 2 2 2 2 2 2 9 . . . . . 
                    . 4 2 2 2 2 2 2 2 6 6 9 . . . . 
                    . . 4 2 2 2 2 2 6 6 6 6 9 . . . 
                    . . . 4 2 2 2 6 6 6 6 6 6 9 . . 
                    . . . . 4 2 6 6 6 6 6 6 6 6 9 . 
                    . . . . . 9 6 6 6 6 6 6 6 6 6 9 
                    . . . . . . 9 6 6 6 6 6 6 6 6 9 
                    . . . . . . . 9 6 6 6 6 6 6 6 9 
                    . . . . . . . . 9 6 6 6 6 6 9 . 
                    . . . . . . . . . 9 6 6 6 9 . . 
                    . . . . . . . . . . 9 9 9 . . . 
                    `, SpriteKind.Pill)
                tiles.placeOnRandomTile(PILL, assets.tile`myTile`)
            })
        })
    }
    if (Math.percentChance(25)) {
        multilights.toggleLighting(true)
        DarkRoom = 1
        if (Math.percentChance(FearBar.value * 0.1)) {
            Smiley = sprites.create(img`
                ......fffffffff......
                ....ff554222455ff....
                ...f5555542455555f...
                ..f5fffff545fffff5f..
                .f5fffffff5fffffff5f.
                .f4ffff1ff5ff1ffff4f.
                f24fffffff5fffffff42f
                f245fffff555fffff542f
                f2445555555555555442f
                f2245555555555555422f
                ffff5555555555555ffff
                ffdfff555555555fffdff
                ff1fdfffffffffffdf1ff
                ff1f1fdfdfdfdfdf1f1ff
                ff1f1f1f1f1f1f1f1f1ff
                ff1f1f1f1f1f1f1f1f1ff
                ffdf1f1f1f1f1f1f1fdff
                f2ff1f1f1f1f1f1f1ff2f
                .f4fdf1f1f1f1f1fdf4f.
                ..f5ffdfdfdfdfdff5f..
                ...f55fffffffff55f...
                ....ff555555555ff....
                ......fffffffff......
                `, SpriteKind.Smiley)
            Smiley.follow(Playero, 50)
            tiles.placeOnRandomTile(Smiley, assets.tile`myTile`)
            SmileyActivated = 1
        }
    } else {
        multilights.toggleLighting(false)
        DarkRoom = 0
    }
    RandomEntity = 0
})
sprites.onOverlap(SpriteKind.Hiding, SpriteKind.Fear, function (sprite, otherSprite) {
    if (Crusifixes == 0) {
        sprites.destroy(sprite)
        FearActivated = 0
        scene.cameraFollowSprite(Fear)
        multilights.toggleLighting(true)
        timer.after(500, function () {
            game.showLongText("Looks like you died too who we call Fear", DialogLayout.Bottom)
            game.showLongText("He comes when your fearbar is full", DialogLayout.Bottom)
            game.showLongText("When he comes the only way of surviving is having a Crusifix", DialogLayout.Bottom)
            game.showLongText("Your fearbar increases in dark areas", DialogLayout.Bottom)
            game.showLongText("The only way to decrease it is surviving Fear or taking a pill", DialogLayout.Bottom)
            game.showLongText("Thats it", DialogLayout.Bottom)
        })
    } else {
        sprites.destroy(Fear)
        FearActivated = 0
        Crusifixes += -1
        FearBar.value += -350
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.IDK, function (sprite, otherSprite) {
    if (Crusifixes == 0) {
        sprites.destroy(sprite)
    } else {
        sprites.destroy(otherSprite)
        Crusifixes += -1
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    if (SilenceActivated == 1) {
        sprites.destroy(Playero)
        multilights.toggleLighting(true)
        timer.after(500, function () {
            game.showLongText("You died too who we call Silence", DialogLayout.Bottom)
            game.showLongText("Silence randomly spawns in any room", DialogLayout.Bottom)
            game.showLongText("Before he is about to spawn he shakes the screen for 1 second", DialogLayout.Bottom)
            game.showLongText("And then he stops shaking the screen for 1 second", DialogLayout.Bottom)
            game.showLongText("Then he shakes the screen for 12 seconds ", DialogLayout.Bottom)
            game.showLongText("If you move in this time he will damage you", DialogLayout.Bottom)
            game.showLongText("Thats it", DialogLayout.Bottom)
        })
    }
    if (SmileyActivated == 1) {
        game.showLongText("Wait what did you die too?", DialogLayout.Bottom)
        game.showLongText("it was too dark for me too see what it was", DialogLayout.Bottom)
        game.showLongText("well it looks like that thing only comes in dark rooms", DialogLayout.Bottom)
        game.showLongText("and the higher the fearbar is the higher chance for it to come", DialogLayout.Bottom)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Crusifix, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    Crusifixes += 1
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    Playero.setKind(SpriteKind.Hiding)
    multilights.toggleLighting(true)
    FearBar.value += 2
    timer.after(5000, function () {
        sprites.destroy(Anxiety)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Pill, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    FearBar.value += -200
})
scene.onPathCompletion(SpriteKind.IDK, function (sprite, location) {
    timer.after(500, function () {
        sprites.destroy(sprite)
    })
})
let IdkProjectile: Sprite = null
let SilenceActivated = 0
let Sillence: Sprite = null
let RandomEntity = 0
let RandomLevel = 0
let Crusifix: Sprite = null
let PILL: Sprite = null
let Smiley: Sprite = null
let IDK: Sprite = null
let IdkActivated = 0
let Fear: Sprite = null
let DarkRoom = 0
let FearActivated = 0
let Anxiety: Sprite = null
let Crusifixes = 0
let SmileyActivated = 0
let HealthBar: StatusBarSprite = null
let FearBar: StatusBarSprite = null
let Playero: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
Playero = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(Playero)
controller.moveSprite(Playero, 50, 50)
tiles.placeOnRandomTile(Playero, assets.tile`myTile8`)
Playero.setStayInScreen(true)
multilights.addLightSource(Playero, 15)
FearBar = statusbars.create(20, 4, StatusBarKind.FearrBar)
FearBar.setColor(2, 15)
FearBar.max = 1000
FearBar.value = 1
FearBar.setBarBorder(1, 13)
FearBar.attachToSprite(Playero, 10, 0)
HealthBar = statusbars.create(20, 4, StatusBarKind.Health)
HealthBar.setColor(7, 15)
HealthBar.max = 100
HealthBar.value = 100
HealthBar.setBarBorder(1, 13)
HealthBar.attachToSprite(Playero, 5, 0)
forever(function () {
    if (FearActivated == 1) {
        multilights.toggleLighting(true)
        scene.cameraShake(8, 500)
    }
})
forever(function () {
    if (SilenceActivated == 1) {
        if (characterAnimations.matchesRule(Playero, characterAnimations.rule(Predicate.Moving))) {
            if (Crusifixes == 0) {
                HealthBar.value += -1
                pause(20)
            } else {
                sprites.destroy(Sillence)
                SilenceActivated = 0
                Crusifixes += -1
            }
        }
    }
    if (DarkRoom == 1) {
        FearBar.value += 1
    }
})
game.onUpdateInterval(100, function () {
    if (IdkActivated == 1) {
        IdkProjectile = sprites.create(img`
            . . . 6 . . . 
            . . 6 9 6 . . 
            . 6 9 1 9 6 . 
            6 9 1 1 1 9 6 
            . 6 9 1 9 6 . 
            . . 6 9 6 . . 
            . . . 6 . . . 
            `, SpriteKind.IDK)
        IdkProjectile.setPosition(IDK.x, IDK.y)
        scene.followPath(IdkProjectile, scene.aStar(tiles.locationOfSprite(IdkProjectile), tiles.locationOfSprite(Playero)), 50)
    }
})
game.onUpdateInterval(100, function () {
    Playero.setKind(SpriteKind.Player)
})
