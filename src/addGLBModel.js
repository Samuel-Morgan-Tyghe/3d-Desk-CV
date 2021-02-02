import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function addModel(renderer, manager) {
  const gltfLoader = new GLTFLoader(manager)
    .setCrossOrigin("anonymous")
    .setDRACOLoader(new DRACOLoader().setDecoderPath("../vendor/draco/"))
    .setKTX2Loader(new KTX2Loader().detectSupport(renderer));

  return new Promise((resolve, reject) => {
    gltfLoader.load(
      // "../dist/assets/models/DeskScene5.3.glb",
      "../dist/assets/models/output/gt.gltf",
      // "../dist/assets/models/test for threejs/untitled2.gltf",

      (data) => resolve(data),
      null,
      reject
    );
  });
}
