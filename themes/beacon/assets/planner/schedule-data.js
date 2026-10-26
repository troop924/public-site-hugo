// schedule-data.js — edit this file each year to update badge availability.
//
// Period indices (used in `starts`):
//       Period 0  7:20 - 8:20 Breakfast
//   0 = Period 1  8:30 – 9:20
//   1 = Period 2  9:30 – 10:20
//   2 = Period 3  10:30 – 11:20
//   3 = Period 4  11:30 – 12:20
//   4 = Period 5  12:45 - 1:30 LUNCH
//   5 = Period 6  1:30 – 2:30 SIESTA
//   6 = Period 7  2:30 – 3:30
//   7 = Period 8  3:45 - 5:00
//   8 = Period 9  5:30 – 6:45 Dinner
//   9 = Period 10 7:00 – 8:30 Evening
//
// Badge fields (required):
//   id        — unique key; must match an entry in DESC below
//   name      — display name shown in the UI
//   area      — location area; must match a key in travel.east
//   slots     — how many consecutive periods this badge occupies
//   starts    — period indices the badge can BEGIN at (always sorted ascending)
//   fillRisk  — 3 = fills day-of (🔥), 2 = first week (🕚), 1 = ~two weeks
//               omit or 0 for no risk
//
// Badge fields (optional — omit or leave undefined for default):
//   image     — filename in img/badges/ (e.g. "Canoeing.png")
//   url       — link to official Scouting America merit badge page
//   cost      — string describing any fees; omit if free
//   recYear   — recommended minimum scout year (2 or 3)
//   recAge    — recommended minimum age
//   minAge    — hard minimum age requirement
//   prereqs   — array of badge IDs the scout must already hold
//   eagle     — true if this badge counts toward Eagle rank

