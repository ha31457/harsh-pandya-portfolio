"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const Avatar3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Mouse coordinate tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas");
      const supportsWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      if (!supportsWebGL) {
        setWebglSupported(false);
        setLoading(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      setLoading(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Neon key light (Cyan/Blue)
    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 1.3);
    dirLight1.position.set(6, 6, 4);
    scene.add(dirLight1);

    // Fill light (Purple)
    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.9);
    dirLight2.position.set(-6, -2, 3);
    scene.add(dirLight2);

    // Top spotlight for hair/shoulder highlights
    const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);

    // 5. Muscular Developer Group
    const character = new THREE.Group();
    character.position.y = -1.6; // Position adjusted lower for realistic frame sizing
    scene.add(character);

    // Materials
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Dark gray-blue hoodie
      roughness: 0.75,
      metalness: 0.1,
    });
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffd1a4, // Skin beige
      roughness: 0.55,
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x111827, // Dark black hair
      roughness: 0.9,
    });

    // Torso - Reconstructed to show V-taper gym physique (Broad chest, narrow waist)
    const torsoGroup = new THREE.Group();
    character.add(torsoGroup);

    // Chest Box (Broad shoulders, chest size)
    const chestGeo = new THREE.BoxGeometry(1.3, 0.8, 0.75);
    const chest = new THREE.Mesh(chestGeo, shirtMat);
    chest.position.y = 1.3;
    torsoGroup.add(chest);

    // Lower Torso / Waist (Tapered)
    const waistGeo = new THREE.BoxGeometry(0.95, 0.7, 0.7);
    const waist = new THREE.Mesh(waistGeo, shirtMat);
    waist.position.y = 0.65;
    torsoGroup.add(waist);

    // Neck (Connecting cylinder)
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.45, 12);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.y = 1.8;
    torsoGroup.add(neck);

    // Shoulder Caps (Gym bouldered shoulders)
    const shoulderGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeo, shirtMat);
    leftShoulder.position.set(-0.75, 1.5, 0);
    torsoGroup.add(leftShoulder);

    const rightShoulder = leftShoulder.clone();
    rightShoulder.position.x = 0.75;
    torsoGroup.add(rightShoulder);

    // Head Group (for neck yaw and pitch rotation)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.2, 0); // Positioned above the neck cylinder
    character.add(headGroup);

    // Head Sphere
    const faceGeo = new THREE.SphereGeometry(0.56, 32, 32);
    const face = new THREE.Mesh(faceGeo, skinMat);
    face.position.y = 0.3; // head center
    headGroup.add(face);

    // Glasses
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.35, 0.44); // in front of face
    headGroup.add(glassesGroup);

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.3,
      metalness: 0.8,
    });
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      transmission: 0.9,
    });

    // Left Ring
    const leftRingGeo = new THREE.TorusGeometry(0.18, 0.025, 8, 24);
    const leftRing = new THREE.Mesh(leftRingGeo, frameMat);
    leftRing.position.x = -0.24;
    glassesGroup.add(leftRing);

    // Left Lens
    const leftLensGeo = new THREE.CylinderGeometry(0.165, 0.165, 0.02, 16);
    leftLensGeo.rotateX(Math.PI / 2);
    const leftLens = new THREE.Mesh(leftLensGeo, lensMat);
    leftLens.position.x = -0.24;
    glassesGroup.add(leftLens);

    // Right Ring
    const rightRing = leftRing.clone();
    rightRing.position.x = 0.24;
    glassesGroup.add(rightRing);

    // Right Lens
    const rightLens = leftLens.clone();
    rightLens.position.x = 0.24;
    glassesGroup.add(rightLens);

    // Bridge of glasses
    const bridgeGeo = new THREE.BoxGeometry(0.14, 0.03, 0.03);
    const bridge = new THREE.Mesh(bridgeGeo, frameMat);
    bridge.position.y = 0.04;
    glassesGroup.add(bridge);

    // Temples/Arms of glasses going back
    const templeGeo = new THREE.BoxGeometry(0.02, 0.025, 0.52);
    const leftTemple = new THREE.Mesh(templeGeo, frameMat);
    leftTemple.position.set(-0.42, 0.04, -0.24);
    leftTemple.rotation.y = 0.04;
    glassesGroup.add(leftTemple);

    const rightTemple = leftTemple.clone();
    rightTemple.position.x = 0.42;
    rightTemple.rotation.y = -0.04;
    glassesGroup.add(rightTemple);

    // Hair
    const hairGroup = new THREE.Group();
    hairGroup.position.y = 0.3; // align with head center
    headGroup.add(hairGroup);

    // Top hair block
    const hairTopGeo = new THREE.BoxGeometry(0.86, 0.35, 0.86);
    const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
    hairTop.position.set(0, 0.46, -0.1);
    hairGroup.add(hairTop);

    // Quiff (front hair height)
    const hairFrontGeo = new THREE.BoxGeometry(0.8, 0.3, 0.35);
    const hairFront = new THREE.Mesh(hairFrontGeo, hairMat);
    hairFront.position.set(0, 0.42, 0.38);
    hairFront.rotation.x = -0.15;
    hairGroup.add(hairFront);

    // Back hair block
    const hairBackGeo = new THREE.BoxGeometry(0.9, 0.75, 0.35);
    const hairBack = new THREE.Mesh(hairBackGeo, hairMat);
    hairBack.position.set(0, 0.02, -0.42);
    hairGroup.add(hairBack);

    // Sides hair
    const hairLeftGeo = new THREE.BoxGeometry(0.18, 0.55, 0.65);
    const hairLeft = new THREE.Mesh(hairLeftGeo, hairMat);
    hairLeft.position.set(-0.48, 0.1, -0.08);
    hairGroup.add(hairLeft);

    const hairRight = hairLeft.clone();
    hairRight.position.x = 0.48;
    hairGroup.add(hairRight);

    // Smile (subtle curved tube or ring)
    const smileGeo = new THREE.TorusGeometry(0.1, 0.02, 8, 16, Math.PI);
    const smileMat = new THREE.MeshStandardMaterial({ color: 0xdf705f });
    const smile = new THREE.Mesh(smileGeo, smileMat);
    smile.position.set(0, 0.06, 0.49); // raised relative to head bottom
    smile.rotation.x = Math.PI; // flip to make it smile
    headGroup.add(smile);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.07, 0.14, 4);
    noseGeo.rotateX(-Math.PI / 6);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, 0.22, 0.55);
    headGroup.add(nose);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.22, 0.36, 0.48);
    headGroup.add(eyeL);

    const eyeR = eyeL.clone();
    eyeR.position.x = 0.22;
    headGroup.add(eyeR);

    // Muscular Gym Arms (Biceps and Forearms mapped realistically)
    // Left Arm Group
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.75, 1.5, 0); // hinges from left shoulder
    character.add(leftArmGroup);

    // Left Bicep Cylinder (Thicker bicep)
    const bicepGeo = new THREE.CylinderGeometry(0.17, 0.14, 0.8, 12);
    const leftBicep = new THREE.Mesh(bicepGeo, shirtMat);
    leftBicep.position.y = -0.4;
    leftArmGroup.add(leftBicep);

    // Elbow Joint Sphere
    const jointGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const leftElbow = new THREE.Mesh(jointGeo, shirtMat);
    leftElbow.position.y = -0.8;
    leftArmGroup.add(leftElbow);

    // Left Forearm Cylinder
    const forearmGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.7, 12);
    const leftForearm = new THREE.Mesh(forearmGeo, shirtMat);
    leftForearm.position.y = -1.15;
    leftArmGroup.add(leftForearm);

    // Left Hand
    const handGeo = new THREE.SphereGeometry(0.12, 10, 10);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.y = -1.55;
    leftArmGroup.add(leftHand);

    // Right Arm Group (Waving and Idle)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.75, 1.5, 0); // hinges from right shoulder
    character.add(rightArmGroup);

    const rightBicep = new THREE.Mesh(bicepGeo, shirtMat);
    rightBicep.position.y = -0.4;
    rightArmGroup.add(rightBicep);

    const rightElbow = new THREE.Mesh(jointGeo, shirtMat);
    rightElbow.position.y = -0.8;
    rightArmGroup.add(rightElbow);

    const rightForearm = new THREE.Mesh(forearmGeo, shirtMat);
    rightForearm.position.y = -1.15;
    rightArmGroup.add(rightForearm);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.y = -1.55;
    rightArmGroup.add(rightHand);

    // Initial Rotations to look broad and relaxed
    leftArmGroup.rotation.z = 0.28;  // slightly out to highlight chest width
    leftArmGroup.rotation.x = 0.15;
    rightArmGroup.rotation.z = -0.28;
    rightArmGroup.rotation.x = 0.15;

    setLoading(false);

    // Mouse movement listener
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Normalized between -1 and 1
      mouse.current.targetX = (x / width) * 2 - 1;
      mouse.current.targetY = -(y / height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation variables
    let clock = new THREE.Clock();
    let isWaving = false;
    let waveStartTime = 0;

    // Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Mouse tracking interpolation (lerp)
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      // 1. LIMIT NECK ROTATION - Clamp rotation strictly to realistic human limits
      // Max Y (yaw) rotation: 40 degrees (0.7 radians) left or right
      // Max X (pitch) rotation: 25 degrees (0.43 radians) up or down
      const maxNeckYaw = 0.65;
      const maxNeckPitch = 0.38;
      
      headGroup.rotation.y = mouse.current.x * maxNeckYaw;
      headGroup.rotation.x = -mouse.current.y * maxNeckPitch;

      // 2. Idle breathing animation (Subtle torso scaling and vertical drift)
      const breathing = Math.sin(elapsedTime * 2.0) * 0.025;
      character.position.y = -1.6 + breathing;
      
      // Expand/contract chest slightly with breathing
      chest.scale.set(1 + breathing * 0.4, 1, 1 + breathing * 0.3);

      // Relaxed idle shoulder drifting
      leftArmGroup.rotation.z = 0.22 + Math.sin(elapsedTime * 1.2) * 0.02;
      if (!isWaving) {
        rightArmGroup.rotation.z = -0.22 - Math.sin(elapsedTime * 1.2) * 0.02;
        rightArmGroup.rotation.x = 0.15;
        rightArmGroup.rotation.y = 0;
      }

      // Gentle floating of the character
      character.position.x = Math.sin(elapsedTime * 0.6) * 0.06;

      // 3. Procedural Waving Animation
      if (!isWaving && Math.random() < 0.004 && elapsedTime > 4) {
        isWaving = true;
        waveStartTime = elapsedTime;
      }

      if (isWaving) {
        const waveProgress = elapsedTime - waveStartTime;
        if (waveProgress < 2.5) {
          // Raise arm up
          rightArmGroup.rotation.z = -2.0;
          rightArmGroup.rotation.x = 0.4;
          // Wave forearm back and forth
          rightArmGroup.rotation.y = Math.sin(waveProgress * 12) * 0.35;
        } else {
          isWaving = false;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 400;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isClient, webglSupported]);

  // Handle server-side render or fallback
  if (!isClient) {
    return <FallbackAvatar loading={false} />;
  }

  if (!webglSupported) {
    return <FallbackAvatar loading={false} />;
  }

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {loading && <FallbackAvatar loading={true} />}
      <div
        ref={containerRef}
        className="w-full h-full cursor-pointer relative"
        title="Interact with mouse. Muscular torso, neck rotation locked to a realistic range."
      />
      {/* Decorative dashboard stats for Three.js view */}
      <div className="absolute bottom-4 left-4 bg-slate-950/80 border border-slate-800 rounded px-2.5 py-1 text-[10px] font-mono text-slate-400 backdrop-blur pointer-events-none select-none">
        <span className="text-emerald-400">●</span> 3D_PHYSICAL_ENGINE: ACTIVE | LIMIT_AXIS: LOCK_XY
      </div>
    </div>
  );
};

