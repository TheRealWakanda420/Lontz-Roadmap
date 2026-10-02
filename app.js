const advisorMode = new URLSearchParams(window.location.search).get("advisor") === "1";
const STORAGE_KEY = advisorMode ? "lontz-coleman-journey-v1" : "lontz-coleman-client-draft-v1";
const ADVISOR_EMAIL = "T.hester@cruiseplanners.com";

const swissStopUpdates = {
  gotthard: {
    previousDetail: "Train to Lucerne, paddle steamer to Flüelen, then panoramic rail to Lugano · about 5½ hours. Reserve seats; forward luggage hotel-to-hotel.",
    detail: "Suggested Mon Jul 19 · Short train Zürich→Lucerne, paddle steamer Lucerne→Flüelen, then panoramic rail to Lugano · about 5½ hours. Seat reservation required (seasonal Apr–Oct). SBB hotel-to-hotel luggage forwarding keeps bags off transfers.",
    previousStatus: "Research",
    status: "To Book"
  },
  bernina: {
    previousDetail: "Bus Lugano→Tirano, then the UNESCO rail line to Pontresina. Reserve seats. The classic bus does not include a Lake Como boat crossing.",
    detail: "Suggested Tue Jul 20 · Bernina Express bus Lugano→Tirano, then the UNESCO rail line to Pontresina via the Brusio spiral viaduct. The bus passes Lake Como but includes no boat crossing. Reserve seats; if a boat is a must, price a custom Lugano→Menaggio connection before Tirano.",
    previousStatus: "Research",
    status: "To Book"
  },
  glacier: {
    previousDetail: "St. Moritz→Brig for the scenic stretch, then mainline rail to Lausanne. Very limited Excellence seats; reserve as soon as 2027 inventory opens.",
    detail: "Suggested Wed Jul 21 · Travel Pontresina→St. Moritz, then the Glacier Express to Brig; continue by mainline rail to Lausanne (~1¾ hours). Excellence Class has panoramic single seats, five-course dining and a dedicated concierge. Very limited seats; reserve as soon as 2027 inventory opens.",
    previousStatus: "Research",
    status: "To Book"
  },
  bern: {
    previousDetail: "One night at Bellevue Palace recommended. Flat arcades and an easy morning train to Basel, about one hour.",
    detail: "Arrive from Interlaken after the GoldenPass · one night at Bellevue Palace is recommended. Flat arcades and an easy morning train to Basel (~1 hour)."
  },
  goldenpass: {
    previousDetail: "Montreux→Interlaken in Prestige, then train to Bern. Reserve seats; direct Lausanne→Bern is the simpler alternative.",
    detail: "Suggested Fri Jul 23 · Train Lausanne→Montreux, then GoldenPass Express in Prestige to Interlaken; continue by train to Bern. Prestige seats rotate toward the views; reserve ahead. Simpler alternative: direct Lausanne→Bern (~1¼ hours).",
    previousStatus: "Research",
    status: "To Book"
  },
  basel: {
    previousDetail: "Viking embarkation · July 24. If skipping Bern, arrive the night before and prearrange station-to-pier transfer.",
    detail: "To Basel · Embarkation Sat Jul 24 · Morning train from Bern (~1 hour), then prearranged private transfer to the Viking pier. Confirm the embarkation window and arrange light-luggage assistance.",
    previousStatus: "Confirm",
    status: "To Book"
  }
};

