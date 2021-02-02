export function removeShadow(scene) {
  scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
    }
  });
  const theException = scene.getObjectByName("blendLayer");
  theException.castShadow = false;
  theException.receiveShadow = false;

  // let theException1 = scene.getObjectByName('weatherMaterial')
  // theException1.castShadow = false;
  // theException1.receiveShadow = false;
}
