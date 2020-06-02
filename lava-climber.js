// THREEJS RELATED VARIABLES
let scene,camera,renderer;
let controls;

//LIGHTS 
let hemisphereLight, directionalLight, directionalLightHelper;

//Character
let bob

window.onload = function init(){
   createScene()
   animate()
   createCharacter()
}

window.onload = function init() {
    createScene();
    createCharacter();
    

    window.addEventListener('keypress', handleKeyPress);

    animate();
}

function createScene() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor("#e4e0ba");

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



function createCharacter(){

    bob = new THREE.Object3D();
    // scale it down
    //plane.scale.set(0.25, 0.25, 0.25);
    bob.position.y = 100
    var cyan = new THREE.Color("rgb(0, 255, 255)");

    let geomBody = new THREE.BoxGeometry(60, 50, 50)

    let body = new THREE.Mesh(geomBody, cyan);

    bob.add(body)
    console.log("Bob created")
    scene.add(bob)
}


function handleKeyPress(event) {


}

function updateCharacter() {

    // update the Character's position
   // char.position.y += 1;
   // char.position.x += 1;
}


function animate() {
 
    // render
    renderer.render(scene, camera);


    requestAnimationFrame(animate);
}
