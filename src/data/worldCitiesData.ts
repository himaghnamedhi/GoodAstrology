import { CityPreset, POPULAR_CITIES } from './vedicAstrologyCalculator';

export interface WorldCity extends CityPreset {
  continent?: string;
}

export const GLOBAL_INTERNATIONAL_CITIES: WorldCity[] = [
  // ==========================================
  // NORTH AMERICA - UNITED STATES
  // ==========================================
  { name: 'New York City', stateOrRegion: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezone: -5, continent: 'North America' },
  { name: 'Jersey City / Edison', stateOrRegion: 'New Jersey', country: 'United States', lat: 40.5187, lng: -74.4121, timezone: -5, continent: 'North America' },
  { name: 'Los Angeles', stateOrRegion: 'California', country: 'United States', lat: 34.0522, lng: -118.2437, timezone: -8, continent: 'North America' },
  { name: 'San Francisco', stateOrRegion: 'California', country: 'United States', lat: 37.7749, lng: -122.4194, timezone: -8, continent: 'North America' },
  { name: 'San Jose / Silicon Valley', stateOrRegion: 'California', country: 'United States', lat: 37.3382, lng: -121.8863, timezone: -8, continent: 'North America' },
  { name: 'San Diego', stateOrRegion: 'California', country: 'United States', lat: 32.7157, lng: -117.1611, timezone: -8, continent: 'North America' },
  { name: 'Sacramento', stateOrRegion: 'California', country: 'United States', lat: 38.5816, lng: -121.4944, timezone: -8, continent: 'North America' },
  { name: 'Chicago', stateOrRegion: 'Illinois', country: 'United States', lat: 41.8781, lng: -87.6298, timezone: -6, continent: 'North America' },
  { name: 'Houston', stateOrRegion: 'Texas', country: 'United States', lat: 29.7604, lng: -95.3698, timezone: -6, continent: 'North America' },
  { name: 'Dallas / Fort Worth', stateOrRegion: 'Texas', country: 'United States', lat: 32.7767, lng: -96.7970, timezone: -6, continent: 'North America' },
  { name: 'Austin', stateOrRegion: 'Texas', country: 'United States', lat: 30.2672, lng: -97.7431, timezone: -6, continent: 'North America' },
  { name: 'San Antonio', stateOrRegion: 'Texas', country: 'United States', lat: 29.4241, lng: -98.4936, timezone: -6, continent: 'North America' },
  { name: 'Seattle', stateOrRegion: 'Washington', country: 'United States', lat: 47.6062, lng: -122.3321, timezone: -8, continent: 'North America' },
  { name: 'Portland', stateOrRegion: 'Oregon', country: 'United States', lat: 45.5152, lng: -122.6784, timezone: -8, continent: 'North America' },
  { name: 'Phoenix', stateOrRegion: 'Arizona', country: 'United States', lat: 33.4484, lng: -112.0740, timezone: -7, continent: 'North America' },
  { name: 'Denver', stateOrRegion: 'Colorado', country: 'United States', lat: 39.7392, lng: -104.9903, timezone: -7, continent: 'North America' },
  { name: 'Boston', stateOrRegion: 'Massachusetts', country: 'United States', lat: 42.3601, lng: -71.0589, timezone: -5, continent: 'North America' },
  { name: 'Washington D.C.', stateOrRegion: 'District of Columbia', country: 'United States', lat: 38.9072, lng: -77.0369, timezone: -5, continent: 'North America' },
  { name: 'Atlanta', stateOrRegion: 'Georgia', country: 'United States', lat: 33.7490, lng: -84.3880, timezone: -5, continent: 'North America' },
  { name: 'Miami', stateOrRegion: 'Florida', country: 'United States', lat: 25.7617, lng: -80.1918, timezone: -5, continent: 'North America' },
  { name: 'Orlando', stateOrRegion: 'Florida', country: 'United States', lat: 28.5383, lng: -81.3792, timezone: -5, continent: 'North America' },
  { name: 'Tampa', stateOrRegion: 'Florida', country: 'United States', lat: 27.9506, lng: -82.4572, timezone: -5, continent: 'North America' },
  { name: 'Philadelphia', stateOrRegion: 'Pennsylvania', country: 'United States', lat: 39.9526, lng: -75.1652, timezone: -5, continent: 'North America' },
  { name: 'Pittsburgh', stateOrRegion: 'Pennsylvania', country: 'United States', lat: 40.4406, lng: -79.9959, timezone: -5, continent: 'North America' },
  { name: 'Detroit', stateOrRegion: 'Michigan', country: 'United States', lat: 42.3314, lng: -83.0458, timezone: -5, continent: 'North America' },
  { name: 'Minneapolis', stateOrRegion: 'Minnesota', country: 'United States', lat: 44.9778, lng: -93.2650, timezone: -6, continent: 'North America' },
  { name: 'St. Louis', stateOrRegion: 'Missouri', country: 'United States', lat: 38.6270, lng: -90.1994, timezone: -6, continent: 'North America' },
  { name: 'Las Vegas', stateOrRegion: 'Nevada', country: 'United States', lat: 36.1699, lng: -115.1398, timezone: -8, continent: 'North America' },
  { name: 'Salt Lake City', stateOrRegion: 'Utah', country: 'United States', lat: 40.7608, lng: -111.8910, timezone: -7, continent: 'North America' },
  { name: 'Honolulu', stateOrRegion: 'Hawaii', country: 'United States', lat: 21.3069, lng: -157.8583, timezone: -10, continent: 'North America' },
  { name: 'Anchorage', stateOrRegion: 'Alaska', country: 'United States', lat: 61.2181, lng: -149.9003, timezone: -9, continent: 'North America' },

  // ==========================================
  // NORTH AMERICA - CANADA & MEXICO
  // ==========================================
  { name: 'Toronto', stateOrRegion: 'Ontario', country: 'Canada', lat: 43.6532, lng: -79.3832, timezone: -5, continent: 'North America' },
  { name: 'Vancouver', stateOrRegion: 'British Columbia', country: 'Canada', lat: 49.2827, lng: -123.1207, timezone: -8, continent: 'North America' },
  { name: 'Montreal', stateOrRegion: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673, timezone: -5, continent: 'North America' },
  { name: 'Calgary', stateOrRegion: 'Alberta', country: 'Canada', lat: 51.0447, lng: -114.0719, timezone: -7, continent: 'North America' },
  { name: 'Ottawa', stateOrRegion: 'Ontario', country: 'Canada', lat: 45.4215, lng: -75.6972, timezone: -5, continent: 'North America' },
  { name: 'Edmonton', stateOrRegion: 'Alberta', country: 'Canada', lat: 53.5461, lng: -113.4938, timezone: -7, continent: 'North America' },
  { name: 'Winnipeg', stateOrRegion: 'Manitoba', country: 'Canada', lat: 49.8951, lng: -97.1384, timezone: -6, continent: 'North America' },
  { name: 'Brampton', stateOrRegion: 'Ontario', country: 'Canada', lat: 43.7315, lng: -79.7624, timezone: -5, continent: 'North America' },
  { name: 'Surrey', stateOrRegion: 'British Columbia', country: 'Canada', lat: 49.1913, lng: -122.8490, timezone: -8, continent: 'North America' },
  { name: 'Mexico City', stateOrRegion: 'CDMX', country: 'Mexico', lat: 19.4326, lng: -99.1332, timezone: -6, continent: 'North America' },
  { name: 'Guadalajara', stateOrRegion: 'Jalisco', country: 'Mexico', lat: 20.6597, lng: -103.3496, timezone: -6, continent: 'North America' },
  { name: 'Monterrey', stateOrRegion: 'Nuevo Leon', country: 'Mexico', lat: 25.6866, lng: -100.3161, timezone: -6, continent: 'North America' },
  { name: 'Cancun', stateOrRegion: 'Quintana Roo', country: 'Mexico', lat: 21.1619, lng: -86.8515, timezone: -5, continent: 'North America' },

  // ==========================================
  // LATIN AMERICA & CARIBBEAN
  // ==========================================
  { name: 'São Paulo', stateOrRegion: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, timezone: -3, continent: 'South America' },
  { name: 'Rio de Janeiro', stateOrRegion: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729, timezone: -3, continent: 'South America' },
  { name: 'Brasília', stateOrRegion: 'Federal District', country: 'Brazil', lat: -15.8267, lng: -47.9218, timezone: -3, continent: 'South America' },
  { name: 'Buenos Aires', stateOrRegion: 'Capital Federal', country: 'Argentina', lat: -34.6037, lng: -58.3816, timezone: -3, continent: 'South America' },
  { name: 'Córdoba', stateOrRegion: 'Córdoba', country: 'Argentina', lat: -31.4201, lng: -64.1888, timezone: -3, continent: 'South America' },
  { name: 'Santiago', stateOrRegion: 'Santiago Metropolitan', country: 'Chile', lat: -33.4489, lng: -70.6693, timezone: -3, continent: 'South America' },
  { name: 'Bogotá', stateOrRegion: 'Cundinamarca', country: 'Colombia', lat: 4.7110, lng: -74.0721, timezone: -5, continent: 'South America' },
  { name: 'Medellín', stateOrRegion: 'Antioquia', country: 'Colombia', lat: 6.2442, lng: -75.5812, timezone: -5, continent: 'South America' },
  { name: 'Lima', stateOrRegion: 'Lima Province', country: 'Peru', lat: -12.0464, lng: -77.0428, timezone: -5, continent: 'South America' },
  { name: 'Quito', stateOrRegion: 'Pichincha', country: 'Ecuador', lat: -0.1807, lng: -78.4678, timezone: -5, continent: 'South America' },
  { name: 'Montevideo', stateOrRegion: 'Montevideo', country: 'Uruguay', lat: -34.9011, lng: -56.1645, timezone: -3, continent: 'South America' },
  { name: 'Panama City', stateOrRegion: 'Panama', country: 'Panama', lat: 8.9824, lng: -79.5199, timezone: -5, continent: 'Central America' },
  { name: 'San Juan', stateOrRegion: 'San Juan', country: 'Puerto Rico', lat: 18.4655, lng: -66.1057, timezone: -4, continent: 'Caribbean' },
  { name: 'Port of Spain', stateOrRegion: 'Port of Spain', country: 'Trinidad and Tobago', lat: 10.6549, lng: -61.5019, timezone: -4, continent: 'Caribbean' },
  { name: 'Georgetown', stateOrRegion: 'Demerara-Mahaica', country: 'Guyana', lat: 6.8013, lng: -58.1551, timezone: -4, continent: 'South America' },
  { name: 'Paramaribo', stateOrRegion: 'Paramaribo', country: 'Suriname', lat: 5.8520, lng: -55.2038, timezone: -3, continent: 'South America' },

  // ==========================================
  // EUROPE & UNITED KINGDOM
  // ==========================================
  { name: 'London', stateOrRegion: 'Greater London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 0, continent: 'Europe' },
  { name: 'Birmingham', stateOrRegion: 'West Midlands', country: 'United Kingdom', lat: 52.4862, lng: -1.8904, timezone: 0, continent: 'Europe' },
  { name: 'Manchester', stateOrRegion: 'Greater Manchester', country: 'United Kingdom', lat: 53.4808, lng: -2.2426, timezone: 0, continent: 'Europe' },
  { name: 'Leicester', stateOrRegion: 'East Midlands', country: 'United Kingdom', lat: 52.6369, lng: -1.1398, timezone: 0, continent: 'Europe' },
  { name: 'Edinburgh', stateOrRegion: 'Scotland', country: 'United Kingdom', lat: 55.9533, lng: -3.1883, timezone: 0, continent: 'Europe' },
  { name: 'Glasgow', stateOrRegion: 'Scotland', country: 'United Kingdom', lat: 55.8642, lng: -4.2518, timezone: 0, continent: 'Europe' },
  { name: 'Dublin', stateOrRegion: 'Leinster', country: 'Ireland', lat: 53.3498, lng: -6.2603, timezone: 0, continent: 'Europe' },
  { name: 'Paris', stateOrRegion: 'Île-de-France', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 1, continent: 'Europe' },
  { name: 'Marseille', stateOrRegion: 'Provence-Alpes-Côte d\'Azur', country: 'France', lat: 43.2965, lng: 5.3698, timezone: 1, continent: 'Europe' },
  { name: 'Lyon', stateOrRegion: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.7640, lng: 4.8357, timezone: 1, continent: 'Europe' },
  { name: 'Berlin', stateOrRegion: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, timezone: 1, continent: 'Europe' },
  { name: 'Frankfurt', stateOrRegion: 'Hesse', country: 'Germany', lat: 50.1109, lng: 8.6821, timezone: 1, continent: 'Europe' },
  { name: 'Munich', stateOrRegion: 'Bavaria', country: 'Germany', lat: 48.1351, lng: 11.5820, timezone: 1, continent: 'Europe' },
  { name: 'Hamburg', stateOrRegion: 'Hamburg', country: 'Germany', lat: 53.5511, lng: 9.9937, timezone: 1, continent: 'Europe' },
  { name: 'Cologne', stateOrRegion: 'North Rhine-Westphalia', country: 'Germany', lat: 50.9375, lng: 6.9603, timezone: 1, continent: 'Europe' },
  { name: 'Amsterdam', stateOrRegion: 'North Holland', country: 'Netherlands', lat: 52.3676, lng: 4.9041, timezone: 1, continent: 'Europe' },
  { name: 'Rotterdam', stateOrRegion: 'South Holland', country: 'Netherlands', lat: 51.9244, lng: 4.4777, timezone: 1, continent: 'Europe' },
  { name: 'Brussels', stateOrRegion: 'Brussels-Capital', country: 'Belgium', lat: 50.8503, lng: 4.3517, timezone: 1, continent: 'Europe' },
  { name: 'Antwerp', stateOrRegion: 'Flanders', country: 'Belgium', lat: 51.2194, lng: 4.4025, timezone: 1, continent: 'Europe' },
  { name: 'Zurich', stateOrRegion: 'Zurich', country: 'Switzerland', lat: 47.3769, lng: 8.5417, timezone: 1, continent: 'Europe' },
  { name: 'Geneva', stateOrRegion: 'Geneva', country: 'Switzerland', lat: 46.2044, lng: 6.1432, timezone: 1, continent: 'Europe' },
  { name: 'Vienna', stateOrRegion: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738, timezone: 1, continent: 'Europe' },
  { name: 'Rome', stateOrRegion: 'Lazio', country: 'Italy', lat: 41.9028, lng: 12.4964, timezone: 1, continent: 'Europe' },
  { name: 'Milan', stateOrRegion: 'Lombardy', country: 'Italy', lat: 45.4642, lng: 9.1900, timezone: 1, continent: 'Europe' },
  { name: 'Madrid', stateOrRegion: 'Community of Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038, timezone: 1, continent: 'Europe' },
  { name: 'Barcelona', stateOrRegion: 'Catalonia', country: 'Spain', lat: 41.3879, lng: 2.1699, timezone: 1, continent: 'Europe' },
  { name: 'Valencia', stateOrRegion: 'Valencian Community', country: 'Spain', lat: 39.4699, lng: -0.3763, timezone: 1, continent: 'Europe' },
  { name: 'Lisbon', stateOrRegion: 'Lisbon', country: 'Portugal', lat: 38.7223, lng: -9.1393, timezone: 0, continent: 'Europe' },
  { name: 'Porto', stateOrRegion: 'Porto', country: 'Portugal', lat: 41.1579, lng: -8.6291, timezone: 0, continent: 'Europe' },
  { name: 'Stockholm', stateOrRegion: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686, timezone: 1, continent: 'Europe' },
  { name: 'Oslo', stateOrRegion: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522, timezone: 1, continent: 'Europe' },
  { name: 'Copenhagen', stateOrRegion: 'Capital Region', country: 'Denmark', lat: 55.6761, lng: 12.5683, timezone: 1, continent: 'Europe' },
  { name: 'Helsinki', stateOrRegion: 'Uusimaa', country: 'Finland', lat: 60.1699, lng: 24.9384, timezone: 2, continent: 'Europe' },
  { name: 'Warsaw', stateOrRegion: 'Masovian', country: 'Poland', lat: 52.2297, lng: 21.0122, timezone: 1, continent: 'Europe' },
  { name: 'Prague', stateOrRegion: 'Prague', country: 'Czech Republic', lat: 50.0755, lng: 14.4378, timezone: 1, continent: 'Europe' },
  { name: 'Budapest', stateOrRegion: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, timezone: 1, continent: 'Europe' },
  { name: 'Athens', stateOrRegion: 'Attica', country: 'Greece', lat: 37.9838, lng: 23.7275, timezone: 2, continent: 'Europe' },
  { name: 'Bucharest', stateOrRegion: 'Bucharest', country: 'Romania', lat: 44.4268, lng: 26.1025, timezone: 2, continent: 'Europe' },
  { name: 'Istanbul', stateOrRegion: 'Marmara', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 3, continent: 'Europe/Asia' },
  { name: 'Ankara', stateOrRegion: 'Central Anatolia', country: 'Turkey', lat: 39.9334, lng: 32.8597, timezone: 3, continent: 'Europe/Asia' },
  { name: 'Moscow', stateOrRegion: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173, timezone: 3, continent: 'Europe' },
  { name: 'Saint Petersburg', stateOrRegion: 'Saint Petersburg', country: 'Russia', lat: 59.9343, lng: 30.3351, timezone: 3, continent: 'Europe' },
  { name: 'Kyiv', stateOrRegion: 'Kyiv', country: 'Ukraine', lat: 50.4501, lng: 30.5234, timezone: 2, continent: 'Europe' },

  // ==========================================
  // MIDDLE EAST & GULF
  // ==========================================
  { name: 'Dubai', stateOrRegion: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 4, continent: 'Middle East' },
  { name: 'Abu Dhabi', stateOrRegion: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lng: 54.3773, timezone: 4, continent: 'Middle East' },
  { name: 'Sharjah', stateOrRegion: 'Sharjah', country: 'United Arab Emirates', lat: 25.3463, lng: 55.4209, timezone: 4, continent: 'Middle East' },
  { name: 'Doha', stateOrRegion: 'Ad-Dawhah', country: 'Qatar', lat: 25.2854, lng: 51.5310, timezone: 3, continent: 'Middle East' },
  { name: 'Riyadh', stateOrRegion: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, timezone: 3, continent: 'Middle East' },
  { name: 'Jeddah', stateOrRegion: 'Makkah', country: 'Saudi Arabia', lat: 21.4858, lng: 39.1925, timezone: 3, continent: 'Middle East' },
  { name: 'Dammam', stateOrRegion: 'Eastern Province', country: 'Saudi Arabia', lat: 26.4207, lng: 50.0888, timezone: 3, continent: 'Middle East' },
  { name: 'Kuwait City', stateOrRegion: 'Al Asimah', country: 'Kuwait', lat: 29.3759, lng: 47.9774, timezone: 3, continent: 'Middle East' },
  { name: 'Muscat', stateOrRegion: 'Muscat', country: 'Oman', lat: 23.5859, lng: 58.4059, timezone: 4, continent: 'Middle East' },
  { name: 'Manama', stateOrRegion: 'Capital', country: 'Bahrain', lat: 26.2285, lng: 50.5860, timezone: 3, continent: 'Middle East' },
  { name: 'Tel Aviv', stateOrRegion: 'Tel Aviv', country: 'Israel', lat: 32.0853, lng: 34.7818, timezone: 2, continent: 'Middle East' },
  { name: 'Jerusalem', stateOrRegion: 'Jerusalem', country: 'Israel', lat: 31.7683, lng: 35.2137, timezone: 2, continent: 'Middle East' },
  { name: 'Amman', stateOrRegion: 'Amman', country: 'Jordan', lat: 31.9454, lng: 35.9284, timezone: 3, continent: 'Middle East' },
  { name: 'Beirut', stateOrRegion: 'Beirut', country: 'Lebanon', lat: 33.8938, lng: 35.5018, timezone: 2, continent: 'Middle East' },
  { name: 'Baghdad', stateOrRegion: 'Baghdad', country: 'Iraq', lat: 33.3152, lng: 44.3661, timezone: 3, continent: 'Middle East' },
  { name: 'Tehran', stateOrRegion: 'Tehran', country: 'Iran', lat: 35.6892, lng: 51.3890, timezone: 3.5, continent: 'Middle East' },

  // ==========================================
  // ASIA & PACIFIC
  // ==========================================
  { name: 'Singapore', stateOrRegion: 'Central', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 8, continent: 'Asia' },
  { name: 'Kuala Lumpur', stateOrRegion: 'Federal Territory', country: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 8, continent: 'Asia' },
  { name: 'Penang (George Town)', stateOrRegion: 'Penang', country: 'Malaysia', lat: 5.4141, lng: 100.3288, timezone: 8, continent: 'Asia' },
  { name: 'Bangkok', stateOrRegion: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, timezone: 7, continent: 'Asia' },
  { name: 'Phuket', stateOrRegion: 'Phuket', country: 'Thailand', lat: 7.8804, lng: 98.3923, timezone: 7, continent: 'Asia' },
  { name: 'Jakarta', stateOrRegion: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 7, continent: 'Asia' },
  { name: 'Bali (Denpasar)', stateOrRegion: 'Bali', country: 'Indonesia', lat: -8.6705, lng: 115.2126, timezone: 8, continent: 'Asia' },
  { name: 'Manila', stateOrRegion: 'Metro Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, timezone: 8, continent: 'Asia' },
  { name: 'Ho Chi Minh City (Saigon)', stateOrRegion: 'Southeast', country: 'Vietnam', lat: 10.8231, lng: 106.6297, timezone: 7, continent: 'Asia' },
  { name: 'Hanoi', stateOrRegion: 'Red River Delta', country: 'Vietnam', lat: 21.0285, lng: 105.8542, timezone: 7, continent: 'Asia' },
  { name: 'Hong Kong', stateOrRegion: 'Hong Kong SAR', country: 'Hong Kong', lat: 22.3193, lng: 114.1694, timezone: 8, continent: 'Asia' },
  { name: 'Tokyo', stateOrRegion: 'Kanto', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 9, continent: 'Asia' },
  { name: 'Osaka', stateOrRegion: 'Kansai', country: 'Japan', lat: 34.6937, lng: 135.5023, timezone: 9, continent: 'Asia' },
  { name: 'Kyoto', stateOrRegion: 'Kansai', country: 'Japan', lat: 35.0116, lng: 135.7681, timezone: 9, continent: 'Asia' },
  { name: 'Seoul', stateOrRegion: 'Seoul Capital Area', country: 'South Korea', lat: 37.5665, lng: 126.9780, timezone: 9, continent: 'Asia' },
  { name: 'Taipei', stateOrRegion: 'Northern Taiwan', country: 'Taiwan', lat: 25.0330, lng: 121.5654, timezone: 8, continent: 'Asia' },
  { name: 'Beijing', stateOrRegion: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, timezone: 8, continent: 'Asia' },
  { name: 'Shanghai', stateOrRegion: 'East China', country: 'China', lat: 31.2304, lng: 121.4737, timezone: 8, continent: 'Asia' },
  { name: 'Guangzhou', stateOrRegion: 'Guangdong', country: 'China', lat: 23.1291, lng: 113.2644, timezone: 8, continent: 'Asia' },
  { name: 'Shenzhen', stateOrRegion: 'Guangdong', country: 'China', lat: 22.5431, lng: 114.0579, timezone: 8, continent: 'Asia' },
  { name: 'Almaty', stateOrRegion: 'Almaty', country: 'Kazakhstan', lat: 43.2220, lng: 76.8512, timezone: 5, continent: 'Asia' },
  { name: 'Tashkent', stateOrRegion: 'Tashkent', country: 'Uzbekistan', lat: 41.2995, lng: 69.2401, timezone: 5, continent: 'Asia' },

  // ==========================================
  // AUSTRALIA & OCEANIA
  // ==========================================
  { name: 'Sydney', stateOrRegion: 'New South Wales', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 10, continent: 'Oceania' },
  { name: 'Melbourne', stateOrRegion: 'Victoria', country: 'Australia', lat: -37.8136, lng: 144.9631, timezone: 10, continent: 'Oceania' },
  { name: 'Brisbane', stateOrRegion: 'Queensland', country: 'Australia', lat: -27.4698, lng: 153.0251, timezone: 10, continent: 'Oceania' },
  { name: 'Perth', stateOrRegion: 'Western Australia', country: 'Australia', lat: -31.9505, lng: 115.8605, timezone: 8, continent: 'Oceania' },
  { name: 'Adelaide', stateOrRegion: 'South Australia', country: 'Australia', lat: -34.9285, lng: 138.6007, timezone: 9.5, continent: 'Oceania' },
  { name: 'Canberra', stateOrRegion: 'Australian Capital Territory', country: 'Australia', lat: -35.2809, lng: 149.1300, timezone: 10, continent: 'Oceania' },
  { name: 'Gold Coast', stateOrRegion: 'Queensland', country: 'Australia', lat: -28.0167, lng: 153.4000, timezone: 10, continent: 'Oceania' },
  { name: 'Auckland', stateOrRegion: 'North Island', country: 'New Zealand', lat: -36.8485, lng: 174.7633, timezone: 12, continent: 'Oceania' },
  { name: 'Wellington', stateOrRegion: 'North Island', country: 'New Zealand', lat: -41.2865, lng: 174.7762, timezone: 12, continent: 'Oceania' },
  { name: 'Christchurch', stateOrRegion: 'South Island', country: 'New Zealand', lat: -43.5321, lng: 172.6362, timezone: 12, continent: 'Oceania' },
  { name: 'Suva', stateOrRegion: 'Central Division', country: 'Fiji', lat: -18.1416, lng: 178.4419, timezone: 12, continent: 'Oceania' },

  // ==========================================
  // AFRICA
  // ==========================================
  { name: 'Johannesburg', stateOrRegion: 'Gauteng', country: 'South Africa', lat: -26.2041, lng: 28.0473, timezone: 2, continent: 'Africa' },
  { name: 'Cape Town', stateOrRegion: 'Western Cape', country: 'South Africa', lat: -33.9249, lng: 18.4241, timezone: 2, continent: 'Africa' },
  { name: 'Durban', stateOrRegion: 'KwaZulu-Natal', country: 'South Africa', lat: -29.8587, lng: 31.0218, timezone: 2, continent: 'Africa' },
  { name: 'Nairobi', stateOrRegion: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219, timezone: 3, continent: 'Africa' },
  { name: 'Mombasa', stateOrRegion: 'Coast Province', country: 'Kenya', lat: -4.0435, lng: 39.6682, timezone: 3, continent: 'Africa' },
  { name: 'Cairo', stateOrRegion: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 2, continent: 'Africa' },
  { name: 'Alexandria', stateOrRegion: 'Alexandria', country: 'Egypt', lat: 31.2001, lng: 29.9187, timezone: 2, continent: 'Africa' },
  { name: 'Casablanca', stateOrRegion: 'Casablanca-Settat', country: 'Morocco', lat: 33.5731, lng: -7.5898, timezone: 1, continent: 'Africa' },
  { name: 'Marrakech', stateOrRegion: 'Marrakech-Safi', country: 'Morocco', lat: 31.6295, lng: -7.9811, timezone: 1, continent: 'Africa' },
  { name: 'Lagos', stateOrRegion: 'Lagos State', country: 'Nigeria', lat: 6.5244, lng: 3.3792, timezone: 1, continent: 'Africa' },
  { name: 'Abuja', stateOrRegion: 'Federal Capital Territory', country: 'Nigeria', lat: 9.0765, lng: 7.3986, timezone: 1, continent: 'Africa' },
  { name: 'Addis Ababa', stateOrRegion: 'Addis Ababa', country: 'Ethiopia', lat: 9.0320, lng: 38.7468, timezone: 3, continent: 'Africa' },
  { name: 'Port Louis', stateOrRegion: 'Port Louis', country: 'Mauritius', lat: -20.1609, lng: 57.5012, timezone: 4, continent: 'Africa' },
  { name: 'Dar es Salaam', stateOrRegion: 'Dar es Salaam', country: 'Tanzania', lat: -6.7924, lng: 39.2083, timezone: 3, continent: 'Africa' },
  { name: 'Kampala', stateOrRegion: 'Central', country: 'Uganda', lat: 0.3476, lng: 32.5825, timezone: 3, continent: 'Africa' },
  { name: 'Accra', stateOrRegion: 'Greater Accra', country: 'Ghana', lat: 5.6037, lng: -0.1870, timezone: 0, continent: 'Africa' },

  // ==========================================
  // SOUTH ASIA & INDIAN SUBCONTINENT
  // ==========================================
  { name: 'Kathmandu', stateOrRegion: 'Bagmati', country: 'Nepal', lat: 27.7172, lng: 85.3240, timezone: 5.75, continent: 'Asia' },
  { name: 'Pokhara', stateOrRegion: 'Gandaki', country: 'Nepal', lat: 28.2096, lng: 83.9856, timezone: 5.75, continent: 'Asia' },
  { name: 'Colombo', stateOrRegion: 'Western', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, timezone: 5.5, continent: 'Asia' },
  { name: 'Kandy', stateOrRegion: 'Central', country: 'Sri Lanka', lat: 7.2906, lng: 80.6337, timezone: 5.5, continent: 'Asia' },
  { name: 'Jaffna', stateOrRegion: 'Northern', country: 'Sri Lanka', lat: 9.6615, lng: 80.0255, timezone: 5.5, continent: 'Asia' },
  { name: 'Dhaka', stateOrRegion: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezone: 6, continent: 'Asia' },
  { name: 'Chittagong', stateOrRegion: 'Chittagong', country: 'Bangladesh', lat: 22.3569, lng: 91.7832, timezone: 6, continent: 'Asia' },
  { name: 'Sylhet', stateOrRegion: 'Sylhet', country: 'Bangladesh', lat: 24.8949, lng: 91.8687, timezone: 6, continent: 'Asia' },
  { name: 'Thimphu', stateOrRegion: 'Thimphu', country: 'Bhutan', lat: 27.4728, lng: 89.6393, timezone: 6, continent: 'Asia' },
  { name: 'Male', stateOrRegion: 'Kaafu', country: 'Maldives', lat: 4.1755, lng: 73.5093, timezone: 5, continent: 'Asia' },
];

// Map helper for continent assignment
function getContinentForCountry(country: string): string {
  if (country === 'India' || country === 'Nepal' || country === 'Sri Lanka' || country === 'Bangladesh' || country === 'Bhutan' || country === 'Maldives' || country === 'Myanmar' || country === 'United Arab Emirates' || country === 'Qatar' || country === 'Saudi Arabia' || country === 'Kuwait' || country === 'Oman' || country === 'Bahrain' || country === 'Singapore' || country === 'Malaysia' || country === 'Thailand' || country === 'Japan' || country === 'China' || country === 'South Korea' || country === 'Indonesia' || country === 'Vietnam' || country === 'Philippines' || country === 'Taiwan' || country === 'Hong Kong') {
    return 'Asia';
  }
  if (country === 'United States' || country === 'Canada' || country === 'Mexico') {
    return 'North America';
  }
  if (country === 'United Kingdom' || country === 'Germany' || country === 'France' || country === 'Italy' || country === 'Spain' || country === 'Netherlands' || country === 'Switzerland' || country === 'Sweden' || country === 'Poland' || country === 'Ireland' || country === 'Austria' || country === 'Norway' || country === 'Denmark' || country === 'Finland' || country === 'Greece' || country === 'Portugal' || country === 'Belgium' || country === 'Czech Republic' || country === 'Hungary' || country === 'Russia') {
    return 'Europe';
  }
  if (country === 'Australia' || country === 'New Zealand' || country === 'Fiji') {
    return 'Oceania';
  }
  if (country === 'South Africa' || country === 'Egypt' || country === 'Nigeria' || country === 'Kenya' || country === 'Morocco' || country === 'Ghana' || country === 'Tanzania' || country === 'Ethiopia' || country === 'Mauritius') {
    return 'Africa';
  }
  if (country === 'Brazil' || country === 'Argentina' || country === 'Colombia' || country === 'Chile' || country === 'Peru' || country === 'Ecuador' || country === 'Uruguay' || country === 'Venezuela' || country === 'Guyana' || country === 'Suriname' || country === 'Trinidad & Tobago') {
    return 'South America';
  }
  return 'Asia';
}

/**
 * Merged Master World Cities Database
 * Contains 700+ verified Indian cities (all districts & Assam towns) + major international cities
 */
export const WORLD_CITIES: WorldCity[] = [
  ...POPULAR_CITIES.map((c) => ({
    ...c,
    continent: getContinentForCountry(c.country),
  })),
  ...GLOBAL_INTERNATIONAL_CITIES.filter((gc) => 
    !POPULAR_CITIES.some(
      (pc) => pc.name.toLowerCase() === gc.name.toLowerCase() && 
              pc.country.toLowerCase() === gc.country.toLowerCase()
    )
  ),
];

export const STANDARD_TIMEZONES = [
  { label: 'UTC -12:00 (Baker Island)', value: -12 },
  { label: 'UTC -11:00 (Samoa, Niue)', value: -11 },
  { label: 'UTC -10:00 (Hawaii HST)', value: -10 },
  { label: 'UTC -09:00 (Alaska AKST)', value: -9 },
  { label: 'UTC -08:00 (US Pacific PST)', value: -8 },
  { label: 'UTC -07:00 (US Mountain MST)', value: -7 },
  { label: 'UTC -06:00 (US Central CST, Mexico)', value: -6 },
  { label: 'UTC -05:00 (US Eastern EST, Colombia, Peru)', value: -5 },
  { label: 'UTC -04:00 (Atlantic AST, Santiago, Caracas)', value: -4 },
  { label: 'UTC -03:30 (Newfoundland)', value: -3.5 },
  { label: 'UTC -03:00 (Buenos Aires, São Paulo, Rio)', value: -3 },
  { label: 'UTC -02:00 (Mid-Atlantic)', value: -2 },
  { label: 'UTC -01:00 (Cape Verde, Azores)', value: -1 },
  { label: 'UTC +00:00 (London GMT, Dublin, Lisbon, Accra)', value: 0 },
  { label: 'UTC +01:00 (Paris, Berlin, Rome, Madrid, Lagos)', value: 1 },
  { label: 'UTC +02:00 (Cairo, Johannesburg, Athens, Jerusalem)', value: 2 },
  { label: 'UTC +03:00 (Riyadh, Doha, Nairobi, Moscow, Istanbul)', value: 3 },
  { label: 'UTC +03:30 (Tehran IRST)', value: 3.5 },
  { label: 'UTC +04:00 (Dubai, Abu Dhabi, Muscat, Baku)', value: 4 },
  { label: 'UTC +04:30 (Kabul AFT)', value: 4.5 },
  { label: 'UTC +05:00 (Karachi, Tashkent, Maldives, Yekaterinburg)', value: 5 },
  { label: 'UTC +05:30 (India IST, Sri Lanka)', value: 5.5 },
  { label: 'UTC +05:45 (Nepal NPT)', value: 5.75 },
  { label: 'UTC +06:00 (Dhaka, Thimphu, Almaty, Omsk)', value: 6 },
  { label: 'UTC +06:30 (Yangon MMT)', value: 6.5 },
  { label: 'UTC +07:00 (Bangkok, Jakarta, Hanoi, Ho Chi Minh)', value: 7 },
  { label: 'UTC +08:00 (Singapore, Kuala Lumpur, Hong Kong, Beijing, Perth)', value: 8 },
  { label: 'UTC +08:45 (Eucla CWST)', value: 8.75 },
  { label: 'UTC +09:00 (Tokyo, Osaka, Seoul)', value: 9 },
  { label: 'UTC +09:30 (Adelaide, Darwin ACST)', value: 9.5 },
  { label: 'UTC +10:00 (Sydney, Melbourne, Brisbane AEST)', value: 10 },
  { label: 'UTC +10:30 (Lord Howe)', value: 10.5 },
  { label: 'UTC +11:00 (Solomon Islands, Vladivostok)', value: 11 },
  { label: 'UTC +12:00 (Auckland, Fiji, Wellington NZST)', value: 12 },
  { label: 'UTC +12:45 (Chatham Islands)', value: 12.75 },
  { label: 'UTC +13:00 (Tonga, Samoa)', value: 13 },
  { label: 'UTC +14:00 (Line Islands, Kiritimati)', value: 14 },
];

/**
 * Filter worldwide cities with ranking: exact match > prefix match > state/region match > substring match
 */
export function searchWorldCities(query: string, limit = 50, filterContinent?: string): WorldCity[] {
  if (!query || query.trim().length === 0) {
    if (filterContinent && filterContinent !== 'all') {
      return WORLD_CITIES.filter(c => c.continent?.toLowerCase() === filterContinent.toLowerCase()).slice(0, limit);
    }
    return WORLD_CITIES.slice(0, limit);
  }

  const cleanQuery = query.toLowerCase().trim();

  // Common aliases mapping
  const aliases: Record<string, string> = {
    'bombay': 'mumbai',
    'madras': 'chennai',
    'calcutta': 'kolkata',
    'bangalore': 'bengaluru',
    'baroda': 'vadodara',
    'banaras': 'varanasi',
    'kashi': 'varanasi',
    'allahabad': 'prayagraj',
    'trivandrum': 'thiruvananthapuram',
    'cochin': 'kochi',
    'gauhati': 'guwahati',
    'saigon': 'ho chi minh',
    'nyc': 'new york',
    'la': 'los angeles',
    'sf': 'san francisco',
    'dc': 'washington',
    'uk': 'united kingdom',
    'usa': 'united states',
    'uae': 'united arab emirates',
  };

  const effectiveTerm = aliases[cleanQuery] || cleanQuery;

  const scored: { city: WorldCity; score: number }[] = [];

  for (const city of WORLD_CITIES) {
    if (filterContinent && filterContinent !== 'all' && city.continent?.toLowerCase() !== filterContinent.toLowerCase()) {
      continue;
    }

    const cityName = city.name.toLowerCase();
    const region = (city.stateOrRegion || '').toLowerCase();
    const country = city.country.toLowerCase();

    let score = 0;

    // Exact city match
    if (cityName === cleanQuery || cityName === effectiveTerm) {
      score = 100;
    } 
    // City name starts with query (e.g. "Delh" -> New Delhi / Delhi, "Jorh" -> Jorhat)
    else if (cityName.startsWith(cleanQuery) || cityName.startsWith(effectiveTerm)) {
      score = 85;
    } 
    // Sub-word in city starts with query (e.g. "Delhi" in "New Delhi")
    else if (cityName.includes(' ' + cleanQuery) || cityName.includes(' ' + effectiveTerm)) {
      score = 80;
    } 
    // Exact State/Region match (e.g. query "Assam" or "Delhi NCR" or "Gujarat")
    else if (region === cleanQuery || region === effectiveTerm) {
      score = 75;
    } 
    // State/Region starts with query (e.g. "Assa" -> Assam)
    else if (region.startsWith(cleanQuery) || region.startsWith(effectiveTerm)) {
      score = 65;
    } 
    // City name contains query
    else if (cityName.includes(cleanQuery) || cityName.includes(effectiveTerm)) {
      score = 50;
    } 
    // State/Region contains query
    else if (region.includes(cleanQuery) || region.includes(effectiveTerm)) {
      score = 40;
    } 
    // Country starts with query
    else if (country.startsWith(cleanQuery)) {
      score = 30;
    } 
    // Country contains query
    else if (country.includes(cleanQuery)) {
      score = 20;
    }

    if (score > 0) {
      scored.push({ city, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((item) => item.city);
}

/**
 * Get all Assam cities & towns directly
 */
export function getAssamCities(): WorldCity[] {
  return WORLD_CITIES.filter(c => c.country === 'India' && (c.stateOrRegion || '').toLowerCase().includes('assam'));
}

/**
 * Format decimal coordinates to readable string with N/S, E/W
 */
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

/**
 * Find the closest city/town to given coordinates
 */
export function findClosestCity(lat: number, lng: number): { city: WorldCity; distanceKm: number } | null {
  let closest: WorldCity | null = null;
  let minDistance = Infinity;

  for (const city of WORLD_CITIES) {
    const dLat = (city.lat - lat) * (Math.PI / 180);
    const dLng = (city.lng - lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * (Math.PI / 180)) * Math.cos(city.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dKm = 6371 * c;

    if (dKm < minDistance) {
      minDistance = dKm;
      closest = city;
    }
  }

  return closest ? { city: closest, distanceKm: Math.round(minDistance * 10) / 10 } : null;
}
