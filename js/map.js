document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("leaflet-map").setView([22.2587, 71.1924], 7); // Gujarat center

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data © OpenStreetMap contributors"
  }).addTo(map);

  const regionButtons = document.querySelectorAll(".region-btn");
  const filterButtons = document.querySelectorAll(".attraction-filters .filter-btn");

  const regions = {
    north: [
      { name: "Modhera Sun Temple", type: "heritage", coords: [23.5872, 72.1432] },
      { name: "Rani ki Vav", type: "heritage", coords: [23.8594, 72.1229] },
    ],
    central: [
      { name: "Champaner-Pavagadh", type: "heritage", coords: [22.4866, 73.5396] },
      { name: "Statue of Unity", type: "heritage", coords: [21.8380, 73.7191] },
    ],
    south: [
      { name: "Dandi Beach", type: "beaches", coords: [20.8833, 72.8167] },
      { name: "Saputara", type: "wildlife", coords: [20.5746, 73.7570] },
    ],
    kutch: [
      { name: "Rann of Kutch", type: "cultural", coords: [23.7337, 69.8597] },
      { name: "Kutch Desert Wildlife Sanctuary", type: "wildlife", coords: [23.8833, 68.8167] },
    ],
    saurashtra: [
      { name: "Gir National Park", type: "wildlife", coords: [21.1390, 70.8248] },
      { name: "Somnath Temple", type: "religious", coords: [20.8880, 70.4008] },
      { name: "Dwarka Temple", type: "religious", coords: [22.2376, 68.9674] },
    ],
  };

  let markers = [];

  function updateMarkers(region = "all", filter = "all") {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    const allAttractions = region === "all"
      ? Object.values(regions).flat()
      : regions[region] || [];

    const filtered = filter === "all"
      ? allAttractions
      : allAttractions.filter(a => a.type === filter);

    filtered.forEach(attraction => {
      const marker = L.marker(attraction.coords)
        .addTo(map)
        .bindPopup(`<b>${attraction.name}</b><br>Type: ${attraction.type}`);
      markers.push(marker);
    });

    // Focus map if there are filtered locations
    if (filtered.length > 0) {
      map.setView(filtered[0].coords, 8);
    }
  }

  // Region button click
  regionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".region-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const selectedRegion = btn.dataset.region;
      const selectedFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
      updateMarkers(selectedRegion, selectedFilter);
    });
  });

  // Filter button click
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const selectedFilter = btn.dataset.filter;
      const selectedRegion = document.querySelector(".region-btn.active")?.dataset.region || "all";
      updateMarkers(selectedRegion, selectedFilter);
    });
  });

  // Default load
  updateMarkers("all", "all");
});
