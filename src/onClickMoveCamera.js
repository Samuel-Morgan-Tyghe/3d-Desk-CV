import { TimelineMax } from "../vendor/gsap.min.js";
import * as THREE from "../vendor/three";

export function onClickMoveCamera(scene, camera, controls, object, x, y, z) {
  const center = new THREE.Vector3();

  var bbox = new THREE.Box3().setFromObject(
    scene.getObjectByName(object, true)
  );

  let targetReset = bbox.getCenter(center);

  scene.tl1 = new TimelineMax().delay(0.1);
  scene.tl1.to(
    camera.position,
    1,
    {
      x: targetReset.x + x,
      y: targetReset.y + y,
      z: targetReset.z + z,
      ease: Expo.easeOut,
      onUpdate: function () {
        camera.updateProjectionMatrix();
      },
    },
    0
  );
  scene.tl1.to(
    controls.target,
    1,
    {
      x: targetReset.x,
      y: targetReset.y,
      z: targetReset.z,
      ease: Expo.easeOut,
      onUpdate: function () {
        controls.update();
      },
    },
    0
  );
}
