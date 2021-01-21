import * as THREE from "../vendor/three";

const newtempWorldPosition = new THREE.Vector3();

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
    startLoop();
  }

  function startLoop() {
    let textureImage =
      artworkLinks[Math.floor(Math.random() * Math.floor(listLength))];
    let randomnumber = Math.floor(Math.random() * Math.floor(listLength));
    //compress images using images.weserv ( i know very cool)
    textureImage =
      "https://images.weserv.nl/?url=" +
      artworkLinks[randomnumber] +
      "&w=512&h=512&q=80";

    let texture = new THREE.TextureLoader().load(textureImage);
    // texture.minFilter = THREE.LinearFilter;

    let geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    const posRef = scene.getObjectByName("whiteboard");
    var bbox = new THREE.Box3().setFromObject(posRef);
    mesh.position.copy(posRef.getWorldPosition(newtempWorldPosition));
    //   mesh.translateX(0.1)
    mesh.translateY(1);
    mesh.translateZ(0.05);
    mesh.scale.set(0.3, 0.3, 0.3);
    scene.add(mesh);

    function fn60sec() {
      mesh.material.map = texture;

      mesh.material.needsUpdate = true;
      randomnumber = Math.floor(Math.random() * Math.floor(listLength));

      // mesh.material.dispose()
      textureImage =
        "https://images.weserv.nl/?url=" +
        artworkLinks[randomnumber] +
        "&w=512&h=512&q=80";

      texture = new THREE.TextureLoader().load(textureImage);

      // const texture = new THREE.TextureLoader().load(textureImage);
      // const material = new THREE.MeshBasicMaterial( { map: texture } );
      // mesh.material = material
    }

    fn60sec();
    setInterval(fn60sec, 10 * 1000);
  }
}
