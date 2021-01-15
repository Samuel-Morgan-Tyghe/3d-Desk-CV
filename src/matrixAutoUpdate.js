export function matrixAutoUpdate(scene) {
  scene.traverse(function (child) {
    if (child.isMesh) {
      child.matrixAutoUpdate = false
      child.updateMatrix()
    }
  });
  const theException = scene.getObjectByName('palantirPlace')
  theException.matrixAutoUpdate = true
}
