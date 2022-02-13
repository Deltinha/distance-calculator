import { Location } from '../interfaces/location';

function getMinAngle(A: number, B: number) {
  function getCongruentAngle(angle: number) {
    return angle - Math.floor(angle / 360) * 360;
  }

  const delta = A - B;
  return Math.abs(getCongruentAngle(delta + 180) - 180);
}

function calculateDistance(A: number, B: number) {
  const EARTH_RADIUS = 6371;

  const degreeDistance = Math.sqrt(A ** 2 + B ** 2);

  return ((2 * Math.PI * EARTH_RADIUS * degreeDistance) / 360).toFixed(2);
}

export function getDistances(locations: Location[]) {
  interface Distance {
    addresses: string[];
    distance: string;
  }
  const distances: Distance[] = [];

  for (let firstIndex = 0; firstIndex < locations.length; firstIndex += 1) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < locations.length;
      secondIndex += 1
    ) {
      const latitudeDelta = Math.abs(
        locations[firstIndex].location.lat - locations[secondIndex].location.lat
      );

      const longitudeDelta = getMinAngle(
        locations[firstIndex].location.lng,
        locations[secondIndex].location.lng
      );

      distances.push({
        addresses: [
          locations[firstIndex].address,
          locations[secondIndex].address,
        ],
        distance: `${calculateDistance(latitudeDelta, longitudeDelta)} km`,
      });
    }
  }

  return distances;
}
