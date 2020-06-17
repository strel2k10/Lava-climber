// THREEJS RELATED VARIABLES
let scene, camera, renderer;
let controls;

//LIGHTS 
let hemisphereLight, directionalLight, directionalLightHelper;
//Map
let maps = []

maps.push([
    // 0- Empty 1- Platforms  2- Platforms with powerups 3- platforms with end game
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0],
    [1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,3,0,0],
    ])

 let mapSize = {
     x: 0,
     y:0
}

//Character
let bob
let penguin
let centerMesh
let boundaryBoxFront
let idle

//lava
let lava
let waves = []

//let boundaryBoxBack
let boundaryBoxTop
let boundaryBoxBottom

// Physics
let floor = false

//Platforms
let platforms = []
let platformObject

//walls
let walls = []
let wallObject

let leftWallCurves = []
let rightWallCurves = []
let backWallCurves = []
//Back wall


//borders
let borders = []

//End body
let ends = []
let endBorders = []
let endObject

//PowerUp
let powerUps = []
let powerUpBorders = []
let powerUpObject
let powerUpHeight = 0
let powerUpDirection = 0
let jumpPowerUpCounter = 0

// Physics
let player = {
    velX: 0,
    velY: 0,
    height: 0,
    jump: false,
    powerUp: false,
}

heightLimit = 100

let grav = 1
let speed = 2

window.onload = function init() {
    createScene();
    mapDraw()
    createCharacter();
    createPlatforms();

    createLava();
    createEnd();
    createBackWall();
    createPowerUp();
    createLights();
    createLeftWall();
    createRightWall();
    createFloor();
    createCeiling();
   

    console.log("Map size x : ",mapSize.x)
    animate();
    window.addEventListener('keydown', handleKeyPressed);
    window.addEventListener('keyup', handleKeyReleased);

}

function mapDraw() {

    maps[0].forEach(function (row, i) {
        
        row.forEach(function (tile, j) {
            mapSize.x = 0

            console.log("Im being called")
            if (tile == 1) {

                console.log("Platform created")
                platforms.push(new Platform(j * 10, i * 40))

            }else if(tile == 2){

                platforms.push(new Platform(j*10,i*40))
                powerUps.push(new PowerUp(j*10,i*40))
            
            } else if(tile == 3){
                //platforms.push(new Platform(j*10, i*40))
                ends.push(new End(j*10,i*40))
               

            }
            mapSize.x += j*10
            
        })

        mapSize.y += i *10
    })
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
    camera.position.x = 70
 
    camera.position.z = 150; //ALTERED: change from Z=2000 to Z=200
  


    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

    // configure renderer clear color
    renderer.setClearColor("#e4e0ba");

    // add the output of the renderer to the DIV with id "world"
    document.getElementById('world').appendChild(renderer.domElement);


   

    //let controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function () { renderer.render(scene, camera); });
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
    let hand1 = new THREE.Mesh(geometryHands, materialBlack);
    let hand2 = new THREE.Mesh(geometryHands, materialBlack);
    hand1.rotation.z = 27 * Math.PI / 20
    hand1.position.x = 13.5
    hand1.position.y = 1.10

    hand2.rotation.z = -27 * Math.PI / 20
    hand2.position.x = -13.5
    hand2.position.y = 1.10

    body.add(hand1);
    body.add(hand2);



    // feet
    let geometryFeet = new THREE.CylinderGeometry(0.5, 6, 12, 4, 1)
    let foot1 = new THREE.Mesh(geometryFeet, materialOrange);
    let foot2 = new THREE.Mesh(geometryFeet, materialOrange);
    foot1.rotation.z = 27 * Math.PI / 20
    foot1.position.x = 10
    foot1.position.y = -13

    foot2.rotation.z = -27 * Math.PI / 20
    foot2.position.x = -10
    foot2.position.y = -13

    body.add(foot1);
    body.add(foot2);

    var lineMaterial = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0
    })

    body.castShadow = true;


    //Front Boundary Box
   
    let geoBoundFront = new THREE.BoxGeometry(50,55,10)
    
    boundaryBoxFront = new THREE.Mesh(geoBoundFront, lineMaterial)

    boundaryBoxFront.position.x = 50
    boundaryBoxFront.position.y = 40
    boundaryBoxFront.position.z = 10


    penguin.add(boundaryBoxFront)

    /*
    // Back Boundary Box

    let geoBoundBack = new THREE.BoxGeometry(50,50,10)
    
    boundaryBoxBack = new THREE.Mesh(geoBoundBack, lineMaterial)

    boundaryBoxBack.position.x = 50
    boundaryBoxBack.position.y = 50
    boundaryBoxBack.position.z = -10


    penguin.add(boundaryBoxBack)

 */

    //Top Boundary Box

    let geoBoundTop = new THREE.BoxGeometry(10, 10, 10)

    boundaryBoxTop = new THREE.Mesh(geoBoundTop, lineMaterial)

    boundaryBoxTop.position.x = 50
    boundaryBoxTop.position.y = 75
    //boundaryBoxTop.position.z = 0


    penguin.add(boundaryBoxTop)

    //Bottom Boundary Box

    boundaryBoxBottom

    let geoBoundBottom = new THREE.BoxGeometry(10, 10, 10)

    boundaryBoxBottom = new THREE.Mesh(geoBoundBottom, lineMaterial)

    boundaryBoxBottom.position.x = 50
    boundaryBoxBottom.position.y = 10
    //boundaryBoxTop.position.z = 0


    penguin.add(boundaryBoxBottom)










    

    penguin.scale.set(0.5, 0.5, 0.5)

    //Centering Penguin so that it can rotate around itself

    let box = new THREE.Box3().setFromObject(penguin)

    box.center(penguin.position)

    penguin.position.multiplyScalar(-1)

    bob = new THREE.Group();

    bob.add(penguin)

    var axesHelper = new THREE.AxesHelper(4);
    scene.add( axesHelper );

    

    bob.position.y = 30
    bob.position.x = 70



    scene.add(bob)


}

