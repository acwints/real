'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { properties, Property, projectSite } from '../data/properties';

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

export default function PropertyMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [projectIcon, setProjectIcon] = useState<any>(null);
  const [marketIcon, setMarketIcon] = useState<any>(null);
  const [affordableIcon, setAffordableIcon] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Fix Leaflet icon issue and create custom icons
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        delete (L.default.Icon.Default.prototype as any)._getIconUrl;
        
        // Red icon for project site
        const redIcon = L.divIcon({
          className: 'custom-red-marker',
          html: `<div style="
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
          "><div style="
            width: 14px;
            height: 14px;
            background-color: white;
            border-radius: 50%;
          "></div></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18],
        });
        setProjectIcon(redIcon);

        // Blue icon for market rate comps
        const blueIcon = L.divIcon({
          className: 'custom-blue-marker',
          html: `<div style="
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          "><span style="color: white; font-weight: bold; font-size: 12px;">M</span></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });
        setMarketIcon(blueIcon);

        // Green icon for affordable comps
        const greenIcon = L.divIcon({
          className: 'custom-green-marker',
          html: `<div style="
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          "><span style="color: white; font-weight: bold; font-size: 12px;">A</span></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });
        setAffordableIcon(greenIcon);
        
        setMapLoaded(true);
      });
    }
  }, []);

  // Center map on project site
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

  if (!isClient || !mapLoaded || !projectIcon || !marketIcon || !affordableIcon) {
    return (
      <div className="w-full py-8 px-6">
        <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
          <div className="text-center">
            <div className="text-lg mb-2">Loading map...</div>
          </div>
        </div>
      </div>
    );
  }

  const marketComps = properties.filter(p => p.type === 'Market');
  const affordableComps = properties.filter(p => p.type === 'Affordable');

  return (
    <div className="w-full py-4 px-4">
      {/* Title */}
      <div className="max-w-[1400px] mx-auto mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Ashby BART TOD - Rental Comparables Map</h2>
        <p className="text-gray-600 text-sm mt-1">1BR rental comps within 0.6 miles of project site</p>
      </div>
      
      <div className="max-w-[1400px] mx-auto h-[700px] relative rounded-lg overflow-hidden shadow-xl border border-neutral-200">
        {/* Legend */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur rounded-lg shadow-lg p-4 border border-gray-200 min-w-[300px]">
          <h3 className="font-bold text-xs uppercase tracking-wide mb-3 text-gray-600 border-b pb-2">Rental Comparables</h3>
          
          {/* Project Site */}
          <div className="mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow mt-0.5 flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-red-700 text-sm">Ashby BART (Project Site)</div>
                <div className="text-xs text-gray-500 mt-1">
                  144 units • 50% Affordable / 50% Market
                </div>
                <div className="text-xs text-gray-400">
                  4.4 acres • 58K SF retail • 76K SF office
                </div>
              </div>
            </div>
          </div>

          {/* Market Rate Comps */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">M</span>
              </div>
              <span className="font-semibold text-gray-700 text-xs">Market Rate</span>
            </div>
            {marketComps.map((comp) => (
              <div key={comp.id} className="ml-6 mb-2 pb-2 border-b border-gray-50 last:border-0">
                <div className="font-medium text-gray-800 text-xs">{comp.name}</div>
                <div className="text-[11px] text-gray-600">
                  {comp.bedBath} • {comp.unitSqft} SF • <span className="font-semibold text-blue-700">{formatCurrency(comp.monthlyRent)}/mo</span>
                </div>
                <div className="text-[10px] text-gray-400">
                  ${comp.rentPerSqft.toFixed(2)}/SF • {comp.distanceToSite}
                </div>
              </div>
            ))}
          </div>

          {/* Affordable Comps */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">A</span>
              </div>
              <span className="font-semibold text-gray-700 text-xs">Affordable</span>
            </div>
            {affordableComps.map((comp) => (
              <div key={comp.id} className="ml-6 mb-2">
                <div className="font-medium text-gray-800 text-xs">{comp.name}</div>
                <div className="text-[11px] text-gray-600">
                  {comp.bedBath} • {comp.unitSqft} SF • <span className="font-semibold text-green-700">{formatCurrency(comp.monthlyRent)}/mo</span>
                </div>
                <div className="text-[10px] text-gray-400">
                  ${comp.rentPerSqft.toFixed(2)}/SF • {comp.distanceToSite}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-gray-500">Avg Market Rent</div>
                <div className="font-bold text-blue-700">
                  {formatCurrency(marketComps.reduce((sum, c) => sum + c.monthlyRent, 0) / marketComps.length)}
                </div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-gray-500">Avg Affordable Rent</div>
                <div className="font-bold text-green-700">
                  {formatCurrency(affordableComps.reduce((sum, c) => sum + c.monthlyRent, 0) / affordableComps.length)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MapContainer
          center={[centerLat, centerLng]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
                direction="bottom" 
                offset={[0, 20]}
                className="project-site-label"
              >
                <span className="font-bold text-red-700 text-sm whitespace-nowrap px-3 py-1.5 bg-white rounded-lg shadow-lg border border-red-200">
                  🏗️ Ashby BART (Project)
                </span>
              </Tooltip>
              <Popup>
                <div className="p-3 min-w-[280px]">
                  <h3 className="font-bold text-lg mb-2 text-red-600">
                    {projectSite.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Address:</strong> {projectSite.address}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-500">Total Units</div>
                        <div className="font-bold">{projectSite.totalUnits}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-500">Site Size</div>
                        <div className="font-bold">{projectSite.siteAcres} acres</div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-xs text-gray-500">Market Units</div>
                        <div className="font-bold text-blue-700">{projectSite.marketUnits}</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-xs text-gray-500">Affordable Units</div>
                        <div className="font-bold text-green-700">{projectSite.affordableUnits}</div>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 italic">
                      Mixed-use TOD • {projectSite.retailSqft.toLocaleString()} SF retail • {projectSite.officeSqft.toLocaleString()} SF office
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Property Markers */}
          {properties.map((property, index) => {
            const icon = property.type === 'Market' ? marketIcon : affordableIcon;
            const colorClass = property.type === 'Market' ? 'text-blue-700' : 'text-green-700';
            const bgClass = property.type === 'Market' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200';
            
            // Position labels to avoid overlap - different directions for each property
            const labelPositions: Array<{direction: 'top' | 'bottom' | 'left' | 'right', offset: [number, number]}> = [
              { direction: 'left', offset: [-18, 0] },    // 26FIFTY - left
              { direction: 'right', offset: [18, 0] },   // Parker - right  
              { direction: 'top', offset: [0, -18] },    // Harper Crossing - top
            ];
            const pos = labelPositions[index] || { direction: 'top' as const, offset: [0, -18] as [number, number] };
            
            return (
              <Marker
                key={property.id}
                position={[property.lat!, property.lng!]}
                icon={icon}
              >
                <Tooltip 
                  permanent 
                  direction={pos.direction}
                  offset={pos.offset}
                  className="comp-label"
                >
                  <span className={`text-sm font-bold ${colorClass} whitespace-nowrap px-3 py-1.5 ${bgClass} rounded-lg shadow-md border`}>
                    {property.name} • ${property.monthlyRent.toLocaleString()}
                  </span>
                </Tooltip>
                <Popup>
                  <div className="p-3 min-w-[250px]">
                    <h3 className={`font-bold text-lg mb-2 ${colorClass}`}>
                      {property.name}
                    </h3>
                    <div className="inline-block px-2 py-0.5 rounded text-xs font-medium mb-2" 
                         style={{ 
                           backgroundColor: property.type === 'Market' ? '#dbeafe' : '#dcfce7',
                           color: property.type === 'Market' ? '#1d4ed8' : '#15803d'
                         }}>
                      {property.type} Rate
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><strong>Address:</strong> {property.address}</p>
                      <p><strong>Unit Type:</strong> {property.unitType} ({property.bedBath})</p>
                      <p><strong>Unit Size:</strong> {property.unitSqft} SF</p>
                      <p><strong>Monthly Rent:</strong> <span className={`font-bold ${colorClass}`}>{formatCurrency(property.monthlyRent)}</span></p>
                      <p><strong>Rent/SF:</strong> ${property.rentPerSqft.toFixed(2)}</p>
                      <p><strong>Distance:</strong> {property.distanceToSite}</p>
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
