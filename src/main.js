import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

import { TimelineMax } from "../vendor/gsap.min.js";
import * as THREE from "../vendor/three";
import { addArt } from "./addArt";
import { addClock } from "./addClock";
import { addModel } from "./addGLBModel";
import { addIFrames } from "./addIFrames";
import { addKeywordText } from "./addKeywordText";
import { addLights } from "./addLights";
import { addShadow } from "./addShadow";
import { addWeather } from "./addWeather";
import { computerLightBlink } from "./computerLightBlink";
import { keyboardLightAnimate } from "./keyboardLightAnimate";
// import { onMouseClick } from "./onMouseClick";
// import { onMouseMove } from "./onMouseMove";
import { resetCameraToScene } from "./resetCameraToScene";
import { addAutomatedArt } from "./addAutomatedArt";
import { onClickMoveCamera } from "./onClickMoveCamera";
import { matrixAutoUpdate } from "./matrixAutoUpdate";
let INTERSECTED;
let animationToggle;
var stats;

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = 0;
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
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
scene.background = new THREE.Color("#000");

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  5
);
camera.position.set(1.5, 2, 2);

const controls = new OrbitControls(camera, renderer2.domElement);
// controls.target.set
// controls.enablePan = false;
// controls.enableZoom = false;
// controls.enableDamping = true;
// controls.minPolarAngle = 0.8;
// controls.maxPolarAngle = 2.4;
// controls.dampingFactor = 0.07;
// controls.rotateSpeed = 0.07;
controls.update();

//  addModel();

async function main() {
  const gltfData = await addModel();

  scene.add(gltfData.scene);
  addWeather(scene);

  resetCameraToScene(scene, controls);
  keyboardLightAnimate(scene);
  computerLightBlink(scene);
  addArt(scene);
  addClock(scene);
  addKeywordText(scene);

  addLights(scene);
  // addShadow(scene);
  addAutomatedArt(scene);

  addIFrames(scene);
  matrixAutoUpdate(scene);
  // scene.overrideMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
}

main().catch((error) => {
  console.error(error);
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

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

function onMouseClick(event) {
  event.preventDefault();
  let object, x, y, z;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  console.log(window.innerWidth);
  for (var i = 0; i < intersects.length; i++) {
    if (intersects[i].object.name == "painting") {
      object = "painting";
      x = 0;
      y = 0;
      z = window.innerWidth / 1980;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
    if (intersects[i].object.parent.name == "monitor") {
      object = "monitor_screen1";
      x = 0.2;
      y = 0;
      z = 0.3;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
    if (intersects[i].object.parent.name == "monitor_1") {
      object = "monitor_screen2";
      x = -0.15;
      y = 0;
      z = 0.3;
      onClickMoveCamera(scene, camera, controls, object, x, y, z);
    }
    if (intersects[i].object.parent.name == "whiteboard") {
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

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    for (var i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name == "weather") {
        weatherAppText.visible = true;
      }
      if (INTERSECTED != intersects[i].object) {
        if (intersects[i].object.name == "painting") {
          // // //
          if (animationToggle) animationToggle = false;
          scene.tlH = new TimelineMax();

          scene.tlH.to(
            intersects[i].object.material,
            5,
            {
              emissiveIntensity: 0,
              ease: Expo.easeOut,
            },
            0
          );
          scene.tlH.to(
            intersects[i].object.material,
            5,
            {
              emissiveIntensity: 0.3,
              ease: Expo.easeOut,
            },
            0
          );
          scene.tlH.to(
            intersects[i].object.material,
            5,
            {
              emissiveIntensity: 0,
              ease: Expo.easeOut,
              animationToggle() {
                animationToggle = true;
              },
            },
            0
          );
        }
      }
    }
  }
}
