"use client";

import { Canvas, useFrame } from "@react-three/fiber"
import { Lightformer, Text, Html, ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing"
import { easing } from "maath"
import { useState } from "react";

export default function Home() {
  return (
    <>
      <div id='center' className="h-screen w-screen">
        <Canvas shadows camera={{ position: [0, 0, 20], fov: 50 }}>
          <color attach="background" args={["#e0e0e0"]} />
          <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
          <Status />
          <ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />
          <Environment preset="city">
            <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          </Environment>
          <EffectComposer>
            <N8AO aoRadius={1} intensity={2} />
            <TiltShift2 blur={0.2} />
          </EffectComposer>
          <Rig></Rig>
        </Canvas>
      </div>
    </>
  );
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
      0.2,
      delta,
    )
    state.camera.lookAt(0, 0, 0)
  })
  return <></>
}

function Status() {
  const [isHovered, setIsHovered] = useState(false);
  const [color, setColor] = useState("black");
  const [isHovered2, setIsHovered2] = useState(false);
  const [color2, setColor2] = useState("black");

  useFrame(({ camera }) => {
    if (isHovered) {
      setColor("green");
    } else {
      setColor("black");
    }
    if (isHovered2) {
      setColor2("purple");
    } else {
      setColor2("black");
    }
  });

  return (
    <>
    <Text fontSize={2} letterSpacing={-0.025} color={color} position={[0, 0, -10]} onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}>
      /edward potapov
    </Text>
    <Text fontSize={1} letterSpacing={-0.025} color={color2} position={[0, -2, -10]} onPointerOver={() => setIsHovered2(true)}
        onPointerOut={() => setIsHovered2(false)}>
      Welcome!
    </Text>
    </>
  )
}
