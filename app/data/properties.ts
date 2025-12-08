export interface Property {
  id: number;
  name: string;
  address: string;
  type: 'Market' | 'Affordable' | 'Project';
  unitType: string;
  bedBath: string;
  distanceToSite: string;
  unitSqft: number;
  monthlyRent: number;
  rentPerSqft: number;
  lat?: number;
  lng?: number;
}

export const properties: Property[] = [
  {
    id: 1,
    name: "26FIFTY",
    address: "2650 Haste St, Berkeley, CA",
    type: "Market",
    unitType: "1BR",
    bedBath: "1/1",
    distanceToSite: "0.6 Miles",
    unitSqft: 602,
    monthlyRent: 3395,
    rentPerSqft: 5.64,
    lat: 37.8658,
    lng: -122.2560,
  },
  {
    id: 2,
    name: "Parker",
    address: "2538 Durant Ave, Berkeley, CA",
    type: "Market",
    unitType: "1BR",
    bedBath: "1/1",
    distanceToSite: "0.6 Miles",
    unitSqft: 700,
    monthlyRent: 2710,
    rentPerSqft: 3.87,
    lat: 37.8673,
    lng: -122.2575,
  },
  {
    id: 3,
    name: "Harper Crossing",
    address: "3132 Martin Luther King Jr Way, Berkeley, CA",
    type: "Affordable",
    unitType: "1BR",
    bedBath: "1/1",
    distanceToSite: "0.0 Miles",
    unitSqft: 575,
    monthlyRent: 1250,
    rentPerSqft: 2.17,
    lat: 37.8530,
    lng: -122.2699,
  },
];

// Project site (Ashby BART Station)
export const projectSite = {
  id: 0,
  name: "North Berkeley BART TOD",
  address: "3101 Martin Luther King Jr Way & 3100 Adeline St, Berkeley, CA",
  type: "Project" as const,
  unitType: "Mixed",
  bedBath: "1-3BR",
  distanceToSite: "0.0 Miles",
  unitSqft: 0,
  monthlyRent: 0,
  rentPerSqft: 0,
  lat: 37.8530,
  lng: -122.2699,
  // Project details
  totalUnits: 144,
  marketUnits: 72,
  affordableUnits: 72,
  retailSqft: 58000,
  officeSqft: 76000,
  siteAcres: 4.4,
};