const defaultData = {
  legs: [
    {
      id: "switzerland",
      number: "01",
      title: "Switzerland by Rail",
      kicker: "THE ALPINE CROSSING",
      window: "Approximately July 18–24",
      note: "Mountain railways, lakeside pauses, and a little room to breathe.",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80",
      position: "center 55%",
      stops: [
        { id: "zurich", name: "Zürich", detail: "Private airport meet-and-greet. Optional Saturday second night for a reset and Frank's chocolate walk.", status: "Option" },
        { id: "gotthard", name: "Gotthard Panorama Express", detail: swissStopUpdates.gotthard.detail, status: swissStopUpdates.gotthard.status },
        { id: "lugano", name: "Lugano", detail: "Splendide Royal or Villa Castagnola · step-free lake-view king to request. Private car to Alprose in Caslano.", status: "Research" },
        { id: "bernina", name: "Bernina Express", detail: swissStopUpdates.bernina.detail, status: swissStopUpdates.bernina.status },
        { id: "pontresina", name: "Pontresina", detail: "Grand Hotel Kronenhof · restful, step-free base. Badrutt's Palace in St. Moritz is the alternative.", status: "Research" },
        { id: "glacier", name: "Glacier Express · Excellence Class", detail: swissStopUpdates.glacier.detail, status: swissStopUpdates.glacier.status },
        { id: "lausanne", name: "Lausanne", detail: "Two nights recommended for the Olympic Museum, Chillon, Gruyère, and laundry. Beau-Rivage Palace in Ouchy; Lausanne Palace is central alternative.", status: "Decision" },
        { id: "goldenpass", name: "GoldenPass · Prestige Class", detail: swissStopUpdates.goldenpass.detail, status: swissStopUpdates.goldenpass.status },
        { id: "bern", name: "Bern", detail: swissStopUpdates.bern.detail, status: "Decision" },
        { id: "basel", name: "Basel", detail: swissStopUpdates.basel.detail, status: swissStopUpdates.basel.status }
      ]
    },
    {
      id: "rhine",
      number: "02",
      title: "Viking Rhine Getaway",
      kicker: "THE RIVER CHAPTER",
      window: "July 24–31 · Booking 7723079",
      note: "A week on the Rhine, with the Middle Rhine in the spotlight.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
      position: "center 48%",
      stops: [
        { id: "ship-basel", name: "Basel", detail: "Embarkation details to confirm with Viking", status: "Confirm" },
        { id: "breisach", name: "Breisach", detail: "Choose the included Black Forest coach tour or a coach-based excursion to Colmar.", status: "Planned" },
        { id: "strasbourg", name: "Strasbourg", detail: "Grande Île and Petite France; choose a canal boat or coach option to keep walking light.", status: "Planned" },
        { id: "speyer", name: "Speyer", detail: "Choose the cathedral or Heidelberg; favor the town-and-coach version over castle slopes and steps.", status: "Planned" },
        { id: "rudesheim", name: "Rüdesheim & Middle Rhine", detail: "Scenic highlight: Drosselgasse, then castle-lined Rhine and Lorelei views from the ship deck or lounge, no walking required.", status: "Confirm" },
        { id: "cologne", name: "Cologne", detail: "Cathedral and old town beside the ship; flat and central.", status: "Planned" },
        { id: "kinderdijk", name: "Kinderdijk", detail: "Nineteen UNESCO windmills on flat paths, with a canal boat option to reduce walking.", status: "Planned" },
        { id: "amsterdam", name: "Amsterdam", detail: "Disembarkation · July 31", status: "Confirm" }
      ]
    },
    {
      id: "iceland",
      number: "03",
      title: "Iceland by Land",
      kicker: "THE NORTH ATLANTIC",
      window: "July 31–approximately August 4",
      note: "A geothermal welcome, then Reykjavík and the wide-open road.",
      image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1000&q=80",
      position: "center 52%",
      stops: [
        { id: "blue-lagoon", name: "Blue Lagoon", detail: "About 20 minutes from Keflavík. Accessible lift into the water; time it to the flight and arrange a private transfer.", status: "Option" },
        { id: "reykjavik", name: "Reykjavík", detail: "Four nights allow a rest day, Whales of Iceland Museum, and laundry at The Reykjavík EDITION.", status: "Decision" },
        { id: "golden-circle", name: "Golden Circle", detail: "Private driver for Þingvellir, Geysir, and Gullfoss. Choose viewpoints reachable by car or short level walks; no hiking plan.", status: "Research" },
        { id: "south-coast", name: "South Coast", detail: "Private driver day to waterfalls, Reynisfjara, and Vík. Longer and optional; keep flexible around energy and weather.", status: "Research" }
      ]
    }
  ],
  decisions: [
    { id: "lausanne", number: "01", title: "Lausanne", question: "One night or two?", context: "Recommendation: two nights. That makes room for the Olympic Museum, Château de Chillon, Gruyère, and a natural laundry stop without rushing.", options: ["One night", "Two nights"], selected: "" },
    { id: "bern", number: "02", title: "Bern", question: "Stay, or press on?", context: "Recommendation: one night at Bellevue Palace. Bern's arcaded old town is flat and easy; the morning train to Basel is about an hour. Pressing on also works.", options: ["Stay in Bern", "Go to Basel"], selected: "" },
    { id: "flight", number: "03", title: "Amsterdam → Reykjavík", question: "How should the flight be booked?", context: "You are arranging air through Viking. Confirm whether this leg is included with Viking air or booked separately alongside the homeward flight.", options: ["Through Viking", "Book separately"], selected: "" },
    { id: "iceland-nights", number: "04", title: "Iceland", question: "How many nights?", context: "Four nights allows for the Blue Lagoon, Golden Circle, an optional South Coast day, the Whales of Iceland Museum, and a rest day. Confirm the return date before pricing the EDITION.", options: ["Four nights", "Different number"], selected: "" }
  ],
  confirmations: [
    { id: "viking-dates", title: "Embarkation & disembarkation", detail: "Basel, July 24 · Amsterdam, July 31", done: false },
    { id: "viking-bed", title: "Viking Explorer bed setup", detail: "Queen or split twins; river staterooms do not have a king or two doubles", done: false },
    { id: "viking-dining", title: "Dining preferences", detail: "Clean eating · dinner by 7 pm", done: false }
  ],
  scenicConfirmed: false,
  zurichOption: false,
  prep: [
    { id: "confirmation-note", label: "Send Annmarie a confirmation note", checked: false },
    { id: "edit-mode", label: "Open the roadmap in Edit mode for the call", checked: false },
    { id: "budget-talk", label: "Discuss budget range per leg", checked: false }
  ],
  budgets: { alpine: "", rhine: "", iceland: "" },
  notes: "",
  known: [
    { title: "Gruyère, done properly", detail: "La Maison du Gruyère is step-free, with morning demos and live vats. About CHF 7, free with Swiss Pass; plan a private car timed to the make." },
    { title: "Frank's chocolate trail", detail: "Sprüngli at Paradeplatz, Zürich's Saturday chocolate walk (~CHF 30 pp), and Alprose in Caslano with step-free viewing and free tastings." },
    { title: "Aurora expectations", detail: "No Northern Lights in July: near-24-hour daylight means no darkness. Set expectations for the midnight sun instead." },
    { title: "Luggage & laundry", detail: "SBB hotel-to-hotel forwarding. Laundry in Lausanne and Reykjavík; confirm Viking river-ship laundry service, as self-service varies by ship." },
    { title: "Reykjavík stay", detail: "The Reykjavík EDITION. Marriott family, so Bonvoy status still applies." }
  ],
  work: [
    { icon: "↗", title: "Rail reservations", items: ["Gotthard Panorama Express", "Bernina Express", "Glacier Express · Excellence", "GoldenPass · Prestige"] },
    { icon: "→", title: "Private transfers", items: ["Airport meet-and-greet", "Caslano", "Gruyères", "Bern → Basel"] },
    { icon: "⌁", title: "Iceland by road", items: ["Private driver-guide", "Golden Circle", "South Coast"] }
  ],
  hotels: [
    {
      id: "zurich",
      number: "01",
      area: "Zürich",
      timing: "Arrival · 1 night, or add Saturday night",
      note: "A second night makes room to reset after the flight and catch the Saturday chocolate walk.",
      options: [
        { id: "zurich-marriott", name: "Zürich Marriott Hotel", type: "Bonvoy", role: "Original roadmap pick", detail: "Riverside and walkable to the old town, with a full-service feel at the start of the rail trip.", why: "The clearest fit if earning Bonvoy points matters and you want to stay near the river and old town.", tradeoff: "Lounge breakfast and evening bites require an Executive-level rate that includes access; Lifetime Gold alone does not include lounge access.", guestFit: "Request a king or two doubles. Confirm an accessible room and the exact Executive room benefits before booking.", url: "https://www.marriott.com/en-us/hotels/zrhdt-zurich-marriott-hotel/overview/" },
        { id: "zurich-park-hyatt", name: "Park Hyatt Zürich", type: "Non-Bonvoy", role: "Original comparable alternative", detail: "A polished, high-end city alternative for a more independent stay experience.", why: "Choose it if the room, service, or breakfast-included offer feels like the better start, even without Marriott earning.", tradeoff: "No Bonvoy points or elite-night credit. Price the full stay against the Marriott Executive option, not just the base room.", guestFit: "Confirm king or twin availability, step-free room details, breakfast inclusion, and a comfortable station transfer.", url: "https://www.hyatt.com/park-hyatt/en-US/zurph-park-hyatt-zurich" }
      ]
    },
    {
      id: "lugano",
      number: "02",
      area: "Lugano",
      timing: "1 night · lake stay between panoramic trains",
      note: "Neither original lakefront candidate is a Bonvoy hotel; compare room access and transfer time to Caslano.",
      options: [
        { id: "lugano-splendide", name: "Hotel Splendide Royal", type: "Non-Bonvoy", role: "Original roadmap pick", detail: "Lakefront grande-dame comfort with broad views across Lake Lugano.", why: "Pick the classic, polished lakefront stay if that grand-hotel feeling is part of the Swiss experience.", tradeoff: "No Marriott in Lugano, so this night will not earn Bonvoy points. Compare the breakfast-included rate and transfer timing.", guestFit: "The roadmap calls for step-free access and a lake-view king. Confirm both directly, plus the private car to Alprose in Caslano.", url: "https://www.splendide.ch/" },
        { id: "lugano-villa-castagnola", name: "Villa Castagnola", type: "Non-Bonvoy", role: "Original alternative", detail: "An intimate lakeside villa atmosphere, still close to Lugano's city stops.", why: "Choose it for a quieter, more personal-feeling lake stay rather than the grand-dame style.", tradeoff: "Also non-Bonvoy. Check the exact room location and car transfer so the private setting stays convenient.", guestFit: "Confirm step-free access, a lake-view king, breakfast inclusion, and the Caslano transfer.", url: "https://www.villacastagnola.com/" }
      ]
    },
    {
      id: "pontresina",
      number: "03",
      area: "Pontresina",
      timing: "1 night · Engadine stop",
      note: "Keep the distinctive alpine stay; there is no obvious Bonvoy replacement that preserves this location and character.",
      options: [
        { id: "pontresina-kronenhof", name: "Grand Hotel Kronenhof", type: "Non-Bonvoy", role: "Original roadmap pick", detail: "A landmark historic hotel with spa, gardens, and a restful alpine setting.", why: "Best aligned with the planned Pontresina overnight and a quiet pause before the Glacier Express.", tradeoff: "Non-Bonvoy. Keep the hotel in Pontresina to avoid changing the rail base just to stay in St. Moritz.", guestFit: "The roadmap describes this stay as step-free. Confirm the specific room, lift route, and breakfast rate.", url: "https://www.kronenhof.com/" },
        { id: "pontresina-badrutt", name: "Badrutt's Palace", type: "Non-Bonvoy", role: "Nearby alternative · St. Moritz", detail: "A grand luxury alternative in nearby St. Moritz rather than Pontresina.", why: "Consider it if the St. Moritz setting and hotel experience are more compelling than staying in Pontresina.", tradeoff: "Changing towns adds transfer and timing questions around the Glacier Express departure; it is not a like-for-like swap.", guestFit: "Confirm step-free room details, breakfast, and the transfer to the planned train before considering the change.", url: "https://www.badruttspalace.com/" }
      ]
    },
    {
      id: "lausanne",
      number: "04",
      area: "Lausanne",
      timing: "1 or 2 nights · depends on the call decision",
      note: "Two nights buy time for Chillon and the Gruyère morning. Decide the stay before comparing final rates.",
      options: [
        { id: "lausanne-beaurivage", name: "Beau-Rivage Palace · Ouchy", type: "Non-Bonvoy", role: "Original roadmap pick", detail: "A lakefront palace hotel with gardens and a spa, right on Lake Geneva.", why: "The most natural match for the recommended two-night pause, lakefront evenings, and laundry mid-journey.", tradeoff: "Non-Bonvoy and a quieter Ouchy location rather than central Lausanne. Compare the total two-night rate.", guestFit: "The roadmap specifies step-free access and lake-view rooms. Confirm breakfast, bed setup, and the route to transport.", url: "https://www.brp.ch/" },
        { id: "lausanne-palace", name: "Lausanne Palace", type: "Non-Bonvoy", role: "Central alternative", detail: "A central Lausanne base if city access matters more than staying directly on the lake.", why: "Choose it for a more central location while keeping the two-night schedule for Chillon, Gruyère, and laundry.", tradeoff: "Not the Ouchy lakefront setting. Compare the room and breakfast package before trading away the lakeside stay.", guestFit: "Confirm step-free room details, king/twin setup, breakfast, and easy car pickup for excursions.", url: "https://www.lausanne-palace.ch/en/" }
      ]
    },
    {
      id: "bern",
      number: "05",
      area: "Bern",
      timing: "Only if they choose the overnight",
      note: "This hotel is part of the Bern-versus-Basel decision; skip the Bern rate search if they press on to Basel.",
      options: [
        { id: "bern-bellevue", name: "Bellevue Palace", type: "Non-Bonvoy", role: "Original roadmap pick", detail: "A grand central address with a terrace over the Aare, moments from Bern's arcades.", why: "It makes the recommended Bern overnight feel special while keeping the flat old town close and the next morning easy.", tradeoff: "Only relevant if you choose the Bern overnight; it is non-Bonvoy and the Saturday schedule is tighter than going straight to Basel.", guestFit: "The roadmap notes step-free access. Confirm breakfast and the preferred king/twin room setup.", url: "https://www.bellevue-palace.ch/" }
      ]
    },
    {
      id: "basel",
      number: "06",
      area: "Basel",
      timing: "Night before embarkation, if they skip Bern",
      note: "The safer embarkation-eve plan. Favor an easy station or port transfer over chasing a status stay at the wrong end of town.",
      options: [
        { id: "basel-victoria", name: "Hotel Victoria", type: "Non-Bonvoy", role: "Station-side candidate", detail: "A station-side candidate for the safer Basel night before embarkation.", why: "Consider it only if you prefer to skip Bern and arrive in Basel the night before the ship.", tradeoff: "Not part of the original hotel shortlist and not Bonvoy; the Bern overnight remains the current recommendation.", guestFit: "Confirm step-free room details, breakfast, and the transfer to Viking's exact pier and check-in window.", url: "https://www.hotel-victoria.ch/" }
      ]
    },
    {
      id: "reykjavik",
      number: "07",
      area: "Reykjavík",
      timing: "About 4 nights · confirm on the call",
      note: "The end date depends on the night count; hold the hotel search until that decision is settled.",
      options: [
        { id: "reykjavik-edition", name: "The Reykjavík EDITION", type: "Bonvoy", role: "Original roadmap pick", detail: "A harbor-front base with spa and dining, in the Marriott family.", why: "The strongest match if keeping the Bonvoy stay and a central harbour location matters most.", tradeoff: "Do not assume Gold includes breakfast or an upgrade. Compare room rate and confirmed benefits, not status hopes.", guestFit: "The roadmap calls for a king and step-free room. Confirm the exact room, breakfast package, and about-four-night dates.", url: "https://www.marriott.com/en-us/hotels/reykj-the-reykjavik-edition/overview/" },
        { id: "reykjavik-retreat", name: "The Retreat at Blue Lagoon", type: "Non-Bonvoy", role: "Remote alternative", detail: "A destination stay immersed in the Blue Lagoon setting, outside central Reykjavík.", why: "Choose it if the geothermal retreat itself should be the main event rather than a city hotel base.", tradeoff: "It changes the touring plan and adds transfers to Reykjavík, the museum, and day trips; it is not a like-for-like swap.", guestFit: "Confirm accessible room and bathing access, breakfast, transport, and whether the full stay should move out of Reykjavík.", url: "https://www.bluelagoon.com/accommodation/retreat-hotel" },
        { id: "reykjavik-borg", name: "Hótel Borg", type: "Non-Bonvoy", role: "Central alternative", detail: "A central Reykjavík alternative for a more city-focused stay.", why: "Compare it if a central location and a different hotel character matter more than Marriott points.", tradeoff: "No Bonvoy earning; verify total value and room details against the EDITION before choosing.", guestFit: "Confirm step-free room access, breakfast, and the king configuration directly.", url: "https://www.hotelborg.is/" }
      ]
    }
  ],
  hotelSelections: [],
  clientDraft: { name: "", email: "", hotelBed: "", vikingBed: "", notes: "" },
  extraStops: []
};