function createBackWall(){
    const materialDark = new THREE.MeshPhongMaterial({
        color: 0x614A30,
        wireframe: false
    });
    let backWallGeo = new THREE.BoxGeometry(mapSize.x + 50,mapSize.y/2,10,10,30,10)
    let backWallBody = new THREE.Mesh(backWallGeo,materialDark);

   
    let verts = backWallBody.geometry.vertices

    


    for(let i = 0;i < verts.length;i++){
        const v = verts[i]

        backWallCurves.push({
            x: v.x, y: v.y , z: v.z,
            ang: Math.random()* Math.PI * 2,
            amp: 5 + Math.random()*5,
            //speed:0.04+Math.random()*0.06
        })
    }



   
    for(let i = 0; i < verts.length; i++){
        const v = verts[i]
        let vprops = backWallCurves[i];

        v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
        //vprops.ang += vprops.speed; // update angle for next frame
    }

    backWallBody.geometry.verticesNeedUpdate = true;
    



    backWallBody.position.x = 80
    backWallBody.position.y = mapSize.y/4
    backWallBody.position.z = -30

    scene.add(backWallBody)
}

function createLeftWall(){

    const materialDark = new THREE.MeshPhongMaterial({
        color: 0x614A30,
        wireframe: false
    });
    let leftWallGeo = new THREE.BoxGeometry(40,mapSize.y/2,200, 10,30,10)
    let leftWallBody = new THREE.Mesh(leftWallGeo,materialDark);

    
    let verts = leftWallBody.geometry.vertices

    


    for(let i = 0;i < verts.length;i++){
        const v = verts[i]

        leftWallCurves.push({
            x: v.x, y: v.y , z: v.z,
            ang: Math.random()* Math.PI * 2,
            amp: 5 + Math.random()*5,
            //speed:0.04+Math.random()*0.06
        })
    }



   
    for(let i = 0; i < verts.length; i++){
        const v = verts[i]
        let vprops = leftWallCurves[i];

        v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
        //vprops.ang += vprops.speed; // update angle for next frame
    }

    leftWallBody.geometry.verticesNeedUpdate = true;


    leftWallBody.position.x = -25
    leftWallBody.position.y = mapSize.y/4
    leftWallBody.position.z = 75
    borders.push(leftWallBody)
    scene.add(leftWallBody)

}
function createRightWall(){

    const materialDark = new THREE.MeshPhongMaterial({
        color: 0x614A30,
        wireframe: false
    });
    let rightWallGeo = new THREE.BoxGeometry(40,mapSize.y/2,200, 10,30,10)
    let rightWallBody = new THREE.Mesh(rightWallGeo,materialDark);


    let verts = rightWallBody.geometry.vertices

    


    for(let i = 0;i < verts.length;i++){
        const v = verts[i]

        rightWallCurves.push({
            x: v.x, y: v.y , z: v.z,
            ang: Math.random()* Math.PI * 2,
            amp: 5 + Math.random()*5,
            //speed:0.04+Math.random()*0.06
        })
    }



   
    for(let i = 0; i < verts.length; i++){
        const v = verts[i]
        let vprops = rightWallCurves[i];

        v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
        //vprops.ang += vprops.speed; // update angle for next frame
    }

    rightWallBody.geometry.verticesNeedUpdate = true;


    rightWallBody.position.x = mapSize.x + 25
    rightWallBody.position.y = mapSize.y/4
    rightWallBody.position.z = 75
    //rightWallBody.rotation.y = THREE.Math.degToRad(90);
    borders.push(rightWallBody)
    scene.add(rightWallBody)

}

