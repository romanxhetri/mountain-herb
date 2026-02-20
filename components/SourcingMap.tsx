import React, { useState } from 'react';
import { MapPin, Mountain, Cloud, Sun, Wind, Droplets } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  product: string;
  altitude: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const regions: Region[] = [
  {
    id: 'jumla',
    name: 'Jumla',
    x: 20,
    y: 45,
    product: 'Marsi Rice & Herbs',
    altitude: '2,500m',
    description: 'Home to the highest altitude rice in the world and potent medicinal herbs grown in untouched, mineral-rich soil.',
    icon: <Droplets className="w-5 h-5 text-stone-100" />,
    image: 'https://images.unsplash.com/photo-1623696803878-83863459c946?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dolpo',
    name: 'Dolpo Region',
    x: 25,
    y: 30,
    product: 'Premium Shilajit',
    altitude: '4,500m - 5,000m',
    description: 'Isolated from the modern world, the rugged cliffs of Dolpo yield the purest Shilajit resin, rich in fulvic acid and minerals.',
    icon: <Mountain className="w-5 h-5 text-stone-100" />,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mustang',
    name: 'Mustang District',
    x: 40,
    y: 25,
    product: 'Yarsagumba & Apples',
    altitude: '3,800m',
    description: 'The "Forbidden Kingdom" offers a unique arid climate perfect for potent medicinal herbs and the famous Himalayan apples.',
    icon: <Wind className="w-5 h-5 text-stone-100" />,
    image: 'https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kathmandu',
    name: 'Kathmandu Valley',
    x: 55,
    y: 60,
    product: 'Processing & Craft',
    altitude: '1,400m',
    description: 'Our central hub where raw materials are tested, purified, and packaged with artisanal care in government-certified facilities.',
    icon: <Sun className="w-5 h-5 text-stone-100" />,
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6bd4e8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ilam',
    name: 'Ilam District',
    x: 85,
    y: 65,
    product: 'Orthodox Tea',
    altitude: '1,200m - 2,000m',
    description: 'Misty hills in the east produce our world-renowned organic teas, hand-plucked to ensure only the finest two leaves and a bud.',
    icon: <Cloud className="w-5 h-5 text-stone-100" />,
    image: 'https://images.unsplash.com/photo-1596436660839-503463777558?auto=format&fit=crop&w=600&q=80'
  }
];

export const SourcingMap: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  return (
    <div className="py-24 bg-stone-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2 block">Interactive Map</span>
          <h2 className="text-4xl font-bold text-stone-900 font-serif">Trace the Source</h2>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Explore the diverse geography of Nepal to see exactly where our premium ingredients are harvested.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Map Container */}
          <div className="lg:col-span-2 relative aspect-[16/9] bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden group">
            <div className="absolute inset-0 bg-stone-100/50"></div>
            
            {/* Stylized Nepal Map SVG */}
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-full absolute inset-0 drop-shadow-xl"
              style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))' }}
            >
              {/* Simplified Nepal Outline */}
              <path 
                d="M 50,180 
                   C 80,160 120,100 150,80 
                   L 250,60 
                   C 300,80 320,70 350,50 
                   L 500,40 
                   C 550,50 600,30 650,40 
                   L 750,100 
                   L 780,180 
                   C 760,220 720,240 700,250 
                   L 500,280 
                   C 400,300 350,280 300,270 
                   L 150,250 
                   L 50,180 Z" 
                fill="#e7e5e4" 
                stroke="#a8a29e" 
                strokeWidth="2"
                className="transition-all duration-500 hover:fill-stone-300"
              />
              
              {/* Mountain Ranges Effect */}
              <path d="M 180,100 L 200,80 L 220,100 M 350,70 L 380,40 L 410,70 M 550,60 L 580,30 L 610,60" 
                fill="none" stroke="#d6d3d1" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Region Hotspots */}
            {regions.map((region) => (
              <button
                key={region.id}
                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transition-all duration-300 z-20 focus:outline-none
                  ${activeRegion?.id === region.id 
                    ? 'bg-emerald-600 scale-125 shadow-emerald-500/50 shadow-lg' 
                    : 'bg-stone-800 hover:bg-emerald-500 hover:scale-110 shadow-lg'
                  }`}
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                onClick={() => setActiveRegion(region)}
                onMouseEnter={() => setActiveRegion(region)}
                aria-label={`View details for ${region.name}`}
              >
                {activeRegion?.id === region.id ? (
                  <MapPin className="w-4 h-4 text-white animate-bounce" />
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            ))}

            {/* Connecting Lines (Decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
              {regions.map((region, i) => {
                if (i === regions.length - 1) return null;
                const next = regions[i + 1];
                return (
                  <line 
                    key={`line-${i}`}
                    x1={`${region.x}%`} y1={`${region.y}%`}
                    x2={`${next.x}%`} y2={`${next.y}%`}
                    stroke="#10b981" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                );
              })}
            </svg>
            
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-stone-500 border border-stone-200">
              Interactive Map of Nepal
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-1 h-full">
            {activeRegion ? (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-emerald-100 h-full flex flex-col animate-fade-in">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-lg transition-shadow">
                  <img 
                    src={activeRegion.image} 
                    alt={activeRegion.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2 text-white">
                      {activeRegion.icon}
                      <span className="font-bold tracking-wide">{activeRegion.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-stone-900 font-serif">{activeRegion.product}</h3>
                      <p className="text-emerald-600 font-mono text-sm mt-1">Alt: {activeRegion.altitude}</p>
                    </div>
                  </div>
                  
                  <p className="text-stone-600 leading-relaxed mb-6">
                    {activeRegion.description}
                  </p>
                  
                  <div className="border-t border-stone-100 pt-6 mt-auto">
                    <button className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 group">
                      Shop {activeRegion.product.split(' ')[0]}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 h-full flex flex-col items-center justify-center text-center opacity-80">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <MapPin className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Select a Region</h3>
                <p className="text-stone-500">Hover over the dots on the map to discover our sourcing stories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
