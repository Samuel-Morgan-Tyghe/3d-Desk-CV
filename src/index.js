import * as THREE from "./three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Color } from "three/build/three.module";
import moment from "./moment";
import { gsap, TimelineMax } from "./gsap.min.js";
import Axios from "axios";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper.js";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

let INTERSECTED;
let animationToggle;
let notfirstTimeBoolean = false;
let weatherAppText;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.domElement.style.position = "absolute";
// renderer.domElement.style.zIndex = 0;
renderer.domElement.style.top = 0;

renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMapEnabled = true;
// renderer.shadowMapType = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
var container = document.getElementById("container");
container.appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);

const renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.domElement.style.position = "absolute";
renderer2.domElement.style.top = 0;

var container2 = document.getElementById("container2");
container2.appendChild(renderer2.domElement);
// document.querySelector('#css').appendChild( renderer2.domElement );

const scene = new THREE.Scene();
console.log(scene);
let root = new THREE.Object3D();
scene.add(root);
const cssScene = new THREE.Scene();
cssScene.scale.set(0.0005, 0.0005, 0.0005);

console.log(scene);

// scene.background = new Color(0xf3aab1);
////////////////////////////////
//test
var Element = function (id, objectCopy) {
  const obj = new THREE.Object3D();

  console.log(objectCopy);
  var div = document.createElement("div");
  div.style.width = "300px";
  div.style.height = "190px";
  div.style.backgroundColor = "#000";
  console.log(div);

  var iframe = document.createElement("iframe");
  iframe.style.width = "1080px";
  iframe.style.height = "893px";
  iframe.style.border = "0px";
  iframe.src = "https://samuel-morgan-tyghe.github.io/Basic-Website-To-React";
  // iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
  div.appendChild(iframe);
  console.log(iframe);

  var css3dObject = new CSS3DObject(div);
  css3dObject.position.set(-90, 700, -70);
  css3dObject.rotation.copy(objectCopy.rotation);
  css3dObject.rotateY(THREE.Math.degToRad(180));
  css3dObject.scale.set(0.1,0.1,0.1)

  obj.css3dObject = css3dObject;
  obj.add(css3dObject);
  // css3dObject.scale.set(0.001,0.001,1);
  var material = new THREE.MeshPhongMaterial({
    opacity: 1,
    color: new THREE.Color(0x111111),
    blending: THREE.NoBlending,
    side: THREE.DoubleSide,
  });
  var geometry = new THREE.BoxGeometry(0.19, 0.3, 0.1);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
};

////////////////////////////////
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
const loader = new GLTFLoader();

/////////////////////////

const Alight = new THREE.AmbientLight(0xffffff, 0.3);

scene.add(Alight);
root.add(Alight);

// let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
// scene.add(hemiLight);
const sphere = new THREE.SphereBufferGeometry(0.05, 5, 5);

let light1 = new THREE.PointLight(0xff6ad5, 0.3);
light1.position.set(5, 300, 500);
let light2 = new THREE.PointLight(0x01cdfe, 0.3);
light2.position.set(500, 100, 0);
let light3 = new THREE.PointLight(0xc774e8, 0.3);
light3.position.set(0, 100, -500);
let light4 = new THREE.PointLight(0x09026b, 0.6);
light4.position.set(-500, 300, 0);
// console.log(light1);
// light1.castShadow = true;
// light2.castShadow = true;
// light3.castShadow = true;
// light4.castShadow = true;

// light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff6ad5 } ) ) );
// light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x01cdfe } ) ) );
// light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xc774e8 } ) ) );
// light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x09026b } ) ) );

// scene.add(light1);
// scene.add(light2);
// scene.add(light3);
// scene.add(light4);

// const amLight = new THREE.AmbientLight( 0x404040, 0.33 ); // soft white light
// scene.add( amLight );

const light = new THREE.PointLight(0xff6ad5, 0.3, 100);
light.position.set(-1.5, 1.5, 1.5);
light.castShadow = true;
light.shadow.radius = 20;
// light.shadow.mapSize.width = 1080;
// light.shadow.mapSize.height = 893;

light.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff6ad5 }))
);

scene.add(light);

