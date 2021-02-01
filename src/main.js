import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { TimelineMax } from "../vendor/gsap.min.js";
import * as THREE from "../vendor/three";
import { addArt } from "./addArt";
import { addClock } from "./addClock";
import { addModel } from "./addGLBModel";
import { addIFrames } from "./addIFrames";
import { addWhiteboard } from "./addWhiteboard";
import { addIFramesCV } from "./addCV";
import { addKeywordText } from "./addKeywordText";
import { addLights } from "./addLights";
import { addShadow } from "./addShadow";
import { removeShadow } from "./removeShadow";
import { addWeather } from "./addWeather";
import { computerLightBlink } from "./computerLightBlink";
import { keyboardLightAnimate } from "./keyboardLightAnimate";
// import { onMouseClick } from "./onMouseClick";
// import { onMouseMove } from "./onMouseMove";
import { addLightMap } from "./addLightMap";
import { addAutomatedArt } from "./addAutomatedArt";
import { onClickMoveCamera } from "./onClickMoveCamera";
import { matrixAutoUpdate } from "./matrixAutoUpdate";

import { THREEx } from "../vendor/threex.domevents";

let INTERSECTED;
let animationToggle;
var stats;

let pixelRatio = window.devicePixelRatio;
let AA = true;
if (pixelRatio > 1) {
  AA = false;
}

const renderer = new THREE.WebGLRenderer({
  antialias: AA,
  powerPreference: "high-performance",
  alpha: true,
});

// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = 0;
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.setSize(window.innerWidth, window.innerHeight);

var container = document.getElementById("container");
container.appendChild(renderer.domElement);

const renderer2 = new CSS3DRenderer();

renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.domElement.style.position = "absolute";
renderer2.domElement.style.top = 0;

var container2 = document.getElementById("container2");
container2.appendChild(renderer2.domElement);

stats = createStats();
document.body.appendChild(stats.domElement);

function createStats() {
  var stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0";
  stats.domElement.style.top = "0";

  return stats;
}

const scene = new THREE.Scene();
console.log(scene);
scene.background = new THREE.Color("#FFBA70");
// scene.background = new THREE.Color("grey");

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  9
);
camera.position.set(0, 1, 2);

const controls = new OrbitControls(camera, renderer2.domElement);
// controls.target.set(scene)
controls.maxDistance = 0;
controls.maxDistance = 5;

console.log(controls);

controls.enableDamping = true;
controls.minPolarAngle = 0.2;
controls.maxPolarAngle = 1.85;
controls.minAzimuthAngle = -1; // radians
controls.maxAzimuthAngle = 1;
controls.dampingFactor = 0.07;
// controls.rotateSpeed = 0.2;
controls.target.set(0,0.8, 0);
controls.update();

//  addModel();

async function main() {
  const gltfData = await addModel(renderer);

  scene.add(gltfData.scene);

  // addLightMap(scene, renderer);
  addWeather(scene);
  keyboardLightAnimate(scene);
  computerLightBlink(scene);
  addArt(scene, renderer);
  addClock(scene);

  addLights(scene);
  addShadow(scene, renderer);

  addKeywordText(scene);

  // removeShadow(scene)
  // detect mobile
  if (
    !(
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    )
  ) {
    // console.log(window.innerWidth);
    // console.log(window.innerHeight);
    addAutomatedArt(scene);
    addIFrames(scene);
    addIFramesCV(scene);
    addWhiteboard(scene);
  }
  matrixAutoUpdate(scene);
  // scene.overrideMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // console.log("Scene polycount:", renderer.info);
}

main().catch((error) => {
  console.error(error);
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
// var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
// domEvents.addEventListener(cube, 'mousedown', onDocumentMouseDown, false);

window.addEventListener("click", onMouseClick);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const animate = function () {
  renderer.render(scene, camera);
  renderer2.render(scene, camera);
  requestAnimationFrame(animate);

  stats.update();
};

animate();

/////////////////////////////////////////////////////////////////////////

let number = 0;

function onMouseClick(event) {
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
    if (intersects[i].object.parent.name == "monitor") {
      scene.getObjectByName("projects").visible = true;
      object = "monitor_screen1";
      x = 0.2;
      y = 0;
      z = 0.3;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
    if (intersects[i].object.parent.name == "monitor_1") {
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

function onMouseMove(event) {
  event.preventDefault();
  let weatherAppText = scene.getObjectByName("weatherAppText");
  let painting = scene.getObjectByName("painting");

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    //permanent change

    if (intersects[0].object.name == "weather") {
      weatherAppText.visible = true;
    }

    //////////////////////
    //temporary change
    if (intersects[0].object.name == "painting") {
      // painting.material.emissive = '#FFFFFF';
    } else {
      // painting.material.emissive = '#000000';
    }
  }
}
