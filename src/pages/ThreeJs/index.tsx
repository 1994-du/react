import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { Flex,Form,Radio } from 'antd';
import type { CheckboxChangeEvent } from 'antd';
import imgData from '@/assets/20211017-1.jpeg'
import imgData2 from '@/assets/WechatIMG10.jpg'
import styles from './three.module.scss'

export default function ThreeJs() {
    const [geometry, setGeometry] = useState<THREE.BufferGeometry>(new THREE.SphereGeometry(2, 50, 50))
    const [geometryType, setGeometryType] = useState('Sphere')
    
    useEffect(() => {
        // 场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('rgba(255, 255, 255, 0)');
        // 创建纹理加载器
        const textureLoader = new THREE.TextureLoader();
        
        // 材质类型：可以是单一材质或材质数组
        let materials: THREE.Material | THREE.Material[];
        
        if (geometryType === 'Box') {
            // 为正方体创建材质数组（每个面一个材质）
            // 加载6个不同的纹理（这里使用同一张图片作为示例）
            // 实际使用时，可以替换为不同的图片路径
            const texture1 = textureLoader.load(imgData);
            const texture2 = textureLoader.load(imgData2);
            const texture3 = textureLoader.load(imgData);
            const texture4 = textureLoader.load(imgData);
            const texture5 = textureLoader.load(imgData);
            const texture6 = textureLoader.load(imgData);
            
            materials = [
                new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide }),  // 右面
                new THREE.MeshBasicMaterial({ map: texture2, side: THREE.DoubleSide }),  // 左面
                new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide }),  // 上面
                new THREE.MeshBasicMaterial({ map: texture4, side: THREE.DoubleSide }),  // 下面
                new THREE.MeshBasicMaterial({ map: texture5, side: THREE.DoubleSide }),  // 前面
                new THREE.MeshBasicMaterial({ map: texture6, side: THREE.DoubleSide }),  // 后面
            ];
        } else {
            // 其他几何体使用单一材质
            const texture = textureLoader.load(imgData);
            materials = new THREE.MeshBasicMaterial({ 
                map: texture,
                side: THREE.DoubleSide
            });
        }
        
        const mesh = new THREE.Mesh(geometry, materials);
        // 调整位置，确保在相机视野内
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
        // 透视投影相机
        const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
        camera.position.z = 5;
        // 渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(300, 300);
        // 添加到DOM
        const container = document.getElementById('three-js');
        if (container) {
            container.appendChild(renderer.domElement);
        }
        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            // 旋转物体
            if (geometryType === 'Sphere'||geometryType === 'Box') {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
            }
            
            renderer.render(scene, camera);
        };
        animate();
        // 清理函数
        return () => {
            if (container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [geometry, geometryType]);
    const geometryOptions = [
        { label: '球体', value: 'Sphere' },
        { label: '盒子', value: 'Box' },
        { label: '圆锥体', value: 'Cone' },
        { label: '圆柱体', value: 'Cylinder' },
        { label: '平面', value: 'Plane' },
        { label: '圆平面', value: 'Circle' },
    ]
    const changeGeometry = (e: CheckboxChangeEvent) => {
        setGeometryType(e.target.value)
        if (e.target.value === 'Sphere') {
        setGeometry(new THREE.SphereGeometry(2, 50, 50))
        } else if (e.target.value === 'Box') {
        setGeometry(new THREE.BoxGeometry(2, 2, 2))
        } else if (e.target.value === 'Cone') {
        setGeometry(new THREE.ConeGeometry(1, 32))
        } else if (e.target.value === 'Cylinder') {
        setGeometry(new THREE.CylinderGeometry(1, 1, 1))
        } else if (e.target.value === 'Plane') {
        setGeometry(new THREE.PlaneGeometry(1, 1))
        } else if (e.target.value === 'Circle') {
        setGeometry(new THREE.CircleGeometry(1, 32))
        }
    }
    return (
        <div className='p-[1rem]'>
            <div id="three-js"></div>
            <Form>
                <Form.Item
                    label="几何体" 
                    name="geometry" 
                    className={styles['ant-form-item-control-input-content']}>
                    <Radio.Group options={geometryOptions} defaultValue="Sphere" onChange={changeGeometry}/>
                </Form.Item>
            </Form>
            <Flex className="!mt-[1rem]" vertical justify="flex-start" align="start" gap="20px">
                <span className={styles['span']}>场景:scene <code>const scene = new THREE.Scene();</code></span>
                <span className={styles['span']}>几何体:geometry 
                    <code>const geometry = new THREE.BoxGeometry(1, 1, 1);</code>
                    <code>const geometry = new THREE.SphereGeometry(3, 50, 50);</code>
                    <code>const geometry = new THREE.CircleGeometry(1, 32);</code>
                    <code>const geometry = new THREE.PlaneGeometry(1, 1);</code>
                    <code>const geometry = new THREE.ConeGeometry(1, 32);</code>
                    <code>const geometry = new THREE.CylinderGeometry(1, 1, 1);</code>
                </span>
                <span className={styles['span']}>材质:material <code>const material = new THREE.MeshBasicMaterial( 0x00ff00 );</code></span>
                <span className={styles['span']}>网络模型:mesh <code>const mesh = new THREE.Mesh(geometry, material);</code></span>
                <span className={styles['span']}>相机:camera <code>const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);</code></span>
                <span className={styles['span']}>相机:camera <code>camera.position.z = 5;</code></span>
                <span className={styles['span']}>渲染:renderer <code>const renderer = new THREE.WebGLRenderer();</code></span>
            </Flex>
        </div>
    )
}