precision mediump float;

attribute vec3 aPosition;
uniform vec3 theta;

void main() {
  
  vec3 angle = radians(theta);
  vec3 cosinus = cos(angle);
  vec3 sinus = sin(angle);

  mat4 rotateX = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, cosinus.x, sinus.x, 0.0,
    0.0, -sinus.x, cosinus.x, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rotateY = mat4(
    cosinus.y, 0.0, -sinus.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    sinus.y, 0.0, cosinus.y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rotateZ = mat4(
    cosinus.z, sinus.z, 0.0, 0.0,
    -sinus.z, cosinus.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  // perkalian dari kanan
  gl_Position = vec4(aPosition, 1.0) * rotateZ * rotateY * rotateX;
}
