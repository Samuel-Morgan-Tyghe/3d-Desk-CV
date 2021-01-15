import moment from "../vendor/moment";
import * as THREE from "../vendor/three";
export function addClock(scene) {
  const loader2 = new THREE.FontLoader();
  const geometry = new THREE.PlaneGeometry( 5, 20, 32 );
    const material = new THREE.MeshBasicMaterial({ color: 0xb01717 });
    const alarmClockText = new THREE.Mesh(geometry, material);
    alarmClockText.name = 'alarmClockText'
        scene.add(alarmClockText);

  function fn60sec() {
    // runs every 60 sec and runs on init.

   

    loader2.load(
      "./assets/fonts/alarm clock_Regular.json",
      function (font) {


          let alarmClockTexttemp = scene.getObjectByName(
            "alarmClockText",
            true
          );
          alarmClockTexttemp.geometry.dispose();
          alarmClockTexttemp.material.dispose();
          scene.remove(alarmClockTexttemp);
        
        var currentTime = moment().format("HH:mm");

        const geometry = new THREE.TextBufferGeometry(currentTime, {
          font: font,
          size: 0.24,
          height: 0.01,
          // curveSegments: 12,
          // bevelEnabled: true,
          // bevelThickness: 10,
          // bevelSize: 8,
          // bevelOffset: 0,
          // bevelSegments: 5
        });

        const material = new THREE.MeshBasicMaterial({ color: 0xb01717 });
        const alarmClockText = new THREE.Mesh(geometry, material);
        // alarmClockText.position.set(0.315, 0.51, -0.08);
        let clockPlane = scene.getObjectByName("ClockPlane", true);
        const newtempWorldPosition = new THREE.Vector3()

        alarmClockText.position.copy(clockPlane.getWorldPosition(newtempWorldPosition));
        // alarmClockText.position.z = alarmClockText.position.z + 0.01;
        alarmClockText.position.y = alarmClockText.position.y + 0.01;
        alarmClockText.position.x = alarmClockText.position.x - 0.045;

        alarmClockText.scale.set(0.09, 0.09, 1);
        alarmClockText.rotation.set(100, 100.25, 100.35);
        alarmClockText.name = "alarmClockText";
        scene.add(alarmClockText);
      }
    );
  }
  fn60sec();
  setInterval(fn60sec, 60 * 1000);

}
