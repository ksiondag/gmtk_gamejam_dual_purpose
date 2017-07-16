'use strict';

Crafty.scene('loading', function (data) {
    Crafty.e('2D,Canvas,Mouse,Text')
    .attr({
        x:0,
        y:0,
        w:100,
        h:50
    })
    .text("Loading");

    Crafty.paths({
        "audio": "assets/audio/",
        "images": "assets/sprites/"
    });

    let assetsObj = {
        "audio": {
        },
        "sprites": {
            "sprite-sheet.png": {
                "tile": 120,
                "tileh": 170,
                "map": {
                    "DebugSprite": [0,0]
                },
                "paddingX": 0,
                "paddingY": 0,
                "paddingAroundBorder": false
            }
        }
    };

    Crafty.load(assetsObj, function () {
        if (data && data.scene) {
            Crafty.scene(data.scene);
        } else {
            Crafty.scene('safe-area');
        }
    });

});

