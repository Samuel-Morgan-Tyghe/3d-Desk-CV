import * as THREE from "three";

export function resetCameraToScene(scene, controls) {
  const center = new THREE.Vector3();

  var bbox = new THREE.Box3().setFromObject(scene);
  let targetReset = bbox.getCenter(center);
  controls.target.set(targetReset.x, targetReset.y, targetReset.z);
  controls.update;
}
