import * as THREE from "../vendor/three";

export function addOutlines(scene) {
  // const monitorLeftOutline =  outlineObject(scene,'monitor_screen1')
  // const monitorRightOutline =  outlineObject(scene,'monitor_screen2')
  // const whiteboardOutline =  outlineObject(scene,'whiteboardScreen')
  // const paintingOutline =  outlineObject(scene,'Wall_Art_Classical_Plane')

  const monitorLeftOutline = outlineObject(
    scene.getObjectByName("monitorLeft")
  );
  const monitorRightOutline = outlineObject(
    scene.getObjectByName("monitorRight")
  );
  const whiteboardOutline = outlineObject(scene.getObjectByName("whiteboard"));
  const paintingOutline = outlineObject(scene.getObjectByName("art1"));

  scene.add(monitorLeftOutline);
  scene.add(monitorRightOutline);
  scene.add(whiteboardOutline);
  scene.add(paintingOutline);
}

function outlineObject(obj) {
  const copyObj = obj.clone()
  // copyObj.material = new THREE.MeshBasicMaterial()
  copyObj.name = copyObj.name + "wireframe";
  copyObj.scale.x = copyObj.scale.x + 0.001;
  copyObj.scale.y = copyObj.scale.y + 0.001;
  // copyObj.scale.z = copyObj.scale.z + 0.01;
    copyObj.traverse(function (child) {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff,})
      child.material.wireframe = true
    }
  })
  copyObj.visible = false
  return copyObj;
}

// function outlineObject(obj) {
//   const group = new THREE.Group();

//   obj.traverse(function (child) {
//     if (child.isMesh) {
//       const geometry = child.geometry;
//       const edges = new THREE.EdgesGeometry(geometry);
//       // const lineMat = new THREE.LineDashedMaterial({
//       //   color: Math.random() * 0xffffff,
//       //   linewidth: Math.random() * (5 - 1) + 1,
//       //   dashSize: Math.random() / 100,
//       //   gapSize: Math.random() / 100,
//       //   scale: Math.random() * (5 - 1) + 1,
//       // });

//       const lineMat = new THREE.LineBasicMaterial( )

//       const line = new THREE.LineSegments(edges, lineMat);

//       const newtempWorldPosition3 = new THREE.Vector3();
//       const newtempWorldQ3 = new THREE.Quaternion();

//       line.position.copy(child.getWorldPosition(newtempWorldPosition3));
//       line.quaternion.copy(child.getWorldQuaternion(newtempWorldQ3));
//       line.scale.copy(child.getWorldScale());
//       line.scale.x = line.scale.x + 0.01;
//       line.scale.y = line.scale.y + 0.01;
//       line.scale.z = line.scale.z + 0.01;
//       line.name = child.name + "Line";
//       line.computeLineDistances();
//       group.add(line);
//     }
//   });
//   group.name = obj.name + "Lines";
//   group.visible = false

//   return group;
// }
