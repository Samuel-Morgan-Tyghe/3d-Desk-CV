import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as THREE from "../vendor/three";

export function addLightMap(scene, renderer) {
  var pmremGenerator = new THREE.PMREMGenerator(renderer);

  scene.traverse(function (object) {
    if (object.isMesh) {
      var name = object.name.toString().replace(/_/g, ".") + "_baked.hdr";

      const texture = new RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .load("./assets/img/hdr/" + name);
      object.geometry.attributes.uv2 = object.geometry.attributes.uv;

      object.material.side = 2;
      object.material.lightMap = texture;
    }
  });
}
