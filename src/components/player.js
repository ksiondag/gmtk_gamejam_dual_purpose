'use strict';

(() => {

Crafty.c('Player', {
    init: function () {
        this.requires('Entity,Kunoichi');

        Crafty.addEvent(this, Crafty.stage.elem, 'mousedown', function (e) {
            if (e.button == Crafty.mouseButtons.LEFT) {
                this.jump(e.clientX, e.clientY);
            }
            if (e.button == Crafty.mouseButtons.RIGHT) {
                console.log("SHWING");
                this.attack(e.clientX, e.clientY);
            }
        });

        let healcount = 0;

        this.bind('EnterFrame', function () {
            if (healcount > 0) {
                if(--healcount == 0) {
                    this.color(this.attr("base_color"));
                }
            }
        });

        this.bind('TakeHit', function (e) {
            // TODO(tmf): add player health
            this.color('red', 1);
            healcount = 5;
        });

        this.bind('EndGame', function (e) {
            this.destroy();
        });
    }
});

})();

const playerConstructor = (x, y, color) => {
    const player = Crafty.e('Player');

    player.attr({
        x: x,
        y: y,
        w: 50,
        h: 100,
        base_color: color ? color: 'rgba(222, 0, 0, 0.01)'
    });

    if (color) {
        player.color(color);
    } else {
        player.attachSprite('DebugSprite');
    }

    return player;
};