const SCHEDULE = {
  periods: [
    { id: 0, start: "8:30",  end: "9:20"  },
    { id: 1, start: "9:30",  end: "10:20" },
    { id: 2, start: "10:30", end: "11:20" },
    { id: 3, start: "11:30", end: "12:20" },
  ],

  badges: [
    // ── Aquatics ──────────────────────────────────────────────────────────────
    { id: "canoeing",           name: "Canoeing",           area: "Aquatics", slots: 1, starts: [0, 3], fillRisk: 1,  image: "Canoeing.png",        recYear: 2, "url": "https://www.scouting.org/merit-badges/canoeing/" },
    { id: "kayaking",           name: "Kayaking",           area: "Aquatics", slots: 1, starts: [1, 3], fillRisk: 1,  image: "Kayaking.png",        recYear: 2 , "url": "https://www.scouting.org/merit-badges/kayaking/"},
    { id: "lifesaving",         name: "Lifesaving",         area: "Aquatics", slots: 2, starts: [0],    fillRisk: 1, image: "Lifesaving.png",      recYear: 2, prereqs: ["swimming"], eagle: true, "url": "https://www.scouting.org/merit-badges/lifesaving/" },
    { id: "motorboating",       name: "Motorboating",       area: "Aquatics", slots: 1, starts: [0, 2], fillRisk: 3, image: "Motorboating.png", "cost": "$10 paid during registration",    recYear: 2, minAge: 12, "url": "https://www.scouting.org/merit-badges/motorboating/" },
    { id: "rowing",             name: "Rowing",             area: "Aquatics", slots: 1, starts: [1],    fillRisk: 1, image: "Rowing.png",          recYear: 2, "url": "https://www.scouting.org/merit-badges/rowing/" },
    { id: "small-boat-sailing", name: "Small Boat Sailing", area: "Aquatics", slots: 2, starts: [2],    fillRisk: 2,  image: "SmallBoatSailing.png", recYear: 2, minAge: 14, "url": "https://www.scouting.org/merit-badges/small-boat-sailing/" },
    { id: "swimming",           name: "Swimming",           area: "Aquatics", slots: 1, starts: [2, 3], fillRisk: 0, image: "Swimming.png",        eagle: true, "url": "https://www.scouting.org/merit-badges/swimming/" },

    // ── Ecology & Conservation ────────────────────────────────────────────────
    { id: "archeology",        name: "Archeology",                area: "Ecology & Conservation", slots: 1, starts: [3],       fillRisk: 0, image: "Archaeology.png", "url": "https://www.scouting.org/merit-badges/archaeology/" },
    { id: "astronomy",         name: "Astronomy",                 area: "Ecology & Conservation", slots: 1, starts: [0, 2],    fillRisk: 0, image: "Astronomy.png", "url": "https://www.scouting.org/merit-badges/astronomy/" },
    { id: "bird-study",        name: "Bird Study",                area: "Ecology & Conservation", slots: 1, starts: [0],       fillRisk: 0, image: "BirdStudy.png", "url": "https://www.scouting.org/merit-badges/bird-study/" },
    { id: "environmental-sci", name: "Environmental Science",     area: "Ecology & Conservation", slots: 1, starts: [1, 2, 3], fillRisk: 0, image: "EnvironmentalScience.png", eagle: true, "url": "https://www.scouting.org/merit-badges/environmental-science/" },
    { id: "fish-wildlife",     name: "Fish & Wildlife Mgmt",      area: "Ecology & Conservation", slots: 1, starts: [3],       fillRisk: 0, image: "FishWildlifeMgmt.png", "url": "https://www.scouting.org/merit-badges/fish-and-wildlife-management/" },
    { id: "forestry",          name: "Forestry",                  area: "Ecology & Conservation", slots: 1, starts: [2],       fillRisk: 0, image: "Forestry.png", "url": "https://www.scouting.org/merit-badges/forestry/" },
    { id: "geology",           name: "Geology",                   area: "Ecology & Conservation", slots: 1, starts: [0],       fillRisk: 0, image: "Geology.png", "url": "https://www.scouting.org/merit-badges/geology/" },
    { id: "nature",            name: "Nature",                    area: "Ecology & Conservation", slots: 1, starts: [1],       fillRisk: 0, image: "Nature.png", "url": "https://www.scouting.org/merit-badges/nature/" },
    { id: "soil-water",        name: "Soil & Water Conservation", area: "Ecology & Conservation", slots: 1, starts: [1],       fillRisk: 0, image: "SoilWaterConserve.png", "url": "https://www.scouting.org/merit-badges/soil-and-water-conservation/" },

    // ── Handicraft ────────────────────────────────────────────────────────────
    { id: "art",          name: "Art",               area: "Handicraft", slots: 1, starts: [0, 2], fillRisk: 0, image: "Art.png",             cost: "Kit purchase required", "url": "https://www.scouting.org/merit-badges/art/" },
    { id: "metalwork",    name: "Metalwork",         area: "Handicraft", slots: 1, starts: [0, 1], fillRisk: 2, image: "Metalwork.png",       cost: "$10 Paid During Registration", "url": "https://www.scouting.org/merit-badges/metalwork/" },
    { id: "pottery",      name: "Pottery/Sculpture", area: "Handicraft", slots: 1, starts: [2, 3], fillRisk: 2, image: "Pottery.png",         cost: "$15 Paid During Registration", "url": "https://www.scouting.org/merit-badges/pottery/" },
    { id: "pulp-paper",   name: "Pulp & Paper",      area: "Handicraft", slots: 1, starts: [0],    fillRisk: 0, image: "PulpAndPaper.png",    "url": "https://www.scouting.org/merit-badges/pulp-and-paper/" },
    { id: "space-explor", name: "Space Exploration", area: "Handicraft", slots: 1, starts: [3],    fillRisk: 0,  image: "SpaceExploration.png", cost: "$15 Paid During Registration", "url": "https://www.scouting.org/merit-badges/space-exploration/" },
    { id: "woodcarving",  name: "Woodcarving",       area: "Handicraft", slots: 1, starts: [1, 3], fillRisk: 0, image: "WoodCarving.png",     cost: "$5-$20 depending on kit.", "url": "https://www.scouting.org/merit-badges/wood-carving/" },

    // ── ScoutCraft ────────────────────────────────────────────────────────────
    { id: "camping",         name: "Camping",                area: "ScoutCraft", slots: 1, starts: [2, 3], fillRisk: 0, image: "Camping.webp",                eagle: true, "url": "https://www.scouting.org/merit-badges/camping/" },
    { id: "first-aid",       name: "First Aid",              area: "ScoutCraft", slots: 2, starts: [2],    fillRisk: 0, image: "FirstAid.webp",               eagle: true, "url": "https://www.scouting.org/merit-badges/first-aid/" },
    { id: "emerg-prep",      name: "Emergency Preparedness", area: "ScoutCraft", slots: 1, starts: [3],    fillRisk: 0, image: "EmergencyPreparedness.webp",  eagle: true, "url": "https://www.scouting.org/merit-badges/emergency-preparedness/" },
    { id: "pioneering",      name: "Pioneering",             area: "ScoutCraft", slots: 2, starts: [0],    fillRisk: 0, image: "Pioneering.webp", "url": "https://www.scouting.org/merit-badges/pioneering/" },
    { id: "search-rescue",   name: "Search & Rescue",        area: "ScoutCraft", slots: 1, starts: [0, 2], fillRisk: 0, image: "SearchRescue.webp", "url": "https://www.scouting.org/merit-badges/search-and-rescue/" },
    { id: "wilderness-surv", name: "Wilderness Survival",    area: "ScoutCraft", slots: 1, starts: [0, 1], fillRisk: 0, image: "WildernessSurvival.webp", "url": "https://www.scouting.org/merit-badges/wilderness-survival/" },
    { id: "trailblazer",     name: "Trailblazer",            area: "ScoutCraft", slots: 2, starts: [0, 2], fillRisk: 0, "url": "https://www.scouting.org/merit-badges/trailblazer/" },

    // ── Shooting Sports ───────────────────────────────────────────────────────
    { id: "archery",  name: "Archery",          area: "Shooting Sports", slots: 2, starts: [0, 2], fillRisk: 0,  image: "Archery.webp", cost: "$5 Paid During Registration", "url": "https://www.scouting.org/merit-badges/archery/" },
    { id: "rifle",    name: "Rifle Shooting",   area: "Shooting Sports", slots: 2, starts: [0, 2], fillRisk: 0,  image: "RifleShooting.webp", cost: "$15 Paid During Registration. Additional ammo purchase may be needed", "url": "https://www.scouting.org/merit-badges/rifle-shooting/" },
    { id: "shotgun",  name: "Shotgun Shooting", area: "Shooting Sports", slots: 2, starts: [0, 2], fillRisk: 3,  image: "ShotgunShooting.webp", cost: "$30 Paid During Registration. Additional ammo purchase may be needed", recAge: 14, "url": "https://www.scouting.org/merit-badges/shotgun-shooting/" },

    // ── Cycling Base ──────────────────────────────────────────────────────────
    { id: "cycling",  name: "Cycling",  area: "Cycling Base", slots: 2, starts: [0, 2], fillRisk: 2, image: "Cycling.png", cost: "$10 Paid During Registration ", recYear: 3, eagle: true, "url": "https://www.scouting.org/merit-badges/cycling/" },

    // ── The Wall ──────────────────────────────────────────────────────────────
    { id: "climbing", name: "Climbing", area: "The Wall", slots: 2, starts: [0, 2], fillRisk: 2, image: "Climbing.webp", cost: "$50 Paid During Registration ", "url": "https://www.scouting.org/merit-badges/climbing/" },

    // ── Triangle M Ranch ──────────────────────────────────────────────────────
    { id: "animal-science", name: "Animal Science",      area: "Triangle M Ranch", slots: 1, starts: [2], fillRisk: 0, image: "AnimalScience.webp", "url": "https://www.scouting.org/merit-badges/animal-science/" },
    { id: "horsemanship",   name: "Horsemanship",        area: "Triangle M Ranch", slots: 2, starts: [0], fillRisk: 3,  image: "Horsemanship.webp", cost: "$150 Paid During Registration.", "url": "https://www.scouting.org/merit-badges/horsemanship/" },
    { id: "vet-medicine",   name: "Veterinary Medicine", area: "Triangle M Ranch", slots: 1, starts: [3], fillRisk: 0, image: "VeterinaryMedicine.webp", "url": "https://www.scouting.org/merit-badges/veterinary-medicine/" },
  ],

  // ── Afternoon & Evening badges ──────────────────────────────────────────
  // Display-only — not fed into the morning solver.
  // PM periods: 0 = 2:30–3:30, 1 = 3:45–4:45, 2 = 7:00–8:30 PM
  pmPeriods: [
    { id: 0, start: "2:30",  end: "3:30" },
    { id: 1, start: "3:45",  end: "4:45" },
    { id: 2, start: "7:00",  end: "8:30 PM" },
  ],

  pmBadges: [
    { id: "cooking",        name: "Cooking",        area: "Comanche",               slots: 1, starts: [2],    days: null,         eagle: true, image: "Cooking.webp", url: "https://www.scouting.org/merit-badges/cooking/" },
    { id: "chess",          name: "Chess",          area: "Handicraft",             slots: 1, starts: [0],    days: "Mon or Wed", image: "Chess.webp", url: "https://www.scouting.org/merit-badges/chess/" },
    { id: "golf",           name: "Golf (Disc)",    area: "ScoutCraft",             slots: 1, starts: [1],    days: "Tue or Thu", image: "Golf.webp", url: "https://www.scouting.org/merit-badges/golf/" },
    { id: "fishing",        name: "Fishing",        area: "Ecology & Conservation", slots: 2, starts: [0],    days: null,         image: "Fishing.webp", url: "https://www.scouting.org/merit-badges/fishing/" },
    { id: "mammal-study",   name: "Mammal Study",   area: "Ecology & Conservation", slots: 2, starts: [0],    days: "Mon or Thu", image: "MammalStudy.webp", url: "https://www.scouting.org/merit-badges/mammal-study/" },
    { id: "leatherwork",    name: "Leatherwork",    area: "Handicraft",             slots: 2, starts: [0],    days: null,         cost: "$5-$20 depending on kit.", image: "Leatherwork.webp", url: "https://www.scouting.org/merit-badges/leatherwork/" },
    { id: "basketry",       name: "Basketry",       area: "Handicraft",             slots: 1, starts: [0],    days: null,         cost: "$5-$20 depending on kit.", image: "Basketry.webp", url: "https://www.scouting.org/merit-badges/basketry/" },
    { id: "fingerprinting", name: "Fingerprinting", area: "ScoutCraft",             slots: 1, starts: [1],    days: "Tue or Wed", image: "Fingerprinting.webp", url: "https://www.scouting.org/merit-badges/fingerprinting/" },
  ],

  travel: {
    west: null,
    east: {
      "Aquatics":              { "Aquatics":0,  "Ecology & Conservation":12, "Handicraft":4,  "ScoutCraft":2,  "Shooting Sports":20, "Cycling Base":25, "The Wall":20, "Triangle M Ranch":20 },
      "Ecology & Conservation":{ "Aquatics":12, "Ecology & Conservation":0,  "Handicraft":10, "ScoutCraft":12, "Shooting Sports":25, "Cycling Base":13, "The Wall":8,  "Triangle M Ranch":20 },
      "Handicraft":            { "Aquatics":4,  "Ecology & Conservation":10, "Handicraft":0,  "ScoutCraft":4,  "Shooting Sports":20, "Cycling Base":23, "The Wall":18, "Triangle M Ranch":20 },
      "ScoutCraft":            { "Aquatics":2,  "Ecology & Conservation":12, "Handicraft":4,  "ScoutCraft":0,  "Shooting Sports":20, "Cycling Base":25, "The Wall":20, "Triangle M Ranch":20 },
      "Shooting Sports":       { "Aquatics":20, "Ecology & Conservation":25, "Handicraft":20, "ScoutCraft":20, "Shooting Sports":0,  "Cycling Base":45, "The Wall":40, "Triangle M Ranch":20 },
      "Cycling Base":          { "Aquatics":25, "Ecology & Conservation":13, "Handicraft":23, "ScoutCraft":25, "Shooting Sports":45, "Cycling Base":0,  "The Wall":5,  "Triangle M Ranch":20 },
      "The Wall":              { "Aquatics":20, "Ecology & Conservation":8,  "Handicraft":18, "ScoutCraft":20, "Shooting Sports":40, "Cycling Base":5,  "The Wall":0,  "Triangle M Ranch":20 },
      "Triangle M Ranch":      { "Aquatics":20, "Ecology & Conservation":20, "Handicraft":20, "ScoutCraft":20, "Shooting Sports":20, "Cycling Base":20, "The Wall":20, "Triangle M Ranch":0  },
    }
  },

  // ── Locations ────────────────────────────────────────────────────────────
  // side: "east" | "west" | null (shared/camp-wide)
  // type: "activity" | "campsite" | "facility"
  // coords: { x, y } percentage-based on the camp map image (null = not yet calibrated)
  locations: [
    // ── Activity areas — East Camp ──
    { id: "aquatics-east",      name: "Aquatics",               side: "east", type: "activity", coords: { x: 52.5, y: 29.6 } },
    { id: "ecocon-east",        name: "Ecology & Conservation", side: "east", type: "activity", coords: { x: 49.8, y: 55.9 } },
    { id: "handicraft-east",    name: "Handicraft",             side: "east", type: "activity", coords: { x: 57.6, y: 34.5 } },
    { id: "scoutcraft-east",    name: "ScoutCraft",             side: "east", type: "activity", coords: { x: 56.8, y: 27.9 } },
    { id: "shooting-east",      name: "Shooting Sports",        side: "east", type: "activity", coords: { x: 93.1, y: 16.2 } },
    { id: "firebowl-east",      name: "Firebowl",              side: "east", type: "facility", coords: { x: 50.2, y: 39.5 } },
    { id: "pinnacle-east",      name: "Pinnacle",              side: "east", type: "facility", coords: { x: 58.5, y: 32.2 } },
    { id: "office-east",        name: "Office",                side: "east", type: "facility", coords: { x: 54.3, y: 42.3 } },
    { id: "dining-east",        name: "Dining Hall",           side: "east", type: "facility", coords: { x: 54.3, y: 39.3 } },
    { id: "shower-east-1",      name: "Shower 1",             side: "east", type: "facility", coords: { x: 85.2, y: 18.1 } },
    { id: "shower-east-2",      name: "Shower 2",             side: "east", type: "facility", coords: { x: 83.0, y: 39.9 } },
    { id: "tp-east",            name: "Trading Post",          side: "east", type: "facility", coords: { x: 55.8, y: 37.2 } },
    { id: "qm-east",            name: "Quartermaster",         side: "east", type: "facility", coords: { x: 81.3, y: 42.9 } },

    // ── Activity areas — West Camp ──
    { id: "aquatics-west",      name: "Aquatics",               side: "west", type: "activity", coords: { x: 41.2, y: 29.5 } },
    { id: "ecocon-west",        name: "Ecology & Conservation", side: "west", type: "activity", coords: { x: 41.5, y: 17.7 } },
    { id: "handicraft-west",    name: "Handicraft",             side: "west", type: "activity", coords: { x: 32.6, y: 40.9 } },
    { id: "scoutcraft-west",    name: "ScoutCraft",             side: "west", type: "activity", coords: { x: 35.8, y: 26.8 } },
    { id: "shooting-west",      name: "Shooting Sports",        side: "west", type: "activity", coords: { x: 32.7, y: 13.2 } },
    { id: "firebowl-west",      name: "Firebowl",              side: "west", type: "facility", coords: { x: 37.1, y: 39.0 } },
    { id: "pinnacle-west",      name: "Pinnacle",              side: "west", type: "facility", coords: { x: 28.1, y: 29.3 } },
    { id: "office-west",        name: "Office",                side: "west", type: "facility", coords: { x: 25.7, y: 43.7 } },
    { id: "dining-west",        name: "Dining Hall",           side: "west", type: "facility", coords: { x: 26.5, y: 39.9 } },
    { id: "shower-west-1",      name: "Shower 1",             side: "west", type: "facility", coords: { x: 23.8, y: 25.7 } },
    { id: "tp-west",            name: "Trading Post",          side: "west", type: "facility", coords: { x: 25.7, y: 34.4 } },
    { id: "qm-west",            name: "Quartermaster",         side: "west", type: "facility", coords: { x: 26.3, y: 34.5 } },

    // ── Activity areas — Shared ──
    { id: "climbing-wall",      name: "The Wall",              side: null,   type: "activity", coords: { x: 22.0, y: 74.8 } },
    { id: "cycling-base",       name: "Cycling Base",          side: null,   type: "activity", coords: { x: 17.6, y: 56.1 } },
    { id: "zipline",            name: "Zipline",               side: null,   type: "activity", coords: { x: 20.3, y: 75.4 } },
    { id: "triangle-m-ranch",   name: "Triangle M Ranch",      side: null,   type: "activity", coords: null },

    // ── Campsites — East Camp ──
    { id: "iroquois",           name: "Iroquois",              side: "east", type: "campsite", coords: { x: 73.8, y: 14.9 } },
    { id: "comanche",           name: "Comanche",              side: "east", type: "campsite", coords: { x: 64.3, y: 27.6 } },
    { id: "cheyenne",           name: "Cheyenne",              side: "east", type: "campsite", coords: { x: 79.0, y: 24.9 } },
    { id: "oneida",             name: "Oneida",                side: "east", type: "campsite", coords: { x: 90.4, y: 28.2 } },
    { id: "chippewa",           name: "Chippewa",              side: "east", type: "campsite", coords: { x: 89.3, y: 34.1 } },
    { id: "mohawk",             name: "Mohawk",                side: "east", type: "campsite", coords: { x: 79.5, y: 33.6 } },
    { id: "delaware",           name: "Delaware",              side: "east", type: "campsite", coords: { x: 85.5, y: 41.4 } },
    { id: "sioux",              name: "Sioux",                 side: "east", type: "campsite", coords: { x: 75.5, y: 42.8 } },
    { id: "blackfoot",          name: "Blackfoot",             side: "east", type: "campsite", coords: { x: 67.7, y: 53.4 } },
    { id: "menominee",          name: "Menominee",             side: "east", type: "campsite", coords: { x: 79.1, y: 57.5 } },
    { id: "shawnee",            name: "Shawnee",               side: "east", type: "campsite", coords: { x: 72.3, y: 59.6 } },

    // ── Campsites — West Camp ──
    { id: "powell",             name: "Powell",                side: "west", type: "campsite", coords: { x: 20.2, y: 42.2 } },
    { id: "boone",              name: "Boone",                 side: "west", type: "campsite", coords: { x: 18.4, y: 40.6 } },
    { id: "clark",              name: "Clark",                 side: "west", type: "campsite", coords: { x: 12.9, y: 35.7 } },
    { id: "carson",             name: "Carson",                side: "west", type: "campsite", coords: { x: 18.5, y: 31.9 } },
    { id: "lewis",              name: "Lewis",                 side: "west", type: "campsite", coords: { x: 20.7, y: 27.9 } },
    { id: "bowie",              name: "Bowie",                 side: "west", type: "campsite", coords: { x: 15.1, y: 26.6 } },
    { id: "bridger",            name: "Bridger",               side: "west", type: "campsite", coords: { x: 19.9, y: 21.1 } },
    { id: "cody",               name: "Cody",                  side: "west", type: "campsite", coords: { x: 27.0, y: 20.0 } },
    { id: "crockett",           name: "Crockett",              side: "west", type: "campsite", coords: { x: 35.5, y: 20.4 } },
    { id: "whitney",            name: "Whitney",               side: "west", type: "campsite", coords: { x: 44.5, y: 23.1 } },

    // ── Facilities — Camp-wide ──
    { id: "welcome-center",     name: "Welcome Center",        side: null,   type: "facility", coords: { x: 16.5, y: 50.9 } },
    { id: "health-lodge",       name: "Health Lodge",          side: null,   type: "facility", coords: { x: 22.9, y: 55.1 } },
    { id: "country-store",      name: "Country Store",         side: null,   type: "facility", coords: { x: 22.9, y: 57.8 } },
    { id: "chapel",             name: "Chapel",                side: null,   type: "facility", coords: { x: 37.7, y: 67.2 } },
    { id: "remembrance",        name: "Remembrance Area",      side: null,   type: "facility", coords: { x: 36.2, y: 68.9 } },
    { id: "oa-bowl",            name: "OA Bowl",               side: null,   type: "facility", coords: { x: 61.6, y: 62.9 } },
    { id: "oa-lodge",           name: "OA Lodge",              side: null,   type: "facility", coords: { x: 53.2, y: 46.3 } },
  ],
};


