import * as THREE from "../vendor/three";

export function addAutomatedArt(scene) {
  let artworkLinks = [];

  let listLength;
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open(
    "GET",
    "https://automated-art.co.uk/wp-content/uploads/woo-product-feed-pro/xml/LkKMudDtAaAnccNxDDGZwiv9xyxmks0c.xml",
    true
  );
  xhttp.send();

  function myFunction(xml) {
    var x, i, txt, xmlDoc;
    xmlDoc = xml.responseXML;

    x = xmlDoc.getElementsByTagName("image_link");
    listLength = x.length;
    for (i = 0; i < x.length; i++) {
      artworkLinks.push(x[i].childNodes[0].nodeValue);
    }
    //   console.log(artworkLinks)
    startLoop();
  }

  function startLoop() {
    let textureImage =
      artworkLinks[Math.floor(Math.random() * Math.floor(listLength))];
    let texture = new THREE.TextureLoader().load(textureImage);
    let geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(scene.getObjectByName("whiteboard").getWorldPosition());
    //   mesh.translateX(0.1)
    mesh.translateY(1);
    mesh.translateZ(0.1);
    mesh.scale.set(0.3, 0.3, 0.3);
    console.log(mesh);
    scene.add(mesh);

    function fn60sec() {
      mesh.material.map = texture;

      mesh.material.needsUpdate = true;
      let randomnumber = Math.floor(Math.random() * Math.floor(listLength));
      // console.log(randomnumber)

      // mesh.material.dispose()
      textureImage = artworkLinks[randomnumber];
      texture = new THREE.TextureLoader().load(textureImage);

      // const texture = new THREE.TextureLoader().load(textureImage);
      // const material = new THREE.MeshBasicMaterial( { map: texture } );
      // mesh.material = material
    }

    fn60sec();
    setInterval(fn60sec, 10 * 1000);
  }
}
