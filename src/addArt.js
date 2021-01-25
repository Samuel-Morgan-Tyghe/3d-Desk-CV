import * as THREE from "../vendor/three";
import { TimelineMax } from "../vendor/gsap.min.js";
import { BasisTextureLoader } from "three/examples/jsm/loaders/BasisTextureLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function addArt(scene, renderer) {
  var manager = new THREE.LoadingManager();
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onLoad = function () {
    console.log("Loading complete!");
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  var palantirPlace = scene.getObjectByName("palantirPlace", true);

  // var art = new THREE.TextureLoader().load("./assets/img/Palantiri.webp");
  // texture.minFilter = THREE.LinearFilter;
  // const artMat = new THREE.MeshBasicMaterial({ map: art, alphaTest: 0.9 });
  let artMat;

  const basisLoader = new BasisTextureLoader(manager);
  basisLoader.setTranscoderPath("../vendor/basis/");
  basisLoader.detectSupport(renderer);
  basisLoader.load("./assets/img/basis/Palantiri.basis", function (texture) {
    artMat = new THREE.MeshBasicMaterial({
      map: texture,
      alphaTest: 0.9,
    });

    palantirPlace.material = artMat;
    palantirPlace.scale.set(0.2, 0.2, 0.2);
    // palantirPlace.material.transparent = true;
    // palantirPlace.rotation.set(1.57, 2.11, -3.14);
  });
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
  // gradientGraphicArt.material.map.rotation = 0.45;
  gradientGraphicArt.material.emissiveMap.rotation = 0.45;

  scene.tl3 = new TimelineMax({ repeat: -1 }).delay(3);
  scene.tl3.to(gradientGraphicArt.material.emissiveMap.offset, 6, {
    x: 0,
    y: 0,
    z: 0,
    ease: Linear.easeOut,
  });
  scene.tl3.to(gradientGraphicArt.material.emissiveMap.offset, 1, {
    x: 0,
    y: 1,
    z: 0,
    ease: Power1.easeInOut,
  });

  // var blendTexture = new THREE.TextureLoader().load(
  //   "./assets/img/gradient repeat1Blend.webp"
  // );
  // texture.minFilter = THREE.LinearFilter;

  basisLoader.load(
    "./assets/img/basis/gradient_repeat1Blend.basis",
    function (blendTexture) {
      const blendBufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
      const blendMaterial = new THREE.MeshBasicMaterial({
        map: blendTexture,
      });
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
      blendLayer.castShadow = false;
      blendLayer.name = "blendLayer";

      scene.add(blendLayer);
      blendLayer.material.blendEquation = 50;
    }
  );
  ///////////////////////////////////////////////////
  let texture2 
   basisLoader.load(
    "./assets/img/basis/blink.basis",
    function (texture) {
      texture.flipY = false;
      texture2 = texture;
    }
  );

  basisLoader.load("./assets/img/basis/Embrizer.basis", function (texture) {
    texture.flipY = false;
    const painting = scene.getObjectByName("painting");
    //insync with lights use MeshLambertMaterial / MeshBasicMaterial
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    painting.material = mat;
    console.log(painting);
    function paintingOpen() {
      setTimeout(function () {
        painting.material.map = texture2;
        paintingBlink();
      }, 2000);
    }
    function paintingBlink() {
      setTimeout(function () {
        painting.material.map = texture;
        paintingOpen();
      }, 300);
    }
    paintingOpen();
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
}
