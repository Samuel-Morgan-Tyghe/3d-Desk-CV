import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as THREE from "../vendor/three";

export function addLightMap(scene, renderer, manager) {
  const light = new THREE.AmbientLight(0x404040); // soft white light
  // scene.add( light );

  let object = scene.getObjectByName("wall_1");
  const texture = new THREE.TextureLoader(manager).load(
    "./assets/img/bake/Lightmap_AO_Denoise.png"
  );
  const texture2 = new THREE.TextureLoader(manager).load(
    "./assets/img/bake/Lightmap_NOISY_Denoise.png"
  );
  object.material.side = 2;

  object.material.lightMap = texture2;
  object.material.lightMap.flipY = false;
  // object.material.emissiveMap = texture2;
  object.material.aoMap = texture;
  object.material.aoMap.flipY = false;

  // var pmremGenerator = new THREE.PMREMGenerator(renderer);

  // scene.traverse(function (object) {
  //   if (object.isMesh) {
  //     var name = object.name.toString().replace(/_/g, ".") + "_filtered.hdr";

  //     const texture = new RGBELoader()
  //       .setDataType(THREE.UnsignedByteType)
  //       .load("./assets/img/hdr/" + name);
  //     object.geometry.attributes.uv2 = object.geometry.attributes.uv;

  //     object.material.side = 2;
  //     object.material.lightMap = texture;
  //   }
  // });
}
