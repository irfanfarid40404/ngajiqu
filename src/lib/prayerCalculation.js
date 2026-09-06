/**
 * NgajiQ Astronomical Prayer Calculation & Qibla Geometry Engine
 * Standard: Kementerian Agama Republik Indonesia (Kemenag RI) & Shafi'i Madhhab
 */

// Coordinates of Kaaba in Mecca, Saudi Arabia
export const KAABA_COORDS = {
  lat: 21.422487,
  lng: 39.826206,
};

// Major Indonesian Cities with exact coordinates & timezones
export const INDONESIAN_CITIES = [
  { id: "jkt", name: "DKI Jakarta", province: "DKI Jakarta", lat: -6.2088, lng: 106.8456, tz: 7 },
  { id: "sby", name: "Surabaya", province: "Jawa Timur", lat: -7.2575, lng: 112.7521, tz: 7 },
  { id: "bdg", name: "Bandung", province: "Jawa Barat", lat: -6.9175, lng: 107.6191, tz: 7 },
  { id: "mdn", name: "Medan", province: "Sumatera Utara", lat: 3.5952, lng: 98.6722, tz: 7 },
  { id: "smg", name: "Semarang", province: "Jawa Tengah", lat: -6.9667, lng: 110.4167, tz: 7 },
  { id: "mks", name: "Makassar", province: "Sulawesi Selatan", lat: -5.1477, lng: 119.4327, tz: 8 },
  { id: "plb", name: "Palembang", province: "Sumatera Selatan", lat: -2.9909, lng: 104.7566, tz: 7 },
  { id: "yk", name: "Yogyakarta", province: "DI Yogyakarta", lat: -7.7956, lng: 110.3695, tz: 7 },
  { id: "dps", name: "Denpasar", province: "Bali", lat: -8.6705, lng: 115.2126, tz: 8 },
  { id: "bpn", name: "Balikpapan", province: "Kalimantan Timur", lat: -1.2379, lng: 116.8529, tz: 8 },
  { id: "bjm", name: "Banjarmasin", province: "Kalimantan Selatan", lat: -3.3167, lng: 114.5900, tz: 8 },
  { id: "pdg", name: "Padang", province: "Sumatera Barat", lat: -0.9471, lng: 100.4172, tz: 7 },
  { id: "bna", name: "Banda Aceh", province: "Aceh", lat: 5.5483, lng: 95.3238, tz: 7 },
  { id: "ptk", name: "Pontianak", province: "Kalimantan Barat", lat: -0.0263, lng: 109.3425, tz: 7 },
  { id: "jpr", name: "Jayapura", province: "Papua", lat: -2.5337, lng: 140.7181, tz: 9 },
  { id: "mtr", name: "Mataram (Lombok)", province: "NTB", lat: -8.5833, lng: 116.1167, tz: 8 },
  { id: "mnd", name: "Manado", province: "Sulawesi Utara", lat: 1.4748, lng: 124.8428, tz: 8 },
  { id: "pku", name: "Pekanbaru", province: "Riau", lat: 0.5071, lng: 101.4478, tz: 7 },
  { id: "smd", name: "Samarinda", province: "Kalimantan Timur", lat: -0.5021, lng: 117.1537, tz: 8 },
  { id: "bdl", name: "Bandar Lampung", province: "Lampung", lat: -5.4500, lng: 105.2667, tz: 7 },
  { id: "slo", name: "Surakarta (Solo)", province: "Jawa Tengah", lat: -7.5667, lng: 110.8167, tz: 7 },
  { id: "mlg", name: "Malang", province: "Jawa Timur", lat: -7.9797, lng: 112.6304, tz: 7 },
  { id: "bgr", name: "Bogor", province: "Jawa Barat", lat: -6.5950, lng: 106.8166, tz: 7 },
  { id: "dpk", name: "Depok", province: "Jawa Barat", lat: -6.4025, lng: 106.7942, tz: 7 },
  { id: "tgr", name: "Tangerang", province: "Banten", lat: -6.1783, lng: 106.6319, tz: 7 },
  { id: "bks", name: "Bekasi", province: "Jawa Barat", lat: -6.2383, lng: 106.9756, tz: 7 },
  { id: "crb", name: "Cirebon", province: "Jawa Barat", lat: -6.7320, lng: 108.5523, tz: 7 },
  { id: "kdi", name: "Kendari", province: "Sulawesi Tenggara", lat: -3.9985, lng: 122.5126, tz: 8 },
  { id: "kpg", name: "Kupang", province: "NTT", lat: -10.1772, lng: 123.6070, tz: 8 },
  { id: "amb", name: "Ambon", province: "Maluku", lat: -3.6547, lng: 128.1906, tz: 9 },
];

