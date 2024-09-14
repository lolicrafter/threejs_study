import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";
import * as dat from 'dat.gui';

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
controls.enableDamping = true;
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

const clock  = new THREE.Clock();

// const ani1 = gsap.to(cube.position, {x: 5, duration: 5,
//     repeat: -1,
//     ease: 'power1.inOut',
//     yoyo: true,
//     delay: 0,
//  onComplete: () => {
//     gsap.to(cube.position, {x: 0, duration: 1, });
//  }
// });
// gsap.to(cube.rotation, {x: degreesToRadians(360), duration: 5,
// repeat: -1,
// ease: 'power1.inOut',
//     // yoyo: true,
// onComplete: () => {
//     gsap.to(cube.rotation, {x: 0, duration: 1, });
//  }
// });


// window.addEventListener('dblclick', () => {
//     if (ani1.isActive()) {
//         ani1.pause();
//     } else {
//         ani1.resume();
//     }
// });


window.addEventListener('resize', () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像头的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
});


// 全屏切换
window.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
        toggleFullScreen();
    }
});

function toggleFullScreen() {
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
        renderer.domElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}


const gui = new dat.GUI();




const params = {
    color: 0xffff00,
    fn: () => {
        gsap.to(cube.position, {x: 5, duration: 2, yoyo: true, repeat: -1});
    }
};

gui.addColor(params, 'color').name('颜色').onChange((value) => {
    console.log('值被修改了：' + value);
    cube.material.color.set(value);
})
gui.add(params, 'fn').name('动画').onChange(() => {
    console.log('动画被触发了');
});

const folder = gui.addFolder('动画控制');
folder.add(cube.position, 'x').min(0).max(5).step(0.01).name('移动x轴').onChange((value) => {
    console.log('值被修改了：' + value);
}).onFinishChange((value) => {
    console.log('完全停下来了：' + value);
});

folder.add(cube, 'visible').name('是否显示');
folder.add(cube.material, 'wireframe').name('线框');
folder.add(cube.material, 'opacity').min(0).max(1).step(0.01).name('透明度').onChange((value) => {
    console.log('值被修改了：' + value);
    cube.material.opacity = value;

}).onFinishChange((value) => {
    console.log('完全停下来了：' + value);
});
folder.open();


function animate() {
    requestAnimationFrame(animate);

    controls.update();
    // const time = clock.getElapsedTime();
    // const delta = clock.getDelta();

    // const t = time % 5;
    // cube.position.x = t * 1;

    renderer.render(scene, camera);

}

animate();
