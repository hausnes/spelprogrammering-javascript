var ctx = null;

const tileW = 40,
    tileH = 40;
const mapW = 20,
    mapH = 20;
var currentSecond = 0,
    frameCount = 0,
    framesLastSecond = 0,
    lastFrameTime = 0;

var tileset = null,
    tilesetURL = "tileset.png",
    tilesetLoaded = false;

var gameTime = 0;
const gameSpeeds = [{
        name: "Normal",
        mult: 1
    },
    {
        name: "Slow",
        mult: 0.3
    },
    {
        name: "Fast",
        mult: 3
    },
    {
        name: "Paused",
        mult: 0
    }
];
var currentSpeed = 0;

const floorTypes = {
    solid: 0,
    path: 1,
    water: 2,
    ice: 3,
    conveyorU: 4,
    conveyorD: 5,
    conveyorL: 6,
    conveyorR: 7,
    grass: 8
};

const directions = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
};

var keysDown = {
    37: false,
    38: false,
    39: false,
    40: false,
    80: false
};