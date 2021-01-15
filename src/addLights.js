import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export function addLights(scene) {
  const sphere = new THREE.SphereBufferGeometry(0.05, 5, 5);

  // let light1 = new THREE.PointLight(0xff6ad5, 0.3);
  // light1.position.set(5, 300, 500);
  // let light2 = new THREE.PointLight(0x01cdfe, 0.3);
  // light2.position.set(500, 100, 0);
  // let light3 = new THREE.PointLight(0xc774e8, 0.3);
  // light3.position.set(0, 100, -500);
  // let light4 = new THREE.PointLight(0x09026b, 0.6);
  // light4.position.set(-500, 300, 0);
  // // // //
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

  const amLight = new THREE.AmbientLight( 0x404040, 1 ); // soft white light#


  const sun = new THREE.DirectionalLight( 0xffffff, 1 );
  sun.position.set(5,1,1)
  const helper = new THREE.DirectionalLightHelper( sun, 5 );

const plane = scene.getObjectByName('wall')
  // plane.material.side = THREE.DoubleSide;





  var windowref = scene.getObjectByName("windowLight", true);
  var bbox = new THREE.Box3().setFromObject(windowref);
  console.log(bbox)
  const window = new THREE.RectAreaLight('#e47025', 5, bbox.max.y - bbox.min.y, bbox.max.z - bbox.min.z);
  const whelper = new RectAreaLightHelper( window );


  windowref.visible = false;
  const newtempWorldPosition3 = new THREE.Vector3()
  const newtempWorldQ3 = new THREE.Quaternion()

  window.position.copy(windowref.getWorldPosition(newtempWorldPosition3));
  whelper.position.copy(windowref.getWorldPosition(newtempWorldPosition3));
  window.quaternion.copy(windowref.getWorldQuaternion(newtempWorldQ3));
  whelper.quaternion.copy(windowref.getWorldQuaternion(newtempWorldQ3));
  window.rotateX(THREE.Math.degToRad(90));
  whelper.rotateX(THREE.Math.degToRad(90));
  window.name = 'window'












  const light = new THREE.PointLight(0xff6ad5, 0.3, 100);
  light.position.set(-1.5, 1.5, 1.5);
  light.castShadow = true;
  light.shadow.radius = 20;
  // light.shadow.mapSize.width = 1080;
  // light.shadow.mapSize.height = 893;

  // light.add(
  //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff6ad5 }))
  // );


  const light2 = new THREE.PointLight(0x01cdfe, 0.3, 100);
  light2.position.set(1.5, 1.5, 1.5);
  light2.castShadow = true;
  light2.shadow.radius = 20;
  light2.shadow.mapSize.width = 4096;
  light2.shadow.mapSize.height = 4096;

  // light2.add(
  //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x01cdfe }))
  // );

  const gradientArtSpotLight = new THREE.SpotLight(0xffffff, 1, 0, 0.2, 0.4);


  const gradientArt = scene.getObjectByName('gradientGraphicArt')
  gradientArtSpotLight.castShadow = true;
  gradientArtSpotLight.position.set(
    gradientArt.position.x,
    gradientArt.position.y + 1,
    gradientArt.position.z + 0.7
  );
  gradientArtSpotLight.target = gradientArt; 
  
  const artGroupSpotLight = new THREE.SpotLight(0xffffff, 0.5, 0, 0.35, 0.4);


const artGroup = scene.getObjectByName('ArtCenter')
artGroup.visible = false

  artGroupSpotLight.castShadow = true;
  artGroupSpotLight.position.set(
    artGroup.position.x -0.1,
    artGroup.position.y + 0.7,
    artGroup.position.z + 1
  );
  artGroupSpotLight.target = artGroup

  const spotLightHelper = new THREE.SpotLightHelper( artGroupSpotLight );


  const deskSpotLight = new THREE.SpotLight(0xffffff, 3, 0, 0.2, 0.4);


  const desk = scene.getObjectByName('desk')
  deskSpotLight.castShadow = true;
  deskSpotLight.position.set(
    desk.position.x,
    desk.position.y + 1,
    desk.position.z + 0.7
  );
  deskSpotLight.target = desk;
  
  
  const whiteboardSpotLight = new THREE.SpotLight(0xffffff, 3, 0, 0.2, 0.4);


  const whiteboard = scene.getObjectByName('whiteboard')
  whiteboardSpotLight.castShadow = true;
  whiteboardSpotLight.position.set(
    whiteboard.position.x,
    whiteboard.position.y + 1,
    whiteboard.position.z + 0.7
  );
  whiteboardSpotLight.target = whiteboard;


  const paintingSpotLight = new THREE.SpotLight(0xffffff, 0.5, 0, 0.35, 0.4);


  const painting = scene.getObjectByName('art_1')
  paintingSpotLight.castShadow = true;
  paintingSpotLight.position.set(
    painting.position.x,
    painting.position.y + 1,
    painting.position.z + 0.05
  );
  paintingSpotLight.target = painting;

  const palantirSpotLight = new THREE.SpotLight(0xffffff, 1, 0, 0.15, 0.9);
  palantirSpotLight.castShadow = true;

  // palantirSpotLight.add(
  //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
  // );
  palantirSpotLight.castShadow = true;

  var palantirPlace = scene.getObjectByName("palantirPlace", true);

  palantirSpotLight.position.set(
    palantirPlace.position.x,
    palantirPlace.position.y + 1,
    palantirPlace.position.z + 0.7
  );
  palantirSpotLight.target = palantirPlace;



  const monitorLight1 = new THREE.RectAreaLight(0xffffff, 5, 0.29, 0.19);

  var monitor_screen = scene.getObjectByName("monitor_screen1", true);

  monitor_screen.visible = false;
  const newtempWorldPosition = new THREE.Vector3()
  const newtempWorldQ = new THREE.Quaternion()

  monitorLight1.position.copy(monitor_screen.getWorldPosition(newtempWorldPosition));
  monitorLight1.quaternion.copy(monitor_screen.getWorldQuaternion(newtempWorldQ));
  monitorLight1.rotateX(THREE.Math.degToRad(90));
  monitorLight1.name = 'monitorLight1'

  const monitorLight2 = new THREE.RectAreaLight(0xffffff, 5, 0.29, 0.19);
  var monitor_screen2 = scene.getObjectByName("monitor_screen2", true);
  monitor_screen2.visible = false;


  const newtempWorldPosition2 = new THREE.Vector3()
  const newtempWorldQ2 = new THREE.Quaternion()

  monitorLight2.position.copy(monitor_screen2.getWorldPosition(newtempWorldPosition2));
  monitorLight2.quaternion.copy(monitor_screen2.getWorldQuaternion(newtempWorldQ2));
  monitorLight2.rotateX(THREE.Math.degToRad(90));

  const monitorLightHelper1 = new RectAreaLightHelper(monitorLight1);

  monitorLight1.add(monitorLightHelper1);

  const monitorLightHelper2 = new RectAreaLightHelper(monitorLight2);

  monitorLight2.add(monitorLightHelper2);

  //corner light

  const rectlight = new THREE.RectAreaLight("#634217", 100, 0.01, 1);

  rectlight.position.set(1.2, 0.5, -0.01);
  // rectlight.rotateY(THREE.Math.degToRad(180));
  rectlight.name = "rectlight";
  const rectlightHelper = new RectAreaLightHelper(rectlight);

  rectlight.add(rectlightHelper);
  // //

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

  // scene.add( amLight );

  scene.add(light);
  scene.add(light2);
  scene.add(sun)
  scene.add(whelper)
  scene.add(window)

  
  scene.add(monitorLight1);
  scene.add(monitorLight2);

  // scene.add(palantirSpotLight);
  // scene.add(whiteboardSpotLight)
  // scene.add(deskSpotLight)
  scene.add(artGroupSpotLight)
  // scene.add(gradientArtSpotLight)
  scene.add(paintingSpotLight);
  // scene.add( spotLightHelper );


  // scene.add(rectlight);
  // scene.add(cylinderShadow);
}
