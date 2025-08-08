import React, { useRef, useState } from "react";
import { View, Dimensions, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView, TapGestureHandler } from "react-native-gesture-handler";
import Toolbar from "../components/Toolbar";
import usePlanner from "../hooks/usePlanner";
import Svg, { Polygon, Circle, Line } from "react-native-svg";
import Floor3DView from "../3d/Floor3DView";

export default function PlannerScreen() {
  const svgRef = useRef(null);
  const [view3D, setView3D] = useState(false);
  const {
    drawMode, setDrawMode, handleTap, points, stairs, route, onSave, onLoad, onClear
  } = usePlanner();

  const floors = 3;
  const zones = [{ floor: 0, points: points.map(p => [p[0] / 10 - 20, p[1] / 10 - 40]) }];
  const stairs3D = stairs.map(([x, y]) => [x / 10 - 20, y / 10 - 40, 0]);
  const route3D = route.map(([x, y]) => [x / 10 - 20, y / 10 - 40, 0]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title={view3D ? "Перейти в 2D" : "Перейти в 3D"} onPress={() => setView3D(!view3D)} />
        {view3D ? (
          <Floor3DView floors={floors} zones={zones} stairs={stairs3D} route={route3D} />
        ) : (
          <TapGestureHandler onHandlerStateChange={handleTap}>
            <Svg ref={svgRef} style={styles.canvas}>
              {points.length > 2 && (
                <Polygon points={points.map(p => p.join(",")).join(" ")} fill="rgba(0,150,255,0.3)" stroke="blue" strokeWidth={2} />
              )}
              {points.map((p, i) => (
                <Circle key={i} cx={p[0]} cy={p[1]} r={6} fill="blue" />
              ))}
              {route.map((p, i) =>
                i > 0 ? <Line key={i} x1={route[i - 1][0]} y1={route[i - 1][1]} x2={p[0]} y2={p[1]} stroke="green" strokeWidth={3} /> : null
              )}
              {stairs.map((s, i) => (
                <Circle key={`stair-${i}`} cx={s[0]} cy={s[1]} r={6} fill="purple" />
              ))}
            </Svg>
          </TapGestureHandler>
        )}
        {!view3D && (
          <Toolbar drawMode={drawMode} setDrawMode={setDrawMode} onSave={onSave} onLoad={onLoad} onClear={onClear} />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  canvas: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#f0f0f0",
  },
});