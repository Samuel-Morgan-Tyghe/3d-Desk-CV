import { onClickMoveCamera } from "./onClickMoveCamera";

let number = 0;

export function onMouseClick(scene, mouse, raycaster, camera, controls) {
  event.preventDefault();
  let object, x, y, z;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  let projectSrcArray = [
    "https://samuel-morgan-tyghe.github.io/Weather-App/",
    "https://samuel-morgan-tyghe.github.io/Basic-Website-To-React",
    "https://samuel-morgan-tyghe.github.io/Creative-Portfolio/",
    "https://automated-art.co.uk/",
  ];
  function getSrcNumber(add) {
    number = number + add;
    if (number < 0) {
      number = 3;
    }
    if (number > 3) {
      number = 0;
    }

    return number;
  }

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    if (intersects[i].object.name == "Prism_2") {
      const element = document.getElementById("projects");
      number = getSrcNumber(+1);
      element.src = projectSrcArray[number];
    }
    if (intersects[i].object.name == "Prism_3") {
      const element = document.getElementById("projects");
      number = getSrcNumber(-1);
      element.src = projectSrcArray[number];
    }
    if (intersects[i].object.name == "painting") {
      let keywordGroup = scene.getObjectByName("keywordGroup");
      keywordGroup.visible = true;
      object = "painting";
      x = 0;
      y = 0;
      z = window.innerWidth / 1980;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
    if (intersects[i].object.parent.name == "monitorLeft") {
      scene.getObjectByName("projects").visible = true;
      object = "monitor_screen1";
      x = 0.2;
      y = 0;
      z = 0.3;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
    if (intersects[i].object.parent.name == "monitorRight") {
      scene.getObjectByName("cv").visible = true;

      object = "monitor_screen2";
      x = -0.15;
      y = 0;
      z = 0.3;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
    if (intersects[i].object.parent.name == "whiteboard") {
      scene.getObjectByName("whiteboard p5js").visible = true;
      object = "whiteboard";
      x = 0;
      y = 0;
      z = window.innerWidth / 1980;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
  }
}