let data = loadData();
let editMode = advisorMode;
let toastTimeout;
const hotelCarouselIndex = new Map();

document.body.classList.toggle("advisor-mode", advisorMode);
document.body.classList.toggle("edit-mode", advisorMode);
document.querySelector("#editToggle").hidden = !advisorMode;
document.querySelector("#editToggle").textContent = advisorMode ? "Done editing" : "Advisor edit";
document.querySelector("#saveStatus").textContent = advisorMode ? "Advisor changes save in this browser" : "Your choices save in this browser";

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return mergeData(JSON.parse(saved));
  } catch (error) {
    console.warn("Could not load the saved roadmap.", error);
  }
  return structuredClone(defaultData);
}

function mergeData(saved) {
  const merged = structuredClone(defaultData);
  if (!saved || typeof saved !== "object") return merged;
  for (const key of Object.keys(merged)) {
    if (Array.isArray(merged[key]) && Array.isArray(saved[key])) merged[key] = saved[key];
    else if (merged[key] && typeof merged[key] === "object" && !Array.isArray(merged[key]) && saved[key] && typeof saved[key] === "object") merged[key] = { ...merged[key], ...saved[key] };
    else if (key in saved) merged[key] = saved[key];
  }
  const savedStops = (saved.legs || []).flatMap((leg) => leg.stops || []);
  for (const [id, update] of Object.entries(swissStopUpdates)) {
    const stop = merged.legs.flatMap((leg) => leg.stops).find((item) => item.id === id);
    const savedStop = savedStops.find((item) => item.id === id);
    if (!stop || !savedStop) continue;
    if (savedStop.detail === update.previousDetail) stop.detail = update.detail;
    if (update.status && savedStop.status === update.previousStatus) stop.status = update.status;
  }
  return merged;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    document.querySelector("#saveStatus").textContent = advisorMode ? "Advisor changes saved here" : "Your choices saved here";
    document.querySelector("#noteSaveLabel").textContent = "Autosaved locally";
  } catch (error) {
    document.querySelector("#saveStatus").textContent = "Could not save locally";
    showToast("Browser storage is unavailable. Export a copy to keep these changes.");
  }
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2700);
}

