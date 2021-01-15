import * as THREE from "../vendor/three";
import { TimelineMax } from "../vendor/gsap.min.js";

export function addArt(scene) {
  var palantirPlace = scene.getObjectByName("palantirPlace", true);

  var art = new THREE.TextureLoader().load("./assets/img/Palantiri.webp");
  art.minFilter = THREE.LinearFilter;
  const artMat = new THREE.MeshLambertMaterial({ map: art,     alphaTest: 0.8,
  });
  palantirPlace.material = artMat;
  palantirPlace.scale.set(0.2, 0.2, 0.2);
  // palantirPlace.material.transparent = true;
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
  ////////////////////////////////////////////////
  var gradientGraphicArt = scene.getObjectByName("gradientGraphicArt", true);

  gradientGraphicArt.material.map.rotation = 0.45;

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

  var blendTexture = new THREE.TextureLoader().load(
    "./assets/img/gradient repeat1Blend.webp"
  );
  blendTexture.minFilter = THREE.LinearFilter;

  const blendBufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
  const blendMaterial = new THREE.MeshLambertMaterial({ map: blendTexture,  });
  const blendLayer = new THREE.Mesh(blendBufferGeometry, blendMaterial);
  blendLayer.material.transparent = true;
  blendLayer.material.blending = THREE.MultiplyBlending;
  // // //
  blendLayer.position.set(
    gradientGraphicArt.position.x,
    gradientGraphicArt.position.y,
    gradientGraphicArt.position.z + 0.001
  );
  blendLayer.scale.set(0.2, 0.2, 1);
  blendLayer.castShadow = true;
  blendLayer.receiveShadow = true;
  blendLayer.name = "blendLayer";

  scene.add(blendLayer);
  blendLayer.material.blendEquation = 50;
  ///////////////////////////////////////////////////
  var texture = new THREE.TextureLoader().load("./assets/img/open.webp");
  var texture2 = new THREE.TextureLoader().load("./assets/img/blink.webp");
  texture.minFilter = THREE.LinearFilter;
  texture2.minFilter = THREE.LinearFilter;

  const paintingBufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
  const paintingMaterial = new THREE.MeshLambertMaterial({ map: texture });

  const painting = new THREE.Mesh(paintingBufferGeometry, paintingMaterial);
  const paintingpos = scene.getObjectByName("art_1");
  // paintingpos.visible = false
  const newtempWorldPosition = new THREE.Vector3();
  painting.position.copy(paintingpos.getWorldPosition(newtempWorldPosition));
  painting.position.z = painting.position.z + 0.01;
  painting.scale.set(0.35, 0.53, 1);
  painting.name = "painting";
  painting.material.emissive.setHex(0xffffff);
  painting.material.emissiveIntensity = 0;
  painting.castShadow = true;
  painting.receiveShadow = true;

  scene.add(painting);

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

  /////////////////////////////////////////////////////////////////////////////////////////////
}
