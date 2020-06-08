// THREEJS RELATED VARIABLES
let scene,camera,renderer;
let controls;

//LIGHTS 
let hemisphereLight, directionalLight, directionalLightHelper;

//Character
let bob

//Platforms

let platforms = []
let platformObject

// Physics
let player = {
    velX:0,
    velY:0,
    height:0,
    jump:false
    
}

let grav = 1
let speed = 2

window.onload = function init() {
    createScene();

    createCharacter();
    createPlatforms();
    createLights()

    

    animate();
    window.addEventListener('keydown', handleKeyPressed);
    window.addEventListener('keyup', handleKeyReleased);
   
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

class Platform{
    constructor(x,y,width,height){

        this.x = x
        this.y = y
        this.width = width
        this.height = height

    }

    create(){

       

            
        const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xd8d0d1,
            wireframe: false
        });

        let geomBody = new THREE.BoxGeometry(this.width, this.height, 10)

        let platformBody = new THREE.Mesh(geomBody, materialWhite);

        platformBody.position.y = this.y
        platformBody.position.x = this.x

        platformObject.add(platformBody)

    }
}

function createPlatforms(){

    platformObject = new THREE.Object3D;

    platforms.push(new Platform(20,20,100,10))

    platforms.push(new Platform(5,40,50,10))

    platforms.forEach(function(platform){
        platform.create()
    })


    scene.add(platformObject)
}







var keys = []

function handleKeyPressed(event){

    //store an entry for every key pressed
    keys[event.keyCode] = true;

    //Right
    if(keys[39]){
        player.velX = 1
       
       }
    //Left   
    else if(keys[37]){
        player.velX = -1
       }
    //Up 
    if(keys[38]){
        if (player.height == 0){
            player.jump = true
        }
        
    }

    

       event.preventDefault()
       
      
}

function handleKeyReleased(event) {

    //Mark keys that were released
    keys[event.keyCode] = false
   
    if(event.keyCode == 39 || event.keyCode == 37){
        player.velX = 0
    }
   
    if(event.keyCode == 38){
        player.jump = false
    }
    event.preventDefault()
        
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

function jump (){
    
    if(player.jump == true){

        if(player.height >= 0 && player.height < 50){
            player.height += 2
            player.velY = 2
        }else if (player.height > 100){
            
            player.jump = false
        }
    }

    if(player.height == 50 || player.jump == false){
        if(bob.position.y == 0){
            player.height = 0
        }
    }

    
}

function updateCharacter() {

    jump()
    // update the Character's position
    bob.position.y += player.velY * speed;
    bob.position.x += player.velX * speed;

    
    if(bob.position.y > 0 ){
        bob.position.y -= grav * speed
    }
  

    player.velY = 0

  
}


function animate() {
    updateCharacter()
    renderer.render(scene,camera)
    // render
   requestAnimationFrame(animate);
   
}
