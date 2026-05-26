"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const Avatar3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // =========================================================
    // SCENE
    // =========================================================

    const scene = new THREE.Scene();

    // =========================================================
    // CAMERA
    // =========================================================

    const width = mountRef.current.clientWidth;
    const height = 500;

    const camera = new THREE.PerspectiveCamera(
      24,
      width / height,
      0.1,
      100
    );

    camera.position.set(0, 0.9, 8.2);

    // =========================================================
    // RENDERER
    // =========================================================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(width, height);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.shadowMap.enabled = true;

    mountRef.current.appendChild(renderer.domElement);

    // =========================================================
    // LIGHTING
    // =========================================================

    const hemi = new THREE.HemisphereLight(
      0xffffff,
      0xdde7ff,
      2.1
    );

    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(
      0xffffff,
      1.2
    );

    keyLight.position.set(4, 6, 7);

    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      0xffffff,
      0.45
    );

    fillLight.position.set(-4, 1, 5);

    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(
      0xffffff,
      0.35
    );

    rimLight.position.set(0, 3, -5);

    scene.add(rimLight);

    // =========================================================
    // MATERIALS
    // =========================================================

    const skinMat = new THREE.MeshToonMaterial({
      color: 0xc98b68
    });

    const hairMat = new THREE.MeshToonMaterial({
      color: 0x111111,
    });

    const hoodieMat = new THREE.MeshToonMaterial({
      color: 0xdadada,
    });

    const hoodieDarkMat = new THREE.MeshStandardMaterial({
      color: 0xbcbcbc,
      roughness: 1,
    });

    const eyeWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
    });

    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x4b2d16,
      roughness: 0.4,
    });

    const pupilMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });

    const eyeWetMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0,
      transmission: 1,
      thickness: 0.6,
      transparent: true,
      opacity: 0.25,
    });

    const glassesMat = new THREE.MeshStandardMaterial({
      color: 0x262626,
      roughness: 0.35,
      metalness: 0.75,
    });

    const lensMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.15,
      transmission: 1,
      roughness: 0,
      thickness: 0.02,
    });

    const lipMat = new THREE.MeshStandardMaterial({
      color: 0xa25d45,
      roughness: 0.7,
    });

    // =========================================================
    // ROOT
    // =========================================================

    const avatar = new THREE.Group();

    scene.add(avatar);

    // =========================================================
    // BODY
    // =========================================================

    const bodyGroup = new THREE.Group();

    bodyGroup.position.y = -1.9;

    avatar.add(bodyGroup);

    // torso

    const torso = new THREE.Mesh(
      new RoundedBoxGeometry(
        2.25,
        2.45,
        1.45,
        12,
        0.38
      ),
      hoodieMat
    );

    torso.position.y = -0.1;

    bodyGroup.add(torso);

    // hoodie hood

    const hood = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.25, 24, 80),
      hoodieMat
    );

    hood.rotation.x = Math.PI / 2;

    hood.position.y = 1.05;

    bodyGroup.add(hood);

    // inner hoodie opening

    const hoodInner = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.12, 24, 80),
      hoodieDarkMat
    );

    hoodInner.rotation.x = Math.PI / 2;

    hoodInner.position.set(0, 0.95, 0.3);

    bodyGroup.add(hoodInner);

    // shoulders

    const shoulderGeo = new THREE.SphereGeometry(
      0.5,
      32,
      32
    );

    const leftShoulder = new THREE.Mesh(
      shoulderGeo,
      hoodieMat
    );

    leftShoulder.scale.set(1.7, 1, 1);

    leftShoulder.position.set(-1.2, 0.7, 0);

    bodyGroup.add(leftShoulder);

    const rightShoulder = leftShoulder.clone();

    rightShoulder.position.x = 1.2;

    bodyGroup.add(rightShoulder);

    // drawstrings

    const stringGeo = new THREE.CylinderGeometry(
      0.015,
      0.015,
      0.7,
      12
    );

    const stringMat = new THREE.MeshStandardMaterial({
      color: 0x9f9f9f,
      roughness: 1,
    });

    const leftString = new THREE.Mesh(
      stringGeo,
      stringMat
    );

    leftString.position.set(-0.12, 0.65, 1.1);

    leftString.rotation.z = 0.1;

    bodyGroup.add(leftString);

    const rightString = leftString.clone();

    rightString.position.x = 0.12;

    rightString.rotation.z = -0.1;

    bodyGroup.add(rightString);

    // =========================================================
    // HEAD GROUP
    // =========================================================

    const headGroup = new THREE.Group();

    const faceGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.81, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffc4a3,
        transparent: true,
        opacity: 0.08,
      })
    );

    // slightly bigger than head
    faceGlow.scale.set(1.02, 1.02, 1.02);

    headGroup.add(faceGlow);

    headGroup.position.y = 0.65;

    avatar.add(headGroup);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.7, 32),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.08,
      })
    );

    shadow.rotation.x = -Math.PI / 2;

    shadow.position.set(0, -0.85, 0.9);

    headGroup.add(shadow);
    // =========================================================
    // HEAD SHAPE
    // =========================================================

    const headGeo = new THREE.SphereGeometry(
      1,
      64,
      64
    );

    const pos = headGeo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // flatter front face
      if (z > 0) {
        z *= 0.76;
      }

      // cheeks
      if (y > -0.28 && y < 0.28) {
        x *= 1.14;
      }

      // jaw taper
      if (y < -0.18) {
        x *= 0.78;
      }

      // forehead
      if (y > 0.4) {
        x *= 1.04;
      }

      // softer chin
      if (y < -0.55) {
        y *= 0.92;
      }

      pos.setXYZ(i, x, y, z);
    }

    headGeo.computeVertexNormals();

    const head = new THREE.Mesh(
      headGeo,
      skinMat
    );

    head.scale.set(1.18, 1.28, 1.08);

    headGroup.add(head);

    // =========================================================
    // EARS
    // =========================================================

    const earGeo = new THREE.SphereGeometry(
      0.18,
      32,
      32
    );

    const leftEar = new THREE.Mesh(
      earGeo,
      skinMat
    );

    leftEar.scale.set(0.7, 1, 0.55);

    leftEar.position.set(-1.05, -0.02, 0);

    headGroup.add(leftEar);

    const rightEar = leftEar.clone();

    rightEar.position.x = 1.05;

    headGroup.add(rightEar);

    // =========================================================
    // HAIR
    // =========================================================

    const hairGeo = new THREE.SphereGeometry(
      1.02,
      64,
      64
    );

    const hPos = hairGeo.attributes.position;

    for (let i = 0; i < hPos.count; i++) {
      let x = hPos.getX(i);
      let y = hPos.getY(i);
      let z = hPos.getZ(i);

      // remove lower part

      if (y < 0.12) {
        z -= 0.5;
      }

      // flatten top

      if (y > 0.65) {
        y *= 0.9;
      }

      // front shape

      if (z > 0.25 && y > 0.15) {
        z *= 0.96;
      }

      hPos.setXYZ(i, x, y, z);
    }

    hairGeo.computeVertexNormals();

    const hair = new THREE.Mesh(
      hairGeo,
      hairMat
    );

    hair.scale.set(1.22, 1.02, 1.08);

    hair.position.y = 0.34;

    headGroup.add(hair);

    // front hair line

    const frontHair = new THREE.Mesh(
      new RoundedBoxGeometry(
        1.6,
        0.22,
        0.25,
        8,
        0.08
      ),
      hairMat
    );

    frontHair.position.set(0, 1.02, 0.58);

    frontHair.rotation.x = 0.12;

    headGroup.add(frontHair);

    const hairChunkGeo = new THREE.SphereGeometry(
      0.22,
      24,
      24
    );

    for (let i = 0; i < 5; i++) {
      const chunk = new THREE.Mesh(
        hairChunkGeo,
        hairMat
      );

      chunk.scale.set(1.4, 0.7, 1);

      chunk.position.set(
        -0.45 + i * 0.22,
        0.92 - Math.abs(i - 2) * 0.018,
        0.82
      );

      chunk.rotation.x = 0.2;

      headGroup.add(chunk);
    }

    // =========================================================
    // EYES
    // =========================================================

    const eyelids: THREE.Mesh[] = [];
    const pupils: THREE.Mesh[] = [];
    const irises: THREE.Mesh[] = [];

    const createEye = (x: number) => {
      const eyeGroup = new THREE.Group();

      eyeGroup.position.set(x, 0.12, 0.62);

      // eye white

      const eyeWhite = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 32, 32),
        eyeWhiteMat
      );

      eyeWhite.scale.set(1.32, 0.72, 0.28);

      eyeGroup.add(eyeWhite);

      // iris

      const iris = new THREE.Mesh(
        new THREE.CircleGeometry(0.065, 32),
        irisMat
      );

      iris.position.z = 0.12;

      eyeGroup.add(iris);
      irises.push(iris);

      // pupil

      const pupil = new THREE.Mesh(
        new THREE.CircleGeometry(0.018, 32),
        pupilMat
      );

      pupil.position.z = 0.23;

      eyeGroup.add(pupil);
      pupils.push(pupil);

      const corneaGeo = new THREE.SphereGeometry(0.145, 24, 24);

      const cornea = new THREE.Mesh(corneaGeo, eyeWetMat);

      // slightly bigger than eye
      cornea.scale.set(1.02, 0.92, 0.78);

      // push slightly forward
      cornea.position.set(0, 0, 0.02);

      eyeGroup.add(cornea);

      // shine

      const shine = new THREE.Mesh(
        new THREE.CircleGeometry(0.012, 16),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
        })
      );

      shine.position.set(0.02, 0.02, 0.09);

      eyeGroup.add(shine);

      // eyelid

      const lid = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 32, 32),
        skinMat
      );

      lid.scale.set(1.22, 0, 0.5);

      lid.position.z = 0.05;

      eyeGroup.add(lid);

      eyelids.push(lid);

      headGroup.add(eyeGroup);
    };

    createEye(-0.34);
    createEye(0.34);

    // =========================================================
    // EYEBROWS
    // =========================================================

    const browGeo = new THREE.TorusGeometry(
      0.12,
      0.018,
      12,
      32,
      Math.PI * 0.7
    );

    const leftBrow = new THREE.Mesh(
      browGeo,
      hairMat
    );

    leftBrow.rotation.z = 0.2;

    leftBrow.position.set(-0.35, 0.48, 0.8);

    headGroup.add(leftBrow);

    const rightBrow = leftBrow.clone();

    rightBrow.rotation.z = -0.2;

    rightBrow.position.x = 0.35;

    headGroup.add(rightBrow);

    // =========================================================
    // NOSE
    // =========================================================

    const nose = new THREE.Mesh(
      new THREE.CapsuleGeometry(
        0.085,
        0.16,
        8,
        16
      ),
      skinMat
    );

    nose.rotation.x = Math.PI / 2;

    nose.position.set(0, -0.02, 0.88);

    nose.scale.z = 0.8;

    headGroup.add(nose);

    const noseShadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 24),
      new THREE.MeshBasicMaterial({
        color: 0x8a5a3a,
        transparent: true,
        opacity: 0.12,
      })
    );

    noseShadow.position.set(0, -0.18, 0.83);

    headGroup.add(noseShadow);

    // =========================================================
    // MOUTH
    // =========================================================

    const smileCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.16, 0, 0),
      new THREE.Vector3(0, -0.05, 0.02),
      new THREE.Vector3(0.16, 0, 0),
    ]);

    const smileGeo = new THREE.TubeGeometry(
      smileCurve,
      32,
      0.015,
      8,
      false
    );

    const smile = new THREE.Mesh(
      smileGeo,
      lipMat
    );

    smile.position.set(0, -0.42, 0.88);

    headGroup.add(smile);

    const neckShadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.72, 32),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.08,
      })
    );

    neckShadow.rotation.x = -Math.PI / 2;

    neckShadow.position.set(0, -0.88, 0.9);

    headGroup.add(neckShadow);

    // =========================================================
    // GLASSES
    // =========================================================

    const glasses = new THREE.Group();

    glasses.position.z = 0.02;

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.3,
      metalness: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const glassesLensMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      transmission: 1,
      roughness: 0,
      thickness: 0.01,
    });

    // ---------- LEFT FRAME ----------

    const leftFrameTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.018, 0.01),
      frameMat
    );

    leftFrameTop.position.set(-0.34, 0.23, 0.92);

    glasses.add(leftFrameTop);

    const leftFrameBottom = leftFrameTop.clone();

    leftFrameBottom.position.y = 0.01;

    glasses.add(leftFrameBottom);

    const leftFrameLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 0.22, 0.01),
      frameMat
    );

    leftFrameLeft.position.set(-0.54, 0.12, 0.92);

    glasses.add(leftFrameLeft);

    const leftFrameRight = leftFrameLeft.clone();

    leftFrameRight.position.x = -0.14;

    glasses.add(leftFrameRight);

    // ---------- RIGHT FRAME ----------

    const rightFrameTop = leftFrameTop.clone();

    rightFrameTop.position.x = 0.34;

    glasses.add(rightFrameTop);

    const rightFrameBottom = leftFrameBottom.clone();

    rightFrameBottom.position.x = 0.34;

    glasses.add(rightFrameBottom);

    const rightFrameLeft = leftFrameLeft.clone();

    rightFrameLeft.position.x = 0.14;

    glasses.add(rightFrameLeft);

    const rightFrameRight = leftFrameRight.clone();

    rightFrameRight.position.x = 0.54;

    glasses.add(rightFrameRight);

    // ---------- TRANSPARENT LENSES ----------

    const lensGeo = new THREE.PlaneGeometry(
      0.38,
      0.18
    );

    const glareGeo = new THREE.PlaneGeometry(0.38, 0.18);

    const glareMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
    });

    const glare = new THREE.Mesh(glareGeo, glareMat);

    // slight diagonal highlight
    glare.rotation.z = 0.4;

    glare.position.z += 0.001;

    glasses.add(glare);

    const leftLens = new THREE.Mesh(
      lensGeo,
      glassesLensMat
    );

    leftLens.position.set(-0.34, 0.12, 0.925);

    glasses.add(leftLens);

    const rightLens = leftLens.clone();

    rightLens.position.x = 0.34;

    glasses.add(rightLens);

    // ---------- BRIDGE ----------

    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.012, 0.01),
      frameMat
    );

    bridge.position.set(0, 0.12, 0.92);

    glasses.add(bridge);

    // ---------- TEMPLES ----------

    const templeGeo = new THREE.CylinderGeometry(
      0.006,
      0.006,
      0.75,
      8
    );

    templeGeo.rotateZ(Math.PI / 2);

    // left temple

    const leftTemple = new THREE.Mesh(
      templeGeo,
      frameMat
    );

    leftTemple.position.set(-0.72, 0.12, 0.76);

    leftTemple.rotation.y = -0.28;

    glasses.add(leftTemple);

    // right temple

    const rightTemple = leftTemple.clone();

    rightTemple.position.x = 0.72;

    rightTemple.rotation.y = 0.28;

    glasses.add(rightTemple);

    // ---------- NOSE PADS ----------

    const padMat = new THREE.MeshBasicMaterial({
      color: 0xd8d8d8,
    });

    const padGeo = new THREE.SphereGeometry(
      0.014,
      12,
      12
    );

    const leftPad = new THREE.Mesh(
      padGeo,
      padMat
    );

    leftPad.scale.set(1, 0.5, 0.5);

    leftPad.position.set(-0.05, 0.05, 0.88);

    glasses.add(leftPad);

    const rightPad = leftPad.clone();

    rightPad.position.x = 0.05;

    glasses.add(rightPad);

    // subtle realism tilt

    glasses.rotation.z = 0.01;

    headGroup.add(glasses);

    // =========================================================
    // MOUSE TRACKING
    // =========================================================

    const mouse = {
      x: 0,
      y: 0,
    };

    const target = {
      x: 0,
      y: 0,
    };

    const onMouseMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;

      target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener(
      "mousemove",
      onMouseMove
    );

    // =========================================================
    // BLINK SYSTEM
    // =========================================================

    let blinking = false;

    let blinkStart = 0;

    // =========================================================
    // ANIMATION
    // =========================================================

    const clock = new THREE.Clock();

    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // smooth mouse movement

      mouse.x += (target.x - mouse.x) * 0.05;

      mouse.y += (target.y - mouse.y) * 0.05;

      // head movement

      const rawPitch = mouse.y * 0.3;
      headGroup.rotation.x = Math.max(-0.26, Math.min(0.26, rawPitch));

      headGroup.rotation.x = mouse.y * 0.12;

      const eyeOffsetX = mouse.x * 0.012;
      const eyeOffsetY = mouse.y * 0.008;

      pupils.forEach((pupil) => {
        pupil.position.x = eyeOffsetX;
        pupil.position.y = eyeOffsetY;
      });

      irises.forEach((iris) => {
        iris.position.x = eyeOffsetX * 0.7;
        iris.position.y = eyeOffsetY * 0.7;
      });

      // tiny eye moist shimmer
      const shimmer = 0.5 + Math.sin(t * 3) * 0.5;

      // body sway

      avatar.rotation.y =
        Math.sin(t * 0.5) * 0.018;

      // floating

      avatar.position.y =
        Math.sin(t * 1.5) * 0.05;

      // breathing

      bodyGroup.scale.y =
        1 + Math.sin(t * 2) * 0.015;

      // blink trigger

      if (!blinking && Math.random() < 0.003) {
        blinking = true;

        blinkStart = t;
      }

      // blinking

      if (blinking) {
        const p = t - blinkStart;

        let scale = 0;

        if (p < 0.08) {
          scale = p / 0.08;
        } else if (p < 0.16) {
          scale = 1 - (p - 0.08) / 0.08;
        } else {
          blinking = false;
        }

        eyelids.forEach((lid) => {
          lid.scale.y = scale;
        });
      }

      headGroup.rotation.z =
        Math.sin(t * 0.7) * 0.015;

      renderer.sortObjects = true;

      renderer.render(scene, camera);

    };

    animate();

    // =========================================================
    // RESIZE
    // =========================================================

    const onResize = () => {
      if (!mountRef.current) return;

      const w = mountRef.current.clientWidth;

      camera.aspect = w / height;

      camera.updateProjectionMatrix();

      renderer.setSize(w, height);
    };

    window.addEventListener("resize", onResize);

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener(
        "mousemove",
        onMouseMove
      );

      window.removeEventListener(
        "resize",
        onResize
      );

      renderer.dispose();

      scene.clear();

      if (
        mountRef.current &&
        renderer.domElement.parentNode
      ) {
        mountRef.current.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div
        ref={mountRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default Avatar3D;