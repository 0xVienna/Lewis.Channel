// JavaScript code for continuous gradient animation
const body = document.querySelector('body');
const colors = ['#fddb6d', '#a9620d']; // Faded dark orange gradient colors
const step = 0.005; // Controls the speed of gradient change, smaller value means slower change

function animateGradient() {
  let currentColor = colors[0];
  let nextColor = colors[1];
  let colorStep = 0;

  function updateColor() {
    if (colorStep >= 1) {
      // Swap colors to create the continuous loop
      [currentColor, nextColor] = [nextColor, currentColor];
      colorStep = 0;
    }

    currentColor = lerpColor(colors[0], colors[1], colorStep);
    nextColor = lerpColor(colors[0], colors[1], colorStep + step);
    body.style.background = `linear-gradient(to bottom right, ${currentColor}, ${nextColor})`;

    colorStep += step;
    requestAnimationFrame(updateColor);
  }

  function lerpColor(color1, color2, amount) {
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);

    const r = lerp(r1, r2, amount);
    const g = lerp(g1, g2, amount);
    const b = lerp(b1, b2, amount);

    return rgbToHex(r, g, b);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  function rgbToHex(r, g, b) {
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }

  requestAnimationFrame(updateColor);
}
animateGradient();
