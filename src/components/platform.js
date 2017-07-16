'use strict';

var platformConstructor = (x, y, w, h, color) => {
    var entity = Crafty.e('2D, Canvas, Color, Platform')
        .attr({x: x, y: y, w: w, h: h})
        .color(color)
    ;

    return entity;
};

var wallConstructor = (x, y, w, h, color) => {
    var entity = Crafty.e('2D, Canvas, Color, Wall, Collision')
        .attr({x: x, y: y, w: w, h: h})
        .color(color)
        .checkHits('Entity')
        .bind('HitOn', function (hitData) {
            var hitObj = hitData[0].obj;
            hitObj.attr({vx:0});

            if (hitObj.x < this.x) {
                hitObj.x = this.x - hitObj.w;
            } else {
                hitObj.x = this.x + this.w;
            }
        })
    ;

    return entity;
};