function renderDecisions() {
  document.querySelector("#decisionGrid").innerHTML = data.decisions.map((decision) => `
    <article class="decision-card">
      <span class="decision-no">${escapeHtml(decision.number)}</span>
      <h3>${escapeHtml(decision.title)}<br><span>${escapeHtml(decision.question)}</span></h3>
      <p>${escapeHtml(decision.context)}</p>
      <div class="decision-choice" role="group" aria-label="Decision: ${escapeHtml(decision.title)}">
        ${decision.options.map((option) => `<button type="button" class="choice-button${decision.selected === option ? " selected" : ""}" data-decision="${escapeHtml(decision.id)}" data-option="${escapeHtml(option)}" aria-pressed="${decision.selected === option}">${escapeHtml(option)}</button>`).join("")}
      </div>
    </article>`).join("");
}

function statusClass(status) {
  if (["Option", "Decision"].includes(status)) return "option";
  if (["Confirm", "Research"].includes(status)) return "open";
  return "";
}

function renderLegs() {
  const legs = [...data.legs, ...(data.extraStops.length ? [{ id: "extra", number: "04", title: "More to come", kicker: "OPEN ROAD", window: "To be placed", note: "Stops added during the call.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80", stops: data.extraStops }] : [])];
  document.querySelector("#journeyRail").innerHTML = legs.map((leg) => `
    <article class="leg-card" id="leg-${escapeHtml(leg.id)}">
      <div class="leg-visual" style="background-image:url('${escapeHtml(leg.image)}');background-position:${escapeHtml(leg.position || "center")}">
        <span class="leg-number">${escapeHtml(leg.number)}</span>
        <div><p class="leg-kicker">${escapeHtml(leg.kicker)}</p><h3>${escapeHtml(leg.title)}</h3><p class="leg-window">${escapeHtml(leg.window)}</p></div>
      </div>
      <div class="leg-stops">
        <div class="leg-stops-header"><p>${escapeHtml(leg.note)}</p><span>${leg.stops.length} ${leg.stops.length === 1 ? "stop" : "stops"}</span></div>
        ${leg.id === "switzerland" ? `<aside class="travel-pass-note" aria-labelledby="travelPassTitle"><h4 id="travelPassTitle">Swiss Travel Pass · a heads-up</h4><p>The pass covers the national network: trains, most lake boats, city trams and buses, plus free entry to 500+ museums, including the Olympic Museum and La Maison du Gruyère. For the Gotthard Panorama, Bernina, Glacier and GoldenPass routes, budget separately for required seat reservations and premium-class supplements such as Excellence and Prestige.</p><p><strong>Bottom line:</strong> It covers most of this route; scenic reservations and upgrades cost extra. Once the nights are set, we’ll compare a consecutive-day pass with point-to-point tickets. With this much scenic rail, it’s a strong contender.</p></aside>` : ""}
        ${leg.stops.length ? `<div class="stop-list">${leg.stops.map((stop, index) => `
          <div class="stop-row" data-stop-row="${escapeHtml(stop.id)}">
            <span class="stop-dot" aria-hidden="true"></span>
            <div class="stop-copy"><strong>${escapeHtml(stop.name)}</strong><small>${escapeHtml(stop.detail || "Add a note in Edit mode")}</small></div>
            <span class="stop-status ${statusClass(stop.status)}">${escapeHtml(stop.status || "Planned")}</span>
            <div class="stop-edit-controls" aria-label="Edit ${escapeHtml(stop.name)}">
              <button type="button" data-action="up" data-stop="${escapeHtml(stop.id)}" data-leg="${escapeHtml(leg.id)}" aria-label="Move ${escapeHtml(stop.name)} up" ${index === 0 ? "disabled" : ""}>↑</button>
              <button type="button" data-action="down" data-stop="${escapeHtml(stop.id)}" data-leg="${escapeHtml(leg.id)}" aria-label="Move ${escapeHtml(stop.name)} down" ${index === leg.stops.length - 1 ? "disabled" : ""}>↓</button>
              <button type="button" data-action="edit" data-stop="${escapeHtml(stop.id)}" data-leg="${escapeHtml(leg.id)}" aria-label="Edit ${escapeHtml(stop.name)}">Edit</button>
            </div>
          </div>`).join("")}</div>` : `<p class="empty-leg">No stops here yet. Add one when the route takes shape.</p>`}
      </div>
    </article>`).join("");
  const count = data.legs.reduce((sum, leg) => sum + leg.stops.length, 0) + data.extraStops.length;
  document.querySelector(".overview-stat:nth-child(2) strong").textContent = String(count).padStart(2, "0");
  document.querySelector(".overview-stat:nth-child(2) span").innerHTML = count >= 24 ? "stops named" : `stops named <small>${24 - count} still to place</small>`;
}

