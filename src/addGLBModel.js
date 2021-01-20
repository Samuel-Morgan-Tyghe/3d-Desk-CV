import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function addModel(renderer) {

  const gltfLoader = new GLTFLoader()
    .setCrossOrigin("anonymous")
    .setDRACOLoader(new DRACOLoader().setDecoderPath("../vendor/draco/"))
    .setKTX2Loader(new KTX2Loader().detectSupport(renderer));


  return new Promise((resolve, reject) => {
    gltfLoader.load(
      "../dist/assets/models/output/gt.gltf",

      (data) => resolve(data),
      null,
      reject
    );
  });
}
