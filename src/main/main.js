import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
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

// 监听鼠标事件
// document.addEventListener('mousemove', (event) => {
//
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;
//     const mouseXNorm = (mouseX / window.innerWidth) * 2 - 1;
//     const mouseYNorm = -(mouseY / window.innerHeight) * 2 + 1;
//     const mouseVector = new THREE.Vector3(mouseXNorm, mouseYNorm, 0.5);
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouseVector, camera);
//     const intersects = raycaster.intersectObjects(scene.children);
//     if (intersects.length > 0) {
//         const intersect = intersects[0];
//         const object = intersect.object;
//         object.material.color.set(0xff0000);
//     } else {
//         cube.material.color.set(0x00ff00);
//     }
// });

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

const clock  = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.y += degreesToRadians(400);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cude 移动
    // cube.position.x += 0.01;
    // cube.position.y += 0.01;
    // if (cube.position.y > 5) {
    //     // cube.position.x = -5;
    //     cube.position.y = 0;
    // }

    const time = clock.getElapsedTime();
    const delta = clock.getDelta();

    const t = time % 5;
    console.log('%c--🚀🚀🚀🚀🚀------main.js---注释所在行数73--t--😊===》','color: red;font-size:x-large',t)
    cube.position.x = t * 1;

    renderer.render(scene, camera);

}

animate();
