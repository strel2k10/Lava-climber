// THREEJS RELATED VARIABLES
let scene, camera, renderer;
let controls;

//LIGHTS 
let hemisphereLight, directionalLight, directionalLightHelper;

//Character
let bob
let penguin
// Physics

//Platforms

let platforms = []
let platformObject

// Physics
let player = {
    velX: 0,
    velY: 0,
    height: 0,
    jump: false

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
    //scene.fog = new THREE.Fog(0xf7d9aa, 100);

    // create a camera, which defines where we're looking at
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);


    // position the camera
    camera.position.x = 60;
    camera.position.z = 250; //ALTERED: change from Z=2000 to Z=200
    camera.position.y = 100;
    camera.rotation.y = Math.PI * 2 * -0.05
    camera.rotation.z = Math.PI * 2 * 0.007

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

function createCharacter() {

    bob = new THREE.Object3D();
    penguin = new THREE.Object3D();


    const materialWhite = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: false
    });
    const materialBlack = new THREE.MeshPhongMaterial({
        color: 0x000000,
        wireframe: false
    });

    const materialOrange = new THREE.MeshPhongMaterial({
        color: 0xff9a4d,
        wireframe: false
    });

    

    let geomBody = new THREE.BoxGeometry(10, 10, 10)

    let bodytest = new THREE.Mesh(geomBody, materialWhite);

    bob.add(bodytest)
    console.log("Bob created")
    scene.add(bob)

    // tronco
    let geometryBody = new THREE.SphereGeometry(15, 32, 32);
    let body = new THREE.Mesh(geometryBody, materialBlack);
    body.position.x = 50
    body.position.y = 30
    body.scale.y = 1.4
    body.scale.z = 0.8


    penguin.add(body)


    // belly
    let geometryBelly = new THREE.SphereGeometry(9.4, 32, 32);
    let belly = new THREE.Mesh(geometryBelly, materialWhite);

    belly.position.z = 10.39
    belly.scale.y = 1.19
    belly.scale.z = 0.5


    body.add(belly)

    // head

    let geometryHead = new THREE.SphereGeometry(10, 32, 32);
    let head = new THREE.Mesh(geometryHead, materialBlack);
    head.position.y = 18

    head.scale.y = 0.9

    body.add(head)

    // face

    let geometryFace = new THREE.SphereGeometry(7, 32, 32);
    let face = new THREE.Mesh(geometryFace, materialWhite);
    face.position.y = 0.5
    face.position.z = 6.9
    face.scale.z = 0.5
    face.scale.y = 0.9

    head.add(face)

    // olhos

    let geometryEye = new THREE.SphereGeometry(1.2, 32, 32);
    let eye1 = new THREE.Mesh(geometryEye, materialBlack);
    let eye2 = new THREE.Mesh(geometryEye, materialBlack);

    eye1.position.x = -3
    eye1.position.y = 2
    eye1.position.z = 9.8

    eye2.position.x = 3
    eye2.position.y = 2
    eye2.position.z = 9.8



    head.add(eye1)
    head.add(eye2)

    // beak

    let geometryBeak = new THREE.CylinderGeometry(0, 5, 10, 4, 1)    
    let beak = new THREE.Mesh(geometryBeak, materialOrange);
    beak.position.y = -1
    beak.position.z = 10
    beak.rotation.x = 2000


    head.add(beak);

    // hands

    let geometryHands = new THREE.CylinderGeometry(0.5, 8, 20, 4, 1)
    let hand1 = new THREE.Mesh(geometryHands, materialOrange);
    let hand2 = new THREE.Mesh(geometryHands, materialOrange);
    hand1.rotation.z = 27* Math.PI / 20
    hand1.position.x = 13.5
    hand1.position.y = 1.10

    hand2.rotation.z = - 27* Math.PI / 20
    hand2.position.x = - 13.5
    hand2.position.y = 1.10

    body.add(hand1);
    body.add(hand2);



    // feet
    let geometryFeet = new THREE.CylinderGeometry(0.5, 6, 12, 4, 1)
    let foot1 = new THREE.Mesh(geometryFeet, materialOrange);
    let foot2 = new THREE.Mesh(geometryFeet, materialOrange);
    foot1.rotation.z = 27* Math.PI / 20
    foot1.position.x = 10
    foot1.position.y = - 13

    foot2.rotation.z = - 27* Math.PI / 20
    foot2.position.x = - 10
    foot2.position.y = - 13

    body.add(foot1);
    body.add(foot2);






    scene.add(penguin)

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

function handleKeyPressed(event) {

    //store an entry for every key pressed
    keys[event.keyCode] = true;

    //Right
    if(keys[39]){
        player.velX = 1
        penguin.rotation.y = Math.PI / 2 * 0.7
       
       }
    //Left   
    else if(keys[37]){
        player.velX = -1
        penguin.rotation.y = - Math.PI / 2 * 0.7
       }
    //Up 
    if (keys[38]) {
        if (player.height == 0) {
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

    directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(directionalLightHelper);

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
        if(penguin.position.y == 0){
            player.height = 0
        }
    }

}

function updateCharacter() {

    jump()
    // update the Character's position
    penguin.position.y += player.velY * speed;
    penguin.position.x += player.velX * speed;

    
    if(penguin.position.y > 0 ){
        penguin.position.y -= grav * speed
    }
  

    player.velY = 0

  
}


function animate() {
    updateCharacter()
    renderer.render(scene, camera)
    // render
    requestAnimationFrame(animate);

   // penguin.rotation.y += Math.PI * 0.002

}