// DESC — short descriptions shown in the Detailed view card. Keyed by badge id.
const DESC = {
  "canoeing":           "Demonstrate paddle strokes and tandem maneuvers, capsize and re-enter a swamped canoe, and complete a flat-water distance trip.",
  "kayaking":           "Demonstrate paddle strokes, perform a wet exit and assisted rescue, and complete a flat-water kayaking trip.",
  "lifesaving":         "Demonstrate reaching, throwing, and swimming rescues, practice defenses against a panicking victim, and show CPR and first-aid for water emergencies. Eagle-required (one of: Emergency Preparedness or Lifesaving).",
  "motorboating":       "Demonstrate safe motorboat operation including pre-departure checks, docking, anchoring, man-overboard recovery, and navigation rules.",
  "rowing":             "Demonstrate rowing technique and oar handling, perform pivot turns and backing, and complete a distance row.",
  "small-boat-sailing": "Rig a sailboat, demonstrate tacking, jibing, and reaching maneuvers, and perform capsize recovery and man-overboard procedures.",
  "swimming":           "Perform front crawl, backstroke, breaststroke, sidestroke, and elementary backstroke over distance, plus survival floating and underwater swimming. Eagle-required (one of: Swimming, Hiking, or Cycling).",
  "archeology":         "Study how artifacts reveal past cultures, learn archaeological methods and ethics, and complete a simulated excavation or research project.",
  "astronomy":          "Identify constellations and planets, sketch the moon's phases over a month, and observe deep-sky targets through a telescope across multiple sessions.",
  "bird-study":         "Identify at least 20 bird species in the field by sight or sound, study bird anatomy and behavior, and build a feeder or nest box.",
  "environmental-sci":  "Conduct field investigations into ecosystems, perform water/air/soil quality experiments, and carry out a conservation improvement project. Eagle-required (one of: Environmental Science or Sustainability).",
  "fish-wildlife":      "Study local fish and wildlife species, learn about habitat management and population dynamics, and carry out a wildlife management or habitat improvement project.",
  "forestry":           "Identify at least 15 trees and 5 undergrowth species, explain forest management practices such as timber harvesting and controlled burns, and visit a managed forest or tree farm.",
  "geology":            "Collect and identify rocks, minerals, and fossils, explain Earth processes like plate tectonics and erosion, and study a local geological feature on a field trip.",
  "nature":             "Observe wildlife across multiple categories (birds, mammals, insects, plants), keep a nature journal, and build a nature project like a terrarium or bird feeder.",
  "soil-water":         "Study soil profiles and types, demonstrate how erosion and runoff work, and plan and carry out a soil or water conservation project.",
  "art":                "Study art principles (color, line, shape, texture), discuss art history and careers, and create four original works in different media.",
  "metalwork":          "Learn metalworking safety and properties of metals, then complete projects using sheet-metal layout, benchwork, and either casting or forging.",
  "pottery":            "Learn ceramic safety and terminology, then hand-build and wheel-throw pottery pieces that are fired and finished with glaze.",
  "pulp-paper":         "Learn how wood pulp is processed into paper products, discuss recycling and environmental impacts, and make a sheet of paper by hand.",
  "space-explor":       "Study the history of space exploration and rocket propulsion, learn about planets and spacecraft systems, and build and launch a model rocket.",
  "woodcarving":        "Demonstrate knife and gouge safety, sharpen and care for carving tools, and complete projects including chip carving, relief carving, and carving in the round.",
  "camping":            "Log 20+ nights of camping, demonstrate campsite selection and setup, cook meals outdoors, and apply Leave No Trace principles. Eagle-required.",
  "first-aid":          "Demonstrate treatment for burns, fractures, shock, poisoning, bites, and bleeding, perform CPR and AED use, and respond to simulated emergency scenarios. Eagle-required.",
  "emerg-prep":         "Develop a family emergency plan, assemble a disaster supply kit, learn to respond to specific emergencies (fire, flood, severe weather), and participate in a community drill or service project. Eagle-required (one of: Emergency Preparedness or Lifesaving).",
  "pioneering":         "Tie a range of knots and splices, build camp structures using square, diagonal, shear, and tripod lashings, and construct a project such as a bridge, tower, or catapult.",
  "search-rescue":      "Learn lost-person behavior, plan and conduct grid and sweep searches, practice wilderness and urban rescue scenarios, and use signaling methods.",
  "wilderness-surv":    "Build and sleep overnight in a self-constructed shelter, start a fire without matches, identify and purify water sources, and signal for rescue.",
  "trailblazer":        "A first-year scout program combining outdoor skills, Scout rank advancement, and camp orientation across two morning periods.",
  "archery":            "Learn range safety rules, identify bow and arrow parts, demonstrate proper shooting technique, and shoot qualifying scores at 15 and 30 yards.",
  "rifle":              "Learn firearm safety and range rules, identify rifle parts and ammunition types, demonstrate proper shooting positions, and fire qualifying scores from bench rest and prone.",
  "shotgun":            "Learn firearm safety and range commands, identify shotgun parts and ammunition types, demonstrate proper stance, and break clay targets on a trap or skeet range.",
  "cycling":            "Learn bike safety, maintenance, and repair (fix a flat, adjust brakes/derailleurs), and complete progressively longer rides including a 50-mile ride. Eagle-required (one of: Swimming, Hiking, or Cycling).",
  "climbing":           "Learn climbing safety, knots, harness use, and belay techniques, then complete top-rope climbs, a rappel descent, and demonstrate bouldering skills.",
  "animal-science":     "Study animal anatomy, nutrition, genetics, and disease prevention, then research a livestock or poultry species in depth and keep records of caring for or observing animals.",
  "horsemanship":       "Learn horse safety, grooming, feeding, and tack identification, then saddle and bridle a horse and ride at walk, trot, and canter.",
  "vet-medicine":       "Visit a vet clinic, learn about animal diseases and parasites, observe or assist with animal examinations, and discuss career paths with a practicing veterinarian.",
  // ── Afternoon & Evening ──
  "cooking":            "Plan and cook meals using different methods, demonstrate food safety and nutrition knowledge, and prepare a trail-food menu for a camping trip. Eagle-required.",
  "chess":              "Learn chess rules, notation, and strategies, play multiple recorded games, and demonstrate opening principles, tactics, and endgame techniques.",
  "golf":               "Learn disc golf etiquette and rules, demonstrate throwing techniques (backhand, forehand, putting), and play a round on a course while keeping score.",
  "fishing":            "Learn fishing regulations and conservation, demonstrate casting and knot-tying, identify fish species, and catch and properly handle fish.",
  "mammal-study":       "Identify local mammal species by sight and sign, study their habitats, behaviors, and role in ecosystems, and observe mammals in the field.",
  "leatherwork":        "Learn leather types and tanning processes, demonstrate cutting, stitching, and tooling techniques, and complete finished leather projects.",
  "basketry":           "Learn basket-weaving materials and techniques, then complete projects using different weaving methods such as coiling, twining, or plaiting.",
  "fingerprinting":     "Learn how fingerprints are classified and used in identification, take and classify a set of fingerprints, and discuss forensic science applications.",
};

// MAP_URL — camp map image used in the printable schedule.
const MAP_URL = PLANNER_ASSETS + "img/makajawan-map.jpeg";
