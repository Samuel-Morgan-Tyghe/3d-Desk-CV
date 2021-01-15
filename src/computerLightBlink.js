export function computerLightBlink(scene){
  let pLightEmmissive = scene.getObjectByName("powerLight");

    function computerBlink() {
        pLightEmmissive.visible = !pLightEmmissive.visible;
      }
      computerBlink();
      setInterval(computerBlink, 1 * 1000);
  

}