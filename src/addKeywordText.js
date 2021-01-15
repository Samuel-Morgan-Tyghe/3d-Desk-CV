import * as THREE from "../vendor/three";



export function addKeywordText(scene) {
  let artGroup = scene.getObjectByName("ArtCenter").getWorldPosition();



  const artistTextLoader = new THREE.FontLoader();
  artistTextLoader.load("./assets/fonts/Alata_Regular.json", function (font) {
    const artistTextGeometry = new THREE.TextBufferGeometry("FINE ARTIST", {
      font: font,
      size: 0.5,
      height: 0.001,
    });

    const artistTextMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    let artistText = new THREE.Mesh(artistTextGeometry, artistTextMaterial);

    artistText.scale.set(0.1, 0.1, 1);
    // artistText.position.set(0.9, 1, -0.25);

    artistText.position.copy(artGroup);
    artistText.translateY(0.3);
    artistText.translateX(-0.3);
    artistText.translateZ(0.25);

    // artistText.rotation.set(0, 0.45, 0);
    artistText.name = "Fine Artist";
    // artistText.visible = false
    scene.add(artistText);
  });

  const creativeTextLoader = new THREE.FontLoader();
  creativeTextLoader.load("./assets/fonts/Alata_Regular.json", function (font) {
    const creativeTextGeometry = new THREE.TextBufferGeometry("CREATIVE", {
      font: font,
      size: 0.4,
      height: 0.001,
    });

    const creativeTextMaterial = new THREE.MeshBasicMaterial({
      color: "white",
    });
    let creativeText = new THREE.Mesh(
      creativeTextGeometry,
      creativeTextMaterial
    );

    creativeText.scale.set(0.1, 0.1, 1);
    // creativeText.position.set(1.0, 0.9, -0.25);
    creativeText.position.copy(artGroup);
        creativeText.translateX(-0.2);
creativeText.translateY(0.2);
    creativeText.translateZ(0.25);

    // creativeText.rotation.set(0, 0.45, 0);
    creativeText.name = "CREATIVE";
    // creativeText.visible = false
    scene.add(creativeText);
  });

  const inventiveTextLoader = new THREE.FontLoader();
  inventiveTextLoader.load(
    "./assets/fonts/Alata_Regular.json",
    function (font) {
      const inventiveTextGeometry = new THREE.TextBufferGeometry("INVENTIVE", {
        font: font,
        size: 0.3,
        height: 0.001,
      });

      const inventiveTextMaterial = new THREE.MeshBasicMaterial({
        color: "white",
      });
      let inventiveText = new THREE.Mesh(
        inventiveTextGeometry,
        inventiveTextMaterial
      );

      inventiveText.scale.set(0.1, 0.1, 1);
      // inventiveText.position.set(0.95, 0.825, -0.25);
      inventiveText.position.copy(artGroup);
      inventiveText.translateX(-0.25);
      inventiveText.translateY(0.125);
      inventiveText.translateZ(0.25);

      // inventiveText.rotation.set(0, 0.45, 0);
      inventiveText.name = "INVENTIVE";
      // inventiveText.visible = false
      scene.add(inventiveText);
    }
  );

  const adaptiveTextLoader = new THREE.FontLoader();
  adaptiveTextLoader.load("./assets/fonts/Alata_Regular.json", function (font) {
    const adaptiveTextGeometry = new THREE.TextBufferGeometry("ADAPTIVE", {
      font: font,
      size: 0.2,
      height: 0.001,
    });

    const adaptiveTextMaterial = new THREE.MeshBasicMaterial({
      color: "white",
    });
    let adaptiveText = new THREE.Mesh(
      adaptiveTextGeometry,
      adaptiveTextMaterial
    );

    adaptiveText.scale.set(0.1, 0.1, 1);
    // adaptiveText.position.set(1.1, 0.775, -0.25);#
    adaptiveText.position.copy(artGroup);
    adaptiveText.translateX(-0.15);
    adaptiveText.translateY(0.075);
        adaptiveText.translateZ(0.25);
// adaptiveText.rotation.set(0, 0.45, 0);
    adaptiveText.name = "adaptive";
    // adaptiveText.visible = false
    scene.add(adaptiveText);
  });

  const weatherAppTextLoader = new THREE.FontLoader();
  weatherAppTextLoader.load(
    "./assets/fonts/Bebas Neue_Regular (1).json",
    function (font) {
      const weatherAppTextGeometry = new THREE.TextBufferGeometry(
        "Weather App",
        {
          font: font,
          size: 0.24,
          height: 0.001,
        }
      );

      const weatherAppTextMaterial = new THREE.MeshBasicMaterial({
        color: "white",
      });
      const weatherAppText = new THREE.Mesh(
        weatherAppTextGeometry,
        weatherAppTextMaterial
      );
      weatherAppText.scale.set(0.1, 0.1, 1);
      weatherAppText.position.set(-0.48, 0.65, -0.07);
      weatherAppText.rotation.set(0, 0.45, 0);
      weatherAppText.name = "weatherAppText";
      weatherAppText.visible = false;
      scene.add(weatherAppText);
    }
  );
}