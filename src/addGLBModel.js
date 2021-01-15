import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function addModel() {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      "./assets/models/DeskScene3.9.1.glb",
      data => resolve(data),
      null,
      reject
    );
  });
}
