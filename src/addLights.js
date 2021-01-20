import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export function addLights(scene) {
  const sphere = new THREE.SphereBufferGeometry(0.05, 5, 5);

  const amLight = new THREE.AmbientLight('#6a0d83', 0.3); // soft white light#
////////////////////////////////////////////////////////////////////////////////////////////////

  const plane = scene.getObjectByName("wall");
  // plane.material.side = THREE.DoubleSide;

  var windowref = scene.getObjectByName("windowLight", true);
  var bbox = new THREE.Box3().setFromObject(windowref);
  const window = new THREE.RectAreaLight(
    "#e47025",
    10,
    bbox.max.y - bbox.min.y,
    bbox.max.z - bbox.min.z
  );

  console.log(window);
  const whelper = new RectAreaLightHelper(window);

  windowref.visible = false;
  const newtempWorldPosition3 = new THREE.Vector3();
  const newtempWorldQ3 = new THREE.Quaternion();

  window.position.copy(windowref.getWorldPosition(newtempWorldPosition3));
  whelper.position.copy(windowref.getWorldPosition(newtempWorldPosition3));
  window.quaternion.copy(windowref.getWorldQuaternion(newtempWorldQ3));
  whelper.quaternion.copy(windowref.getWorldQuaternion(newtempWorldQ3));
  window.rotateX(THREE.Math.degToRad(90));
  whelper.rotateX(THREE.Math.degToRad(90));
  window.name = "window";
  whelper.name = "windowhelper";
////////////////////////////////////////////////////////////////////////////////////////////////
  // const gradientArtSpotLight = new THREE.SpotLight(0xffffff, 1, 0, 0.2, 0.4);

  // const gradientArt = scene.getObjectByName("gradientGraphicArt");
  // gradientArtSpotLight.castShadow = true;
  // gradientArtSpotLight.position.set(
  //   gradientArt.position.x,
  //   gradientArt.position.y + 1,
  //   gradientArt.position.z + 0.7
  // );
  // gradientArtSpotLight.target = gradientArt;
////////////////////////////////////////////////////////////////////////////////////////////////
  // const artGroupSpotLight = new THREE.SpotLight(0xffffff, 0.5, 0, 0.35, 0.4);

  // const artGroup = scene.getObjectByName("ArtCenter");
  // artGroup.visible = false;

  // artGroupSpotLight.castShadow = true;
  // artGroupSpotLight.position.set(
  //   artGroup.position.x - 0.1,
  //   artGroup.position.y + 0.7,
  //   artGroup.position.z + 1
  // );
  // artGroupSpotLight.target = artGroup;

  // const spotLightHelper = new THREE.SpotLightHelper(artGroupSpotLight);
////////////////////////////////////////////////////////////////////////////////////////////////
  // const deskSpotLight = new THREE.SpotLight(0xffffff, 3, 0, 0.2, 0.4);

  // const desk = scene.getObjectByName("desk");
  // deskSpotLight.castShadow = true;
  // deskSpotLight.position.set(
  //   desk.position.x,
  //   desk.position.y + 1,
  //   desk.position.z + 0.7
  // );
  // deskSpotLight.target = desk;
////////////////////////////////////////////////////////////////////////////////////////////////
  // const whiteboardSpotLight = new THREE.SpotLight(0xffffff, 3, 0, 0.2, 0.4);

  // const whiteboard = scene.getObjectByName("whiteboard");
  // whiteboardSpotLight.castShadow = true;
  // whiteboardSpotLight.position.set(
  //   whiteboard.position.x,
  //   whiteboard.position.y + 1,
  //   whiteboard.position.z + 0.7
  // );
  // whiteboardSpotLight.target = whiteboard;
////////////////////////////////////////////////////////////////////////////////////////////////
  // const paintingSpotLight = new THREE.SpotLight(0xffffff, 0.5, 0, 0.35, 0.4);

  // const painting = scene.getObjectByName("painting");
  // console.log(scene);
  // console.log(painting);

  // paintingSpotLight.castShadow = true;
  // paintingSpotLight.position.set(
  //   painting.position.x,
  //   painting.position.y + 1,
  //   painting.position.z + 0.05
  // );
  // paintingSpotLight.target = painting;
////////////////////////////////////////////////////////////////////////////////////////////////
  // const palantirSpotLight = new THREE.SpotLight(0xffffff, 1, 0, 0.15, 0.9);
  // palantirSpotLight.castShadow = true;

  // // palantirSpotLight.add(
  // //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
  // // );
  // palantirSpotLight.castShadow = true;

  // var palantirPlace = scene.getObjectByName("palantirPlace", true);

  // palantirSpotLight.position.set(
  //   palantirPlace.position.x,
  //   palantirPlace.position.y + 1,
  //   palantirPlace.position.z + 0.7
  // );
  // palantirSpotLight.target = palantirPlace;
////////////////////////////////////////////////////////////////////////////////////////////////
  const monitorLight1 = new THREE.RectAreaLight(0xffffff, 3, 0.29, 0.19);

  var monitor_screen = scene.getObjectByName("monitor_screen1", true);

  monitor_screen.visible = false;
  const newtempWorldPosition = new THREE.Vector3();
  const newtempWorldQ = new THREE.Quaternion();

  monitorLight1.position.copy(
    monitor_screen.getWorldPosition(newtempWorldPosition)
  );
  monitorLight1.quaternion.copy(
    monitor_screen.getWorldQuaternion(newtempWorldQ)
  );
  monitorLight1.rotateX(THREE.Math.degToRad(90));
  monitorLight1.name = "monitorLight1";
////////////////////////////////////////////////////////////////////////////////////////////////
  const monitorLight2 = new THREE.RectAreaLight(0xffffff, 3, 0.29, 0.19);
  var monitor_screen2 = scene.getObjectByName("monitor_screen2", true);
  monitor_screen2.visible = false;

  const newtempWorldPosition2 = new THREE.Vector3();
  const newtempWorldQ2 = new THREE.Quaternion();

  monitorLight2.position.copy(
    monitor_screen2.getWorldPosition(newtempWorldPosition2)
  );
  monitorLight2.quaternion.copy(
    monitor_screen2.getWorldQuaternion(newtempWorldQ2)
  );
  monitorLight2.rotateX(THREE.Math.degToRad(90));

  const monitorLightHelper1 = new RectAreaLightHelper(monitorLight1);

  monitorLight1.add(monitorLightHelper1);

  const monitorLightHelper2 = new RectAreaLightHelper(monitorLight2);

  monitorLight2.add(monitorLightHelper2);
////////////////////////////////////////////////////////////////////////////////////////////////
const directionalLight = new THREE.DirectionalLight("#e47025", 2);
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
  //  windowref.visible= false
  directionalLight.castShadow = true;
  directionalLight.position.copy(
    windowref.getWorldPosition(newtempWorldPosition3)
  );
  directionalLight.quaternion.copy(
    windowref.getWorldQuaternion(newtempWorldQ3)
  );
  // directionalLight.rotateX(THREE.Math.degToRad(180));
  directionalLight.translateY(-0.5);
  directionalLight.translateZ(0.5);
  console.log(directionalLight);
  // // dlHelper.translateX(5)
  directionalLight.target = windowref;
  // scene.add(dlHelper);
  scene.add(directionalLight);

  //   //Create a SpotLight and turn on shadows for the light
  //   const windowSpotlight = new THREE.SpotLight("#e47025");
  //   windowSpotlight.angle = 2;
  //   windowSpotlight.castShadow = true;
  //   windowSpotlight.shadow.mapSize.width = 512;
  //   windowSpotlight.shadow.mapSize.height = 512;
  //   windowSpotlight.shadow.camera.near = 0.5;
  //   windowSpotlight.shadow.camera.far = 5
  //   // windowSpotlight.shadow.camera.position=windowSpotlight.position
  // windowSpotlight.target = windowref

  //   // const wSLShelper = new THREE.CameraHelper( windowSpotlight.shadow.camera );
  //   // windowSpotlight.target = scene.getObjectByName('monitor')
  //   windowSpotlight.castShadow = true;
  //   // windowSpotlight.shadow = new THREE.SpotLightShadow(new THREE.PerspectiveCamera(20, 1, 1, 250));

  //   windowSpotlight.position.copy(
  //     windowref.getWorldPosition(newtempWorldPosition3)
  //   );
  //   windowSpotlight.translateX(0.5)

  //   // wSLShelper.position.copy(
  //   //   windowref.getWorldPosition(newtempWorldPosition3)
  //   // );
  //   // wSLShelper.translateX(-0.1)

  //   // scene.add(windowSpotlight);
  //   const wslhelper = new THREE.CameraHelper(windowSpotlight.shadow.camera);
  // scene.add(wslhelper);

  // console.log(windowSpotlight)

  // const windowSpotlightHelper = new THREE.SpotLightHelper(windowSpotlight);

  // scene.add(windowSpotlightHelper);
  // scene.add( wSLShelper );
  scene.add(amLight);

  // scene.add(light);
  // scene.add(light2);
  // scene.add(sun)

  scene.add(whelper);
  scene.add(window);

  scene.add(monitorLight1);
  scene.add(monitorLight2);

  // scene.add(palantirSpotLight);
  // scene.add(whiteboardSpotLight)
  // scene.add(deskSpotLight)
  // scene.add(artGroupSpotLight)
  // scene.add(gradientArtSpotLight)
  // scene.add(paintingSpotLight);
  // scene.add( spotLightHelper );

  // scene.add(rectlight);
  // scene.add(cylinderShadow);
}