function renderKnown() {
  document.querySelector("#knownList").innerHTML = data.known.map((item) => `
    <article class="known-item"><span class="known-check" aria-hidden="true">✓</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.detail)}</p></div></article>`).join("");
}

function renderWork() {
  document.querySelector("#workGrid").innerHTML = data.work.filter((group) => group.title !== "Hotels").map((group) => `
    <article class="work-card"><span class="work-icon" aria-hidden="true">${escapeHtml(group.icon)}</span><h3>${escapeHtml(group.title)}</h3><ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`).join("");
}

function renderHotels() {
  document.querySelector("#hotelGrid").innerHTML = data.hotels.map((stay) => {
    const chosenId = data.hotelSelections.find((id) => stay.options.some((hotel) => hotel.id === id));
    const savedIndex = hotelCarouselIndex.get(stay.id);
    const chosenIndex = stay.options.findIndex((hotel) => hotel.id === chosenId);
    const activeIndex = Math.max(0, Math.min(savedIndex ?? (chosenIndex >= 0 ? chosenIndex : 0), stay.options.length - 1));
    const hotel = stay.options[activeIndex];
    const selected = chosenId === hotel.id;
    return `
      <section class="stay-group" aria-labelledby="stay-${escapeHtml(stay.id)}">
        <div class="stay-heading"><span class="stay-number">${escapeHtml(stay.number)}</span><div><h3 id="stay-${escapeHtml(stay.id)}">${escapeHtml(stay.area)}</h3><p>${escapeHtml(stay.timing)}</p></div></div>
        <p class="stay-note">${escapeHtml(stay.note)}</p>
        <div class="hotel-carousel" aria-label="${escapeHtml(stay.area)} hotel choices">
          <div class="hotel-carousel-header"><span class="eyebrow">COMPARE YOUR STAYS</span><div class="carousel-controls"><button type="button" data-hotel-step="-1" data-stay="${escapeHtml(stay.id)}" aria-label="Previous ${escapeHtml(stay.area)} hotel" ${activeIndex === 0 ? "disabled" : ""}>←</button><span aria-live="polite">${activeIndex + 1} of ${stay.options.length}</span><button type="button" data-hotel-step="1" data-stay="${escapeHtml(stay.id)}" aria-label="Next ${escapeHtml(stay.area)} hotel" ${activeIndex === stay.options.length - 1 ? "disabled" : ""}>→</button></div></div>
          <article class="hotel-slide">
            <div class="hotel-poster hotel-poster-${escapeHtml(stay.id)}"><span class="hotel-poster-place">${escapeHtml(stay.area)} <i>·</i> ${escapeHtml(hotel.type)}</span><strong>${escapeHtml(hotel.name)}</strong><span class="hotel-poster-role">${escapeHtml(hotel.role)}</span></div>
            <div class="hotel-slide-copy">
              <div class="hotel-option-top"><span class="hotel-type ${hotel.type === "Bonvoy" ? "bonvoy" : "independent"}">${escapeHtml(hotel.type)}</span><span class="hotel-role">${escapeHtml(hotel.role)}</span></div>
              <h4>${escapeHtml(hotel.name)}</h4>
              <p class="hotel-overview">${escapeHtml(hotel.detail)}</p>
              <div class="hotel-comparison"><section><h5>Why choose it</h5><p>${escapeHtml(hotel.why || hotel.detail)}</p></section><section><h5>What to weigh</h5><p>${escapeHtml(hotel.tradeoff || "Compare room, access, breakfast, location, and total price before deciding.")}</p></section></div>
              <p class="hotel-fit"><strong>For your stay:</strong> ${escapeHtml(hotel.guestFit || "Confirm the bed setup, step-free route, breakfast, and transfer details directly with the hotel.")}</p>
              <div class="hotel-actions"><button type="button" class="hotel-details-button" data-hotel-details="${escapeHtml(hotel.id)}" data-stay="${escapeHtml(stay.id)}">More about this hotel</button><a href="${escapeHtml(hotel.url)}" target="_blank" rel="noreferrer">Explore official site ↗</a><button type="button" data-hotel-choice="${escapeHtml(hotel.id)}" data-stay="${escapeHtml(stay.id)}" aria-pressed="${selected}" class="hotel-shortlist${selected ? " selected" : ""}">${selected ? "Chosen for this stay ✓" : "Choose this hotel"}</button></div>
            </div>
          </article>
          ${stay.options.length > 1 ? `<div class="hotel-dots" role="group" aria-label="Choose a ${escapeHtml(stay.area)} hotel to compare">${stay.options.map((option, index) => `<button type="button" data-hotel-slide="${index}" data-stay="${escapeHtml(stay.id)}" aria-label="Show ${escapeHtml(option.name)}" aria-pressed="${activeIndex === index}">${index + 1}</button>`).join("")}</div>` : ""}
        </div>
      </section>`;
  }).join("");
}