/**
 * Calculates accurate Qibla azimuth angle and distance to Kaaba using Great Circle Spherical Trigonometry
 */
export function calculateQibla(latitude, longitude) {
  const phi1 = (latitude * Math.PI) / 180;
  const phi2 = (KAABA_COORDS.lat * Math.PI) / 180;
  const deltaLambda = ((KAABA_COORDS.lng - longitude) * Math.PI) / 180;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;
  qiblaDeg = (qiblaDeg + 360) % 360;

  // Haversine Distance Calculation (Earth radius = 6371 km)
  const R = 6371;
  const dLat = phi2 - phi1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  // Compass Cardinal Direction text in Indonesian
  let directionText = "Barat Laut";
  if (qiblaDeg >= 260 && qiblaDeg <= 300) {
    directionText = "Barat Laut (WNW)";
  } else if (qiblaDeg > 300 && qiblaDeg < 340) {
    directionText = "Barat Laut (NW)";
  } else if (qiblaDeg >= 240 && qiblaDeg < 260) {
    directionText = "Barat Daya (WSW)";
  }

  return {
    azimuth: parseFloat(qiblaDeg.toFixed(1)),
    azimuthRounded: Math.round(qiblaDeg),
    distanceKm,
    directionText,
  };
}

/**
 * Solar Astronomical Calculations for Prayer Times (Ephemeris)
 */
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

export function calculatePrayerTimes(date = new Date(), latitude = -6.2088, longitude = 106.8456, timezone = 7) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Julian Date calculation
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  const d = jd - 2451545.0;

  // Mean anomaly of the Sun
  const g = 357.529 + 0.98560028 * d;
  const q = 280.459 + 0.98564736 * d;
  const L = q + 1.915 * Math.sin(degToRad(g)) + 0.02 * Math.sin(degToRad(2 * g));

  // Sun's Declination & Equation of Time
  const e = 23.439 - 0.00000036 * d;
  const sinDec = Math.sin(degToRad(e)) * Math.sin(degToRad(L));
  const dec = Math.asin(sinDec);
  const RA = radToDeg(Math.atan2(Math.cos(degToRad(e)) * Math.sin(degToRad(L)), Math.cos(degToRad(L)))) / 15;
  const eot = q / 15 - RA;

  // Solar Noon (Transit in hours)
  const noon = 12 + timezone - longitude / 15 - eot;

  // Function to calculate hour angle for a given sun altitude angle
  function hourAngle(altitudeAngle) {
    const latRad = degToRad(latitude);
    const num = Math.sin(degToRad(altitudeAngle)) - Math.sin(latRad) * Math.sin(dec);
    const den = Math.cos(latRad) * Math.cos(dec);
    const cosHA = num / den;

    if (cosHA > 1) return 0; // Never rises
    if (cosHA < -1) return 12; // Never sets
    return radToDeg(Math.acos(cosHA)) / 15;
  }

  // Kemenag RI Parameters:
  // Subuh: -20°
  // Terbit (Sunrise): -0.833°
  // Isya: -18°
  // Ashar: Shafi'i shadow ratio = 1 -> tan(altitude) = 1 / (1 + tan(|lat - dec|))
  const latRad = degToRad(latitude);
  const asrAltitude = radToDeg(Math.atan(1 / (1 + Math.tan(Math.abs(latRad - dec)))));

  const haFajr = hourAngle(-20);
  const haSunrise = hourAngle(-0.833);
  const haAsr = hourAngle(asrAltitude);
  const haMaghrib = hourAngle(-0.833);
  const haIsha = hourAngle(-18);

  // Safety buffer (Ihtiyat) standard Kemenag RI is +2 minutes for prayer times
  const ihtiyatHours = 2 / 60;

  const rawTimes = {
    imsak: noon - haFajr - 10 / 60, // Imsak is ~10 mins before Subuh
    subuh: noon - haFajr + ihtiyatHours,
    terbit: noon - haSunrise,
    dhuha: noon - haSunrise + 20 / 60, // Dhuha starts ~20 mins after sunrise
    dzuhur: noon + ihtiyatHours,
    ashar: noon + haAsr + ihtiyatHours,
    maghrib: noon + haMaghrib + ihtiyatHours,
    isya: noon + haIsha + ihtiyatHours,
  };

  function formatTime(decimalHour) {
    let normalized = decimalHour;
    while (normalized < 0) normalized += 24;
    while (normalized >= 24) normalized -= 24;

    const hours = Math.floor(normalized);
    const minutes = Math.floor((normalized - hours) * 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  return {
    rawTimes,
    imsak: formatTime(rawTimes.imsak),
    subuh: formatTime(rawTimes.subuh),
    terbit: formatTime(rawTimes.terbit),
    dhuha: formatTime(rawTimes.dhuha),
    dzuhur: formatTime(rawTimes.dzuhur),
    ashar: formatTime(rawTimes.ashar),
    maghrib: formatTime(rawTimes.maghrib),
    isya: formatTime(rawTimes.isya),
  };
}

/**
 * Islamic Hijri Date approximation (Umm al-Qura compatible)
 */
export function getHijriDate(date = new Date()) {
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi'ul Awwal",
    "Rabi'ul Akhir",
    "Jumadil Ula",
    "Jumadil Akhira",
    "Rajab",
    "Sya'ban",
    "Ramadhan",
    "Syawwal",
    "Dzulqa'dah",
    "Dzulhijjah",
  ];

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  let jd =
    Math.floor((1461 * (year + 4800 + Math.floor((month - 13) / 12))) / 4) +
    Math.floor((367 * (month - 1 - 12 * Math.floor((month - 13) / 12))) / 12) -
    Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 13) / 12)) / 100)) / 4) +
    day -
    32075;

  let l = jd - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  let m = Math.floor((24 * l) / 709);
  let d = l - Math.floor((709 * m) / 24);
  let y = 30 * n + j - 30;

  // Month clamp
  const hijriMonthIdx = Math.max(0, Math.min(11, m - 1));
  return `${d} ${hijriMonths[hijriMonthIdx]} ${y} H`;
}