light2 = new THREE.PointLight(0x01cdfe, 0.3, 100);
light2.position.set(1.5, 1.5, 1.5);
light2.castShadow = true;
light2.shadow.radius = 20;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;

light2.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x01cdfe }))
);

scene.add(light2);

const paintingSpotLight = new THREE.SpotLight(0xffffff, 3, 0, 0.2, 0.4);

paintingSpotLight.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
);
paintingSpotLight.castShadow = true;
scene.add(paintingSpotLight);

const palantirSpotLight = new THREE.SpotLight(0xffffff, 1, 0, 0.15, 0.9);
palantirSpotLight.castShadow = true;

palantirSpotLight.add(
  new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
);
palantirSpotLight.castShadow = true;
scene.add(palantirSpotLight);

const monitorLight1 = new THREE.RectAreaLight(0xffffff, 5, 0.29, 0.19);
const monitorLight2 = new THREE.RectAreaLight(0xffffff, 5, 0.29, 0.19);

scene.add(monitorLight1);
const monitorLightHelper1 = new RectAreaLightHelper(monitorLight1);

monitorLight1.add(monitorLightHelper1);

scene.add(monitorLight2);
const monitorLightHelper2 = new RectAreaLightHelper(monitorLight2);

monitorLight2.add(monitorLightHelper2);

//corner light

const rectlight = new THREE.RectAreaLight("#634217", 100, 0.01, 1);

rectlight.position.set(1.2, 0.5, -0.01);
// rectlight.rotateY(THREE.Math.degToRad(180));
rectlight.name = "rectlight";
scene.add(rectlight);
const rectlightHelper = new RectAreaLightHelper(rectlight);

rectlight.add(rectlightHelper);
console.log(rectlight);

//Flicker corner Light
// let colorCycle = new TimelineMax({ repeat: -1 });

// colorCycle.to(rectlight.color, 3, {
//   r: 0.9,
//   g: 0.6,
//   b: 0.2,
//   ease: Linear.easeInOut,
// });
// colorCycle.to(rectlight.color, 3, {
//   r: 0.8,
//   g: 0.6,
//   b: 0.1,
//   ease: Linear.easeInOut,
// });
// colorCycle.to(rectlight.color, 3, {
//   r: 0.9,
//   g: 0.6,
//   b: 0.2,
//   ease: Linear.easeInOut,
// });

// let lightFlicker = new TimelineMax({ repeat: -1 });

// lightFlicker.from(rectlight, 0.1, {
//   intensity: 90,
// });
// lightFlicker.to(rectlight, 0.1, {
//   intensity: 99,
// });

// function randomNumber() {
//   return Math.floor(Math.random() * 30 + 1) + 70;
// }

const cylinderGeometryShadowGeometry = new THREE.CylinderGeometry(
  0.02,
  0.02,
  1,
  8
);
const cylinderGeometryShadowMaterial = new THREE.MeshStandardMaterial({
  color: "black",
});
const cylinderShadow = new THREE.Mesh(
  cylinderGeometryShadowGeometry,
  cylinderGeometryShadowMaterial
);
cylinderShadow.position.set(1.2, 0.5, 0.01);
cylinderShadow.castShadow = true;
cylinderShadow.receiveShadow = true;
scene.add(cylinderShadow);