function createCeiling(){

    const materialDark = new THREE.MeshPhongMaterial({
        color: 0x614A30,
        wireframe: false
    });
    let ceilingGeo = new THREE.BoxGeometry(mapSize.x + 10,10,200)
    let ceilingBody = new THREE.Mesh(ceilingGeo,materialDark);

    ceilingBody.position.x = 85
    ceilingBody.position.y = mapSize.y/2
    ceilingBody.position.z = 75

    borders.push(ceilingBody)
    scene.add(ceilingBody)

}

function createFloor(){

    const materialDark = new THREE.MeshPhongMaterial({
        color: 0x614A30,
        wireframe: false
    });
    let floorGeo = new THREE.BoxGeometry(mapSize.x+ 10,10,200)
    let floorBody = new THREE.Mesh(floorGeo,materialDark);

    floorBody.position.x = 85
   
    floorBody.position.z = 75


    borders.push(floorBody)
    scene.add(floorBody)

}

class PowerUp{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    create(){
        
        const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xd8d0d1,
            wireframe: false
        });

        let powerUpGeo = new THREE.BoxGeometry(10,10,10)
        let powerUpBody = new THREE.Mesh(powerUpGeo,materialWhite);

        powerUpBody.position.y = this.y + 20
        powerUpBody.position.x = this.x
        powerUpBody.castShadow = true;

        powerUpBorders.push(powerUpBody)

        powerUpObject.add(powerUpBody)
    }
}

function createPowerUp(){
    powerUpObject = new THREE.Object3D;

    powerUps.forEach(function (powerUp) {
        powerUp.create()
    })


    scene.add(powerUpObject)
}

class End{
    constructor(x,y){
        this.x= x
        this.y = y
    }
    create(){
        const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xd8d0d1,
            wireframe: false
        });

        let depthGeo = new THREE.BoxGeometry(11,40,10)

        let endDepth = new THREE.Mesh(depthGeo,materialWhite);

        endDepth.position.y = this.y+20
        endDepth.position.x = this.x
        endDepth.position.z = -29

        let platGeo = new THREE.BoxGeometry(11,10,60)

        let endPlat = new THREE.Mesh(platGeo,materialWhite)

        endPlat.position.y = this.y
        endPlat.position.x = this.x
        endPlat.position.z = -10
        
        endBorders.push(endPlat)

        endObject.add(endDepth)
        endObject.add(endPlat)
        
    }
}



function createEnd(){
    endObject = new THREE.Object3D;

    ends.forEach(function (end) {
        end.create()
    })


    scene.add(endObject)
}


function createLava(){

    const materialLava = new THREE.MeshPhongMaterial({
        color: 0xFF5B33,
        wireframe: false,
        transparent: true,
        opacity: 0.8,
    });

    let lavaBody = new THREE.BoxGeometry(1000,100,200,30,30)

 

    lava = new THREE.Mesh(lavaBody, materialLava)

    let verts = lava.geometry.vertices

    console.log("vertices: ", verts)

    for(let i = 0;i < verts.length;i++){
        const v = verts[i]

        waves.push({
            x: v.x, y: v.y , z: v.z,
            ang: Math.random()* Math.PI * 2,
            amp: 5 + Math.random()*5,
            speed:0.04+Math.random()*0.06
        })
    }


    lava.position.z = 50
    lava.position.y = -100

    scene.add(lava)

}

function moveLava(){
    const verts = lava.geometry.vertices;

    for(let i = 0; i < verts.length; i++){
        const v = verts[i]
        let vprops = waves[i];

        v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
        vprops.ang += vprops.speed; // update angle for next frame
    }

    lava.geometry.verticesNeedUpdate = true;

    
}





class Platform {
    constructor(x, y) {

        this.x = x
        this.y = y
    }

