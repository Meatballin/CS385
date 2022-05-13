import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CylinderGeometry, Material } from 'three';

//Gyroscope Notes
// NEED: Skinny Cylinder for pole that it stands on
// Need 3 ring-type objects
// One Disk type object in middle of gyroscope that is perpendicular to the
// flat cylinder object

//Texture reference
const textureLoader = new THREE.TextureLoader();

// const normalTexture = textureLoader.load('/textures/test.png');

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Gyroscope Model
const loader = new GLTFLoader()

//Cylinder Code (post for gyroscope) =====================================

const cylinderObject = new THREE.CylinderGeometry(.5, .5, 30, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial();
cylinderMaterial.color = new THREE.Color(0xffffff)
cylinderMaterial.roughness = .2;
cylinderMaterial.metalness = .7;

//Add to scene and rotate
const post = new THREE.Mesh(cylinderObject,cylinderMaterial);
post.rotation.x = 120
scene.add(post);


// Lights =================================================================

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 0
pointLight.position.y = 15
pointLight.position.z = 0
scene.add(pointLight)

const light1 = gui.addFolder('Light 1')
light1.add(pointLight.position, 'y').min(-10).max(10).step(0.01)
light1.add(pointLight.position, 'x').min(-10).max(10).step(0.01)
light1.add(pointLight.position, 'z').min(-10).max(10).step(0.01)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)

const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.set(0.02, 10,20)
pointLight2.intensity = 1
scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
light2.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
light2.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 60
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({

    canvas: canvas,
    alpha: true,
    antialias: true
    
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */




const clock = new THREE.Clock();

const tick = () =>
{
    //Rotate initial post of gyroscope around world Y-Axis at a slow speed
    post.rotateOnWorldAxis(new THREE.Vector3(0,1,0), .005) 
    const elapsedTime = clock.getElapsedTime()
    
    // Update objects


    // Update Orbital Controls
    // controls.update()

    // Render
    
    renderer.render(scene, camera)
    
    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()