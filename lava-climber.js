// THREEJS RELATED VARIABLES
let scene,camera,renderer;
let controls;

//LIGHTS 
let hemisphereLight, directionalLight, directionalLightHelper;

//Character
let bob

let input = {
    x:0,
    y:0
}



window.onload = function init() {
    createScene();

    createCharacter();
    createLights()

    

    animate();
    window.addEventListener('keyup', handleKeyPress);
    window.addEventListener('keydown', handleKeyRelease);
}
/*
function createScene() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100)

    controls = new THREE.OrbitControls(camera);

    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor("#DC143C");

    // add the output of the renderer to the DIV with id "world"
    document.getElementById('world').appendChild(renderer.domElement);

    // listen to the screen: if the user resizes it we have to update the camera and the renderer size
   // window.addEventListener('resize', handleWindowResize, false);

}
*/

function createScene() {
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100);

    // create a camera, which defines where we're looking at
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    // position the camera
    camera.position.x = 120;
    camera.position.z = 200; //ALTERED: change from Z=2000 to Z=200
    camera.position.y = 100;

    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // configure renderer clear color
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


    
    const materialWhite = new THREE.MeshPhongMaterial({
        color: 0xd8d0d1,
        wireframe: false
    });

    let geomBody = new THREE.BoxGeometry(10, 10, 10)

    let body = new THREE.Mesh(geomBody, materialWhite);

    bob.add(body)
    console.log("Bob created")
    scene.add(bob)

  
}




function handleKeyPress(event) {

if(event.key == 'ArrowRight'){
 input.x += 1

}

else if(event.key =="ArrowLeft"){
 input.x -= 1
}

else if(event.key =="ArrowUp"){
 input.y += 1
}

console.log(input.x, "," ,input.y)


}

function handleKeyRelease(event){
    event.repeat = false;
    event.preventDefault();
}

function createLights() {
    // HemisphereLight
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    scene.add(hemisphereLight);

    // DirectionalLight
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(80, 150, 60);
    directionalLight.target = 
    scene.add(directionalLight);

    directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight );    
    scene.add( directionalLightHelper );

}


function updateCharacter() {

    // update the Character's position
   // bob.position.y += 1;
   // bob.position.x += 1;
}


function animate() {
    renderer.render(scene,camera)
    // render
   requestAnimationFrame(animate);
   
}