function chooseHotel(stayId, hotelId) {
  const stay = data.hotels.find((item) => item.id === stayId);
  if (!stay || !stay.options.some((hotel) => hotel.id === hotelId)) return;
  data.hotelSelections = data.hotelSelections.filter((id) => !stay.options.some((hotel) => hotel.id === id));
  data.hotelSelections.push(hotelId);
  hotelCarouselIndex.set(stayId, stay.options.findIndex((hotel) => hotel.id === hotelId));
  saveData();
  renderHotels();
}

function openHotelDetails(stayId, hotelId) {
  const stay = data.hotels.find((item) => item.id === stayId);
  const hotel = stay?.options.find((item) => item.id === hotelId);
  if (!stay || !hotel) return;
  document.querySelector("#hotelDialogMeta").textContent = `${stay.area} · ${hotel.type} · ${stay.timing}`;
  document.querySelector("#hotelDialogTitle").textContent = hotel.name;
  document.querySelector("#hotelDialogSummary").textContent = hotel.detail;
  document.querySelector("#hotelDialogWhy").textContent = hotel.why || hotel.detail;
  document.querySelector("#hotelDialogTradeoff").textContent = hotel.tradeoff || "Compare room, access, breakfast, location, and total price before deciding.";
  document.querySelector("#hotelDialogFit").textContent = hotel.guestFit || "Confirm the bed setup, step-free route, breakfast, and transfer details directly with the hotel.";
  document.querySelector("#hotelOfficialLink").href = hotel.url;
  const chooseButton = document.querySelector("#chooseHotelFromDialog");
  chooseButton.dataset.stay = stayId;
  chooseButton.dataset.hotel = hotelId;
  chooseButton.textContent = data.hotelSelections.includes(hotelId) ? "Chosen for this stay" : "Choose this hotel";
  document.querySelector("#hotelDialog").showModal();
}