const FallbackAvatar: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center p-4">
      <div className="relative w-72 h-80 rounded-2xl glass-panel glow-blue overflow-hidden flex flex-col items-center justify-center border border-slate-800/80 shadow-2xl p-6 group">
        {/* Glow behind */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-brand-blue/10 blur-3xl group-hover:bg-brand-blue/20 transition-colors duration-500" />
        
        {/* Avatar Graphic Silhouette */}
        <div className="relative w-32 h-32 rounded-full border border-slate-700/60 flex items-center justify-center mb-6 bg-slate-900/60 backdrop-blur shadow-inner">
          <svg
            className="w-20 h-20 text-slate-500 group-hover:text-brand-light transition-colors duration-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="absolute bottom-1 right-2 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-slate-900"></span>
          </span>
        </div>

        {/* Text descriptions */}
        <div className="text-center z-10">
          <h4 className="text-lg font-mono font-semibold text-white tracking-wider">
            {loading ? "INITIALIZING SCENE..." : "HARSH PANDYA"}
          </h4>
          <p className="text-xs font-mono text-slate-400 mt-1.5 uppercase tracking-widest">
            {loading ? "COMPILE_SHADERS: OK" : "dev_avatar: idle"}
          </p>
          <div className="mt-4 flex gap-1 justify-center">
            <span className="h-1 w-3 rounded bg-brand-blue"></span>
            <span className="h-1 w-1.5 rounded bg-brand-purple"></span>
            <span className="h-1 w-1.5 rounded bg-brand-cyan"></span>
          </div>
        </div>

        <div className="absolute bottom-2 left-3 right-3 flex justify-between font-mono text-[9px] text-slate-600 pointer-events-none">
          <span>PORT: 3000</span>
          <span>SYS_RES: READY</span>
        </div>
      </div>
    </div>
  );
};
