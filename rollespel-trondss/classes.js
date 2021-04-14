class Levande {
    constructor(str = tilfeldigTall(3, 18), con = tilfeldigTall(3, 18), dex = tilfeldigTall(3, 18), int = tilfeldigTall(3, 18), wis = tilfeldigTall(3, 18), cha = tilfeldigTall(3, 18)) {
        this.stats = {
            str: str,
            con: con,
            dex: dex,
            int: int,
            wis: wis,
            cha: cha
        }
    }
}

// En påbegynt klasse for å lage encounters. Se index.hmtl linje 58/60 for eksempler på initiering og bruk. Constructoren bruker objektet encounters, som ligger i filen encounters.js

class Encounter {
    constructor(encounter) {
        this.dialog = encounters[encounter].dialog;
        this.stats = encounters[encounter].stats;
    }    
    remove() {

    }
    addMonster() {

    }
    addLoot() {

    }
    startEncounter() {
        if (this.stats.visited == 0) {
            this.dialog.forEach(element => {
                alert(element);
            this.stats.visited = 1;

            })
        };
    }

}



//Character - Dette er den sentrale klassen for å styre karakteren på spelet. 
class Character extends Levande {
    constructor() {
        super();
        this.tileFrom = [1, 1];
        this.tileTo = [1, 1];
        this.timeMoved = 0;
        this.dimensions = [30, 30];
        this.position = [45, 45];

        this.delayMove = {};
        this.delayMove[floorTypes.path] = 400;
        this.delayMove[floorTypes.grass] = 800;
        this.delayMove[floorTypes.ice] = 300;
        this.delayMove[floorTypes.conveyorU] = 200;
        this.delayMove[floorTypes.conveyorD] = 200;
        this.delayMove[floorTypes.conveyorL] = 200;
        this.delayMove[floorTypes.conveyorR] = 200;

        this.direction = directions.up;
        this.sprites = {};
        this.sprites[directions.up] = new Sprite([{
            x: 244,
            y: 139,
            w: 26,
            h: 31
        }, {
            x: 276,
            y: 139,
            w: 26,
            h: 31
        }, {
            x: 308,
            y: 139,
            w: 26,
            h: 31
        }]);
        this.sprites[directions.right] = new Sprite([{
            x: 244,
            y: 107,
            w: 26,
            h: 31
        }, {
            x: 276,
            y: 107,
            w: 26,
            h: 31
        }, {
            x: 308,
            y: 107,
            w: 26,
            h: 31
        }]);
        this.sprites[directions.down] = new Sprite([{
            x: 244,
            y: 42,
            w: 26,
            h: 31
        }, {
            x: 276,
            y: 42,
            w: 26,
            h: 31
        }, {
            x: 308,
            y: 42,
            w: 26,
            h: 31
        }]);
        this.sprites[directions.left] = new Sprite([{
            x: 244,
            y: 75,
            w: 26,
            h: 31
        }, {
            x: 276,
            y: 75,
            w: 26,
            h: 31
        }, {
            x: 308,
            y: 75,
            w: 26,
            h: 31
        }]);

        this.inventory = new Inventory(5);
    }
    displayInfo() {
        var str = document.getElementById('str');
        var con = document.getElementById('con');
        var dex = document.getElementById('dex');
        var wis = document.getElementById('visdom');
        var int = document.getElementById('int');
        var cha = document.getElementById('cha');

        str.innerHTML = 'Styrke: ' + this.stats.str;
        con.innerHTML = 'Seighet: ' + this.stats.con;
        dex.innerHTML = 'Smidighet: ' + this.stats.dex;
        wis.innerHTML = 'Intelligens: ' + this.stats.int;
        int.innerHTML = 'Visdom: ' + this.stats.wis;
        cha.innerHTML = 'Karisma: ' + this.stats.cha;
    }
    placeAt(x, y) {
        this.tileFrom = [x, y];
        this.tileTo = [x, y];
        this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
            ((tileH * y) + ((tileH - this.dimensions[1]) / 2))
        ];
    };
    processMovement(t) {
        if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
            return false;
        }

        var moveSpeed = this.delayMove[tileTypes[mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])]
            .type].floor];

        if ((t - this.timeMoved) >= moveSpeed) {
            this.placeAt(this.tileTo[0], this.tileTo[1]);

            if (mapTileData.map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter != null) {
                mapTileData.map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter(this);
            }

            var tileFloor = tileTypes[mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].type].floor;

            if (tileFloor == floorTypes.ice) {
                if (this.canMoveDirection(this.direction)) {
                    this.moveDirection(this.direction, t);
                }
            } else if (tileFloor == floorTypes.conveyorL && this.canMoveLeft()) {
                this.moveLeft(t);
            } else if (tileFloor == floorTypes.conveyorR && this.canMoveRight()) {
                this.moveRight(t);
            } else if (tileFloor == floorTypes.conveyorU && this.canMoveUp()) {
                this.moveUp(t);
            } else if (tileFloor == floorTypes.conveyorD && this.canMoveDown()) {
                this.moveDown(t);
            }
        } else {
            this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
            this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

            if (this.tileTo[0] != this.tileFrom[0]) {
                var diff = (tileW / moveSpeed) * (t - this.timeMoved);
                this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
            }
            if (this.tileTo[1] != this.tileFrom[1]) {
                var diff = (tileH / moveSpeed) * (t - this.timeMoved);
                this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
            }

            this.position[0] = Math.round(this.position[0]);
            this.position[1] = Math.round(this.position[1]);
        }

        return true;
    }
    canMoveTo(x, y) {
        if (x < 0 || x >= mapW || y < 0 || y >= mapH) {
            return false;
        }
        if (typeof this.delayMove[tileTypes[mapTileData.map[toIndex(x, y)].type].floor] == 'undefined') {
            return false;
        }
        if (mapTileData.map[toIndex(x, y)].object != null) {
            var o = mapTileData.map[toIndex(x, y)].object;
            if (objectTypes[o.type].collision == objectCollision.solid) {
                return false;
            }
        }
        return true;
    };
    canMoveUp() {
        return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1);
    };
    canMoveDown() {
        return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1);
    };
    canMoveLeft() {
        return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]);
    };
    canMoveRight() {
        return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]);
    };
    canMoveDirection(d) {
        switch (d) {
            case directions.up:
                return this.canMoveUp();
            case directions.down:
                return this.canMoveDown();
            case directions.left:
                return this.canMoveLeft();
            default:
                return this.canMoveRight();
        }
    };
    moveLeft(t) {
        this.tileTo[0] -= 1;
        this.timeMoved = t;
        this.direction = directions.left;
    };
    moveRight(t) {
        this.tileTo[0] += 1;
        this.timeMoved = t;
        this.direction = directions.right;
    };
    moveUp(t) {
        this.tileTo[1] -= 1;
        this.timeMoved = t;
        this.direction = directions.up;
    };
    moveDown(t) {
        this.tileTo[1] += 1;
        this.timeMoved = t;
        this.direction = directions.down;
    };
    moveDirection(d, t) {
        switch (d) {
            case directions.up:
                return this.moveUp(t);
            case directions.down:
                return this.moveDown(t);
            case directions.left:
                return this.moveLeft(t);
            default:
                return this.moveRight(t);
        }
    };
    pickUp = function () {
        if (this.tileTo[0] != this.tileFrom[0] ||
            this.tileTo[1] != this.tileFrom[1]) {
            return false;
        }

        var is = mapTileData.map[toIndex(this.tileFrom[0],
            this.tileFrom[1])].itemStack;

        if (is != null) {
            var remains = this.inventory.addItems(is.type, is.qty);

            if (remains) {
                is.qty = remains;
            } else {
                mapTileData.map[toIndex(this.tileFrom[0],
                    this.tileFrom[1])].itemStack = null;
            }
        }

        return true;
    };
}
// Sprite
class Sprite {
    constructor(data) {
        this.animated = data.length > 1;
        this.frameCount = data.length;
        this.duration = 0;
        this.loop = true;

        if (data.length > 1) {
            for (var i in data) {
                if (typeof data[i].d == 'undefined') {
                    data[i].d = 100;
                }
                this.duration += data[i].d;

                if (typeof data[i].loop != 'undefined') {
                    this.loop = data[i].loop ? true : false;
                }
            }
        }

        this.frames = data;
    }
    draw(t, x, y) {
        var frameIdx = 0;

        if (!this.loop && this.animated && t >= this.duration) {
            frameIdx = (this.frames.length - 1);
        } else if (this.animated) {
            t = t % this.duration;
            var totalD = 0;

            for (var i in this.frames) {
                totalD += this.frames[i].d;
                frameIdx = i;

                if (t <= totalD) {
                    break;
                }
            }
        }

        var offset = (typeof this.frames[frameIdx].offset == 'undefined' ? [0, 0] : this.frames[frameIdx]
            .offset);

        ctx.drawImage(tileset,
            this.frames[frameIdx].x, this.frames[frameIdx].y,
            this.frames[frameIdx].w, this.frames[frameIdx].h,
            x + offset[0], y + offset[1],
            this.frames[frameIdx].w, this.frames[frameIdx].h);
    }
}
// Inventory
class Inventory {
    constructor(s) {
        this.spaces = s;
        this.stacks = [];
    }
    addItems(id, qty) {
        for (var i = 0; i < this.spaces; i++) {
            if (this.stacks.length <= i) {
                var maxHere = (qty > itemTypes[id].maxStack ? itemTypes[id].maxStack : qty);
                this.stacks.push(new Stack(id, maxHere));
                qty -= maxHere;
            } else if (this.stacks[i].type == id && this.stacks[i].qty < itemTypes[id].maxStack) {
                var maxHere = (itemTypes[id].maxStack - this.stacks[i].qty);
                if (maxHere > qty) {
                    maxHere = qty;
                }
                this.stacks[i].qty += maxHere;
                qty -= maxHere;
            }
            if (qty == 0) {
                return 0;
            }
        }
        return qty;
    }
}
//ItemStack
class PlacedItemStack {
    constructor(id, qty) {
        this.type = id;
        this.qty = qty;
        this.x = 0;
        this.y = 0;
    }
    placeAt(nx, ny) {
        if (mapTileData.map[toIndex(this.x, this.y)].itemStack == this) {
            mapTileData.map[toIndex(this.x, this.y)].itemStack = null;
        }

        this.x = nx;
        this.y = ny;

        mapTileData.map[toIndex(nx, ny)].itemStack = this;
    }
}
//Stack
class Stack {
    constructor(id, qty) {
        this.type = id;
        this.qty = qty;
    }
}
// Map Object
class MapObject {
    constructor(nt) {
        this.x = 0;
        this.y = 0;
        this.type = nt;
    }
    placeAt(nx, ny) {
        if (mapTileData.map[toIndex(this.x, this.y)].object == this) {
            mapTileData.map[toIndex(this.x, this.y)].object = null;
        }

        this.x = nx;
        this.y = ny;

        mapTileData.map[toIndex(nx, ny)].object = this;
    }
    eventEnter(encounter) {
        this.jy = encounter;
    }
}
// Tile
class Tile {
    constructor(tx, ty, tt) {
        this.x = tx;
        this.y = ty;
        this.type = tt;
        this.roof = null;
        this.roofType = 0;
        this.eventEnter = null;
        this.object = null;
        this.itemStack = null;
    }
}
// Tilemap
class TileMap {
    constructor() {
        this.map = [];
        this.w = 0;
        this.h = 0;
        this.levels = 4;
    }
    buildMapFromData(d, w, h) {
        this.w = w;
        this.h = h;

        if (d.length != (w * h)) {
            return false;
        }

        this.map.length = 0;

        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                this.map.push(new Tile(x, y, d[((y * w) + x)]));
            }
        }

        return true;
    }
    addRoofs(roofs) {
        for (var i in roofs) {
            var r = roofs[i];

            if (r.x < 0 || r.y < 0 || r.x >= this.w || r.y >= this.h ||
                (r.x + r.w) > this.w || (r.y + r.h) > this.h ||
                r.data.length != (r.w * r.h)) {
                continue;
            }

            for (var y = 0; y < r.h; y++) {
                for (var x = 0; x < r.w; x++) {
                    var tileIdx = (((r.y + y) * this.w) + r.x + x);

                    this.map[tileIdx].roof = r;
                    this.map[tileIdx].roofType = r.data[((y * r.w) + x)];
                }
            }
        }
    }
}


//Viewport
class Viewport {
    constructor() {
        this.screen = [0, 0];
        this.startTile = [0, 0];
        this.endTile = [0, 0];
        this.offset = [0, 0];
    }
    update(px, py) {
        this.offset[0] = Math.floor((this.screen[0] / 2) - px);
        this.offset[1] = Math.floor((this.screen[1] / 2) - py);

        var tile = [Math.floor(px / tileW), Math.floor(py / tileH)];

        this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
        this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);

        if (this.startTile[0] < 0) {
            this.startTile[0] = 0;
        }
        if (this.startTile[1] < 0) {
            this.startTile[1] = 0;
        }

        this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
        this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);

        if (this.endTile[0] >= mapW) {
            this.endTile[0] = mapW - 1;
        }
        if (this.endTile[1] >= mapH) {
            this.endTile[1] = mapH - 1;
        }
    }
}
//Eit par hjelpefunksjonar som er brukt nokre stader

function toIndex(x, y) {
    return ((y * mapW) + x);
}

function tilfeldigTall(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