function renderConfirmations() {
  document.querySelector("#confirmList").innerHTML = data.confirmations.map((item) => `
    <div class="confirm-row"><label><input type="checkbox" data-confirm="${escapeHtml(item.id)}" ${item.done ? "checked" : ""}><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span></label></div>`).join("");
  const done = data.confirmations.filter((item) => item.done).length;
  document.querySelector("#confirmCount").textContent = `${done} / ${data.confirmations.length} done`;
  document.querySelector("#scenicConfirmed").checked = data.scenicConfirmed;
}

function renderPrep() {
  document.querySelector("#prepList").innerHTML = data.prep.map((item) => `
    <label class="prep-row${item.checked ? " done" : ""}"><input type="checkbox" data-prep="${escapeHtml(item.id)}" ${item.checked ? "checked" : ""}><span>${escapeHtml(item.label)}</span></label>`).join("");
  const done = data.prep.filter((item) => item.checked).length;
  document.querySelector("#prepCount").textContent = `${done} / ${data.prep.length} done`;
}

function render() {
  renderDecisions();
  renderLegs();
  renderKnown();
  renderHotels();
  renderWork();
  renderConfirmations();
  renderPrep();
  document.querySelector("#zurichOption").checked = data.zurichOption;
  for (const key of ["alpine", "rhine", "iceland"]) document.querySelector(`#budget${key[0].toUpperCase()}${key.slice(1)}`).value = data.budgets[key] || "";
  document.querySelector("#callNotesInput").value = data.notes || "";
  document.querySelector("#guestName").value = data.clientDraft.name || "";
  document.querySelector("#guestEmail").value = data.clientDraft.email || "";
  document.querySelector("#guestNotes").value = data.clientDraft.notes || "";
  for (const field of ["hotelBed", "vikingBed"]) {
    const choice = [...document.querySelectorAll(`input[name="${field}"]`)].find((input) => input.value === data.clientDraft[field]);
    if (choice) choice.checked = true;
  }
}

function locateStop(stopId, legId) {
  const leg = legId === "extra" ? { id: "extra", stops: data.extraStops } : data.legs.find((item) => item.id === legId);
  const stop = leg?.stops.find((item) => item.id === stopId);
  return leg && stop ? { leg, stop, list: leg.stops, index: leg.stops.indexOf(stop) } : null;
}

function openStopDialog(stopId = "", legId = "switzerland") {
  const found = stopId ? locateStop(stopId, legId) : null;
  document.querySelector("#dialogTitle").textContent = found ? "Edit a stop" : "Add a stop";
  document.querySelector("#stopId").value = stopId;
  document.querySelector("#stopName").value = found?.stop.name || "";
  document.querySelector("#stopDetail").value = found?.stop.detail || "";
  document.querySelector("#stopLeg").value = legId === "extra" ? "switzerland" : legId;
  document.querySelector("#deleteStop").hidden = !found;
  document.querySelector("#stopDialog").showModal();
  document.querySelector("#stopName").focus();
}

