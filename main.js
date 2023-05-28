import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// Grid Helper
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

// Load OBJ
const mtlLoader = new MTLLoader();
mtlLoader.load('rocket/Toy_Rocket.mtl', function (materials) {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load('rocket/Toy_Rocket.obj', function (object) {
    scene.add(object);
  });
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);


camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

// Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  
	renderer.render( scene, camera );
}
animate();