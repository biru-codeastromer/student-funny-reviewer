import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls } from '@react-three/drei';

function Cap(props) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time) * 0.1;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color="#4B0082" />
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
    </mesh>
  );
}

export default function GraduationCap() {
  return (
    <div className="h-[300px] w-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Cap position={[0, 0, 0]} />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