    create() {


        const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xd8d0d1,
            wireframe: false
        });

        let geomBody = new THREE.BoxGeometry(11, 10, 50)

        let platformBody = new THREE.Mesh(geomBody, materialWhite);

        platformBody.position.y = this.y
        platformBody.position.x = this.x

        platformBody.position.z = -10

       platformBody.receiveShadow = true; 
       platformBody.castShadow = false;

        borders.push(platformBody)
        console.log("borders:", borders)
        platformObject.add(platformBody)



    }
}



function createPlatforms() {


    platformObject = new THREE.Object3D;

    platforms.forEach(function (platform) {
        platform.create()
    })


    scene.add(platformObject)


}







var keys = []

function handleKeyPressed(event) {

    let oldPos = bob.position.clone();

    //store an entry for every key pressed
    keys[event.keyCode] = true;

    //Right
    if (keys[39]) {
        idle = false;

        bob.rotation.y = Math.PI / 2

        //penguin.position.z = 10
        //penguin.position.x +=5

        player.velX = 1


    }
    //Left   
    else if (keys[37]) {
        idle = false;

        bob.rotation.y = -Math.PI / 2

        //penguin.position.z = -10
        //penguin.position.x -=5

        player.velX = -1





    }
    //Up 
    if (keys[38]) {
        idle = false;
        if (player.height == 0 && floor === true) {
            player.jump = true
        }

    }



    event.preventDefault()


}

function handleKeyReleased(event) {

    //Mark keys that were released
    keys[event.keyCode] = false

    if (event.keyCode == 39 || event.keyCode == 37) {
        player.velX = 0
        bob.rotation.y = 0
        idle = true
    }

    if (event.keyCode == 38) {
        player.jump = false
        idle = true
    }
    event.preventDefault()

}

function createLights() {
    // HemisphereLight
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    scene.add(hemisphereLight);

    // DirectionalLight
    directionalLight = new THREE.DirectionalLight(0xffffff, 1,100);
    directionalLight.position.set(70, mapSize.y/2 - 10, 10);
    directionalLight.castShadow = true
    directionalLight.target.position.x = 100
    scene.add(directionalLight);



        directionalLight.shadow.mapSize.width = mapSize.x;  // default
        directionalLight.shadow.mapSize.height = mapSize.y; // default

        directionalLight.shadow.camera.left = -180
        directionalLight.shadow.camera.right = 30
        directionalLight.shadow.camera.top = 150
        directionalLight.shadow.camera.bottom = -200
        directionalLight.shadow.camera.near = 0.5;    // default
        directionalLight.shadow.camera.far = mapSize.y/2

    directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    let helper = new THREE.CameraHelper( directionalLight.shadow.camera );
    scene.add(directionalLightHelper);
    scene.add(helper)

}

function jumpStart() {
    penguin.children[0].children[4].rotation.z = 7 * Math.PI / 6
    penguin.children[0].children[5].rotation.z = -7 * Math.PI / 6

}

function jumpMiddle() {
    penguin.children[0].children[2].rotation.z = -Math.PI / 2
    penguin.children[0].children[3].rotation.z = Math.PI / 2
    penguin.children[0].children[1].rotation.x = Math.PI / 14
}

function jumpEnd() {
    penguin.children[0].children[4].rotation.z = 27 * Math.PI / 20
    penguin.children[0].children[5].rotation.z = -27 * Math.PI / 20
    penguin.children[0].children[2].rotation.z = 27 * Math.PI / 20
    penguin.children[0].children[3].rotation.z = -27 * Math.PI / 20
    penguin.children[0].children[1].rotation.x = 0
}

function jump() {

    if (player.jump == true) {
        jumpStart()
        if (player.height > heightLimit) {
            player.jump = false

        } else if (checkBoundariesTop()) {
            player.velY -= 1
            player.jump = false

        } else {
            player.velY = 2
            player.height += 2
        }
    }

    if (player.jump == false) {
        if (penguin.position.y == 0 || checkFloor()) {
            player.height = 0

        } else {
            jumpMiddle()
        }
    }

}

function updateCharacter(oldPos) {


   
    if (checkFloor() && player.jump == false) {
        floor = true
    } else {
        floor = false
    }


    if (bob.position.y > 0 && floor === false) {
        bob.position.y -= grav * speed

    } else if (floor === true) {
        bob.position.y = oldPos.y
        jumpEnd()
    }

    jump()

    // update the Character's position

    if (!checkBoundariesFront()) {
        bob.position.x += player.velX * speed;
    }



    bob.position.y += player.velY * speed;




    player.velY = 0


}

