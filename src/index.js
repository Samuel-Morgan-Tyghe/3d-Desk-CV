import * as THREE from "./three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Color } from "three/build/three.module";
import moment from "./moment";
import { gsap, TimelineMax } from "./gsap.min.js";
import Axios from "axios";

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
// controls.target.set
// controls.enablePan = false;
// controls.enableZoom = false;
// controls.enableDamping = true;
// controls.minPolarAngle = 0.8;
// controls.maxPolarAngle = 2.4;
// controls.dampingFactor = 0.07;
// controls.rotateSpeed = 0.07;
controls.update();
const loader = new GLTFLoader();

const Alight = new THREE.AmbientLight(0xffffff, 0.3);

scene.add(Alight);

let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
scene.add(hemiLight);

let light = new THREE.SpotLight(0xffa95c,0.4);
light.position.set(-50,50,50);
light.castShadow = true;
scene.add( light );

const spotLight = new THREE.SpotLight(0xffffff, 0.3, 0, 0.5, 1);
spotLight.position.set(10, 10, 10);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);



var texture = new THREE.TextureLoader().load("./assets/img/open.webp");
var texture2 = new THREE.TextureLoader().load("./assets/img/blink.webp");
const paintingGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
const paintingMaterial = new THREE.MeshLambertMaterial({ map: texture });
// console.log(paintingMaterial);
const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.set(0.633, 0.938, -0.311);
painting.scale.set(0.35, 0.53, 1);
painting.name = "painting";
scene.add(painting);
// painting.addEventListener("mouseenter", function (event) {

//   material.map = texture2;
//   texture.dispose()

// });

//

const loader2 = new THREE.FontLoader();

loader2.load("./assets/fonts/alarm clock_Regular.json", function (font) {
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
  alarmClockText.position.set(0.315, 0.51, -0.08);
  alarmClockText.scale.set(0.09, 0.09, 1);
  alarmClockText.rotation.set(100, 100.25, 100.35);
  scene.add(alarmClockText);
});

