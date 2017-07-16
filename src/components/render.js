'use strict';

Crafty.c('AttachSprite', {
    init: function () {
    },
    getSprite: () => null,
    attachSprite: function (name) {

        let render = Crafty.e(name, 'Canvas', 'Color', 'SpriteAnimation');
        render.attr({
            x: this.x - 35,
            y: this.y - 43,
        });
        this.attach(render);

        render.reel('Standing', 1000, 0, 0, 3);
        render.reel('Running', 1000, 3, 0, 3);
        render.reel('Jumping', 1000, 6, 0, 3);

        render.reel('UpAttackGrounded', 1000, 0, 1, 3);
        render.reel('UpAttackAir', 1000, 3, 1, 3);

        render.reel('UpSideAttackGrounded', 1000, 0, 2, 3);
        render.reel('UpSideAttackAir', 1000, 3, 2, 3);

        render.reel('SideAttackGrounded', 1000, 0, 3, 3);
        render.reel('SideAttackAir', 1000, 3, 3, 3);

        render.reel('DownSideAttackGrounded', 1000, 0, 4, 3);
        render.reel('DownSideAttackAir', 1000, 3, 4, 3);

        render.reel('DownAttackGrounded', 1000, 0, 5, 3);
        render.reel('DownAttackAir', 1000, 3, 5, 3);

        render.animate('Standing', -1);

        this.getSprite = function () {
            return render;
        }

        return this;
    }
});
