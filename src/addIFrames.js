import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import * as THREE from "../vendor/three";
export function addIFrames(scene) {
  const obj = new THREE.Object3D();

  // //
  var div = document.createElement("div");
  div.style.width = "1080px";
  div.style.height = "893px";
  div.style.backgroundColor = "red";
  // div.style.backfacevisibility= "hidden";
  // //

  var iframe = document.createElement("iframe");
  iframe.style.width = "1080px";
  iframe.style.height = "893px";
  iframe.style.border = "0px";
  iframe.src = "https://samuel-morgan-tyghe.github.io/Basic-Website-To-React";
  // iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
  // iframe.style.backfacevisibility= "hidden";

  div.appendChild(iframe);
  // //
  const objectCopy = scene.getObjectByName("monitorLight1");
  var css3dObject = new CSS3DObject(div);
  // css3dObject.position.set(-70, 725, -90);
  css3dObject.rotation.copy(objectCopy.rotation);
  css3dObject.rotateY(THREE.Math.degToRad(180));
  css3dObject.scale.set(0.265, 0.21, 0.1);
  //
  const newtempWorldPosition = new THREE.Vector3();

  obj.css3dObject = css3dObject;
  obj.position.copy(objectCopy.getWorldPosition(newtempWorldPosition));
  obj.add(css3dObject);

  // css3dObject.scale.set(0.001,0.001,1);
  var material = new THREE.MeshPhongMaterial({
    opacity: 1,
    color: new THREE.Color(0x111111),
    blending: THREE.NoBlending,
    side: THREE.FrontSide,
  });
  var geometry = new THREE.BoxBufferGeometry(1.9, 0.3, 0.1);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  obj.lightShadowMesh = mesh;
  obj.add(mesh);
  obj.scale.set(0.001, 0.001, 0.001);

  scene.add(obj);
}
