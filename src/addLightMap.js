import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as THREE from "../vendor/three";

// export function addLightMap(scene) {
  //   var name = object.name.toString().replace(/_/g, ".") + "_baked.hdr";
  //   console.log(name);

//   const object = scene.getObjectByName("wall_1_1");

//   const texture = new RGBELoader()
//     .setDataType(THREE.UnsignedByteType)
//     .load("./assets/img/hdr/wall.1_baked.hdr");
// object.geometry.attributes.uv2 = object.geometry.attributes.uv;

//   object.material.side = 2;
//   object.material.lightmap = texture;
// }

export function addLightMap(scene) {
  scene.traverse(function (object) {
    if (object.isMesh) {
      var name = object.name.toString().replace(/_/g, ".") + "_baked.hdr";
    //   console.log(name);

  const texture = new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load("./assets/img/hdr/" +name);
// object.geometry.attributes.uv2 = object.geometry.attributes.uv;

      object.material.side = 2;
  object.material.lightmap = texture;
}
  });
}
