export function addShadow(scene, renderer) {
  scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const theException = scene.getObjectByName("windowLight");

  theException.castShadow = false;
  theException.receiveShadow = false;

  // const theException = scene.getObjectByName('windowhelper')
  // // console.log(theException)
  // if(theException){
  // theException.children[0].castShadow= false
  // theException.children[0].receiveShadow= false}

  // let theException1 = scene.getObjectByName('weatherMaterial')
  // theException1.castShadow = false;
  // theException1.receiveShadow = false;

  renderer.shadowMap.needsUpdate = true;
}
