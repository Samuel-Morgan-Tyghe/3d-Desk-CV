function toggleDisplay(){
    let infoScreen = document.getElementById('infoScreen')
    let container = document.getElementById('container')
    let container2 = document.getElementById('container2')
    if(  infoScreen.style.display == 'none'){
      
    infoScreen.style.display = 'flex'
    container.style.display = 'none'
    container2.style.display = 'none'
  }else{

    infoScreen.style.display = 'none'
    container.style.display = 'block'
    container2.style.display = 'block'
  }

}