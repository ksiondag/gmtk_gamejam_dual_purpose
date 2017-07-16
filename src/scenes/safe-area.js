'use strict';

(() => {

Crafty.c('StartButton', {
    init: function () {
        this.requires('2D,MouseTracker');

        this.attach(
            Crafty.e('2D,Canvas,Color,Mouse,Collision')
                .attr({x: 0, y: 0, w: 150, h: 110})
                .color('#000000')
                .bind('MouseOver', function () {
                    this.color('#FFFF00');
                })
                .bind('MouseOut', function () {
                    this.color('#000000');
                })
                .checkHits('Player')
                .bind('HitOn', function (hitData) {
                    //Crafty.scene('clone-event', hitData[0].obj);
                })
        );

        this.attach(
            Crafty.e('2D,Canvas,Color')
                .attr({x: 20, y: 25, w: 110, h: 60})
                .color('#FFFFFF')
        );

        this.attach(
            Crafty.e('2D,Canvas,Text')
                .attr({x: 20, y: 25, w: 110, h: 60})
                .text('Start')
                .textFont({size: '50px'})
        );
    }
});

})();

Crafty.scene('safe-area', function () {
    const height = Crafty.viewport.height,
          width = Crafty.viewport.width;

    Crafty.background('white');

    Crafty.e('StartButton')
        .attr({x: 680, y: Crafty.viewport.height - Crafty.viewport.height/2 - 25})
    ;

    platformConstructor(0, height, width, 25, '#000000');
    wallConstructor(-100, 0, 100, height, '#000000');
    wallConstructor(width + 1, 0, 100, height, '#000000');

    let player = playerConstructor(width/2, height - 25);
    player.getSprite().destroy()
    player.attachSprite('DebugSprite');
});