function makeId() {
  return `stop-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

document.querySelector("#editToggle").addEventListener("click", (event) => {
  if (!advisorMode) return;
  editMode = !editMode;
  document.body.classList.toggle("edit-mode", editMode);
  event.currentTarget.setAttribute("aria-pressed", String(editMode));
  event.currentTarget.textContent = editMode ? "Done editing" : "Advisor edit";
  showToast(editMode ? "Edit mode is on. Add, move, or update stops." : "Changes saved in this browser.");
});

document.querySelector("#decisionGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-decision]");
  if (!button) return;
  const decision = data.decisions.find((item) => item.id === button.dataset.decision);
  if (decision) decision.selected = decision.selected === button.dataset.option ? "" : button.dataset.option;
  saveData();
  renderDecisions();
});

document.querySelector("#hotelGrid").addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-hotel-details]");
  if (detailsButton) return openHotelDetails(detailsButton.dataset.stay, detailsButton.dataset.hotelDetails);
  const choiceButton = event.target.closest("[data-hotel-choice]");
  if (choiceButton) return chooseHotel(choiceButton.dataset.stay, choiceButton.dataset.hotelChoice);
  const slideButton = event.target.closest("[data-hotel-slide]");
  if (slideButton) {
    hotelCarouselIndex.set(slideButton.dataset.stay, Number(slideButton.dataset.hotelSlide));
    return renderHotels();
  }
  const stepButton = event.target.closest("[data-hotel-step]");
  if (stepButton) {
    const stay = data.hotels.find((item) => item.id === stepButton.dataset.stay);
    if (!stay) return;
    const currentIndex = hotelCarouselIndex.get(stay.id) ?? Math.max(0, stay.options.findIndex((hotel) => data.hotelSelections.includes(hotel.id)));
    hotelCarouselIndex.set(stay.id, Math.max(0, Math.min(currentIndex + Number(stepButton.dataset.hotelStep), stay.options.length - 1)));
    renderHotels();
  }
});

document.querySelector("#closeHotelDialog").addEventListener("click", () => document.querySelector("#hotelDialog").close());
document.querySelector("#hotelDialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
document.querySelector("#chooseHotelFromDialog").addEventListener("click", (event) => {
  chooseHotel(event.currentTarget.dataset.stay, event.currentTarget.dataset.hotel);
  document.querySelector("#hotelDialog").close();
});

document.querySelector("#guestSubmission").addEventListener("input", (event) => {
  if (event.target.name === "name") data.clientDraft.name = event.target.value;
  if (event.target.name === "email") data.clientDraft.email = event.target.value;
  if (event.target.name === "notes") data.clientDraft.notes = event.target.value;
  saveData();
});
document.querySelector("#guestSubmission").addEventListener("change", (event) => {
  if (["hotelBed", "vikingBed"].includes(event.target.name)) {
    data.clientDraft[event.target.name] = event.target.value;
    saveData();
  }
});
document.querySelector("#guestSubmission").addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedDecisions = data.decisions.map((decision) => `${decision.title}: ${decision.selected || "No selection yet"}`).join("\n");
  const hotelChoices = data.hotels.map((stay) => {
    const selected = stay.options.find((hotel) => data.hotelSelections.includes(hotel.id));
    return `${stay.area}: ${selected?.name || "No selection yet"}`;
  });
  const body = [
    `Journey Roadmap update for ${data.clientDraft.name}`,
    "Booking #7723079 · Lontz & Coleman",
    "",
    "DECISIONS",
    selectedDecisions,
    `Saturday Zürich night: ${data.zurichOption ? "Please include" : "Not selected"}`,
    `Hotel room preference: ${data.clientDraft.hotelBed || "Not specified"}`,
    `Viking stateroom preference: ${data.clientDraft.vikingBed || "Not specified"} (queen or split twins)`,
    "",
    "HOTEL PICKS BY STAY",
    hotelChoices.join("\n"),
    "",
    "NOTES",
    data.clientDraft.notes || "No additional notes",
    "",
    "Please review these choices and update the master roadmap."
  ].join("\n");
  const subject = `Journey choices · Lontz & Coleman · ${data.clientDraft.name}`;
  const email = data.clientDraft.email.trim();
  const mailto = `mailto:${ADVISOR_EMAIL}?subject=${encodeURIComponent(subject)}${email ? `&cc=${encodeURIComponent(email)}` : ""}&body=${encodeURIComponent(body)}`;
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadLink = document.querySelector("#downloadRequest");
  downloadLink.href = downloadUrl;
  downloadLink.download = "lontz-coleman-journey-update.txt";
  downloadLink.hidden = false;
  document.querySelector("#submissionStatus").textContent = "Email draft prepared. Review the choices and press Send. If no email app opens, download the request below.";
  window.location.href = mailto;
});

document.querySelector("#journeyRail").addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const found = locateStop(button.dataset.stop, button.dataset.leg);
  if (!found) return;
  if (button.dataset.action === "edit") openStopDialog(button.dataset.stop, button.dataset.leg);
  if (["up", "down"].includes(button.dataset.action)) {
    const direction = button.dataset.action === "up" ? -1 : 1;
    const nextIndex = found.index + direction;
    if (nextIndex < 0 || nextIndex >= found.list.length) return;
    [found.list[found.index], found.list[nextIndex]] = [found.list[nextIndex], found.list[found.index]];
    saveData();
    renderLegs();
  }
});

document.querySelector("#addStopTop").addEventListener("click", () => openStopDialog());
document.querySelector("#stopDialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
document.querySelector("#closeDialog").addEventListener("click", () => document.querySelector("#stopDialog").close());
document.querySelector("#stopForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const stopId = document.querySelector("#stopId").value;
  const legId = document.querySelector("#stopLeg").value;
  const name = document.querySelector("#stopName").value.trim();
  const detail = document.querySelector("#stopDetail").value.trim();
  if (!name) return;
  const targetLeg = data.legs.find((item) => item.id === legId);
  const found = stopId ? locateStop(stopId, data.legs.some((item) => item.stops.some((stop) => stop.id === stopId)) ? legId : "extra") : null;
  if (found) {
    found.stop.name = name;
    found.stop.detail = detail;
    if (found.leg.id !== legId) {
      found.list.splice(found.index, 1);
      targetLeg.stops.push(found.stop);
    }
  } else {
    targetLeg.stops.push({ id: makeId(), name, detail, status: "Planned" });
  }
  saveData();
  renderLegs();
  document.querySelector("#stopDialog").close();
  showToast("Stop saved.");
});

document.querySelector("#deleteStop").addEventListener("click", () => {
  const stopId = document.querySelector("#stopId").value;
  const inMainLeg = data.legs.find((leg) => leg.stops.some((stop) => stop.id === stopId));
  const found = locateStop(stopId, inMainLeg?.id || "extra");
  if (found && window.confirm(`Remove ${found.stop.name} from the roadmap?`)) {
    found.list.splice(found.index, 1);
    saveData();
    renderLegs();
    document.querySelector("#stopDialog").close();
    showToast("Stop removed.");
  }
});

document.querySelector("#confirmList").addEventListener("change", (event) => {
  const item = data.confirmations.find((confirmation) => confirmation.id === event.target.dataset.confirm);
  if (!item) return;
  item.done = event.target.checked;
  saveData();
  renderConfirmations();
});
document.querySelector("#scenicConfirmed").addEventListener("change", (event) => {
  data.scenicConfirmed = event.target.checked;
  saveData();
});
document.querySelector("#prepList").addEventListener("change", (event) => {
  const item = data.prep.find((task) => task.id === event.target.dataset.prep);
  if (!item) return;
  item.checked = event.target.checked;
  saveData();
  renderPrep();
});
document.querySelector("#zurichOption").addEventListener("change", (event) => {
  data.zurichOption = event.target.checked;
  saveData();
});
for (const key of ["alpine", "rhine", "iceland"]) {
  const input = document.querySelector(`#budget${key[0].toUpperCase()}${key.slice(1)}`);
  input.addEventListener("input", () => {
    data.budgets[key] = input.value;
    saveData();
  });
}
document.querySelector("#callNotesInput").addEventListener("input", (event) => {
  data.notes = event.target.value;
  document.querySelector("#noteSaveLabel").textContent = "Saving…";
  saveData();
});

document.querySelector("#exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lontz-coleman-journey-roadmap.json";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Roadmap exported. Import this file to carry changes forward.");
});
document.querySelector("#importDataButton").addEventListener("click", () => document.querySelector("#importData").click());
document.querySelector("#importData").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    data = mergeData(JSON.parse(await file.text()));
    saveData();
    render();
    showToast("Roadmap changes imported.");
  } catch (error) {
    showToast("That file could not be read as a roadmap export.");
  }
  event.target.value = "";
});

render();