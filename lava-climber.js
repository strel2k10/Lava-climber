let scene,camera,renderer;
window.onload = function init(){
   createScene()
}

function createScene(){
     scene = new THREE.Scene()

     camera = new THREE.PerspectiveCamera(60, window.innerWidth/ window.innerHeight,1,10000)

     renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);

    renderer.setClearColor("red");

        // add the output of the renderer to the DIV with id "world"
        document.getElementById('world').appendChild(renderer.domElement);

        // listen to the screen: if the user resizes it we have to update the camera and the renderer size
        window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    // update height and width of the renderer and the camera
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}