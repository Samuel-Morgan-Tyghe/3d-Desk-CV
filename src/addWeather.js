import Axios from "axios";
import * as THREE from "../vendor/three";

export function addWeather(scene) {
  Axios.get(
    "https://api.openweathermap.org/data/2.5/weather?q=Edinburgh&appid=ab57b33912fbd3d3015d3f296505d3a8"
  ).then((response) => {
    // // //
    let weatherPlane = scene.getObjectByName("WeatherPlane", true);
    weatherPlane.visible = false;
    let weatherIconPlane = scene.getObjectByName("WeatherIconPlane", true);
    weatherIconPlane.visible = false;

    let icon = response.data.weather[0].icon;
    icon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    var weatherIcon = new THREE.TextureLoader().load(icon);

    weatherIcon.minFilter = THREE.LinearFilter;

    const weatherMaterial = new THREE.MeshLambertMaterial({
      map: weatherIcon,
      alphaTest: 0.8,
    });
    // weatherMaterial.transparent = true;

    const weatherBufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1);

    const weather = new THREE.Mesh(weatherBufferGeometry, weatherMaterial);
    weather.scale.set(0.058, 0.058, 1);
    const newtempWorldPosition = new THREE.Vector3();

    weather.position.copy(
      weatherIconPlane.getWorldPosition(newtempWorldPosition)
    );
    weather.position.x = weather.position.x + 0.01;
    weather.position.y = weather.position.y + 0.03;
    weather.position.z = weather.position.z + 0.01;
    weather.rotation.set(0, 0.45, 0.2);
    weather.name = "weather";
    scene.add(weather);
    ///////////////////////////////////////////////////////////
    const loaderTemp = new THREE.FontLoader();
    let temp = response.data.main.temp;
    temp = temp - 273.15;
    temp = Math.floor(temp);

    loaderTemp.load(
      "./assets/fonts/Bebas Neue_Regular (1).json",
      function (font) {
        const tempTextBufferGeometry = new THREE.TextBufferGeometry(
          temp.toString() + "°C",
          {
            font: font,
            size: 0.024,
            height: 0.01,
          }
        );

        const tempMaterial = new THREE.MeshBasicMaterial({ color: 0xb01717 });
        const tempMesh = new THREE.Mesh(tempTextBufferGeometry, tempMaterial);
        // tempMesh.position.set(-0.27, 0.515, 0.088);
        const newtempWorldPosition = new THREE.Vector3();

        tempMesh.position.copy(
          weatherPlane.getWorldPosition(newtempWorldPosition)
        );
        tempMesh.position.x = tempMesh.position.x - 0.025;
        tempMesh.position.y = tempMesh.position.y - 0.01;
        tempMesh.position.z = tempMesh.position.z + 0.015;

        // tempMesh.scale.set(0.09, 0.09, 1);
        // // //
        // tempMesh.rotation.set(-35, 1, 1);
        tempMesh.rotation.set(-0.45, 0.45, 0.2);
        //  alarmClockText.rotation.set(100, 100.25, 100.35);

        scene.add(tempMesh);
      }
    );
  });
}
