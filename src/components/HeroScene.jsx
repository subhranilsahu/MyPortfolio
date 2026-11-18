import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'

function GoldenObject() {
  const group = useRef()
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return

    const scrollMotion = Math.min(scrollY.current / 1200, 1)

    const targetX = -state.pointer.y * 0.4 + scrollMotion * 0.12
    const targetY = state.pointer.x * 0.6 + scrollMotion * 0.35
    const targetPositionY = state.pointer.y * 0.12 - scrollMotion * 0.18

    const smooth = Math.min(1, delta * 3)

    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * smooth

    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * smooth

    group.current.position.x +=
      (state.pointer.x * 0.12 - group.current.position.x) * smooth

    group.current.position.y +=
      (targetPositionY - group.current.position.y) * smooth
  })

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={group}>
        <mesh scale={0.72}>
          <torusKnotGeometry args={[1, 0.32, 180, 24]} />
          <MeshDistortMaterial
            color="#c6ff00"
            metalness={0.85}
            roughness={0.24}
            distort={0.3}
            speed={1.5}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 5]} intensity={1.5} />
        <pointLight position={[-3, 1, 2]} intensity={0.7} color="#c6ff00" />
        <Environment preset="city" />
        <GoldenObject />
      </Canvas>
    </div>
  )
}