function updatePowerUps(){
    
    if( powerUpHeight >= 5){
        powerUpDirection = -0.2
    }else if(powerUpHeight <= 0){
        powerUpDirection = 0.2    
    }

    for(let i = 0; i < powerUpObject.children.length; i++){
        powerUpObject.children[i].rotation.y += 0.1
        powerUpObject.children[i].position.y += powerUpDirection

        
    }
    powerUpHeight += powerUpDirection
}

function jumpPowerUp(){

    if(jumpPowerUpCounter > 0){
        heightLimit = 200
        jumpPowerUpCounter -= 1
    }else {
        heightLimit = 100
    }
}
/*
function idleAnimation() {
    if (idle = false) {
        console.log("saido")        
        penguin.children[0].rotation.z = 0;
    }
    else if (idle = true || penguin.children[0].rotation.z <= Math.PI/6) {
        penguin.children[0].rotation.z += Math.PI * 0.002;
    }
    else if (idle = true || penguin.children[0].rotation.z >= Math.PI/6) {
        penguin.children[0].rotation.z += Math.PI * 0.002;
    }
  
   
}
*/




function checkBoundariesFront() {

    let penguinBox = new THREE.Box3().setFromObject(boundaryBoxFront)

    for (let i = 0; i < borders.length; i++) {

        let borderBox = new THREE.Box3().setFromObject(borders[i])
        let collision = penguinBox.intersectsBox(borderBox);


        if (collision) {

            return true
        }
    }
    return false
}
/*
function checkBoundariesBack(){
    
    let penguinBox = new THREE.Box3().setFromObject(boundaryBoxBack)
    
    for(let i = 0; i < borders.length;i++){

        let borderBox = new THREE.Box3().setFromObject(borders[i])
        let collision = penguinBox.intersectsBox(borderBox);
        

        if(collision){
      
            return true
        }
    }
    return false
}
*/

function checkPowerUp(){

    let penguinBox = new THREE.Box3().setFromObject(penguin)

    
    for (let i = 0; i < powerUpObject.children.length; i++) {

        let borderBox = new THREE.Box3().setFromObject( powerUpObject.children[i])
        let collision = penguinBox.intersectsBox(borderBox);


        if (collision) {
            powerUpObject.remove(powerUpObject.children[i])
            jumpPowerUpCounter = 300
            return true
        }
    }
    return false
}


function checkBoundariesTop() {

    let penguinBox = new THREE.Box3().setFromObject(boundaryBoxTop)

    for (let i = 0; i < borders.length; i++) {

        let borderBox = new THREE.Box3().setFromObject(borders[i])
        let collision = penguinBox.intersectsBox(borderBox);


        if (collision) {

            return true
        }
    }
    return false
}


function checkFloor() {
    let penguinBox = new THREE.Box3().setFromObject(boundaryBoxBottom)

    for (let i = 0; i < borders.length; i++) {

        let borderBox = new THREE.Box3().setFromObject(borders[i])
        let collision = penguinBox.intersectsBox(borderBox);


        if (collision) {

            return true
        }
    }
    return false
}

function lavaCollision(id){
    let penguinBox = new THREE.Box3().setFromObject(penguin.children[0].children[0])

  

        let borderBox = new THREE.Box3().setFromObject(lava)
        let collision = penguinBox.intersectsBox(borderBox);
        

        if(collision){

            console.log("game over")
            alert("Game over!")
            cancelAnimationFrame(id)
            return true
        }else{
            return false
        }
        
}



function checkEnd(id){
    let penguinBox = new THREE.Box3().setFromObject(boundaryBoxBottom)

    
    
    for (let i = 0; i < endBorders.length; i++) {

        let borderBox = new THREE.Box3().setFromObject(endBorders[i])
        let collision = penguinBox.intersectsBox(borderBox);


        if (collision) {

            console.log("Great! Bob has escaped!")
            alert("Great! Bob has escaped!")
            cancelAnimationFrame(id)
            return true
        }
    }
    return false

}


function animate() {

    
    let oldPos = bob.position.clone();
    checkPowerUp()
    lava.position.y += 0.2
    //camera.position.x = bob.position.x + 100;
    camera.position.y = bob.position.y + 20;

    camera.lookAt(bob.position)

    updateCharacter(oldPos)
    updatePowerUps()
    jumpPowerUp()
    moveLava()
  // idleAnimation()

    
    renderer.render(scene, camera)

    // render
   let id =  requestAnimationFrame(animate);

   lavaCollision(id)
   
   checkEnd(id)
   

    // penguin.rotation.y += Math.PI * 0.002

}