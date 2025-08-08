import { useState, useEffect } from "react";
import { Share } from "react-native";
import { findPath } from "../utils/astar";

export default function usePlanner() {
  const [drawMode, setDrawMode] = useState("zone");
  const [points, setPoints] = useState([]);
  const [stairs, setStairs] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [route, setRoute] = useState([]);

  const handleTap = (event) => {
    const x = Math.floor(event.nativeEvent.x / 10);
    const y = Math.floor(event.nativeEvent.y / 10);
    if (drawMode === "zone") setPoints([...points, [x*10, y*10]]);
    else if (drawMode === "stairs") setStairs([...stairs, [x*10, y*10]]);
    else if (drawMode === "start") setStart([x*10, y*10]);
    else if (drawMode === "end") setEnd([x*10, y*10]);
  };

  const onSave = async () => {
    const json = JSON.stringify({ points, stairs, start, end }, null, 2);
    await Share.share({ message: json });
  };

  const onLoad = () => {};

  const onClear = () => {
    setPoints([]); setStairs([]); setStart(null); setEnd(null); setRoute([]);
  };

  useEffect(() => {
    if (start && end) {
      const grid = {};
      for (let x = 0; x < 40; x++) {
        for (let y = 0; y < 80; y++) {
          grid[`${x},${y}`] = true;
        }
      }
      points.forEach(([x, y]) => {
        grid[`${x/10},${y/10}`] = false;
      });
      const path = findPath([start[0]/10, start[1]/10], [end[0]/10, end[1]/10], grid);
      setRoute(path.map(([x,y]) => [x*10,y*10]));
    }
  }, [start, end, points]);

  return {
    drawMode, setDrawMode, handleTap, points, stairs, start, end, route, onSave, onLoad, onClear
  };
}