export function addShadow(scene, renderer) {
  scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const theException = scene.getObjectByName('blendLayer')
  theException.castShadow = false;
  theException.receiveShadow = false;

  // const theException = scene.getObjectByName('windowhelper')
  // theException.castShadow = false;
  // theException.receiveShadow = false;
  
  // let theException1 = scene.getObjectByName('weatherMaterial')
  // theException1.castShadow = false;
  // theException1.receiveShadow = false;

  renderer.shadowMap.needsUpdate = true

}
