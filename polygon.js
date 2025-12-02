
function box(minLon, minLat, maxLon, maxLat) {
  return [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
    [minLon, minLat] 
  ];
}

export const sites = {
  "GuadalupeMountainsNP": {
    "type": "Feature",
    "properties": { "name": "Guadalupe Mountains National Park" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-105.00, 31.70, -104.60, 32.00)
      ]
    }
  },

  "BigBendNP": {
    "type": "Feature",
    "properties": { "name": "Big Bend National Park" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-104.00, 28.90, -102.90, 29.80)
      ]
    }
  },

  "ChamizalNM": {
    "type": "Feature",
    "properties": { "name": "Chamizal National Memorial" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-106.52, 31.75, -106.46, 31.81)
      ]
    }
  },

  "FortDavisNHS": {
    "type": "Feature",
    "properties": { "name": "Fort Davis National Historic Site" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-103.93, 30.56, -103.86, 30.63)
      ]
    }
  },

  "RioGrandeWSR": {
    "type": "Feature",
    "properties": { "name": "Rio Grande Wild & Scenic River" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-104.00, 28.90, -102.90, 29.80)
      ]
    }
  },

  "AmistadNRA": {
    "type": "Feature",
    "properties": { "name": "Amistad National Recreation Area" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-101.30, 29.40, -100.90, 29.70)
      ]
    }
  },

  "SanAntonioMissionsNHP": {
    "type": "Feature",
    "properties": { "name": "San Antonio Missions National Historical Park" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-98.50, 29.25, -98.40, 29.40)
      ]
    }
  },

  "LBJ_NHP": {
    "type": "Feature",
    "properties": { "name": "Lyndon B. Johnson National Historical Park" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-98.70, 30.20, -98.55, 30.33)
      ]
    }
  },

  "WacoMammothNM": {
    "type": "Feature",
    "properties": { "name": "Waco Mammoth National Monument" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-97.20, 31.57, -97.15, 31.65)
      ]
    }
  },

  "AlibatesFlintQuarriesNM": {
    "type": "Feature",
    "properties": { "name": "Alibates Flint Quarries National Monument" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-101.75, 35.52, -101.62, 35.63)
      ]
    }
  },

  "LakeMeredithNRA": {
    "type": "Feature",
    "properties": { "name": "Lake Meredith National Recreation Area" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-102.00, 35.45, -101.60, 35.75)
      ]
    }
  },

  "BigThicketNP": {
    "type": "Feature",
    "properties": { "name": "Big Thicket National Preserve" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-94.50, 30.05, -93.90, 30.45)
      ]
    }
  },

  "PadreIslandNS": {
    "type": "Feature",
    "properties": { "name": "Padre Island National Seashore" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-97.55, 26.80, -97.20, 27.70)
      ]
    }
  },

  "PaloAltoBattlefieldNHP": {
    "type": "Feature",
    "properties": { "name": "Palo Alto Battlefield National Historical Park" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        box(-97.25, 26.05, -97.09, 26.13)
      ]
    }
  }
};


