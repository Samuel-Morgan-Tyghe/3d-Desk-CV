import * as THREE from "../vendor/three";
import { TimelineMax } from "../vendor/gsap.min.js";
import {BasisTextureLoader} from 'three/examples/jsm/loaders/BasisTextureLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


export function addArt(scene, renderer) {
  var palantirPlace = scene.getObjectByName("palantirPlace", true);

  var art = new THREE.TextureLoader().load("./assets/img/Palantiri.webp");
  // texture.minFilter = THREE.LinearFilter;
  // const artMat = new THREE.MeshBasicMaterial({ map: art, alphaTest: 0.9 });
let artMat

  const basisLoader = new BasisTextureLoader();
  basisLoader.setTranscoderPath( '../vendor/basis/' );
  basisLoader.detectSupport( renderer );
   basisLoader.load( './assets/img/Palantiri.basis', function ( texture ) {

  
     artMat = new THREE.MeshStandardMaterial( { map: texture,  alphaTest: 0.9 } );

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
  
  }, function () {

    console.log( 'onProgress' );
  
  }, function ( e ) {
  
    console.error( e );
  
  } );











 
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

  // var blendTexture = new THREE.TextureLoader().load(
  //   "./assets/img/gradient repeat1Blend.webp"
  // );
  // texture.minFilter = THREE.LinearFilter;
  const basisLoader2 = new BasisTextureLoader();
  basisLoader2.setTranscoderPath( '../vendor/basis/' );
  basisLoader2.detectSupport( renderer );
   basisLoader2.load( './assets/img/Palantiri.basis', function ( blendTexture ) {

  const blendBufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);
const blendMaterial = new THREE.MeshBasicMaterial({ map: blendTexture });
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
blendLayer.material.blendEquation = 50;}


  ///////////////////////////////////////////////////
  const texture = new THREE.TextureLoader().load("./assets/img/open.webp");
  var texture2 = new THREE.TextureLoader().load("./assets/img/blink.webp");
  texture.flipY = false
  texture2.flipY = false
  const painting = scene.getObjectByName("painting");
  //insync with lights use MeshLambertMaterial / MeshBasicMaterial
  const mat = new THREE.MeshBasicMaterial({map:texture})
  painting.material = mat
 console.log(painting)
  function paintingOpen() {
    setTimeout(function () {
      painting.material.map = texture2;

      texture.dispose();
      paintingBlink();
    }, 2000);
  }
  function paintingBlink() {
    setTimeout(function () {
      painting.material.map = texture;
      texture2.dispose();
      paintingOpen();
    }, 300);
  }
  paintingOpen();

  /////////////////////////////////////////////////////////////////////////////////////////////
}
