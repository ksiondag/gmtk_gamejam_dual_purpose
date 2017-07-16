'use strict';

Crafty.scene('render-sprite-sheet', function () {
    let rows = [
        [
            'Standing',
            'Running',
            'Jumping'
        ],
        [
            'UpAttackGrounded',
            'UpAttackAir'
        ],
        [
            'UpSideAttackGrounded',
            'UpSideAttackAir'
        ],
        [
            'SideAttackGrounded',
            'SideAttackAir'
        ],
        [
            'DownSideAttackGrounded',
            'DownSideAttackAir'
        ],
        [
            'DownAttackGrounded',
            'DownAttackAir'
        ]
    ];

    let x = 0;
    let y = 0;

    rows.forEach((row) => {
        row.forEach((type) => {
            Crafty.e('2D', 'AttachSprite', 'Color')
                .attr({
                    x: x,
                    y: y,
                    w: 110,
                    h: 160
                })
                .attachSprite('BlackSprite')
                .getSprite().animate(type)
                //.color('black')
            ;
            x += 111;
        });
        x = 0;
        y += 161;
    });

    let experiment = Crafty.e('2D', 'AttachSprite', 'Color')
        .attr({
            x: x,
            y: y,
            w: 110,
            h: 160
        })
        .attachSprite('BlackSprite')
    ;

    let sheet = experiment.getSprite();
    sheet.reel('Experiment', 500, [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5]]);
    sheet.animate('Experiment', -1);
});

Crafty.scene('loading', {
    scene: 'render-sprite-sheet'
});

