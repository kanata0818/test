enchant();

window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 15;
    game.preload('map1.gif', 'chara0.gif');
    game.onload = function() {
        var map = new Map(16, 16);
        map.image = game.assets['map1.gif'];
        map.loadData([
            [322,322,322,322],
            [322,322,322,322],
            [322,322,322,322],
            [322,322,322,342]
        ]);
        map.collisionData = [
            [  0,  0,  0,  0],
            [  0,  0,  0,  0],
            [  0,  0,  0,  0],
            [  0,  0,  0,  0]
        ];

        var player = new Sprite(32, 32);
        player.x = 6 * 16 - 8;
        player.y = 10 * 16;
        var image = new Surface(96, 128);
        image.draw(game.assets['chara0.gif'], 0, 0, 96, 128, 0, 0, 96, 128);
        player.image = image;

        player.isMoving = false;
        player.direction = 0;
        player.walk = 1;
        player.addEventListener('enterframe', function() {
            this.frame = this.direction * 3 + this.walk;
 
                if (!(game.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
                }
                this.isMoving = false;
                this.walk = 1;
                this.vx = 0;
                this.vy = 0;
                if (game.input.left) {
                    this.direction = 1;
                    this.vx = -4;
                } else if (game.input.right) {
                    this.direction = 2;
                    this.vx = 4;
                } else if (game.input.up) {
                    this.direction = 3;
                    this.vy = -4;
                } else if (game.input.down) {
                    this.direction = 0;
                    this.vy = 4;
                }
                this.moveBy(this.vx, this.vy);
        });

        var stage = new Group();
        stage.addChild(map);
        stage.addChild(player);
        game.rootScene.addChild(stage);

        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        game.rootScene.addChild(pad);

        game.rootScene.addEventListener('enterframe', function(e) {
            var x = Math.min((game.width  - 16) / 2 - player.x, 0);
            var y = Math.min((game.height - 16) / 2 - player.y, 0);
            x = Math.max(game.width,  x + map.width)  - map.width;
            y = Math.max(game.height, y + map.height) - map.height;
            stage.x = 0;
            stage.y = 0;
        });
    };
    game.start();
};