loader.load(
  "./assets/models/DeskScene3.7.glb",
  function (gltf) { 

    var art = new THREE.TextureLoader().load("./assets/img/Palantiri.webp");
    const artMat = new THREE.MeshBasicMaterial({ map: art });

    var palantirPlace = gltf.scene.getObjectByName("palantirPlace", true);

    // console.log(palantirPlace);
    palantirPlace.material = artMat;
    palantirPlace.scale.set(0.2,0.2,0.2) 
    console.log(palantirPlace)
    palantirPlace.material.transparent = true;
    // palantirPlace.rotation.set(1.57, 2.11, -3.14);

    scene.tl2 = new TimelineMax({ repeat: -1 });
    scene.tl2.to(palantirPlace.rotation, 0, {
      x: 1.57,
      y: 0,
      z: -3.14,
      ease: Linear.easeOut,
    });
    scene.tl2.to(palantirPlace.rotation, 20, {
      x: 1.57,
      y: 10,
      z: -3.14,
      ease: Power1.easeInOut,
    });
    scene.tl2.to(palantirPlace.rotation, 5, {
      x: 1.57,
      y: 0,
      z: -3.14,
      ease: Elastic.easeOut,
    });
    var gradientGraphicArt = gltf.scene.getObjectByName(
      "gradientGraphicArt",
      true
    );
    console.log(gradientGraphicArt)

    var blendTexture = new THREE.TextureLoader().load("./assets/img/gradient repeat1Blend.webp");
const blendGeometry = new THREE.PlaneBufferGeometry(1,1,1);
const blendMaterial = new THREE.MeshLambertMaterial({ map: blendTexture });
const blendLayer = new THREE.Mesh(blendGeometry, blendMaterial);
blendLayer.material.transparent = true
blendLayer.material.blending = THREE.MultiplyBlending
console.log(THREE)
blendLayer.position.set(gradientGraphicArt.position.x,gradientGraphicArt.position.y,gradientGraphicArt.position.z +0.001);
blendLayer.scale.set(0.2,0.2,1);
scene.add(blendLayer);
blendLayer.material.blendEquation = 50


// scene.tl4 = new TimelineMax({ repeat: -1 }).delay(0.3);
// scene.tl4.to(blendLayer.material, 2, {
//   blendEquation: 100,
//   ease: Linear.easeOut,
// });
// scene.tl4.to(blendLayer.material, 1, {
//   blendEquation: 0,

//   ease: Power1.easeInOut,
// });



    // var gradientArt = new THREE.TextureLoader().load("/assets/img/gradient repeat1.webp");
    // const gradientArtMaterial = new THREE.MeshBasicMaterial({ map: gradientArt });
    gradientGraphicArt.material.map.rotation  = (0.45)
    console.log(gradientGraphicArt)
    scene.tl3 = new TimelineMax({ repeat: -1 }).delay(3);
    scene.tl3.to(gradientGraphicArt.material.map.offset, 6, {
      x: 0,
      y: 0,
      z: 0,
      ease: Linear.easeOut,
    });
    scene.tl3.to(gradientGraphicArt.material.map.offset, 1, {
      x: 0,
      y: 1,
      z: 0,
      ease: Power1.easeInOut,
    });
    // "https://api.weatherapi.com/v1/current.json?key=d7df60db6422414b9d1153848200912&q=Edinburgh"
console.log('its gets here')
    Axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=Edinburgh&appid=ab57b33912fbd3d3015d3f296505d3a8"
    ).then((response) => {
      console.log(response.data);

      let icon = response.data.weather[0].icon;
     icon = 'http://openweathermap.org/img/wn/'+ icon+ '@2x.png'
      var weatherIcon = new THREE.TextureLoader().load(icon);

      const weatherGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
      const weatherMaterial = new THREE.MeshLambertMaterial({
        map: weatherIcon,
      });
      weatherMaterial.transparent = true;
      // console.log(paintingMaterial);
      const weather = new THREE.Mesh(weatherGeometry, weatherMaterial);
      weather.scale.set(0.058, 0.058, 1);
      weather.position.set(-0.25, 0.58, 0.06);
      weather.rotation.set(0, 0.45, 0.2);
      scene.add(weather);

      const loaderTemp = new THREE.FontLoader();
      let temp = response.data.main.temp;
 temp = temp -273.15
 temp = Math.round(temp / 10) * 10
 console.log(temp)
 
      loaderTemp.load(
        "./assets/fonts/Bebas Neue_Regular (1).json",
        function (font) {
          const tempTextGeometry = new THREE.TextBufferGeometry(
            temp.toString() + "°C",
            {
              font: font,
              size: 0.024,
              height: 0.01,
            }
          );

          const tempMaterial = new THREE.MeshBasicMaterial({ color: 0xb01717 });
          const tempMesh = new THREE.Mesh(tempTextGeometry, tempMaterial);
          tempMesh.position.set(-0.27, 0.515, 0.088);
          // tempMesh.scale.set(0.09, 0.09, 1);
          console.log(gltf.scene);
          // tempMesh.rotation.set(-35, 1, 1);
          tempMesh.rotation.set(-0.45, 0.45, 0.2);
          //  alarmClockText.rotation.set(100, 100.25, 100.35);

          scene.add(tempMesh);
        }
      );
    });
    scene.add(gltf.scene);

  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var bbox = new THREE.Box3().setFromObject(scene);
let targetReset = bbox.getCenter();

controls.target.set(targetReset.x, targetReset.y, targetReset.z);
// controls.target.set(0.527,0.938,-0.311)
controls.update;
// console.log(controls);
// console.log(scene);
// console.log(scene.children[1]);
// console.log(scene.children[2]);
// console.log(scene.children[3]);
// var screenTexture = new THREE.TextureLoader().load("/assets/img/open.webp");
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
    if (intersects[i].object.name == "painting") {
      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        { x: 0.45, y: 1.2, z: 0.6, ease: Expo.easeOut },
        0
      );
      scene.tl1.to(
        camera.rotation,
        1,
        { x: -0.17, y: 0, z: 0, ease: Expo.easeOut },
        0
      );

      // console.log(controls);
      controls.update();
    }
  }
}

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    if (intersects[0].object != INTERSECTED) {
      if (intersects[0].object.name == "painting") {
        if (INTERSECTED)
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentMaterial);
        INTERSECTED = intersects[0].object;
        console.log(INTERSECTED);
        INTERSECTED.currentMaterial = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex(0xffffff);
        INTERSECTED.material.emissiveIntensity = 0.1;
        INTERSECTED.castShadow = true;
        scene.tl = new TimelineMax().delay(0.1);

        // scene.tl.to([painting.scale,scene.children[4].children[1].scale ], 1, { x: 5, y: 5 , ease: Expo.easeOut });

        // scene.tl.to(painting.scale, 1, { x: 2, ease: Expo.easeOut });
        // scene.tl.to(scene.children[4].children[1].scale, 1, { x: scene.children[4].children[1].scale.x *2, ease: Expo.easeOut },'-1');
        // console.log(scene);
      }
    }
  } else {
    if (INTERSECTED) {
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentMaterial);
      INTERSECTED.material.emissiveIntensity = 0;
      INTERSECTED.castShadow = false;
      scene.tl = new TimelineMax().delay(0.1);
      // scene.tl.to([painting.scale,scene.children[4].children[1].scale ], 1, { x: 1, y: 1 , ease: Elastic.easeOut });

      // scene.tl.to(painting.scale, 1, { x:0.5, ease: Elastic.easeOut });
      // scene.tl.to(scene.children[4].children[1].scale, 1, { x:scene.children[4].children[1].scale.x *0.5, ease: Elastic.easeOut }, '-1') ;
    }

    INTERSECTED = null;
  }
}



// function onMouseOut(event) {
//   event.preventDefault();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);

//   var intersects = raycaster.intersectObjects(scene.children, true);

//   for (var i = 0; i < intersects.length; i++) {
//     if (intersects[i].object.name == "painting") {
//       console.log("Mouse out");

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

// scene.tl = new TimelineMax().delay(1);
// scene.tl.to(scene.scale, 1, { x: 2, ease: Expo.easeOut });
