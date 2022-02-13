export interface Location {
  address: string;
  location: { lat: number; lng: number };
}

interface Distance {
  addresses: string[];
  distance: string;
}

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

  return (2 * Math.PI * EARTH_RADIUS * degreeDistance) / 360;
}

export function getDistances(locations: Location[]): {
  farestDistance: Distance;
  shortestDistance: Distance;
  allDistances: Distance[];
} {
  const allDistances: Distance[] = [];

  let shortestDist = Infinity;
  let farestDist = -Infinity;

  const distances = {
    farestDistance: { addresses: [''], distance: '' },
    shortestDistance: { addresses: [''], distance: '' },
    allDistances,
  };

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

      const distance = calculateDistance(latitudeDelta, longitudeDelta);

      if (distance >= farestDist) {
        farestDist = distance;
        distances.farestDistance = {
          addresses: [
            locations[firstIndex].address,
            locations[secondIndex].address,
          ],
          distance: `${distance.toFixed(2)} km`,
        };
      }

      if (distance <= shortestDist) {
        shortestDist = distance;
        distances.shortestDistance = {
          addresses: [
            locations[firstIndex].address,
            locations[secondIndex].address,
          ],
          distance: `${distance.toFixed(2)} km`,
        };
      }

      allDistances.push({
        addresses: [
          locations[firstIndex].address,
          locations[secondIndex].address,
        ],
        distance: `${distance.toFixed(2)} km`,
      });
    }
  }

  return distances;
}
