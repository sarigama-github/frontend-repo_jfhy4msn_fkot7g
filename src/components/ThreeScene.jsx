import React, { useEffect, useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ProceduralIceCream(props) {
  const group = useRef()
  // Simple materials with playful colors
  const coneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#C58B55', roughness: 0.9, metalness: 0.05 }), [])
  const scoopMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#FF7BC4', roughness: 0.5, metalness: 0.1 }), [])
  const dripMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#71D7FF', roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.95 }), [])

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={group} {...props}>
      {/* Cone */}
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow material={coneMat}>
        <coneGeometry args={[0.4, 1.2, 32]} />
      </mesh>
      {/* Scoop */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow material={scoopMat}>
        <sphereGeometry args={[0.52, 64, 64]} />
      </mesh>
      {/* Drip */}
      <mesh position={[0.25, -0.15, 0.15]} castShadow material={dripMat}>
        <sphereGeometry args={[0.12, 24, 24]} />
      </mesh>
    </group>
  )
}

function IceCreamModel({ modelRef }) {
  // Try load GLB from public. Fallback to procedural
  let glb
  try {
    glb = useGLTF('/icecream.glb')
  } catch (e) {
    glb = null
  }

  if (!glb) {
    return <ProceduralIceCream ref={modelRef} />
  }

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={glb.scene} />
    </group>
  )
}

function SceneContents({ control }) {
  const modelRef = useRef()

  // Idle rotation
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * control.current.rotationSpeed
    }
  })

  useEffect(() => {
    if (!modelRef.current) return

    const model = modelRef.current

    // Set initial state
    model.position.set(-3, 0, 0)
    model.rotation.set(0, 0, 0)

    // Defaults
    control.current.rotationSpeed = 0.15

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#page-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    })

    // Intro: from left to center, slight rotate
    tl.fromTo(model.position, { x: -3 }, { x: 0, duration: 1.2, ease: 'power3.out' }, 0)
    tl.to(model.rotation, { y: Math.PI * 1.2, duration: 1.2 }, 0.2)

    // Scroll 1 — Hero → Sobre: center and a bit closer
    tl.to(model.position, { z: -0.5, duration: 0.8 }, '+=0.1')

    // Scroll 2 — Sobre → Sabores: move left
    tl.to(model.position, { x: -1.6, duration: 1.0 })

    // Scroll 3 — Sabores → Experiência: move right
    tl.to(model.position, { x: 1.6, duration: 1.0 })

    // Scroll 4 — Experiência → Depoimentos: zoom in a bit
    tl.to(model.position, { z: -1.2, duration: 0.9 })

    // Scroll 5 — Depoimentos → CTA: zoom out and change rotation speed
    tl.to(model.position, { z: -0.2, duration: 0.9 })
    tl.to(model.rotation, { y: "+=" + Math.PI * 1.0, duration: 0.8 }, '<')

    // Control rotation speed based on progress markers
    const speedObj = { s: 0.15 }
    tl.to(speedObj, { s: 0.25, onUpdate: () => (control.current.rotationSpeed = speedObj.s) }, 0.0)
    tl.to(speedObj, { s: 0.18, onUpdate: () => (control.current.rotationSpeed = speedObj.s) }, "+=1")
    tl.to(speedObj, { s: 0.28, onUpdate: () => (control.current.rotationSpeed = speedObj.s) }, "+=1")
    tl.to(speedObj, { s: 0.08, onUpdate: () => (control.current.rotationSpeed = speedObj.s) }, "+=0.8")

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [control])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <Suspense fallback={null}>
        <IceCreamModel modelRef={modelRef} />
      </Suspense>
      <Environment preset="sunset" />
      {/* Controls disabled for production but useful during dev */}
      {/* <OrbitControls enableZoom={false} /> */}
    </>
  )
}

export default function ThreeScene() {
  const control = useRef({ rotationSpeed: 0.15 })

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [0, 0.6, 2.4], fov: 50 }}
      >
        <color attach="background" args={["#FFF9F0"]} />
        <SceneContents control={control} />
      </Canvas>
      {/* Soft gradient overlay to match brand */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(255,123,196,0.25),transparent),radial-gradient(40%_40%_at_80%_70%,rgba(113,215,255,0.25),transparent),radial-gradient(50%_50%_at_20%_80%,rgba(255,232,163,0.25),transparent)]" />
    </div>
  )
}

useGLTF.preload('/icecream.glb')
