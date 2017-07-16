'use strict';

(() => {

Crafty.c('Enemy', {
    init: function () {
        this.requires('Entity,Kunoichi');

        let countdown = 5*60;
        let healcount = 0;

        this.bind('EnterFrame', function () {
            if (healcount > 0) {
              if(--healcount == 0) {
                  this.color(this.attr("base_color"));
              }
            }

            let player = Crafty('Player');

            if (countdown % 60 === 0) {
                this.attack(player.x, player.y);
            }

            countdown -= 1;
            if (countdown > 0) {
                return;
            }
            countdown = 5*60;

            this.jump((this.x + player.x)/2, Math.min(player.y + 50, this.y + 50));
        });

        this.bind('TakeHit', function (e) {
            // TODO(tmf): add player health
            this.color('red', 1);
            healcount = 5;
        });

        this.bind('TakeHit', function () {
            var health = this.attr('health');
            if (health > 0) {
              this.attr('health', --health);
              this.color('red');
              healcount = 5;
            }
            else {
              this.destroy();
              Crafty.trigger('EndGame');
            }
        });
    }
});

})();

const enemyConstructor = (x, y, color) => {
    // TODO(tmf): make health a thing we can pass on construction
    const enemy = Crafty.e('Enemy');
    enemy.attr({
        x: x,
        y: y,
        w: 50,
        h: 100,
        health: 10,
        base_color: color ? color : 'rgba(222, 0, 0, 0.01)'
    });
    
    if (color) {
        enemy.color(color);
    } else {
        enemy.attachSprite('DebugSprite');
    }

    let mouseX = 0, mouseY = 0;
    Crafty.addEvent(enemy, Crafty.stage.elem, 'mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    return enemy;
};

