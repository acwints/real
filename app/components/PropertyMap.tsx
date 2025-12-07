'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { properties, Property, projectSite } from '../data/properties';

// Top 5 most relevant comps for Ashby BART (based on location, scale, and recency)
const TOP_COMPS_IDS = [16, 3, 4, 2, 1]; // IDs: 2715 Dwight Way, 17th & Broadway, Domain Oakland, The Beacon, Aya

// Filter to only show top 5 comps
const topComps = properties.filter(prop => TOP_COMPS_IDS.includes(prop.id));

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import('react-leaflet').then((mod) => mod.Tooltip),
  { ssr: false }
);

const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);

// Fix for default marker icons - will be done in useEffect

// Geocoding function using Nominatim (OpenStreetMap)
async function geocodeAddress(address: string, delay: number = 0): Promise<{ lat: number; lng: number } | null> {
  // Add delay to avoid rate limiting (Nominatim allows 1 request per second)
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  try {
    // Add California, USA to help with geocoding
    const query = encodeURIComponent(`${address}, California, USA`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'PropertyMap/1.0',
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );
    
    if (!response.ok) {
      console.warn(`Geocoding failed for ${address}: HTTP ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    return null;
  } catch (error: any) {
    // Silently handle timeout/network errors - they're expected with rate limiting
    if (error.name === 'AbortError' || error.name === 'TypeError') {
      console.warn(`Geocoding timeout/error for ${address}, will retry or skip`);
    } else {
      console.error(`Geocoding error for ${address}:`, error);
    }
    return null;
  }
}

export default function PropertyMap() {
  const [propertiesWithCoords, setPropertiesWithCoords] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [geocodedCount, setGeocodedCount] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [projectIcon, setProjectIcon] = useState<any>(null);
  const [defaultIcon, setDefaultIcon] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Fix Leaflet icon issue and create custom icons
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        delete (L.default.Icon.Default.prototype as any)._getIconUrl;
        
        // Default blue icon for properties
        const defaultIconInstance = L.default.Icon.Default.extend({
          options: {
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          },
        });
        setDefaultIcon(new defaultIconInstance());

        // Custom red icon for project site using DivIcon
        const redIconInstance = L.divIcon({
          className: 'custom-red-marker',
          html: `<div style="
            width: 30px;
            height: 30px;
            background-color: #dc2626;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          "><div style="
            width: 12px;
            height: 12px;
            background-color: white;
            border-radius: 50%;
          "></div></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15],
        });
        setProjectIcon(redIconInstance);
        
        setMapLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    async function geocodeProperties() {
      // Process properties sequentially with delays to avoid rate limiting
      const geocoded: Property[] = [];
      
      for (let i = 0; i < topComps.length; i++) {
        const property = topComps[i];
        
        // If already has coordinates, use them
        if (property.lat && property.lng) {
          geocoded.push(property);
          setGeocodedCount(i + 1);
          continue;
        }
        
        // Add delay between requests (1 second per Nominatim's rate limit)
        // Skip delay for first request
        const delay = i > 0 ? 1000 : 0;
        const coords = await geocodeAddress(property.address, delay);
        
        if (coords) {
          geocoded.push({ ...property, ...coords });
          setGeocodedCount(i + 1);
        } else {
          // If geocoding fails, still add property but without coords
          // It will be filtered out later
          geocoded.push(property);
        }
      }
      
      setPropertiesWithCoords(geocoded.filter(p => p.lat && p.lng));
      setLoading(false);
    }

    geocodeProperties();
  }, [mapLoaded]);

  // Center map on project site (Ashby BART Station)
  const centerLat = projectSite.lat || 37.8530;
  const centerLng = projectSite.lng || -122.2699;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading || !mapLoaded || !defaultIcon || !projectIcon) {
    return (
      <div className="w-full py-8 px-6">
        <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
          <div className="text-center">
            <div className="text-lg mb-2">Loading map...</div>
            {mapLoaded && (
              <div className="text-sm text-gray-600">
                Geocoding properties... {geocodedCount} of {topComps.length} properties geocoded
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isClient || loading || !mapLoaded || !defaultIcon || !projectIcon) {
    return (
      <div className="w-full py-8 px-6">
        <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
          <div className="text-center">
            <div className="text-lg mb-2">Loading map...</div>
            {mapLoaded && (
              <div className="text-sm text-gray-600">
                Geocoding properties... {geocodedCount} of {topComps.length} properties geocoded
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 px-4">
      {/* Title for screenshot */}
      <div className="max-w-[1400px] mx-auto mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Ashby BART Development - Comparable Properties Map</h2>
        <p className="text-gray-600 text-sm mt-1">Top 5 comparable multifamily properties in the East Bay market</p>
      </div>
      
      <div className="max-w-[1400px] mx-auto h-[700px] relative rounded-lg overflow-hidden shadow-xl border border-neutral-200">
        {/* Legend - detailed with each comp */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur rounded-lg shadow-lg p-3 border border-gray-200 max-w-[280px]">
          <h3 className="font-bold text-xs uppercase tracking-wide mb-3 text-gray-600 border-b pb-2">Properties</h3>
          
          {/* Project Site */}
          <div className="mb-3 pb-3 border-b border-gray-100">
            <div className="flex items-start gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow mt-0.5 flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-red-700 text-xs">Ashby BART (Project Site)</div>
                <div className="text-[10px] text-gray-500 leading-tight mt-0.5">
                  144 units • 4.4 acres • R-BMU
                </div>
              </div>
            </div>
          </div>

          {/* Comparable Properties */}
          <div className="space-y-2.5">
            {propertiesWithCoords.map((property) => (
              <div key={property.id} className="flex items-start gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow mt-0.5 flex-shrink-0"></div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-800 text-[11px] leading-tight">
                    {property.name || property.address}
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    {property.units} units • ${(property.pricePerUnit / 1000).toFixed(0)}K/unit • {property.yearBuilt}
                  </div>
                  <div className="text-[9px] text-gray-400">
                    Sold {property.saleDate} • {property.vacancy}% vac
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MapContainer
        center={[centerLat, centerLng]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
        boxZoom={true}
        keyboard={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Project Site Marker (Red) */}
        {projectSite.lat && projectSite.lng && projectIcon && (
          <Marker
            position={[projectSite.lat, projectSite.lng]}
            icon={projectIcon}
          >
            <Tooltip 
              permanent 
              direction="top" 
              offset={[0, -10]}
              className="project-site-label"
            >
              <span className="font-semibold text-red-700 text-[10px] whitespace-nowrap px-1 py-px bg-white/70 rounded">
                Ashby BART
              </span>
            </Tooltip>
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg mb-2 text-red-600">
                  {projectSite.name}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Address:</strong> {projectSite.address}</p>
                  <p><strong>Location:</strong> Ashby BART Station</p>
                  <p><strong>Units:</strong> 144</p>
                  <p><strong>Site Size:</strong> 4.4 acres</p>
                  <p className="mt-2 text-xs text-muted-foreground italic">
                    Mixed-use TOD development, R-BMU zoning, 70-foot height limit
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Property Markers (Blue) */}
        {propertiesWithCoords.map((property, index) => {
          // Calculate label positions to avoid overlap
          const directions: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'right', 'bottom', 'left', 'top'];
          const direction = directions[index % 5];
          const offset: [number, number] = 
            direction === 'top' ? [0, -10] :
            direction === 'bottom' ? [0, 10] :
            direction === 'left' ? [-10, 0] : [10, 0];
          
          return (
          <Marker
            key={property.id}
            position={[property.lat!, property.lng!]}
            icon={defaultIcon}
          >
              <Tooltip 
                permanent 
                direction={direction}
                offset={offset}
                className="comp-label"
              >
                <span className="text-[10px] font-medium text-gray-700 whitespace-nowrap px-1 py-px bg-white/70 rounded">
                  {property.name || property.address}
                </span>
              </Tooltip>
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg mb-2">
                  {property.name || property.address}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Address:</strong> {property.address}</p>
                  <p><strong>Price:</strong> {formatCurrency(property.price)}</p>
                  <p><strong>Price/Unit:</strong> {formatCurrency(property.pricePerUnit)}</p>
                  <p><strong>Price/SF:</strong> ${property.pricePerSF}</p>
                  <p><strong>Units:</strong> {property.units}</p>
                  <p><strong>Vacancy:</strong> {property.vacancy}%</p>
                  <p><strong>Year Built:</strong> {property.yearBuilt}</p>
                  <p><strong>Sale Date:</strong> {property.saleDate}</p>
                </div>
              </div>
            </Popup>
          </Marker>
          );
        })}
      </MapContainer>
      </div>
    </div>
  );
}

