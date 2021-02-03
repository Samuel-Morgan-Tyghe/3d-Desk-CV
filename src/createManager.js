import * as THREE from "../vendor/three";

export function createManager() {
  var manager = new THREE.LoadingManager(() => {});
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onLoad = function () {
    var element = document.getElementById("loading-screen");
    element.className = "animatedFade";
    document.getElementById("container").style.display = 'block'
    document.getElementById("container2").style.display = 'block'
    console.log("Loading complete!");
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };
  return manager;
}
