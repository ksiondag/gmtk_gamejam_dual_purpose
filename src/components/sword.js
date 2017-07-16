'use strict';

(() => {

Crafty.c('Sword', {
    init: function () {
        this.requires('2D, Color, Canvas, Collision');

        let countdown = 0;
        let glowcount = 0;
        this.bind('EnterFrame', function () {
            glowcount -= 1;
            if (glowcount <= 0) {
                this.color(this._parent.color());
            }

            countdown -= 1;
            if (countdown > 0) {
                return;
            }

            this.attr({
                x: Crafty.viewport.width + 100,
                y: Crafty.viewport.height + 100,
                w: 0,
                h: 0
            });

            this._parent.getSprite().animate('Standing', -1);
        });

        this.bind('Attack', function (e) {
            if (countdown > 0) {
                return;
            }
            countdown = 30;

            if (e.countdown) {
                countdown = e.countdown;
            }

            this.attr({
                w: 60,
                h: 60
            });

            // Black magic, needs to be fixed.... do not touch
            let dx, dy, distance;
            dx = e.x + 30 - (this._parent.x + this._parent.w/2);
            dy = e.y + 30 - (this._parent.y + this._parent.h/4);
            distance = Math.sqrt(dx*dx + dy*dy);

            dx /= distance;
            dy /= distance;

            let x = 0, y = 0;
            if (dx) {
                x = this._parent.x + (this._parent.w - this.w)/2 + (dx)*30;
            }

            if (dy) {
                y = this._parent.y + (this._parent.h/2 - this.h)/2 + (dy)*30;
            }

            this.attr({
                x: x,
                y: y
            });

            //this.color(this._parent.color());

            if (e.color) {
                this.color(e.color);
                return;
            }

            if (Math.abs(dx) > 0.95) {
                this._parent.getSprite().animate('SideAttackGrounded', -1);
            } else if (Math.abs(dy) > 0.95) {
                if (dy < 0) {
                    this._parent.getSprite().animate('UpAttackGrounded', -1);
                } else {
                    this._parent.getSprite().animate('DownAttackGrounded', -1);
                }
            } else {
                if (dy < 0) {
                    this._parent.getSprite().animate('UpSideAttackGrounded', -1);
                } else {
                    this._parent.getSprite().animate('DownSideAttackGrounded', -1);
                }
            }
            this._parent.getSprite().unflip('X');
            if (dx < 0) {
                this._parent.getSprite().flip('X');
            }
        });
        this.bind('Glow', function () {
            this.color('grey', 1);
            glowcount = 20;
        });
        this.checkHits('Sword');
        this.bind('HitOn', function (e) {
            Crafty.trigger(
                "SwordSplosion",
                {
                   sword: this,
                   x: this.attr('x'),
                   y: this.attr('y')
                }
            );
        });
    },
    attack: function (clientX, clientY, countdown, color) {
        this.trigger('Attack', {
            x: clientX,
            y: clientY,

            // DEBUG stuffs
            countdown: countdown,
            color: color
        });
    },
    glow: function () {
        this.trigger('Glow');
    }
});

})();

let swordConstructor = (entity) => {
    const sword = Crafty.e('Sword');

    entity.attach(sword);

    return sword;
};

