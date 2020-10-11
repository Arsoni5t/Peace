//Variables for setup

let container;
let camera;
let renderer;
let scene;
let shark;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(45, 0, 2000);

  const ambient = new THREE.AmbientLight(0x404040, 4); //ambiant light
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1.5); //3d lighting
  light.position.set(10, 0, 100);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./shark/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    shark = gltf.scene.children[0]; //the shark
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate); //rotation animation
  shark.rotation.z += 0.002;
  renderer.render(scene, camera);
}

init();

function onWindowResize() { //resizes window to window size
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
