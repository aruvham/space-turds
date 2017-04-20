var Generate = {
  size: 20,
  tetrominoes: {
    'S': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: -1}, {x:  2, y: -1}],
    'Z': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y:  1}, {x:  2, y:  1}],
    'O': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y:  1}, {x:  1, y:  1}],
    'L': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y:  2}, {x:  1, y:  2}],
    'J': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y:  2}, {x: -1, y:  2}],
    'I': [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y:  2}, {x:  0, y:  3}],
    'T': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y:  0}, {x:  1, y:  1}]
  },

  asteroid: (x = 0, y = 0) => {
    var vertices = [];
    var a = 0;
    var i = 0;
    while (a < 360) {
      var dx = cos(radians(a)) * random(30,50);
      var dy = sin(radians(a)) * random(30,50);
      vertices[i] = {x: x + dx, y: y + dy};
      a += random(15, 40);
      i += 1;
    }
    return {vertices: vertices, angle: 0};
  },

  randomTetromino: (x, y) => {
    return Generate.tetromino(x, y, 'SZOLJIT'[Math.floor(random(0, 6))]);
  },

  tetromino: (x = 0, y = 0, c) => {
    var s = Generate.size;
    var points = [];
    var path = Generate.tetrominoes[c];
    for(var i = 0; i < path.length; i++) {
      points[i] = {x: x + path[i].x * s,
                    y: y + path[i].y * s}
    }
    return {piece: c, points: points, angle: 0};
  }
}
