import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS3DRenderer
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { TimelineMax } from "../vendor/gsap.min.js";
import * as THREE from "../vendor/three";
import { addArt } from "./addArt";
import { addClock } from "./addClock";
import { addModel } from "./addGLBModel";
import { addIFrames } from "./addIFrames";
import { addKeywordText } from "./addKeywordText";
import { addLights } from "./addLights";
import { addShadow } from "./addShadow";
import { addWeather } from './addWeather';
import { computerLightBlink } from "./computerLightBlink";
import { keyboardLightAnimate } from "./keyboardLightAnimate";
// import { onMouseClick } from "./onMouseClick";
// import { onMouseMove } from "./onMouseMove";
import { resetCameraToScene } from "./resetCameraToScene";
import {addAutomatedArt} from './addAutomatedArt'

let INTERSECTED
let animationToggle;

const center = new THREE.Vector3();

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = 0;
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

var container = document.getElementById("container");
container.appendChild(renderer.domElement);

const renderer2 = new CSS3DRenderer();

renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.domElement.style.position = "absolute";
renderer2.domElement.style.top = 0;

var container2 = document.getElementById("container2");
container2.appendChild(renderer2.domElement);

const scene = new THREE.Scene();
console.log(scene)
scene.background = new THREE.Color("#000");

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
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
  addWeather(scene)

  resetCameraToScene(scene, controls);
  keyboardLightAnimate(scene);
  computerLightBlink(scene);
  addArt(scene);
  addClock(scene);
  addKeywordText(scene);

    addLights(scene);
    addShadow(scene);
    addAutomatedArt(scene)

  // addIFrames(scene);

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
};

animate();

/////////////////////////////////////////////////////////////////////////


function onMouseClick(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
console.log(window.innerWidth)
  for (var i = 0; i < intersects.length; i++) {
    if (intersects[i].object.name == "painting") {

      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("painting", true)
      );

      let targetReset = bbox.getCenter(center);

      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: targetReset.z+(window.innerWidth/1980),
          ease: Expo.easeOut,
          onUpdate: function () {
            camera.updateProjectionMatrix();
          },
        },
        0
      );
      scene.tl1.to(
        controls.target,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: targetReset.z,
          ease: Expo.easeOut,
          onUpdate: function () {
            controls.update();
          },
        },
        0
      );
    }
    // // //
    if (intersects[i].object.parent.name == "monitor") {
      // // //
      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("monitor_screen1", true)
      );
      let targetReset = bbox.getCenter(center);
      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x:targetReset.x+0.2,
          y: targetReset.y,
          z:  targetReset.z+0.3,
          ease: Expo.easeOut,
          onUpdate: function () {
            camera.updateProjectionMatrix();
          },
        },
        0
      );
      scene.tl1.to(
        controls.target,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: targetReset.z,
          ease: Expo.easeOut,
          onUpdate: function () {
            controls.update();
          },
        },
        0
      );
    }
    if (intersects[i].object.parent.name == "monitor_1") {
      // // //
      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("monitor_screen2", true)
      );
      let targetReset = bbox.getCenter(center);
      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x:targetReset.x-0.15,
          y: targetReset.y,
          z:  targetReset.z+0.3,
          ease: Expo.easeOut,
          onUpdate: function () {
            camera.updateProjectionMatrix();
          },
        },
        0
      );
      scene.tl1.to(
        controls.target,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: targetReset.z,
          ease: Expo.easeOut,
          onUpdate: function () {
            controls.update();
          },
        },
        0
      );
    }
    if (intersects[i].object.parent.name == "whiteboard") {
      // // //
      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("whiteboard", true)
      );
      let targetReset = bbox.getCenter(center);
      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: targetReset.z+(window.innerWidth/1980),
          ease: Expo.easeOut,
          onUpdate: function () {
            camera.updateProjectionMatrix();
          },
        },
        0
      );
      scene.tl1.to(
        controls.target,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: targetReset.z,
          ease: Expo.easeOut,
          onUpdate: function () {
            controls.update();
          },
        },
        0
      );
    }
  }
}

function onMouseMove(event) {
  event.preventDefault();
  let weatherAppText = scene.getObjectByName('weatherAppText')

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
