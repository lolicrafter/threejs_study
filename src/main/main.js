import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// camera.position.z = 10
camera.position.set(0, 0, 10);
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

const clock  = new THREE.Clock();

gsap.to(cube.position, {x: 5, duration: 5, });
gsap.to(cube.rotation, {x: degreesToRadians(360), duration: 5, });
function animate() {
    requestAnimationFrame(animate);

    // const time = clock.getElapsedTime();
    // const delta = clock.getDelta();

    // const t = time % 5;
    // cube.position.x = t * 1;

    renderer.render(scene, camera);

}

animate();
