import * as THREE from "../vendor/three";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";

export function addAudio(camera, scene) {
  addBirds(camera, scene);
  addComputer(camera, scene);
}

function addBirds(camera, scene) {
  // create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // create a global audio source
  const sound = new THREE.PositionalAudio(listener);

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load(
    "./assets/audio/Sunny Day-SoundBible.com-2064222612.mp3",
    function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.05);
      sound.play();
    }
  );
  // sound.context.resume();

  sound.setDirectionalCone(180, 230, 0.1);
  console.log(sound);
  // const helper = new PositionalAudioHelper( sound );
  // sound.add( helper );

  const sphere = new THREE.SphereGeometry(20, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
  const mesh = new THREE.Mesh(sphere, material);
  mesh.name = "audio";
  scene.add(mesh);

  // const monitor = scene.getObjectByName('window')
  mesh.position.set(5, 0.6, 0);
  mesh.rotation.set(0, -1.5, 0);
  mesh.add(sound);
}

function addComputer(camera, scene) {
  // create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // create a global audio source
  const sound = new THREE.PositionalAudio(listener);

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("./assets/audio/computer.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });

  sound.setDirectionalCone(180, 230, 0.1);

  // const helper = new PositionalAudioHelper( sound );
  // sound.add( helper );

  const sphere = new THREE.SphereGeometry(20, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
  const mesh = new THREE.Mesh(sphere, material);
  mesh.name = "audio";
  scene.add(mesh);

  // const monitor = scene.getObjectByName('window')
  mesh.position.set(0.58, 0.3, -1);
  mesh.rotation.set(0, -0.5, 0);
  mesh.add(sound);
}
