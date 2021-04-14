//Level 1

var gameMap = [
    0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 2, 2, 2, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 2, 1, 0, 0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 2, 1, 0, 2, 2, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 2, 1, 0, 2, 2, 0, 4, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 2, 2, 2, 2, 2, 0, 4, 4, 4, 1, 1, 1, 0, 2, 2, 2, 0,
    0, 1, 1, 2, 1, 0, 2, 2, 0, 1, 1, 4, 1, 1, 1, 0, 2, 2, 2, 0,
    0, 1, 1, 2, 1, 0, 2, 2, 0, 1, 1, 4, 1, 1, 1, 0, 2, 2, 2, 0,
    0, 1, 1, 2, 1, 0, 0, 0, 0, 1, 1, 4, 1, 1, 0, 0, 0, 2, 0, 0,
    0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 2, 2, 2, 2, 0,
    0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 4, 4, 1, 1, 0, 2, 2, 2, 2, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 0, 2, 2, 2, 2, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 0, 2, 2, 2, 2, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var roofList = [{
        x: 5,
        y: 3,
        w: 4,
        h: 7,
        data: [
            10, 10, 11, 11,
            10, 10, 11, 11,
            10, 10, 11, 11,
            10, 10, 11, 11,
            10, 10, 11, 11,
            10, 10, 11, 11,
            10, 10, 11, 11
        ]
    },
    {
        x: 15,
        y: 5,
        w: 5,
        h: 4,
        data: [
            10, 10, 11, 11, 11,
            10, 10, 11, 11, 11,
            10, 10, 11, 11, 11,
            10, 10, 11, 11, 11
        ]
    },
    {
        x: 14,
        y: 9,
        w: 6,
        h: 7,
        data: [
            10, 10, 10, 11, 11, 11,
            10, 10, 10, 11, 11, 11,
            10, 10, 10, 11, 11, 11,
            10, 10, 10, 11, 11, 11,
            10, 10, 10, 11, 11, 11,
            10, 10, 10, 11, 11, 11,
            10, 10, 10, 11, 11, 11
        ]
    }
];

//level2

var gameMap2 = [];

var roofList2 = [];

//Tiles

var objectCollision = {
    none: 0,
    solid: 1
};
var objectTypes = {
    1: {
        name: "Box",
        sprite: new Sprite([{
            x: 40,
            y: 160,
            w: 40,
            h: 40
        }]),
        offset: [0, 0],
        collision: objectCollision.solid,
        zIndex: 1
    },
    2: {
        name: "Broken Box",
        sprite: new Sprite([{
            x: 40,
            y: 200,
            w: 40,
            h: 40
        }]),
        offset: [0, 0],
        collision: objectCollision.none,
        zIndex: 1
    },
    3: {
        name: "Tree top",
        sprite: new Sprite([{
            x: 80,
            y: 160,
            w: 80,
            h: 80
        }]),
        offset: [-20, -20],
        collision: objectCollision.solid,
        zIndex: 3
    },
    4: {
        name: "Vakt",
        sprite: new Sprite([{
            x: 355,
            y: 49,
            w: 30,
            h: 30
        }]),
        offset: [0, 0],
        collision: objectCollision.none,
        zIndex: 1
    }
};




var tileTypes = {
    0: {
        colour: "#685b48",
        floor: floorTypes.solid,
        sprite: new Sprite([{
            x: 0,
            y: 0,
            w: 40,
            h: 40
        }])
    },
    1: {
        colour: "#5aa457",
        floor: floorTypes.grass,
        sprite: new Sprite([{
            x: 40,
            y: 0,
            w: 40,
            h: 40
        }])
    },
    2: {
        colour: "#e8bd7a",
        floor: floorTypes.path,
        sprite: new Sprite([{
            x: 80,
            y: 0,
            w: 40,
            h: 40
        }])
    },
    3: {
        colour: "#286625",
        floor: floorTypes.solid,
        sprite: new Sprite([{
            x: 120,
            y: 0,
            w: 40,
            h: 40
        }])
    },
    4: {
        colour: "#678fd9",
        floor: floorTypes.water,
        sprite: new Sprite([{
                x: 160,
                y: 0,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 200,
                y: 0,
                w: 40,
                h: 40,
                d: 200
            },
            {
                x: 160,
                y: 40,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 200,
                y: 40,
                w: 40,
                h: 40,
                d: 200
            },
            {
                x: 160,
                y: 40,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 200,
                y: 0,
                w: 40,
                h: 40,
                d: 200
            }
        ])
    },
    5: {
        colour: "#eeeeff",
        floor: floorTypes.ice,
        sprite: new Sprite([{
            x: 120,
            y: 120,
            w: 40,
            h: 40
        }])
    },
    6: {
        colour: "#cccccc",
        floor: floorTypes.conveyorL,
        sprite: new Sprite([{
                x: 0,
                y: 40,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 40,
                y: 40,
                w: 40,
                h: 40,
                d: 200
            },
            {
                x: 80,
                y: 40,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 120,
                y: 40,
                w: 40,
                h: 40,
                d: 200
            }
        ])
    },
    7: {
        colour: "#cccccc",
        floor: floorTypes.conveyorR,
        sprite: new Sprite([{
                x: 120,
                y: 80,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 80,
                y: 80,
                w: 40,
                h: 40,
                d: 200
            },
            {
                x: 40,
                y: 80,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 0,
                y: 80,
                w: 40,
                h: 40,
                d: 200
            }
        ])
    },
    8: {
        colour: "#cccccc",
        floor: floorTypes.conveyorD,
        sprite: new Sprite([{
                x: 160,
                y: 200,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 160,
                y: 160,
                w: 40,
                h: 40,
                d: 200
            },
            {
                x: 160,
                y: 120,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 160,
                y: 80,
                w: 40,
                h: 40,
                d: 200
            }
        ])
    },
    9: {
        colour: "#cccccc",
        floor: floorTypes.conveyorU,
        sprite: new Sprite([{
                x: 200,
                y: 80,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 200,
                y: 120,
                w: 40,
                h: 40,
                d: 200
            },
            {
                x: 200,
                y: 160,
                w: 40,
                h: 40,
                d: 200
            }, {
                x: 200,
                y: 200,
                w: 40,
                h: 40,
                d: 200
            }
        ])
    },

    10: {
        colour: "#ccaa00",
        floor: floorTypes.solid,
        sprite: new Sprite([{
            x: 40,
            y: 120,
            w: 40,
            h: 40
        }])
    },
    11: {
        colour: "#ccaa00",
        floor: floorTypes.solid,
        sprite: new Sprite([{
            x: 80,
            y: 120,
            w: 40,
            h: 40
        }])
    }
};

var itemTypes = {
    1: {
        name: "Star",
        maxStack: 2,
        sprite: new Sprite([{
            x: 240,
            y: 0,
            w: 40,
            h: 40
        }]),
        offset: [0, 0]
    }
};