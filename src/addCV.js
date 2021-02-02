import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import * as THREE from "../vendor/three";

export function addIFramesCV(scene) {
  const obj = new THREE.Object3D();
  // obj.name = 'cv'
  // obj.visible = false


  // console.log(obj)
  // //
  var div = document.createElement("div");
  div.style.width = "1080px";
  div.style.height = "890px";
  div.style.backgroundColor = "white";
  // div.style.backfacevisibility= "hidden";
  // //

  var iframe = document.createElement("iframe");
  iframe.id = 'cv'

  iframe.style.width = "1080px";
  iframe.style.height = "890px";
  iframe.style.border = "0px";
  iframe.src = "https://samuel-morgan-tyghe.github.io/Resume/";
  // iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
  // iframe.style.backfacevisibility= "hidden";

  div.appendChild(iframe);
  // //
  const objectCopy = scene.getObjectByName("monitor_screen2");
  var css3dObject = new CSS3DObject(div);
  css3dObject.name = 'cv'
  css3dObject.visible = false


  // css3dObject.position.set(-70, 725, -90);

  // obj.scale.copy(objectCopy.getWorldScale());

  css3dObject.scale.set(0.265, 0.21, 0.1);
  //
  const newtempWorldPosition = new THREE.Vector3();
  const newtempWorldQ3 = new THREE.Quaternion();

  obj.css3dObject = css3dObject;
  obj.quaternion.copy(objectCopy.getWorldQuaternion(newtempWorldQ3));
  obj.rotateX(THREE.Math.degToRad(90));
  obj.rotateY(THREE.Math.degToRad(180));
  obj.position.copy(objectCopy.getWorldPosition(newtempWorldPosition));
  // obj.translateZ(0.1)
  obj.add(css3dObject);

  // css3dObject.scale.set(0.001,0.001,1);
  obj.scale.set(0.001, 0.001, 0.001);

  scene.add(obj);
}
