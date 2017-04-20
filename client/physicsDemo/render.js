var Render = {
  size: 20,
  colors: {
    'S':  ["#0FFBFB", "#009D9F", "#076B74", "#6CFFFF"],
    'Z':  ["#FB7D00", "#A25401", "#6C2E00", "#FFBB33"],
    'L':  ["#FFFD01", "#9EAA02", "#696A00", "#FFFF76"],
    'J':  ["#0002F1", "#02039A", "#020063", "#6B6AFE"],
    'O':  ["#02F600", "#009C00", "#006F00", "#63FF67"],
    'I':  ["#F50401", "#AB060E", "#6B0100", "#FF7472"],
    'T':  ["#FE03FD", "#AF03A6", "#73006D", "#FFC5FF"],
    'bg': ["#585858", "#333333", "#252525", "#9C9C9C"]
  },

  // ship
  //
  // expected:
  //
  // { vertices: [vector, vector, vector],
  //   color: #FFF
  // }

  ship: ({ vertices, color }) => {
    noStroke();
    fill(color);
    beginShape();
  	for(var i = 0; i < vertices.length; i++){
  		vertex(vertices[i].x, vertices[i].y);
  	}
  	endShape(CLOSE);
  },

  // bullet (turd)
  //
  // expected:
  //
  // { x: x,
  //   y: y,
  //   color: #FFF
  // }

  bullet: ({ x, y, color }) => {
    noStroke();
    fill(color);
    ellipse(x, y, 5);
  },

  // asteroid
  //
  // expected:
  //
  // { vertices: [vector, vector, vector, ...],
  //   angle: 0 }

  asteroid: ({ vertices, angle }) => {
    noStroke();
    fill(Render.colors.bg[3]);
    push();
    //translate(width/2, height/2);
    rotate(angle);
    beginShape();
  	for(var i = 0; i < vertices.length; i++){
  		vertex(vertices[i].x, vertices[i].y);
  	}
  	endShape(CLOSE);
    pop();
  },

  // tetromino
  //
  // expected:
  //
  // { piece: 'S',
  //   points: [ vector, vector, vector, vector],
  //   angle: 0 (rad)
  // }

  tetromino: ({ piece, points }) => {
    for(var i = 0; i < points.length; i++){
  		Render.tetrisSquare(points[i].x, points[i].y, Render.colors[piece]);
  	}
  },

  tetrisSquare: (x, y, colors) => {
    var s = Render.size;
    var o = s / 5; // offset
    noStroke();
    fill(colors[0]);
    rect(x, y, s, s);

    fill(colors[1]);
    beginShape();
    vertex(x    , y  );
    vertex(x  +o, y+o);
    vertex(x+s-o, y+o);
    vertex(x+s  , y  );
    endShape();

    fill(colors[2]);
    beginShape();
    vertex(x+s  , y    );
    vertex(x+s-o, y  +o);
    vertex(x+s-o, y+s-o);
    vertex(x+s  , y+s  );
    endShape();

    fill(colors[3]);
    beginShape();
    vertex(x+s-o, y+s-o);
    vertex(x  +o, y+s-o);
    vertex(x    , y+s  );
    vertex(x+s  , y+s  );
    endShape();
  }
}