/**
 * Determines current active prayer and countdown to next prayer
 */
export function getPrayerTimeline(prayerTimes, currentTime = new Date()) {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes() + currentTime.getSeconds() / 60;

  const prayers = [
    { id: "subuh", name: "Subuh", time: prayerTimes.subuh, raw: prayerTimes.rawTimes.subuh },
    { id: "syuruq", name: "Terbit", time: prayerTimes.terbit, raw: prayerTimes.rawTimes.terbit },
    { id: "dzuhur", name: "Dzuhur", time: prayerTimes.dzuhur, raw: prayerTimes.rawTimes.dzuhur },
    { id: "ashar", name: "Ashar", time: prayerTimes.ashar, raw: prayerTimes.rawTimes.ashar },
    { id: "maghrib", name: "Maghrib", time: prayerTimes.maghrib, raw: prayerTimes.rawTimes.maghrib },
    { id: "isya", name: "Isya", time: prayerTimes.isya, raw: prayerTimes.rawTimes.isya },
  ];

  // Convert "HH:MM" to minutes from midnight
  const scheduleMinutes = prayers.map((p) => {
    const [h, m] = p.time.split(":").map(Number);
    return { ...p, minutes: h * 60 + m };
  });

  let currentPrayer = scheduleMinutes[scheduleMinutes.length - 1]; // default Isya (previous night)
  let nextPrayer = scheduleMinutes[0]; // default Subuh

  for (let i = 0; i < scheduleMinutes.length; i++) {
    if (currentMinutes < scheduleMinutes[i].minutes) {
      nextPrayer = scheduleMinutes[i];
      currentPrayer = i === 0 ? scheduleMinutes[scheduleMinutes.length - 1] : scheduleMinutes[i - 1];
      break;
    }
  }

  // Calculate remaining seconds to next prayer
  let diffMinutes = nextPrayer.minutes - currentMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60; // wraps around midnight to Subuh next day
  }

  const totalRemainingSeconds = Math.max(0, Math.floor(diffMinutes * 60));
  const hoursLeft = Math.floor(totalRemainingSeconds / 3600);
  const minutesLeft = Math.floor((totalRemainingSeconds % 3600) / 60);
  const secondsLeft = totalRemainingSeconds % 60;

  const countdownFormatted = `${String(hoursLeft).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}:${String(
    secondsLeft
  ).padStart(2, "0")}`;

  return {
    currentPrayer,
    nextPrayer,
    totalRemainingSeconds,
    countdownFormatted,
    hoursLeft,
    minutesLeft,
    secondsLeft,
  };
}