////////////////////////////////////////////////////////
// add Model
loader.load(
  "./assets/models/scene.glb",
  function (gltf) {
    console.log(gltf);
    /////
    // loop and add shadows
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    /////
    function computerLightBlink() {
      let pLightEmmissive = gltf.scene.getObjectByName("powerLight");
      pLightEmmissive.visible = !pLightEmmissive.visible;
    }
    computerLightBlink();
    setInterval(computerLightBlink, 1 * 1000);

    var desk = gltf.scene.getObjectByName("desk", true);
    desk.children[0].material.roughness = 0;
    var whiteboard = gltf.scene.getObjectByName("whiteboard", true);
    whiteboard.children[1].material.roughness = 1;
    var rug = gltf.scene.getObjectByName("rug", true);
    rug.material.roughness = 0;
    var monitor_screen = gltf.scene.getObjectByName("monitor_screen1", true);
    monitor_screen.visible = false;

    monitorLight1.position.copy(monitor_screen.getWorldPosition());
    monitorLight1.quaternion.copy(monitor_screen.getWorldQuaternion());
    monitorLight1.rotateX(THREE.Math.degToRad(90));

    
    // var group = new THREE.Group();
    // group.add(new Element("SJOz3qjfQXU", monitorLight1));

    

    const iframeObj = new Element("SJOz3qjfQXU", monitorLight1);
    iframeObj.scale.set(0.001, 0.001, 0.001);
    root.add(iframeObj);
    console.log(cssScene);
    console.log("cssScene^");

    var monitor_screen2 = gltf.scene.getObjectByName("monitor_screen2", true);
    monitor_screen2.visible = false;

    monitorLight2.position.copy(monitor_screen2.getWorldPosition());
    monitorLight2.quaternion.copy(monitor_screen2.getWorldQuaternion());
    monitorLight2.rotateX(THREE.Math.degToRad(90));

    var floor = gltf.scene.getObjectByName("floor", true);
    // floor.material.wireframe =true
    //make wireframe more detailed and wavey
    ////////////////////////////////////////////////////
    // dotted outline of desk
    // const geometry = desk.children[0].geometry;
    // const edges = new THREE.EdgesGeometry(geometry);
    // const lineMat = new THREE.LineDashedMaterial({
    //   color: 0xffaa00,
    //   dashSize: 0.005,
    //   gapSize: 0.003,
    //   scale: 2,
    // });

    // // console.log(lineMat);
    // const line = new THREE.LineSegments(edges, lineMat);

    // line.scale.x = desk.scale.x + 0.1;
    // line.scale.y = desk.scale.y + 0.1;
    // line.scale.z = desk.scale.z + 0.1;
    // line.position.x = desk.position.x;
    // line.position.y = desk.position.y;
    // line.position.z = desk.position.z;
    // line.computeLineDistances();
    // scene.add(line);

    // console.log(line);
    //////////////
    //  desk outline as a wire mesh
    // var wireDeskMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xf8792d,
    //   transparent: true,
    //   wireframe: true,
    //   wireframeLinejoin: "bevel",
    //   wireframeLinewidth: 5,
    //   emissive: 0xf8792d,
    //   emissiveIntensity: 10,
    // });
    // const deskWire = new THREE.Mesh(geometry, wireDeskMaterial);
    // deskWire.scale.x = desk.scale.x + 0.01;
    // deskWire.scale.y = desk.scale.y + 0.01;
    // deskWire.scale.z = desk.scale.z + 0.01;
    // deskWire.position.x = desk.position.x;
    // deskWire.position.y = desk.position.y;
    // deskWire.position.z = desk.position.z;
    // // console.log(deskWire);
    // scene.add(deskWire);

    ///////////////////////////////////////////////////

    var palantirPlace = gltf.scene.getObjectByName("palantirPlace", true);

    palantirSpotLight.position.set(
      palantirPlace.position.x,
      palantirPlace.position.y + 1,
      palantirPlace.position.z + 0.7
    );
    palantirSpotLight.target = palantirPlace;

    var art = new THREE.TextureLoader().load("./assets/img/Palantiri.webp");
    const artMat = new THREE.MeshLambertMaterial({ map: art });
    // console.log(palantirPlace);
    palantirPlace.material = artMat;
    palantirPlace.scale.set(0.2, 0.2, 0.2);
    // console.log(palantirPlace);
    palantirPlace.material.transparent = true;
    // palantirPlace.rotation.set(1.57, 2.11, -3.14);

    scene.tl2 = new TimelineMax({ repeat: -1 }).delay(0.1);
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
    // console.log(gradientGraphicArt);

    var blendTexture = new THREE.TextureLoader().load(
      "./assets/img/gradient repeat1Blend.webp"
    );
    const blendGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
    const blendMaterial = new THREE.MeshLambertMaterial({ map: blendTexture });
    const blendLayer = new THREE.Mesh(blendGeometry, blendMaterial);
    blendLayer.material.transparent = true;
    blendLayer.material.blending = THREE.MultiplyBlending;
    // console.log(THREE);
    blendLayer.position.set(
      gradientGraphicArt.position.x,
      gradientGraphicArt.position.y,
      gradientGraphicArt.position.z + 0.001
    );
    blendLayer.scale.set(0.2, 0.2, 1);
    blendLayer.castShadow = true;
    blendLayer.receiveShadow = true;

    scene.add(blendLayer);
    blendLayer.material.blendEquation = 50;

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
    gradientGraphicArt.material.map.rotation = 0.45;
    // console.log(gradientGraphicArt);
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
    // console.log("its gets here");
    Axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=Edinburgh&appid=ab57b33912fbd3d3015d3f296505d3a8"
    ).then((response) => {
      // console.log(response.data);

      let icon = response.data.weather[0].icon;
      icon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      var weatherIcon = new THREE.TextureLoader().load(icon);

      const weatherGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
      const weatherMaterial = new THREE.MeshLambertMaterial({
        map: weatherIcon,
      });
      weatherMaterial.transparent = true;
      const weather = new THREE.Mesh(weatherGeometry, weatherMaterial);
      weather.scale.set(0.058, 0.058, 1);
      weather.position.set(-0.25, 0.58, 0.06);
      weather.rotation.set(0, 0.45, 0.2);
      weather.name = "weather";
      scene.add(weather);

      const loaderTemp = new THREE.FontLoader();
      let temp = response.data.main.temp;
      temp = temp - 273.15;
      temp = Math.round(temp / 10) * 10;

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
          // console.log(gltf.scene);
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
///////////////////////////////////////////////////
const weatherAppTextLoader = new THREE.FontLoader();
weatherAppTextLoader.load(
  "./assets/fonts/Bebas Neue_Regular (1).json",
  function (font) {
    const weatherAppTextGeometry = new THREE.TextBufferGeometry("Weather App", {
      font: font,
      size: 0.24,
      height: 0.001,
    });

    const weatherAppTextMaterial = new THREE.MeshBasicMaterial({
      color: "white",
    });
    weatherAppText = new THREE.Mesh(
      weatherAppTextGeometry,
      weatherAppTextMaterial
    );
    weatherAppText.scale.set(0.1, 0.1, 1);
    weatherAppText.position.set(-0.33, 0.61, 0.07);
    weatherAppText.rotation.set(0, 0.45, 0);
    weatherAppText.name = "Weather App";
    weatherAppText.visible = false;
    scene.add(weatherAppText);
  }
);

const artistTextLoader = new THREE.FontLoader();
artistTextLoader.load("./assets/fonts/Alata_Regular.json", function (font) {
  const artistTextGeometry = new THREE.TextBufferGeometry("FINE ARTIST", {
    font: font,
    size: 0.5,
    height: 0.001,
  });

  const artistTextMaterial = new THREE.MeshBasicMaterial({ color: "white" });
  let artistText = new THREE.Mesh(artistTextGeometry, artistTextMaterial);

  artistText.scale.set(0.1, 0.1, 1);
  artistText.position.set(0.9, 1, -0.25);
  // artistText.rotation.set(0, 0.45, 0);
  artistText.name = "Fine Artist";
  // artistText.visible = false
  scene.add(artistText);
});

const creativeTextLoader = new THREE.FontLoader();
creativeTextLoader.load("./assets/fonts/Alata_Regular.json", function (font) {
  const creativeTextGeometry = new THREE.TextBufferGeometry("CREATIVE", {
    font: font,
    size: 0.4,
    height: 0.001,
  });

  const creativeTextMaterial = new THREE.MeshBasicMaterial({ color: "white" });
  let creativeText = new THREE.Mesh(creativeTextGeometry, creativeTextMaterial);

  creativeText.scale.set(0.1, 0.1, 1);
  creativeText.position.set(1.0, 0.9, -0.25);
  // creativeText.rotation.set(0, 0.45, 0);
  creativeText.name = "CREATIVE";
  // creativeText.visible = false
  scene.add(creativeText);
});

const inventiveTextLoader = new THREE.FontLoader();
inventiveTextLoader.load("./assets/fonts/Alata_Regular.json", function (font) {
  const inventiveTextGeometry = new THREE.TextBufferGeometry("INVENTIVE", {
    font: font,
    size: 0.3,
    height: 0.001,
  });

  const inventiveTextMaterial = new THREE.MeshBasicMaterial({ color: "white" });
  let inventiveText = new THREE.Mesh(
    inventiveTextGeometry,
    inventiveTextMaterial
  );

  inventiveText.scale.set(0.1, 0.1, 1);
  inventiveText.position.set(0.95, 0.825, -0.25);
  // inventiveText.rotation.set(0, 0.45, 0);
  inventiveText.name = "INVENTIVE";
  // inventiveText.visible = false
  scene.add(inventiveText);
});

const adaptiveTextLoader = new THREE.FontLoader();
adaptiveTextLoader.load("./assets/fonts/Alata_Regular.json", function (font) {
  const adaptiveTextGeometry = new THREE.TextBufferGeometry("ADAPTIVE", {
    font: font,
    size: 0.2,
    height: 0.001,
  });

  const adaptiveTextMaterial = new THREE.MeshBasicMaterial({ color: "white" });
  let adaptiveText = new THREE.Mesh(adaptiveTextGeometry, adaptiveTextMaterial);

  adaptiveText.scale.set(0.1, 0.1, 1);
  adaptiveText.position.set(1.1, 0.775, -0.25);
  // adaptiveText.rotation.set(0, 0.45, 0);
  adaptiveText.name = "adaptive";
  // adaptiveText.visible = false
  scene.add(adaptiveText);
});
//////////////////////////////////////////

var texture = new THREE.TextureLoader().load("./assets/img/open.webp");
var texture2 = new THREE.TextureLoader().load("./assets/img/blink.webp");
const paintingGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
const paintingMaterial = new THREE.MeshLambertMaterial({ map: texture });

const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.set(0.633, 0.938, -0.33);

paintingSpotLight.position.set(
  painting.position.x,
  painting.position.y + 1,
  painting.position.z + 0.7
);
paintingSpotLight.target = painting;

painting.scale.set(0.35, 0.53, 1);
painting.name = "painting";
painting.material.emissive.setHex(0xffffff);
painting.material.emissiveIntensity = 0;
painting.castShadow = true;
painting.receiveShadow = true;

scene.add(painting);

// painting.addEventListener("mouseenter", function (event) {

//   material.map = texture2;
//   texture.dispose()

// });

//
////////////////////////////////////////////////////////

const loader2 = new THREE.FontLoader();

function fn60sec() {
  // runs every 60 sec and runs on init.

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
    alarmClockText.name = "alarmClockText";
    scene.add(alarmClockText);
  });

  if (notfirstTimeBoolean) {
    let alarmClockTexttemp = scene.getObjectByName("alarmClockText", true);
    alarmClockTexttemp.geometry.dispose();
    alarmClockTexttemp.material.dispose();
    scene.remove(alarmClockTexttemp);
  }
  notfirstTimeBoolean = true;
}
fn60sec();
setInterval(fn60sec, 60 * 1000);

var bbox = new THREE.Box3().setFromObject(scene);
let targetReset = bbox.getCenter();
controls.target.set(targetReset.x, targetReset.y, targetReset.z);
controls.update;

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
      // console.log(scene);
      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("painting", true)
      );

      let targetReset = bbox.getCenter();

      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: 0.6,
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
    // console.log(intersects);
    if (intersects[i].object.parent.name == "monitor") {
      // console.log(scene);
      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("monitor", true)
      );
      let targetReset = bbox.getCenter();
      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x: 0.1,
          y: targetReset.y,
          z: 0.3,
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
      // console.log(scene);
      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("monitor_1", true)
      );
      let targetReset = bbox.getCenter();
      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x: -0.1,
          y: targetReset.y,
          z: 0.3,
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
      // console.log(scene);
      var bbox = new THREE.Box3().setFromObject(
        scene.getObjectByName("whiteboard", true)
      );
      let targetReset = bbox.getCenter();
      scene.tl1 = new TimelineMax().delay(0.1);
      scene.tl1.to(
        camera.position,
        1,
        {
          x: targetReset.x,
          y: targetReset.y,
          z: 0.6,
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
          // console.log(animationToggle);
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

window.addEventListener("click", onMouseClick);
window.addEventListener("mousemove", onMouseMove);
// window.addEventListener("mouseout", onMouseOut);
controls.update();

const animate = function () {
  renderer.render(scene, camera);
  renderer2.render(scene, camera);

  // renderer2.render(cssScene, camera);
  requestAnimationFrame(animate);
};

animate();
