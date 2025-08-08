export function findPath(start, end, grid) {
  const openSet = [start];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};
  const key = (x, y) => `${x},${y}`;
  const neighbors = [[0,1],[1,0],[0,-1],[-1,0]];

  const serialize = (p) => key(p[0], p[1]);
  const distance = (a, b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]);

  gScore[serialize(start)] = 0;
  fScore[serialize(start)] = distance(start, end);

  while (openSet.length) {
    openSet.sort((a,b) => fScore[serialize(a)] - fScore[serialize(b)]);
    const current = openSet.shift();
    const currKey = serialize(current);

    if (currKey === serialize(end)) {
      const path = [current];
      while (cameFrom[currKey]) {
        path.unshift(cameFrom[currKey]);
        currKey = serialize(cameFrom[currKey]);
      }
      return path;
    }

    for (let [dx, dy] of neighbors) {
      const neighbor = [current[0]+dx, current[1]+dy];
      const nKey = serialize(neighbor);
      if (!grid[nKey]) continue;

      const tentative = gScore[currKey] + 1;
      if (tentative < (gScore[nKey] || Infinity)) {
        cameFrom[nKey] = current;
        gScore[nKey] = tentative;
        fScore[nKey] = tentative + distance(neighbor, end);
        if (!openSet.some(p => serialize(p) === nKey)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  return [];
}