export function onMouseMove(scene, refArray, mouse, raycaster, camera) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    //permanent change
    // console.log(intersects)
    if (intersects[0].object.name == "weather") {
        //replace this
        scene.getObjectByName("weatherAppText").visible = true;
    }

    //////////////////////
    // temporary change
    if (intersects[0].object.parent.name == "art1wireframe") {
      refArray[1].visible = true;
    } else {
      refArray[1].visible = false;
    }
    if (intersects[0].object.parent.name == "monitorLeft") {
      refArray[2].visible = true;
    } else {
      refArray[2].visible = false;
    }

    if (intersects[0].object.parent.name == "monitorRight") {
      refArray[3].visible = true;
    } else {
      refArray[3].visible = false;
    }

    if (intersects[0].object.parent.name == "whiteboardwireframe") {
      refArray[4].visible = true;
    } else {
      refArray[4].visible = false;
    }
  }
}
