precision mediump float;

attribute vec4 aPosition;
uniform vec3 translation;
uniform vec3 translationBack;
uniform float theta;

void main() {
  mat4 translate = mat4 (
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translation,   1.0
  );
  mat4 rotate = mat4 (
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 translateBack = mat4 (
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translationBack,   1.0
  );
  // perkalian dari kanan
  gl_Position = translateBack * rotate * translate * aPosition;
}
