import * as THREE from "./three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Color } from "three/build/three.module";
import moment from "./moment";

let INTERSECTED;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new Color("grey");

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(1.5, 2, 2);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false;
// controls.enableZoom = false;
// controls.enableDamping = true;
// controls.minPolarAngle = 0.8;
// controls.maxPolarAngle = 2.4;
// controls.dampingFactor = 0.07;
// controls.rotateSpeed = 0.07;
controls.update();
const loader = new GLTFLoader();

const light = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff, 1, 0, 0.5, 1);
spotLight.position.set(10, 10, 10);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);

//

var texture = new THREE.TextureLoader().load("/dist/assets/img/open.webp");
var texture2 = new THREE.TextureLoader().load("/dist/assets/img/blink.webp");
const paintingGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
const paintingMaterial = new THREE.MeshLambertMaterial({ map: texture });
paintingMaterial.emissive.setHex(0xfff111);

const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.set(0.527, 0.938, -0.311);
painting.scale.set(0.35, 0.53, 1);
painting.name = "painting";
scene.add(painting);
// painting.addEventListener("mouseenter", function (event) {

//   material.map = texture2;
//   texture.dispose()

// });

//

const loader2 = new THREE.FontLoader();

loader2.load("/dist/assets/fonts/alarm clock_Regular.json", function (font) {
  var currentTime = moment().format("HH:mm");

  const geometry = new THREE.TextBufferGeometry(currentTime, {
    font: font,
    size: 0.24,
    height: 0.01,
    // curveSegments: 12,
    // bevelEnabled: true,
    // bevelThickness: 10,
    // bevelSize: 8,
    // bevelOffset: 0,
    // bevelSegments: 5
  });

  const material = new THREE.MeshBasicMaterial({ color: 0xb01717 });
  const alarmClockText = new THREE.Mesh(geometry, material);
  alarmClockText.position.set(0.519, 0.51, -0.071);
  alarmClockText.scale.set(0.09, 0.09, 1);
  alarmClockText.rotation.set(100, 0, 0);
  scene.add(alarmClockText);
});

loader.load(
  "./assets/models/DeskScene2.1.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// var screenTexture = new THREE.TextureLoader().load("/dist/assets/img/open.webp");
// const screenGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
// const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
// const screen = new THREE.Mesh(screenGeometry, screenMaterial);
// // screen.position.set(0.527, 0.938, -0.311);
// // screen.scale.set(0.35, 0.53, 1);
// scene.add(screen);

function paintingOpen() {
  setTimeout(function () {
    paintingMaterial.map = texture2;
    texture.dispose();
    paintingBlink();
  }, 2000);
}
function paintingBlink() {
  setTimeout(function () {
    paintingMaterial.map = texture;
    texture2.dispose();
    paintingOpen();
  }, 300);
}
paintingOpen();

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function onMouseClick(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    //
    if (intersects[i].object.name == "painting") {
      camera.position.set(0.55, 1.2, 0.6);
      controls.target.set(0.55, 1.15, 0.4);
      //  controls.target.set(intersects[i].point)
      controls.update();
    }
    // camera.lookAt(intersects[i].point)
    // intersects[i].object.material.color.set(0xff0000);
  }
}

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    // if the closest object intersected is not the currently stored intersection object
    if (intersects[0].object != INTERSECTED) {
      if (intersects[0].object.name == "painting") {
        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED)
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentMaterial);
        // store reference to closest object as current intersection object
        INTERSECTED = intersects[0].object;

        // store color of closest object (for later restoration)
        INTERSECTED.currentMaterial = INTERSECTED.material.emissive.getHex();
        // set a new color for closest object
        INTERSECTED.material.emissive.setHex(0xff7771);
        // there are no intersections
      }
    }
  } else {
    // restore previous intersection object (if it exists) to its original color
    if (INTERSECTED)
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentMaterial);
    // remove previous intersection object reference
    //     by setting current intersection object to "nothing"
    INTERSECTED = null;
  }

  // for (var i = 0; i < intersects.length; i++) {
  //   if (intersects[i].object.name == "painting") {
  //     intersects[i].object.material.color.set(0xff0000);
  //   }
  // }}
}

// function onMouseOut(event) {
//   event.preventDefault();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);

//   var intersects = raycaster.intersectObjects(scene.children, true);

//   for (var i = 0; i < intersects.length; i++) {
//     if (intersects[i].object.name == "painting") {
//

//       intersects[i].object.material.color.set(0xffffff);
//     }
//   }
// }

window.addEventListener("click", onMouseClick);
window.addEventListener("mousemove", onMouseMove);
// window.addEventListener("mouseout", onMouseOut);

controls.update();

const animate = function () {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();
