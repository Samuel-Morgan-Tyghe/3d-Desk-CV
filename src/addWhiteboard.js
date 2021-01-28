import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import * as THREE from "../vendor/three";

export function addWhiteboard(scene) {
  const obj = new THREE.Object3D();
  console.log(obj);
  // //
  var div = document.createElement("div");
  div.style.width = "980px";
  div.style.height = "480px";
  div.style.border = "0px";
  div.style.overflow = "hidden";
  div.style.scrolling = "no";
  div.style.frameborder = "0";
  div.style.backgroundColor = "rgba(201, 76, 76, 0);";

  // div.style.backgroundColor = "white";
  // div.style.backfacevisibility= "hidden";
  // //

  var iframe = document.createElement("iframe");
  iframe.id = "whiteboard";

  iframe.style.width = "980px";
  iframe.style.height = "490px";
  iframe.style.border = "0px";
  iframe.style.overflow_x = "hidden";
  iframe.style.overflow_y = "hidden";
  iframe.style.scrolling = "no";
  iframe.style.frameborder = "0";
  iframe.style.backgroundColor = "rgba(201, 76, 76, 0);";

  iframe.src = "https://editor.p5js.org/automatedartist/embed/ksa1q3ycg";
  //<iframe src="https://editor.p5js.org/automatedartist/embed/ksa1q3ycg"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/0n9kUViVH"></iframe>
  // <iframe src="https://editor.p5js.org/automatedartist/embed/QRJ3Qv2Xq"></iframe>
  /* <iframe src="https://editor.p5js.org/automatedartist/embed/kKpXtVM_R"></iframe> */
  //<iframe src="https://editor.p5js.org/automatedartist/embed/QwFeEz_C3"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/zAz3hhFF4"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/6s9fM2BrI"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/0n9kUViVH"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/9JMnTgALt"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/d-NjNAqwG"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/0n9kUViVH"></iframe>
  // <iframe src="https://editor.p5js.org/automatedartist/embed/EYnvkS6Lr"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/0n9kUViVH"></iframe>
  //<iframe src="https://editor.p5js.org/automatedartist/embed/0n9kUViVH"></iframe>
  // <iframe src="https://editor.p5js.org/automatedartist/embed/I_nutuyQK"></iframe>
  // iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
  // iframe.style.backfacevisibility= "hidden";
  {
    /* <iframe src="https://editor.p5js.org/p5/embed/AmFCcDVysYj"></iframe> */
  }
  div.appendChild(iframe);
  // //
  const objectCopy = scene.getObjectByName("whiteboardScreen");
  var css3dObject = new CSS3DObject(div);
  // css3dObject.position.set(-70, 725, -90);

  // obj.scale.copy(objectCopy.getWorldScale());

  css3dObject.scale.set(0.001, 0.001, 1);
  //
  const newtempWorldPosition = new THREE.Vector3();
  const newtempWorldQ3 = new THREE.Quaternion();

  obj.css3dObject = css3dObject;
  // obj.quaternion.copy(objectCopy.getWorldQuaternion(newtempWorldQ3));
  // obj.rotateX(THREE.Math.degToRad(90));
  // obj.rotateZ(THREE.Math.degToRad(180));
  // obj.rotateY(THREE.Math.degToRad(180));
  obj.position.copy(objectCopy.getWorldPosition(newtempWorldPosition));
  // obj.translateZ(0.1)
  obj.add(css3dObject);

  // css3dObject.scale.set(0.001,0.001,1);
  // obj.scale.set(0.01, 0.01, 1);

  scene.add(obj);
}
