import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParallaxStars() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create star field
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
    });

    const starVertices = [];
    const starColors = [];
    const colorPalette = [
      new THREE.Color(0x9333EA), // Purple
      new THREE.Color(0xEC4899), // Pink
      new THREE.Color(0x818CF8), // Indigo
      new THREE.Color(0x38BDF8), // Blue
    ];

    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors.push(color.r, color.g, color.b);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create nebula effect
    const nebulaTexture = new THREE.TextureLoader().load('/nebula.png');
    const nebulaGeometry = new THREE.PlaneGeometry(100, 100);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      map: nebulaTexture,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    nebula.position.z = -50;
    scene.add(nebula);

    camera.position.z = 5;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      stars.rotation.y += 0.001;
      stars.rotation.x += 0.0005;

      nebula.rotation.z += 0.001;
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.remove(stars);
      scene.remove(nebula);
      starGeometry.dispose();
      starMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 100%)'
      }} 
    />
  );
}
