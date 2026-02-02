import * as THREE from 'three';
import { useEffect } from 'react';
import imgData from '@/assets/20211017-1.jpeg'
import { div } from 'three/tsl';
export default function Sphere() {
    useEffect(() => {
    // 场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('rgba(255, 255, 255, 0)');
    // 创建纹理加载器
    const textureLoader = new THREE.TextureLoader();
    // 加载图片纹理（需要将图片放在 public 目录下）
    const texture = textureLoader.load(imgData);
    // 创建带纹理的材质
    const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        side: THREE.DoubleSide  // 双面渲染
    });  
  // 几何体和材质
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // new THREE.SphereGeometry(
    //     radius,          // 球体半径
    //     widthSegments,   // 水平分段数（经线数量）
    //     heightSegments,  // 垂直分段数（纬线数量）
    //     phiStart,        // 水平起始角度（可选，默认0）
    //     phiLength,       // 水平角度范围（可选，默认2*PI）
    //     thetaStart,      // 垂直起始角度（可选，默认0）
    //     thetaLength      // 垂直角度范围（可选，默认PI）
    // )
    const geometry = new THREE.SphereGeometry(3, 50, 50);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    // 调整位置，确保在相机视野内
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    
    // 透视投影相机
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    camera.position.z = 5;
    
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(100, 100);
    
    // 添加到DOM
    const container = document.getElementById('three-sphere');
    if (container) {
      container.appendChild(renderer.domElement);
    }
    
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      // 旋转物体
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    
    animate();
    
    // 清理函数
    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);
  return (
    <div className='w-100 h-[100px]'>
        <div id='three-sphere'></div>
    </div>
  )
}