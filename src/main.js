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
import { matrixAutoUpdate } from "./matrixAutoUpdate";
import { addOutlines } from "./addOutlines";
import { addAudio } from "./addAudio";
import { onMouseMove } from "./mouseOver";
import { onMouseClick } from "./onMouseClick";
import { THREEx } from "../vendor/threex.domevents";

let INTERSECTED;
let animationToggle;
var stats;
let hoverRefArray;

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
controls.target.set(0, 0.8, 0);
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

  addOutlines(scene);

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
    addWhiteboard(scene);
    addIFrames(scene);
    addIFramesCV(scene);
    addAudio(camera, scene);
  }
  matrixAutoUpdate(scene);
  // scene.overrideMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // console.log("Scene polycount:", renderer.info);

  const weatherAppText = scene.getObjectByName("weatherAppText");
  const monitorLeftwireframe = scene.getObjectByName("monitorLeftwireframe");
  const monitorRightwireframe = scene.getObjectByName("monitorRightwireframe");
  const art1wireframe = scene.getObjectByName("art1wireframe");
  const whiteboardwireframe = scene.getObjectByName("whiteboardwireframe");
  hoverRefArray = [
    weatherAppText,
    art1wireframe,
    monitorLeftwireframe,
    monitorRightwireframe,
    whiteboardwireframe,
  ];
}

main().catch((error) => {
  console.error(error);
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
// var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
// domEvents.addEventListener(cube, 'mousedown', onDocumentMouseDown, false);

window.addEventListener("click", function () {
  onMouseClick(scene, mouse, raycaster, camera, controls);
});
window.addEventListener("mousemove", function () {
  onMouseMove(scene, hoverRefArray, mouse, raycaster, camera);
});
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
