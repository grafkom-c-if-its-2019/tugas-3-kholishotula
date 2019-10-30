precision mediump float;

attribute vec4 aPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float scaleY;

void main() {
  fColor = vColor;
  mat4 scale = mat4 (
    1.0, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  // perkalian dari kanan
  gl_Position = scale * aPosition;
}
