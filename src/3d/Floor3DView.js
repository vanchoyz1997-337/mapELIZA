import React from "react";
import { Canvas } from "@react-three/fiber/native";
import { View } from "react-native";
import { Box, Sphere, Line, OrbitControls } from "@react-three/drei/native";

function FloorBox({ y }) {
  return (
    <Box args={[10, 0.2, 10]} position={[0, y, 0]}>
      <meshStandardMaterial color="#d0eaff" />
    </Box>
  );
}

function Zone({ points, y }) {
  return points.length > 2 ? (
    <Line
      points={points.map(([x, z]) => [x, y, z])}
      color="blue"
      lineWidth={2}
      closed
    />
  ) : null;
}

function Stair({ position }) {
  return (
    <Sphere args={[0.2, 16, 16]} position={position}>
      <meshStandardMaterial color="purple" />
    </Sphere>
  );
}

function Route({ path }) {
  return path.length > 1 ? (
    <Line
      points={path.map(([x, y, z]) => [x, y, z])}
      color="green"
      lineWidth={2}
    />
  ) : null;
}

export default function Floor3DView({ floors = 3, stairs = [], zones = [], route = [] }) {
  return (
    <View style={{ flex: 1 }}>
      <Canvas camera={{ position: [0, 8, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        {[...Array(floors).keys()].map((f) => (
          <FloorBox key={f} y={f * 2} />
        ))}
        {zones.map((z, i) => <Zone key={i} points={z.points} y={z.floor * 2 + 0.1} />)}
        {stairs.map((s, i) => <Stair key={i} position={[s[0], s[2] * 2 + 0.2, s[1]]} />)}
        <Route path={route.map(([x, y, floor]) => [x, floor * 2 + 0.3, y])} />
        <OrbitControls />
      </Canvas>
    </View>
  );
}