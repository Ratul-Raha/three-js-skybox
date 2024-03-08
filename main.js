import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
camera.position.set(-900, -200,-900);

// Create a renderer with antialiasing enabled
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define image paths for each side of the skybox
const imagePaths = [
  'assets/posx.jpg', // right
  'assets/negx.jpg', // left
  'assets/posy.jpg', // top
  'assets/negy.jpg', // bottom
  'assets/posz.jpg', // front
  'assets/negz.jpg'  // back
];

// Create materials for each side of the skybox
const materials = imagePaths.map(path => {
    const texture = new THREE.TextureLoader().load(path);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
});

// Create a cube geometry for the skybox
const geometry = new THREE.BoxGeometry(10000, 10000, 10000);

// Create a mesh with the cube geometry and materials
const skybox = new THREE.Mesh(geometry, materials);

// Add the skybox to the scene
scene.add(skybox);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true; // Enable rotation
controls.enableZoom = false;  // Disable zoom

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}

animate();
