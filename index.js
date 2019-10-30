(function(global) {

  var canvas, gl, shaders = [];

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Get canvas element and check if WebGL enabled
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);   
    var vertex2Shader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragment2Shader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program2 = glUtils.createProgram(gl, vertex2Shader, fragment2Shader);
    shaders.push(program);
    shaders.push(program2);

    startDraw();
  }

  function initCubes() {
    var vertices = new Float32Array([ 
      //ABCD
      -0.5, -0.7, 0.5,        //A
      -0.5, 0.7, 0.5,         //B
      -0.5, 0.7, 0.5,         //B
      0.5, 0.7, 0.5,          //C

      0.5, 0.7, 0.5,          //C
      0.5, -0.7, 0.5,         //D
      0.5, -0.7, 0.5,         //D
      -0.5, -0.7, 0.5,        //A
      
      //DCGH
      0.5, 0.7, 0.5,          //C
      0.5, 0.7, -0.5,         //G
      0.5, -0.7, 0.5,         //D
      0.5, -0.7, -0.5,        //H

      //ABFE
      -0.5, -0.7, 0.5,        //A
      -0.5, -0.7, -0.5,       //E
      -0.5, 0.7, 0.5,         //B
      -0.5, 0.7, -0.5,        //F

      //EFGH
      -0.5, -0.7, -0.5,       //E
      -0.5, 0.7, -0.5,        //F
      -0.5, 0.7, -0.5,        //F
      0.5, 0.7, -0.5,         //G

      0.5, 0.7, -0.5,         //G
      0.5, -0.7, -0.5,        //H
      0.5, -0.7, -0.5,        //H
      -0.5, -0.7, -0.5        //E
    ]);
    n = 24;

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(shaders[0], 'aPosition');
    gl.vertexAttribPointer(
      aPosition,
      3,
      gl.FLOAT,
      gl.FALSE,
      3 * Float32Array.BYTES_PER_ELEMENT,
      0);
    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function initBuffersBlock() {
    var vertices = new Float32Array([
      -0.35, -0.5,    0.83, 0.13, 0.18,
      -0.35, +0.5,    0.89, 0.15, 0.21,
      -0.15, +0.5,    0.89, 0.51, 0.41,

      -0.15, +0.5,    0.89, 0.51, 0.41,
      -0.15, -0.5,    0.89, 0.15, 0.21,
      -0.35, -0.5,    0.83, 0.13, 0.18,

      -0.15, +0.1,    0.83, 0.13, 0.18,
      +0.15, +0.5,    0.89, 0.15, 0.21,
      +0.35, +0.5,    0.89, 0.51, 0.41,

      +0.35, +0.5,    0.89, 0.51, 0.41,
      0.0, 0.0,    0.89, 0.15, 0.21,
      -0.15, +0.1,    0.83, 0.13, 0.18,

      -0.15, +0.1,    0.89, 0.15, 0.21,
      -0.15, -0.1,    0.89, 0.15, 0.21,
      0.0, 0.0,    0.89, 0.15, 0.21,

      0.0, 0.0,    0.89, 0.15, 0.21,
      +0.35, -0.5,    0.89, 0.51, 0.41,
      +0.15, -0.5,    0.83, 0.13, 0.18,

      +0.15, -0.5,    0.83, 0.13, 0.18,
      -0.15, -0.1,    0.89, 0.51, 0.41,
      0.0, 0.0,    0.89, 0.15, 0.21
/*      +0.1, -0.5,    0.83, 0.13, 0.18,
      +0.1, +0.5,    0.89, 0.15, 0.21,
      +0.3, +0.5,    0.89, 0.51, 0.41,

      +0.3, +0.5,    0.89, 0.51, 0.41,
      +0.3, -0.5,    0.89, 0.15, 0.21,
      +0.1, -0.5,    0.83, 0.13, 0.18,

      +0.3, +0.1,    0.83, 0.13, 0.18,
      +0.6, +0.5,    0.89, 0.15, 0.21,
      +0.8, +0.5,    0.89, 0.51, 0.41,

      +0.8, +0.5,    0.89, 0.51, 0.41,
      +0.45, 0.0,    0.89, 0.15, 0.21,
      +0.3, +0.1,    0.83, 0.13, 0.18,

      +0.3, +0.1,    0.89, 0.15, 0.21,
      +0.3, -0.1,    0.89, 0.15, 0.21,
      +0.45, 0.0,    0.89, 0.15, 0.21,

      +0.45, 0.0,    0.89, 0.15, 0.21,
      +0.8, -0.5,    0.89, 0.51, 0.41,
      +0.6, -0.5,    0.83, 0.13, 0.18,

      +0.6, -0.5,    0.83, 0.13, 0.18,
      +0.3, -0.1,    0.89, 0.51, 0.41,
      +0.45, 0.0,    0.89, 0.15, 0.21 */
    ]);
    var n = 21;

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(shaders[1], 'aPosition');
    var vColor = gl.getAttribLocation(shaders[1], 'vColor');

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(vColor);

    return n;
  }

  function startDraw() {
    thetaLoc = gl.getUniformLocation(shaders[0], 'theta');
    theta = [20, 40, 0];

    theta2Loc = gl.getUniformLocation(shaders[1], 'theta'); 
    transLoc = gl.getUniformLocation(shaders[1], 'point');
    scaleLoc = gl.getUniformLocation(shaders[1], 'diffScale');
    diffScale = 0.4;
    theta2 = [30, 60, 0];
    point = [0, 0, 0];
    addX = 0.0081;
    addY = 0.0099;
    addZ = 0.053;
    adder = 0.81;

    function render(){
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(shaders[0]);

      var nLine = initCubes(gl);
      gl.uniform3fv(thetaLoc, theta);
      gl.drawArrays(gl.LINES, 0, nLine);

      gl.useProgram(shaders[1]);

      var nBlock = initBuffersBlock(gl);
      gl.uniform1f(scaleLoc, diffScale);
      if(point[0] > 0.7*(1-diffScale) || point[0] < -0.7*(1-diffScale) ) {
        addX = addX * -1;
      }
      point[0] += addX;
      if(point[1] > 0.8*(1-diffScale) || point[1] < -0.8*(1-diffScale) ) {
        addY = addY * -1;
      }
      point[1] += addY;
      if(point[2] > 0.8*(1-diffScale) || point[2] < -0.8*(1-diffScale) ) {
        addZ = addZ * -1;
      }
      point[2] += addZ;
      gl.uniform3fv(transLoc, point);
      theta2[1] -= (adder * 2.5);
      gl.uniform3fv(theta2Loc, theta2);
      gl.drawArrays(gl.TRIANGLES, 0, nBlock);

      requestAnimationFrame(render);
    }
    render();
  }

})(window || this);