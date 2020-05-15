// THREEJS RELATED VARIABLES
let scene, renderer, camera;

// 3D Models
let sea, sky, plane, propeller;

// LIGHTS
let hemisphereLight, directionalLight, directionalLightHelper;

let curve;

// let controls;
let mousePos = {
    x: 0,
    y: 0
};


window.onload = function init() {
    // set up the scene, the camera and the renderer
    createScene();
    // add the lights createLights();
    // add the objects
    createPlane();
    createSea();
    createSky();
    createLights();
    window.addEventListener('mousemove', handleMouseMove);
    drawCircle();


    // start a loop that will update the objects' positions 
    // and render the scene on each frame
    animate();
    
}
function drawCircle() {
    curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        200, 200,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle        
    );
    var points = curve.getPoints( 50 );
var geometry = new THREE.BufferGeometry().setFromPoints( points );

var material = new THREE.LineBasicMaterial({  color : 0xff0000 } );

// Create the final object to add to the scene
var ellipse = new THREE.Line( geometry, material );
scene.add(ellipse)
}
//INIT THREE JS, SCREEN, SCENE, CAMERA AND MOUSE EVENTS
function createScene() {
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100);

    // create a camera, which defines where we're looking at
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

    // position the camera
    camera.position.x = 0;
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

function createLights() {
    // HemisphereLight
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    scene.add(hemisphereLight);

    // DirectionalLight
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(100, 80, 50);
    directionalLight.target = 
    scene.add(directionalLight);

    directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight );    
    scene.add( directionalLightHelper );

}

function createSea() {

    // create the geometry (shape) of the cylinder: radius top, radius bottom, height, number of segments on the radius, number of segments vertically
    let geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    // rotate the geometry on the x axis (alters the vertices coordinates, DOES NOT alter the mesh axis coordinates )
    geometry.rotateX(-Math.PI / 2);

    // create the material
    let material = new THREE.MeshPhongMaterial({
        color: 0x68c3c0,
        transparent: true,
        opacity: 0.6,
        flatShading: true,
        wireframe: false
    }); //ALTERED: change wireframe=true to wireframe=false

    // create the mesh: geometry + material
    sea = new THREE.Mesh(geometry, material); // creates picket mesh

    // push it a little bit at the bottom of the scene
    sea.position.y = -600;

    // let axes = new THREE.AxesHelper(600);
    // sea.add(axes)

    console.log("Sea created")
    scene.add(sea);
}

function createSky() {
    // create an empty container
    sky = new THREE.Object3D();
    // push its center a bit towards the bottom of the screen (like the sea)
    sky.position.y = -600;

    // ADDED CODE STARTS HERE
    // create a cube geometry; this shape will be duplicated to create the cloud
    const geometry = new THREE.BoxGeometry(20, 20, 20);

    const material = new THREE.MeshPhongMaterial({
        color: 0xd8d0d1,
        wireframe: false
    });

    // choose a number of clouds to be scattered in the sky
    const nClouds = 20;

    // to distribute the clouds consistently, place them according to a uniform angle
    const stepAngle = Math.PI * 2 / nClouds;

    // create the clouds and add them to the sky mesh
    for (let i = 0; i < nClouds; i++) {
        // create an empty container that will hold the different parts (cubes) of the cloud
        let cloud = new THREE.Object3D();

        // duplicate the geometry a random number of times
        let nBlocs = 3 + Math.floor(Math.random() * 3);
        for (var j = 0; j < nBlocs; j++) {
            let m = new THREE.Mesh(geometry, material);

            // set the position and the rotation of each cube randomly
            m.position.x = j * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;

            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;

            // set the size of the cube randomly
            let s = .1 + Math.random() * 1.9;
            m.scale.set(s, s, s);

            cloud.add(m);
        }

        // set the rotation and the position of each cloud
        let a = stepAngle * i; // final angle of the cloud
        let h = 750 + Math.random() * (950 - 750); // distance between the center of the axis and the cloud itself

        // Trigonometry: converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
        cloud.position.y = Math.sin(a) * h;
        cloud.position.x = Math.cos(a) * h;

        // for a better result, position the clouds at random depths inside of the scene
        cloud.position.z = -400 - Math.random() * 400;

        // rotate the cloud according to its position
        cloud.rotation.z = a + Math.PI / 2;

        // add the mesh of each cloud to the sky
        sky.add(cloud);
    }

    console.log("Sky created")
    scene.add(sky);
}

function createPlane() {
    plane = new THREE.Object3D();

    // scale it down
    plane.scale.set(0.25, 0.25, 0.25);
    // push it up
    plane.position.y = 100;

    // ADDED CODE STARTS HERE
    const materialRed = new THREE.MeshPhongMaterial({
        color: 0xf25346,
        wireframe: false
    });
    const materialWhite = new THREE.MeshPhongMaterial({
        color: 0xd8d0d1,
        wireframe: false
    });
    const materialBrown = new THREE.MeshPhongMaterial({
        color: 0x59332e,
        wireframe: false
    });
    const materialDarkBrown = new THREE.MeshPhongMaterial({
        color: 0x23190f,
        wireframe: false
    });

    // Create the cabin
    let geomCockpit = new THREE.BoxGeometry(60, 50, 50);
    let cockpit = new THREE.Mesh(geomCockpit, materialRed);
    plane.add(cockpit);

    // Create the engine
    let geomEngine = new THREE.BoxGeometry(20, 50, 50);
    let engine = new THREE.Mesh(geomEngine, materialWhite);
    engine.position.x = 40; //40 = 60/2 (cockpit) + 20/10 (engine)
    plane.add(engine);

    // Create the tail
    let geomTailPlane = new THREE.BoxGeometry(15, 20, 5);
    let tail = new THREE.Mesh(geomTailPlane, materialRed);
    tail.position.set(-35, 25, 0);
    plane.add(tail);

    // Create the wing
    let geomSideWing = new THREE.BoxGeometry(40, 8, 150);
    let sideWing = new THREE.Mesh(geomSideWing, materialRed);
    plane.add(sideWing);

    // propeller
    let geomPropeller = new THREE.BoxGeometry(20, 10, 10);
    propeller = new THREE.Mesh(geomPropeller, materialBrown);

    // blade
    let geomBlade = new THREE.BoxGeometry(1, 100, 20);
    let blade = new THREE.Mesh(geomBlade, materialDarkBrown);
    blade.position.set(8, 0, 0);

    propeller.add(blade);
    propeller.position.set(50, 0, 0);

    plane.add(propeller);


    console.log("Plane created")
    scene.add(plane);
}
// CALLBACK FOR MOUSE MOVE EVENT
function handleMouseMove(event) {
    let tx = -1 + (event.clientX / window.innerWidth) * 2;
    let ty = 1 - (event.clientY / window.innerHeight) * 2;
    mousePos = {
        x: tx,
        y: ty
    };    
}
// UPDATE PLANE POSITION USING MOUSE
function updatePlane() {
    let targetX = mousePos.x * 100;
    let targetY = mousePos.y * 100;
    // update the airplane's position
    plane.position.y = targetY + 100;
    plane.position.x = targetX;
    }

function animate() {
    // rotate de propeller
    propeller.rotation.x += 0.3;
    // rotate the background (use AxesHelper to verify which axis is the rotation one)
    sky.rotation.z += 0.01;
    sea.rotation.z += 0.005;

    // render
    renderer.render(scene, camera);
    updatePlane();   
    directionalLightHelper.update();

    requestAnimationFrame(animate);
}

