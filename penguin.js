let penguin;


window.onload = function init() {
    createScene();

    createCharacter();
    createLights()



    animate();
    window.addEventListener('keydown', handleKeyPressed, false);
    window.addEventListener('keyup', handleKeyReleased, false);

}