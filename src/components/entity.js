'use strict';

(() => {

const calculateVelocity = function (dx, dy) {
    var dt, vy, vx, gravity;

    if (dy < 0 && !this._gravityActive) {
        // Alternative idea: slightly variable x speed based off of dx, and
        // calculating everything else from there
        vx = dx*2; // This number's calculation needs fine-tuning
        dt = dx/vx;
        gravity = 2*-dy/(dt*dt);

        this.gravityConst(gravity);
        this.trigger('LiftedOffGround');

        vy = -Math.sqrt(-dy*this.ay*2);

        this.trigger('LiftedOffGround');
        vy = -Math.sqrt(-dy*this.ay*2);
        dt = Math.sqrt(2*-dy/this.ay);
        vx = dx/dt;
    } else {
        vy = this.vy;
        vx = this.vx;
    }

    return {vy: vy, vx: vx};
};

Crafty.c('Entity', {
    init: function () {
        this.requires('Canvas, Color, Gravity, Collision, AttachSprite');
        this.bind('LandedOnGround', () => {
            this.attr({vx: 0});
        });

        this.gravity('Platform');
        this.gravityConst(2000);
    },
    jump: function (x, y) {
        var attr, midY, bottomY, midX, dx, dy;

        // Alternative: apex is at middle of player rectangle
        // Consideration for further iterations
        midY = this.y + this.h/2;
        bottomY = this.y + this.h;
        midX = this.x + this.w/2;

        dx = x - midX;
        dy = y - bottomY;

        attr = calculateVelocity.apply(this, [dx, dy]);
        this.attr(attr);
        return this;
    }
});

Crafty.c('Kunoichi', {
    init: function () {
        this.requires('Collision');
        let sword = swordConstructor(this);
        this.attack = sword.attack.bind(sword);

        this.checkHits('Sword');
        this.bind('HitOn', function (e) {
            if (e[0]['obj'] !== sword) {
                this.trigger('TakeHit');
            }
        });
        this.bind('SwordSplosion', function (e) {
            if (e.sword === sword) {
                sword.glow();
                let dirx = e.x - this.attr("x");
                if (dirx > 0) {
                    this.jump(this.attr("x") - 50, this.attr("y") - 50);
                }
                else {
                    this.jump(this.attr("x") + 50, this.attr("y") + 50);
                }
            }
        });
    },
    attack: () => null
});

})();

