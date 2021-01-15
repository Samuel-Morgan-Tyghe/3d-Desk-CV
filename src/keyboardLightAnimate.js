import * as THREE from "../vendor/three";
export function keyboardLightAnimate(scene) {
  var keyboardLights = scene.getObjectByName("keyLights", true);

  keyboardLights.traverse(function (child) {
    if (child.isMesh) {
      child.material.dispose();
      child.material = new THREE.MeshStandardMaterial({
        emissive: Math.random() * 0xffffff,
      });
    }
  });

  function lightChanging() {
    keyboardLights.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.setHex(Math.random() * 0xffffff);
      }
    });
  }

  lightChanging();
  setInterval(lightChanging, 3 * 1000);
}

