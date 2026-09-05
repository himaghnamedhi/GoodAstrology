import { PlanetId } from '../types/astrology';

export interface BirthDetails {
  name: string;
  gender: 'male' | 'female' | 'other';
  weightKg: number;
  weightUnit: 'kg' | 'lbs';
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM (24-hour)
  city: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number; // in hours, e.g. +5.5 for IST, -5 for EST
}

export interface CityPreset {
  name: string;
  stateOrRegion?: string;
  country: string;
  lat: number;
  lng: number;
  timezone: number;
}

export const POPULAR_CITIES: CityPreset[] = [
  // --- INDIA: Northern & Capital Region ---
  { name: 'New Delhi', stateOrRegion: 'Delhi NCR', country: 'India', lat: 28.6139, lng: 77.2090, timezone: 5.5 },
  { name: 'Noida', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.5355, lng: 77.3910, timezone: 5.5 },
  { name: 'Gurugram (Gurgaon)', stateOrRegion: 'Haryana', country: 'India', lat: 28.4595, lng: 77.0266, timezone: 5.5 },
  { name: 'Faridabad', stateOrRegion: 'Haryana', country: 'India', lat: 28.4089, lng: 77.3178, timezone: 5.5 },
  { name: 'Ghaziabad', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.6692, lng: 77.4538, timezone: 5.5 },
  { name: 'Chandigarh', stateOrRegion: 'Chandigarh', country: 'India', lat: 30.7333, lng: 76.7794, timezone: 5.5 },
  { name: 'Amritsar', stateOrRegion: 'Punjab', country: 'India', lat: 31.6340, lng: 74.8723, timezone: 5.5 },
  { name: 'Ludhiana', stateOrRegion: 'Punjab', country: 'India', lat: 30.9010, lng: 75.8573, timezone: 5.5 },
  { name: 'Jalandhar', stateOrRegion: 'Punjab', country: 'India', lat: 31.3260, lng: 75.5762, timezone: 5.5 },
  { name: 'Patiala', stateOrRegion: 'Punjab', country: 'India', lat: 30.3398, lng: 76.3869, timezone: 5.5 },
  { name: 'Shimla', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 31.1048, lng: 77.1734, timezone: 5.5 },
  { name: 'Dharamshala', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 32.2190, lng: 76.3234, timezone: 5.5 },
  { name: 'Manali', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 32.2432, lng: 77.1892, timezone: 5.5 },
  { name: 'Jammu', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 32.7266, lng: 74.8570, timezone: 5.5 },
  { name: 'Srinagar', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 34.0837, lng: 74.7973, timezone: 5.5 },
  { name: 'Dehradun', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.3165, lng: 78.0322, timezone: 5.5 },
  { name: 'Haridwar', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.9457, lng: 78.1642, timezone: 5.5 },
  { name: 'Rishikesh', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.0869, lng: 78.2676, timezone: 5.5 },
  { name: 'Nainital', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.3919, lng: 79.4542, timezone: 5.5 },

  // --- INDIA: Uttar Pradesh & Central India ---
  { name: 'Lucknow', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.8467, lng: 80.9462, timezone: 5.5 },
  { name: 'Varanasi (Kashi)', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.3176, lng: 82.9739, timezone: 5.5 },
  { name: 'Prayagraj (Allahabad)', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.4358, lng: 81.8463, timezone: 5.5 },
  { name: 'Kanpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.4499, lng: 80.3319, timezone: 5.5 },
  { name: 'Agra', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.1767, lng: 78.0081, timezone: 5.5 },
  { name: 'Mathura', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.4924, lng: 77.6737, timezone: 5.5 },
  { name: 'Ayodhya', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.7922, lng: 82.1998, timezone: 5.5 },
  { name: 'Gorakhpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.7606, lng: 83.3732, timezone: 5.5 },
  { name: 'Meerut', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.9845, lng: 77.7064, timezone: 5.5 },
  { name: 'Bareilly', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.3670, lng: 79.4304, timezone: 5.5 },
  { name: 'Aligarh', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.8974, lng: 78.0880, timezone: 5.5 },
  { name: 'Bhopal', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.2599, lng: 77.4126, timezone: 5.5 },
  { name: 'Indore', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 22.7196, lng: 75.8577, timezone: 5.5 },
  { name: 'Ujjain', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.1765, lng: 75.7885, timezone: 5.5 },
  { name: 'Gwalior', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 26.2183, lng: 78.1828, timezone: 5.5 },
  { name: 'Jabalpur', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.1815, lng: 79.9864, timezone: 5.5 },
  { name: 'Raipur', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 21.2514, lng: 81.6296, timezone: 5.5 },
  { name: 'Bilaspur', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 22.0797, lng: 82.1409, timezone: 5.5 },

  // --- INDIA: Western India (Maharashtra, Gujarat, Rajasthan, Goa) ---
  { name: 'Mumbai', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.0760, lng: 72.8777, timezone: 5.5 },
  { name: 'Pune', stateOrRegion: 'Maharashtra', country: 'India', lat: 18.5204, lng: 73.8567, timezone: 5.5 },
  { name: 'Nagpur', stateOrRegion: 'Maharashtra', country: 'India', lat: 21.1458, lng: 79.0882, timezone: 5.5 },
  { name: 'Nashik', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.9975, lng: 73.7898, timezone: 5.5 },
  { name: 'Thane', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.2183, lng: 72.9781, timezone: 5.5 },
  { name: 'Navi Mumbai', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.0330, lng: 73.0297, timezone: 5.5 },
  { name: 'Chhatrapati Sambhajinagar (Aurangabad)', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.8762, lng: 75.3433, timezone: 5.5 },
  { name: 'Kolhapur', stateOrRegion: 'Maharashtra', country: 'India', lat: 16.7050, lng: 74.2433, timezone: 5.5 },
  { name: 'Solapur', stateOrRegion: 'Maharashtra', country: 'India', lat: 17.6599, lng: 75.9064, timezone: 5.5 },
  { name: 'Ahmedabad', stateOrRegion: 'Gujarat', country: 'India', lat: 23.0225, lng: 72.5714, timezone: 5.5 },
  { name: 'Surat', stateOrRegion: 'Gujarat', country: 'India', lat: 21.1702, lng: 72.8311, timezone: 5.5 },
  { name: 'Vadodara (Baroda)', stateOrRegion: 'Gujarat', country: 'India', lat: 22.3072, lng: 73.1812, timezone: 5.5 },
  { name: 'Rajkot', stateOrRegion: 'Gujarat', country: 'India', lat: 22.3039, lng: 70.8022, timezone: 5.5 },
  { name: 'Gandhinagar', stateOrRegion: 'Gujarat', country: 'India', lat: 23.2156, lng: 72.6369, timezone: 5.5 },
  { name: 'Bhavnagar', stateOrRegion: 'Gujarat', country: 'India', lat: 21.7645, lng: 72.1519, timezone: 5.5 },
  { name: 'Jamnagar', stateOrRegion: 'Gujarat', country: 'India', lat: 22.4707, lng: 70.0577, timezone: 5.5 },
  { name: 'Jaipur', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.9124, lng: 75.7873, timezone: 5.5 },
  { name: 'Jodhpur', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.2389, lng: 73.0243, timezone: 5.5 },
  { name: 'Udaipur', stateOrRegion: 'Rajasthan', country: 'India', lat: 24.5854, lng: 73.7125, timezone: 5.5 },
  { name: 'Kota', stateOrRegion: 'Rajasthan', country: 'India', lat: 25.2138, lng: 75.8648, timezone: 5.5 },
  { name: 'Bikaner', stateOrRegion: 'Rajasthan', country: 'India', lat: 28.0229, lng: 73.3119, timezone: 5.5 },
  { name: 'Ajmer', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.4499, lng: 74.6399, timezone: 5.5 },
  { name: 'Pushkar', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.4897, lng: 74.5511, timezone: 5.5 },
  { name: 'Panaji', stateOrRegion: 'Goa', country: 'India', lat: 15.4909, lng: 73.8278, timezone: 5.5 },
  { name: 'Margao', stateOrRegion: 'Goa', country: 'India', lat: 15.2832, lng: 73.9862, timezone: 5.5 },

  // --- INDIA: Southern India ---
  { name: 'Bengaluru (Bangalore)', stateOrRegion: 'Karnataka', country: 'India', lat: 12.9716, lng: 77.5946, timezone: 5.5 },
  { name: 'Mysuru (Mysore)', stateOrRegion: 'Karnataka', country: 'India', lat: 12.2958, lng: 76.6394, timezone: 5.5 },
  { name: 'Mangaluru (Mangalore)', stateOrRegion: 'Karnataka', country: 'India', lat: 12.9141, lng: 74.8560, timezone: 5.5 },
  { name: 'Hubballi-Dharwad', stateOrRegion: 'Karnataka', country: 'India', lat: 15.3647, lng: 75.1240, timezone: 5.5 },
  { name: 'Belagavi (Belgaum)', stateOrRegion: 'Karnataka', country: 'India', lat: 15.8497, lng: 74.4977, timezone: 5.5 },
  { name: 'Chennai (Madras)', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 13.0827, lng: 80.2707, timezone: 5.5 },
  { name: 'Coimbatore', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.0168, lng: 76.9558, timezone: 5.5 },
  { name: 'Madurai', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 9.9252, lng: 78.1198, timezone: 5.5 },
  { name: 'Tiruchirappalli (Trichy)', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.7905, lng: 78.7047, timezone: 5.5 },
  { name: 'Salem', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.6643, lng: 78.1460, timezone: 5.5 },
  { name: 'Tirunelveli', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 8.7139, lng: 77.7567, timezone: 5.5 },
  { name: 'Vellore', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 12.9165, lng: 79.1325, timezone: 5.5 },
  { name: 'Kanchipuram', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 12.8342, lng: 79.7036, timezone: 5.5 },
  { name: 'Hyderabad', stateOrRegion: 'Telangana', country: 'India', lat: 17.3850, lng: 78.4867, timezone: 5.5 },
  { name: 'Warangal', stateOrRegion: 'Telangana', country: 'India', lat: 17.9689, lng: 79.5941, timezone: 5.5 },
  { name: 'Nizamabad', stateOrRegion: 'Telangana', country: 'India', lat: 18.6725, lng: 78.0941, timezone: 5.5 },
  { name: 'Visakhapatnam (Vizag)', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 17.6868, lng: 83.2185, timezone: 5.5 },
  { name: 'Vijayawada', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.5062, lng: 80.6480, timezone: 5.5 },
  { name: 'Guntur', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.3067, lng: 80.4365, timezone: 5.5 },
  { name: 'Tirupati', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 13.6288, lng: 79.4192, timezone: 5.5 },
  { name: 'Thiruvananthapuram (Trivandrum)', stateOrRegion: 'Kerala', country: 'India', lat: 8.5241, lng: 76.9366, timezone: 5.5 },
  { name: 'Kochi (Cochin)', stateOrRegion: 'Kerala', country: 'India', lat: 9.9312, lng: 76.2673, timezone: 5.5 },
  { name: 'Kozhikode (Calicut)', stateOrRegion: 'Kerala', country: 'India', lat: 11.2588, lng: 75.7804, timezone: 5.5 },
  { name: 'Thrissur', stateOrRegion: 'Kerala', country: 'India', lat: 10.5276, lng: 76.2144, timezone: 5.5 },
  { name: 'Puducherry (Pondicherry)', stateOrRegion: 'Puducherry', country: 'India', lat: 11.9416, lng: 79.8083, timezone: 5.5 },

  // --- INDIA: Eastern & North-Eastern India ---
  { name: 'Kolkata (Calcutta)', stateOrRegion: 'West Bengal', country: 'India', lat: 22.5726, lng: 88.3639, timezone: 5.5 },
  { name: 'Howrah', stateOrRegion: 'West Bengal', country: 'India', lat: 22.5958, lng: 88.2636, timezone: 5.5 },
  { name: 'Siliguri', stateOrRegion: 'West Bengal', country: 'India', lat: 26.7271, lng: 88.3953, timezone: 5.5 },
  { name: 'Durgapur', stateOrRegion: 'West Bengal', country: 'India', lat: 23.5204, lng: 87.3119, timezone: 5.5 },
  { name: 'Asansol', stateOrRegion: 'West Bengal', country: 'India', lat: 23.6739, lng: 86.9524, timezone: 5.5 },
  { name: 'Patna', stateOrRegion: 'Bihar', country: 'India', lat: 25.5941, lng: 85.1376, timezone: 5.5 },
  { name: 'Gaya (Bodh Gaya)', stateOrRegion: 'Bihar', country: 'India', lat: 24.7955, lng: 85.0002, timezone: 5.5 },
  { name: 'Muzaffarpur', stateOrRegion: 'Bihar', country: 'India', lat: 26.1209, lng: 85.3647, timezone: 5.5 },
  { name: 'Bhagalpur', stateOrRegion: 'Bihar', country: 'India', lat: 25.2425, lng: 86.9842, timezone: 5.5 },
  { name: 'Ranchi', stateOrRegion: 'Jharkhand', country: 'India', lat: 23.3441, lng: 85.3096, timezone: 5.5 },
  { name: 'Jamshedpur', stateOrRegion: 'Jharkhand', country: 'India', lat: 22.8046, lng: 86.2029, timezone: 5.5 },
  { name: 'Dhanbad', stateOrRegion: 'Jharkhand', country: 'India', lat: 23.7957, lng: 86.4304, timezone: 5.5 },
  { name: 'Bhubaneswar', stateOrRegion: 'Odisha', country: 'India', lat: 20.2961, lng: 85.8245, timezone: 5.5 },
  { name: 'Cuttack', stateOrRegion: 'Odisha', country: 'India', lat: 20.4625, lng: 85.8828, timezone: 5.5 },
  { name: 'Puri', stateOrRegion: 'Odisha', country: 'India', lat: 19.8135, lng: 85.8312, timezone: 5.5 },
  { name: 'Rourkela', stateOrRegion: 'Odisha', country: 'India', lat: 22.2604, lng: 84.8536, timezone: 5.5 },
  // --- INDIA: Assam (All Major Cities, Districts & Municipalities) ---
  { name: 'Guwahati', stateOrRegion: 'Assam', country: 'India', lat: 26.1445, lng: 91.7362, timezone: 5.5 },
  { name: 'Dispur', stateOrRegion: 'Assam', country: 'India', lat: 26.1433, lng: 91.7898, timezone: 5.5 },
  { name: 'Silchar', stateOrRegion: 'Assam', country: 'India', lat: 24.8333, lng: 92.7789, timezone: 5.5 },
  { name: 'Dibrugarh', stateOrRegion: 'Assam', country: 'India', lat: 27.4728, lng: 94.9120, timezone: 5.5 },
  { name: 'Jorhat', stateOrRegion: 'Assam', country: 'India', lat: 26.7509, lng: 94.2037, timezone: 5.5 },
  { name: 'Nagaon', stateOrRegion: 'Assam', country: 'India', lat: 26.3466, lng: 92.6840, timezone: 5.5 },
  { name: 'Tinsukia', stateOrRegion: 'Assam', country: 'India', lat: 27.4922, lng: 95.3468, timezone: 5.5 },
  { name: 'Tezpur', stateOrRegion: 'Assam', country: 'India', lat: 26.6528, lng: 92.7926, timezone: 5.5 },
  { name: 'Bongaigaon', stateOrRegion: 'Assam', country: 'India', lat: 26.4744, lng: 90.5584, timezone: 5.5 },
  { name: 'Dhubri', stateOrRegion: 'Assam', country: 'India', lat: 26.0207, lng: 89.9742, timezone: 5.5 },
  { name: 'Diphu', stateOrRegion: 'Assam', country: 'India', lat: 25.8456, lng: 93.4323, timezone: 5.5 },
  { name: 'North Lakhimpur', stateOrRegion: 'Assam', country: 'India', lat: 27.2366, lng: 94.1037, timezone: 5.5 },
  { name: 'Karimganj', stateOrRegion: 'Assam', country: 'India', lat: 24.8693, lng: 92.3556, timezone: 5.5 },
  { name: 'Sivasagar', stateOrRegion: 'Assam', country: 'India', lat: 26.9826, lng: 94.6425, timezone: 5.5 },
  { name: 'Goalpara', stateOrRegion: 'Assam', country: 'India', lat: 26.1806, lng: 90.6276, timezone: 5.5 },
  { name: 'Barpeta', stateOrRegion: 'Assam', country: 'India', lat: 26.3204, lng: 91.0069, timezone: 5.5 },
  { name: 'Mangaldai', stateOrRegion: 'Assam', country: 'India', lat: 26.4354, lng: 92.0345, timezone: 5.5 },
  { name: 'Golaghat', stateOrRegion: 'Assam', country: 'India', lat: 26.5239, lng: 93.9666, timezone: 5.5 },
  { name: 'Haflong', stateOrRegion: 'Assam', country: 'India', lat: 25.1764, lng: 93.0232, timezone: 5.5 },
  { name: 'Kokrajhar', stateOrRegion: 'Assam', country: 'India', lat: 26.4014, lng: 90.2719, timezone: 5.5 },
  { name: 'Hailakandi', stateOrRegion: 'Assam', country: 'India', lat: 24.6833, lng: 92.5667, timezone: 5.5 },
  { name: 'Nalbari', stateOrRegion: 'Assam', country: 'India', lat: 26.4449, lng: 91.4429, timezone: 5.5 },
  { name: 'Morigaon', stateOrRegion: 'Assam', country: 'India', lat: 26.2588, lng: 92.3424, timezone: 5.5 },
  { name: 'Dhemaji', stateOrRegion: 'Assam', country: 'India', lat: 27.4833, lng: 94.5833, timezone: 5.5 },
  { name: 'Hojai', stateOrRegion: 'Assam', country: 'India', lat: 26.0022, lng: 92.8625, timezone: 5.5 },
  { name: 'Biswanath Chariali', stateOrRegion: 'Assam', country: 'India', lat: 26.7323, lng: 93.1539, timezone: 5.5 },
  { name: 'Sonari (Charaideo)', stateOrRegion: 'Assam', country: 'India', lat: 27.0200, lng: 95.0300, timezone: 5.5 },
  { name: 'Majuli (Garamur)', stateOrRegion: 'Assam', country: 'India', lat: 26.9667, lng: 94.2167, timezone: 5.5 },
  { name: 'Hatsingimari', stateOrRegion: 'Assam', country: 'India', lat: 25.6881, lng: 89.8789, timezone: 5.5 },
  { name: 'Kajalgaon (Chirang)', stateOrRegion: 'Assam', country: 'India', lat: 26.5167, lng: 90.5000, timezone: 5.5 },
  { name: 'Mushalpur (Baksa)', stateOrRegion: 'Assam', country: 'India', lat: 26.5833, lng: 91.4167, timezone: 5.5 },
  { name: 'Udalguri', stateOrRegion: 'Assam', country: 'India', lat: 26.7455, lng: 92.0962, timezone: 5.5 },
  { name: 'Hamren', stateOrRegion: 'Assam', country: 'India', lat: 25.8500, lng: 92.5667, timezone: 5.5 },
  { name: 'Tamulpur', stateOrRegion: 'Assam', country: 'India', lat: 26.6333, lng: 91.5667, timezone: 5.5 },
  { name: 'Pathsala (Bajali)', stateOrRegion: 'Assam', country: 'India', lat: 26.4967, lng: 91.1767, timezone: 5.5 },
  { name: 'Amingaon', stateOrRegion: 'Assam', country: 'India', lat: 26.1833, lng: 91.6833, timezone: 5.5 },
  { name: 'Rangia', stateOrRegion: 'Assam', country: 'India', lat: 26.4383, lng: 91.6294, timezone: 5.5 },
  { name: 'Palasbari', stateOrRegion: 'Assam', country: 'India', lat: 26.1264, lng: 91.5033, timezone: 5.5 },
  { name: 'Mirza', stateOrRegion: 'Assam', country: 'India', lat: 26.0833, lng: 91.5167, timezone: 5.5 },
  { name: 'Sualkuchi', stateOrRegion: 'Assam', country: 'India', lat: 26.1733, lng: 91.5744, timezone: 5.5 },
  { name: 'Hajo', stateOrRegion: 'Assam', country: 'India', lat: 26.2483, lng: 91.5233, timezone: 5.5 },
  { name: 'Baihata Chariali', stateOrRegion: 'Assam', country: 'India', lat: 26.3475, lng: 91.7150, timezone: 5.5 },
  { name: 'Chaygaon', stateOrRegion: 'Assam', country: 'India', lat: 26.0500, lng: 91.4333, timezone: 5.5 },
  { name: 'Boko', stateOrRegion: 'Assam', country: 'India', lat: 25.9833, lng: 91.2333, timezone: 5.5 },
  { name: 'North Guwahati', stateOrRegion: 'Assam', country: 'India', lat: 26.2000, lng: 91.7167, timezone: 5.5 },
  { name: 'Sonapur', stateOrRegion: 'Assam', country: 'India', lat: 26.1167, lng: 91.9833, timezone: 5.5 },
  { name: 'Chandrapur', stateOrRegion: 'Assam', country: 'India', lat: 26.2167, lng: 91.9000, timezone: 5.5 },
  { name: 'Khetri', stateOrRegion: 'Assam', country: 'India', lat: 26.1000, lng: 92.0833, timezone: 5.5 },
  { name: 'Digboi', stateOrRegion: 'Assam', country: 'India', lat: 27.3800, lng: 95.6200, timezone: 5.5 },
  { name: 'Margherita', stateOrRegion: 'Assam', country: 'India', lat: 27.2833, lng: 95.6833, timezone: 5.5 },
  { name: 'Doomdooma', stateOrRegion: 'Assam', country: 'India', lat: 27.5667, lng: 95.5667, timezone: 5.5 },
  { name: 'Makum', stateOrRegion: 'Assam', country: 'India', lat: 27.5000, lng: 95.4500, timezone: 5.5 },
  { name: 'Sadiya (Chapakhowa)', stateOrRegion: 'Assam', country: 'India', lat: 27.8333, lng: 95.6667, timezone: 5.5 },
  { name: 'Lekhapani', stateOrRegion: 'Assam', country: 'India', lat: 27.3167, lng: 95.7833, timezone: 5.5 },
  { name: 'Duliajan', stateOrRegion: 'Assam', country: 'India', lat: 27.3556, lng: 95.3167, timezone: 5.5 },
  { name: 'Naharkatia', stateOrRegion: 'Assam', country: 'India', lat: 27.2833, lng: 95.3333, timezone: 5.5 },
  { name: 'Namrup', stateOrRegion: 'Assam', country: 'India', lat: 27.1833, lng: 95.3333, timezone: 5.5 },
  { name: 'Chabua', stateOrRegion: 'Assam', country: 'India', lat: 27.4833, lng: 95.1667, timezone: 5.5 },
  { name: 'Moranhat', stateOrRegion: 'Assam', country: 'India', lat: 27.1833, lng: 94.9333, timezone: 5.5 },
  { name: 'Titabar', stateOrRegion: 'Assam', country: 'India', lat: 26.5833, lng: 94.2000, timezone: 5.5 },
  { name: 'Mariani', stateOrRegion: 'Assam', country: 'India', lat: 26.6600, lng: 94.3200, timezone: 5.5 },
  { name: 'Teok', stateOrRegion: 'Assam', country: 'India', lat: 26.7900, lng: 94.4200, timezone: 5.5 },
  { name: 'Kamalabari', stateOrRegion: 'Assam', country: 'India', lat: 26.9333, lng: 94.1833, timezone: 5.5 },
  { name: 'Bokakhat', stateOrRegion: 'Assam', country: 'India', lat: 26.6200, lng: 93.6000, timezone: 5.5 },
  { name: 'Dergaon', stateOrRegion: 'Assam', country: 'India', lat: 26.7000, lng: 93.9700, timezone: 5.5 },
  { name: 'Sarupathar', stateOrRegion: 'Assam', country: 'India', lat: 26.1833, lng: 93.8167, timezone: 5.5 },
  { name: 'Barpathar', stateOrRegion: 'Assam', country: 'India', lat: 26.3000, lng: 93.8667, timezone: 5.5 },
  { name: 'Nazira', stateOrRegion: 'Assam', country: 'India', lat: 26.9200, lng: 94.7300, timezone: 5.5 },
  { name: 'Amguri', stateOrRegion: 'Assam', country: 'India', lat: 26.8100, lng: 94.5700, timezone: 5.5 },
  { name: 'Demow', stateOrRegion: 'Assam', country: 'India', lat: 27.1333, lng: 94.7500, timezone: 5.5 },
  { name: 'Dhekiajuli', stateOrRegion: 'Assam', country: 'India', lat: 26.7000, lng: 92.5000, timezone: 5.5 },
  { name: 'Jamugurihat', stateOrRegion: 'Assam', country: 'India', lat: 26.7333, lng: 92.9333, timezone: 5.5 },
  { name: 'Rangapara', stateOrRegion: 'Assam', country: 'India', lat: 26.8167, lng: 92.6500, timezone: 5.5 },
  { name: 'Gohpur', stateOrRegion: 'Assam', country: 'India', lat: 26.8833, lng: 93.6333, timezone: 5.5 },
  { name: 'Behali', stateOrRegion: 'Assam', country: 'India', lat: 26.7833, lng: 93.3667, timezone: 5.5 },
  { name: 'Bihpuria', stateOrRegion: 'Assam', country: 'India', lat: 27.0333, lng: 93.9000, timezone: 5.5 },
  { name: 'Narayanpur', stateOrRegion: 'Assam', country: 'India', lat: 27.0167, lng: 93.8500, timezone: 5.5 },
  { name: 'Dhakuakhana', stateOrRegion: 'Assam', country: 'India', lat: 27.2500, lng: 94.4500, timezone: 5.5 },
  { name: 'Silapathar', stateOrRegion: 'Assam', country: 'India', lat: 27.5833, lng: 94.7167, timezone: 5.5 },
  { name: 'Jonai', stateOrRegion: 'Assam', country: 'India', lat: 27.8333, lng: 95.1667, timezone: 5.5 },
  { name: 'Sissiborgaon', stateOrRegion: 'Assam', country: 'India', lat: 27.4667, lng: 94.7333, timezone: 5.5 },
  { name: 'Gogamukh', stateOrRegion: 'Assam', country: 'India', lat: 27.3833, lng: 94.4500, timezone: 5.5 },
  { name: 'Barpeta Road', stateOrRegion: 'Assam', country: 'India', lat: 26.5000, lng: 90.9667, timezone: 5.5 },
  { name: 'Howly', stateOrRegion: 'Assam', country: 'India', lat: 26.4333, lng: 90.9667, timezone: 5.5 },
  { name: 'Sarthebari', stateOrRegion: 'Assam', country: 'India', lat: 26.3500, lng: 91.2167, timezone: 5.5 },
  { name: 'Sorbhog', stateOrRegion: 'Assam', country: 'India', lat: 26.5000, lng: 90.8667, timezone: 5.5 },
  { name: 'Tihu', stateOrRegion: 'Assam', country: 'India', lat: 26.4833, lng: 91.3167, timezone: 5.5 },
  { name: 'Belsor', stateOrRegion: 'Assam', country: 'India', lat: 26.3667, lng: 91.3667, timezone: 5.5 },
  { name: 'Mukalmua', stateOrRegion: 'Assam', country: 'India', lat: 26.2667, lng: 91.3500, timezone: 5.5 },
  { name: 'Ghograpar', stateOrRegion: 'Assam', country: 'India', lat: 26.4167, lng: 91.5000, timezone: 5.5 },
  { name: 'Patacharkuchi', stateOrRegion: 'Assam', country: 'India', lat: 26.5167, lng: 91.1833, timezone: 5.5 },
  { name: 'Bilasipara', stateOrRegion: 'Assam', country: 'India', lat: 26.2333, lng: 90.2333, timezone: 5.5 },
  { name: 'Gauripur', stateOrRegion: 'Assam', country: 'India', lat: 26.0833, lng: 89.9667, timezone: 5.5 },
  { name: 'Sapatgram', stateOrRegion: 'Assam', country: 'India', lat: 26.3333, lng: 90.1333, timezone: 5.5 },
  { name: 'Golakganj', stateOrRegion: 'Assam', country: 'India', lat: 26.1000, lng: 89.8667, timezone: 5.5 },
  { name: 'Chapar', stateOrRegion: 'Assam', country: 'India', lat: 26.2667, lng: 90.4667, timezone: 5.5 },
  { name: 'Mankachar', stateOrRegion: 'Assam', country: 'India', lat: 25.5333, lng: 89.8667, timezone: 5.5 },
  { name: 'Abhayapuri', stateOrRegion: 'Assam', country: 'India', lat: 26.3333, lng: 90.6667, timezone: 5.5 },
  { name: 'Boitamari', stateOrRegion: 'Assam', country: 'India', lat: 26.3667, lng: 90.5833, timezone: 5.5 },
  { name: 'Bijni', stateOrRegion: 'Assam', country: 'India', lat: 26.5167, lng: 90.6667, timezone: 5.5 },
  { name: 'Basugaon', stateOrRegion: 'Assam', country: 'India', lat: 26.4667, lng: 90.4000, timezone: 5.5 },
  { name: 'Gossaigaon', stateOrRegion: 'Assam', country: 'India', lat: 26.4500, lng: 89.9667, timezone: 5.5 },
  { name: 'Fakiragram', stateOrRegion: 'Assam', country: 'India', lat: 26.2333, lng: 90.2000, timezone: 5.5 },
  { name: 'Barama', stateOrRegion: 'Assam', country: 'India', lat: 26.5167, lng: 91.3500, timezone: 5.5 },
  { name: 'Goreswar', stateOrRegion: 'Assam', country: 'India', lat: 26.5333, lng: 91.6833, timezone: 5.5 },
  { name: 'Tangla', stateOrRegion: 'Assam', country: 'India', lat: 26.6500, lng: 91.9167, timezone: 5.5 },
  { name: 'Rowta', stateOrRegion: 'Assam', country: 'India', lat: 26.7000, lng: 92.1667, timezone: 5.5 },
  { name: 'Mazbat', stateOrRegion: 'Assam', country: 'India', lat: 26.7833, lng: 92.3500, timezone: 5.5 },
  { name: 'Khoirabari', stateOrRegion: 'Assam', country: 'India', lat: 26.5833, lng: 91.9000, timezone: 5.5 },
  { name: 'Kharupetia', stateOrRegion: 'Assam', country: 'India', lat: 26.5167, lng: 92.1333, timezone: 5.5 },
  { name: 'Sipajhar', stateOrRegion: 'Assam', country: 'India', lat: 26.4333, lng: 91.8833, timezone: 5.5 },
  { name: 'Dalgaon', stateOrRegion: 'Assam', country: 'India', lat: 26.5500, lng: 92.2333, timezone: 5.5 },
  { name: 'Dudhnoi', stateOrRegion: 'Assam', country: 'India', lat: 25.9833, lng: 90.7333, timezone: 5.5 },
  { name: 'Lakhipur (Goalpara)', stateOrRegion: 'Assam', country: 'India', lat: 26.0333, lng: 90.3000, timezone: 5.5 },
  { name: 'Matia', stateOrRegion: 'Assam', country: 'India', lat: 26.1000, lng: 90.5833, timezone: 5.5 },
  { name: 'Jagiroad', stateOrRegion: 'Assam', country: 'India', lat: 26.1167, lng: 92.2167, timezone: 5.5 },
  { name: 'Mayong', stateOrRegion: 'Assam', country: 'India', lat: 26.2500, lng: 92.0500, timezone: 5.5 },
  { name: 'Bhuragaon', stateOrRegion: 'Assam', country: 'India', lat: 26.4000, lng: 92.4167, timezone: 5.5 },
  { name: 'Laharighat', stateOrRegion: 'Assam', country: 'India', lat: 26.4333, lng: 92.3667, timezone: 5.5 },
  { name: 'Kaliabor', stateOrRegion: 'Assam', country: 'India', lat: 26.5667, lng: 93.0000, timezone: 5.5 },
  { name: 'Dhing', stateOrRegion: 'Assam', country: 'India', lat: 26.4667, lng: 92.4667, timezone: 5.5 },
  { name: 'Kampur', stateOrRegion: 'Assam', country: 'India', lat: 26.1667, lng: 92.8000, timezone: 5.5 },
  { name: 'Raha', stateOrRegion: 'Assam', country: 'India', lat: 26.2333, lng: 92.5167, timezone: 5.5 },
  { name: 'Samaguri', stateOrRegion: 'Assam', country: 'India', lat: 26.4333, lng: 92.8333, timezone: 5.5 },
  { name: 'Doboka', stateOrRegion: 'Assam', country: 'India', lat: 26.0000, lng: 92.8667, timezone: 5.5 },
  { name: 'Lanka', stateOrRegion: 'Assam', country: 'India', lat: 25.9167, lng: 92.9500, timezone: 5.5 },
  { name: 'Lumding', stateOrRegion: 'Assam', country: 'India', lat: 25.7500, lng: 93.1667, timezone: 5.5 },
  { name: 'Badarpur', stateOrRegion: 'Assam', country: 'India', lat: 24.9000, lng: 92.6000, timezone: 5.5 },
  { name: 'Ramkrishna Nagar', stateOrRegion: 'Assam', country: 'India', lat: 24.5833, lng: 92.5167, timezone: 5.5 },
  { name: 'Patharkandi', stateOrRegion: 'Assam', country: 'India', lat: 24.6333, lng: 92.3333, timezone: 5.5 },
  { name: 'Lala', stateOrRegion: 'Assam', country: 'India', lat: 24.5500, lng: 92.6000, timezone: 5.5 },
  { name: 'Katlicherra', stateOrRegion: 'Assam', country: 'India', lat: 24.4500, lng: 92.5667, timezone: 5.5 },
  { name: 'Katigorah', stateOrRegion: 'Assam', country: 'India', lat: 24.9000, lng: 92.6000, timezone: 5.5 },
  { name: 'Lakhipur (Cachar)', stateOrRegion: 'Assam', country: 'India', lat: 24.8000, lng: 93.0167, timezone: 5.5 },
  { name: 'Sonai', stateOrRegion: 'Assam', country: 'India', lat: 24.7167, lng: 92.8833, timezone: 5.5 },
  { name: 'Borkhola', stateOrRegion: 'Assam', country: 'India', lat: 24.9333, lng: 92.8167, timezone: 5.5 },
  { name: 'Dholai', stateOrRegion: 'Assam', country: 'India', lat: 24.6000, lng: 92.8500, timezone: 5.5 },
  { name: 'Bokajan', stateOrRegion: 'Assam', country: 'India', lat: 26.0167, lng: 93.7833, timezone: 5.5 },
  { name: 'Howraghat', stateOrRegion: 'Assam', country: 'India', lat: 26.0000, lng: 93.0500, timezone: 5.5 },
  { name: 'Dokmoka', stateOrRegion: 'Assam', country: 'India', lat: 26.1333, lng: 93.1333, timezone: 5.5 },
  { name: 'Donkamukam', stateOrRegion: 'Assam', country: 'India', lat: 25.8667, lng: 92.7000, timezone: 5.5 },
  { name: 'Baithalangso', stateOrRegion: 'Assam', country: 'India', lat: 25.9333, lng: 92.5000, timezone: 5.5 },
  { name: 'Kheroni', stateOrRegion: 'Assam', country: 'India', lat: 25.7667, lng: 92.8833, timezone: 5.5 },
  { name: 'Maibang', stateOrRegion: 'Assam', country: 'India', lat: 25.3000, lng: 93.1667, timezone: 5.5 },
  { name: 'Umrangso', stateOrRegion: 'Assam', country: 'India', lat: 25.5167, lng: 92.7833, timezone: 5.5 },
  { name: 'Mahur', stateOrRegion: 'Assam', country: 'India', lat: 25.1833, lng: 93.1167, timezone: 5.5 },
  { name: 'Harangajao', stateOrRegion: 'Assam', country: 'India', lat: 25.1167, lng: 92.8667, timezone: 5.5 },
  { name: 'Shillong', stateOrRegion: 'Meghalaya', country: 'India', lat: 25.5788, lng: 91.8933, timezone: 5.5 },
  { name: 'Agartala', stateOrRegion: 'Tripura', country: 'India', lat: 23.8315, lng: 91.2868, timezone: 5.5 },
  { name: 'Imphal', stateOrRegion: 'Manipur', country: 'India', lat: 24.8170, lng: 93.9368, timezone: 5.5 },
  { name: 'Aizawl', stateOrRegion: 'Mizoram', country: 'India', lat: 23.7271, lng: 92.7176, timezone: 5.5 },
  { name: 'Kohima', stateOrRegion: 'Nagaland', country: 'India', lat: 25.6751, lng: 94.1086, timezone: 5.5 },
  { name: 'Dimapur', stateOrRegion: 'Nagaland', country: 'India', lat: 25.9094, lng: 93.7266, timezone: 5.5 },
  { name: 'Itanagar', stateOrRegion: 'Arunachal Pradesh', country: 'India', lat: 27.0844, lng: 93.6053, timezone: 5.5 },
  { name: 'Gangtok', stateOrRegion: 'Sikkim', country: 'India', lat: 27.3389, lng: 88.6065, timezone: 5.5 },
  { name: 'Port Blair', stateOrRegion: 'Andaman & Nicobar', country: 'India', lat: 11.6234, lng: 92.7265, timezone: 5.5 },

  // --- ALL INDIAN DISTRICT HEADQUARTERS, HISTORICAL & CULTURAL CITIES ---
  { name: 'Leh', stateOrRegion: 'Ladakh', country: 'India', lat: 34.1526, lng: 77.5771, timezone: 5.5 },
  { name: 'Kargil', stateOrRegion: 'Ladakh', country: 'India', lat: 34.5539, lng: 76.1349, timezone: 5.5 },
  { name: 'Daman', stateOrRegion: 'Dadra and Nagar Haveli and Daman and Diu', country: 'India', lat: 20.3974, lng: 72.8328, timezone: 5.5 },
  { name: 'Diu', stateOrRegion: 'Dadra and Nagar Haveli and Daman and Diu', country: 'India', lat: 20.7144, lng: 70.9874, timezone: 5.5 },
  { name: 'Silvassa', stateOrRegion: 'Dadra and Nagar Haveli and Daman and Diu', country: 'India', lat: 20.2763, lng: 73.0083, timezone: 5.5 },
  { name: 'Kavaratti', stateOrRegion: 'Lakshadweep', country: 'India', lat: 10.5667, lng: 72.6417, timezone: 5.5 },
  { name: 'Karaikal', stateOrRegion: 'Puducherry', country: 'India', lat: 10.9254, lng: 79.838, timezone: 5.5 },
  { name: 'Mahe', stateOrRegion: 'Puducherry', country: 'India', lat: 11.7002, lng: 75.534, timezone: 5.5 },
  { name: 'Yanam', stateOrRegion: 'Puducherry', country: 'India', lat: 16.7327, lng: 82.2176, timezone: 5.5 },
  { name: 'Jhansi', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.4484, lng: 78.5685, timezone: 5.5 },
  { name: 'Moradabad', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.8386, lng: 78.7733, timezone: 5.5 },
  { name: 'Saharanpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 29.9679, lng: 77.551, timezone: 5.5 },
  { name: 'Muzaffarnagar', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 29.4727, lng: 77.7085, timezone: 5.5 },
  { name: 'Firozabad', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.1592, lng: 78.3957, timezone: 5.5 },
  { name: 'Vrindavan', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.5806, lng: 77.7006, timezone: 5.5 },
  { name: 'Mirzapur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.1337, lng: 82.5644, timezone: 5.5 },
  { name: 'Raebareli', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.2303, lng: 81.2409, timezone: 5.5 },
  { name: 'Rampur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.8154, lng: 79.0257, timezone: 5.5 },
  { name: 'Shahjahanpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.8805, lng: 79.912, timezone: 5.5 },
  { name: 'Farrukhabad', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.3826, lng: 79.583, timezone: 5.5 },
  { name: 'Hapur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.7306, lng: 77.7759, timezone: 5.5 },
  { name: 'Basti', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.7995, lng: 82.7667, timezone: 5.5 },
  { name: 'Deoria', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.5024, lng: 83.7791, timezone: 5.5 },
  { name: 'Jaunpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.7464, lng: 82.6837, timezone: 5.5 },
  { name: 'Ghazipur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.584, lng: 83.577, timezone: 5.5 },
  { name: 'Azamgarh', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.0688, lng: 83.1837, timezone: 5.5 },
  { name: 'Ballia', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.7584, lng: 84.1482, timezone: 5.5 },
  { name: 'Banda', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.4754, lng: 80.3347, timezone: 5.5 },
  { name: 'Barabanki', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.9268, lng: 81.1834, timezone: 5.5 },
  { name: 'Sultanpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.2648, lng: 82.0727, timezone: 5.5 },
  { name: 'Sitapur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.5645, lng: 80.6829, timezone: 5.5 },
  { name: 'Sambhal', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.5837, lng: 78.5714, timezone: 5.5 },
  { name: 'Amroha', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.9044, lng: 78.4674, timezone: 5.5 },
  { name: 'Hardoi', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.3965, lng: 80.1293, timezone: 5.5 },
  { name: 'Fatehpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.9272, lng: 80.8123, timezone: 5.5 },
  { name: 'Budaun', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.0375, lng: 79.1259, timezone: 5.5 },
  { name: 'Lalitpur', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 24.6868, lng: 78.4116, timezone: 5.5 },
  { name: 'Mainpuri', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.2274, lng: 79.0246, timezone: 5.5 },
  { name: 'Etah', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.5583, lng: 78.6657, timezone: 5.5 },
  { name: 'Pilibhit', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.6256, lng: 79.8055, timezone: 5.5 },
  { name: 'Bijnor', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 29.3732, lng: 78.1358, timezone: 5.5 },
  { name: 'Bulandshahr', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 28.407, lng: 77.8498, timezone: 5.5 },
  { name: 'Orai', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.9898, lng: 79.45, timezone: 5.5 },
  { name: 'Pratapgarh', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 25.9189, lng: 81.9984, timezone: 5.5 },
  { name: 'Gonda', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 27.1309, lng: 81.9619, timezone: 5.5 },
  { name: 'Unnao', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.5458, lng: 80.4878, timezone: 5.5 },
  { name: 'Kushinagar', stateOrRegion: 'Uttar Pradesh', country: 'India', lat: 26.7417, lng: 83.8906, timezone: 5.5 },
  { name: 'Darbhanga', stateOrRegion: 'Bihar', country: 'India', lat: 26.1542, lng: 85.8918, timezone: 5.5 },
  { name: 'Bihar Sharif', stateOrRegion: 'Bihar', country: 'India', lat: 25.1982, lng: 85.5149, timezone: 5.5 },
  { name: 'Purnia', stateOrRegion: 'Bihar', country: 'India', lat: 25.7771, lng: 87.4753, timezone: 5.5 },
  { name: 'Arrah', stateOrRegion: 'Bihar', country: 'India', lat: 25.556, lng: 84.6603, timezone: 5.5 },
  { name: 'Begusarai', stateOrRegion: 'Bihar', country: 'India', lat: 25.4182, lng: 86.1272, timezone: 5.5 },
  { name: 'Katihar', stateOrRegion: 'Bihar', country: 'India', lat: 25.5398, lng: 87.5724, timezone: 5.5 },
  { name: 'Munger', stateOrRegion: 'Bihar', country: 'India', lat: 25.3757, lng: 86.4744, timezone: 5.5 },
  { name: 'Chhapra', stateOrRegion: 'Bihar', country: 'India', lat: 25.7811, lng: 84.7543, timezone: 5.5 },
  { name: 'Bettiah', stateOrRegion: 'Bihar', country: 'India', lat: 26.802, lng: 84.502, timezone: 5.5 },
  { name: 'Saharsa', stateOrRegion: 'Bihar', country: 'India', lat: 25.8835, lng: 86.6006, timezone: 5.5 },
  { name: 'Sasaram', stateOrRegion: 'Bihar', country: 'India', lat: 24.9523, lng: 84.0315, timezone: 5.5 },
  { name: 'Hajipur', stateOrRegion: 'Bihar', country: 'India', lat: 25.6858, lng: 85.2096, timezone: 5.5 },
  { name: 'Dehri', stateOrRegion: 'Bihar', country: 'India', lat: 24.908, lng: 84.185, timezone: 5.5 },
  { name: 'Siwan', stateOrRegion: 'Bihar', country: 'India', lat: 26.2205, lng: 84.3567, timezone: 5.5 },
  { name: 'Motihari', stateOrRegion: 'Bihar', country: 'India', lat: 26.6469, lng: 84.9089, timezone: 5.5 },
  { name: 'Nawada', stateOrRegion: 'Bihar', country: 'India', lat: 24.8874, lng: 85.5435, timezone: 5.5 },
  { name: 'Buxar', stateOrRegion: 'Bihar', country: 'India', lat: 25.5647, lng: 83.9777, timezone: 5.5 },
  { name: 'Kishanganj', stateOrRegion: 'Bihar', country: 'India', lat: 26.0967, lng: 87.9458, timezone: 5.5 },
  { name: 'Sitamarhi', stateOrRegion: 'Bihar', country: 'India', lat: 26.5944, lng: 85.4891, timezone: 5.5 },
  { name: 'Samastipur', stateOrRegion: 'Bihar', country: 'India', lat: 25.8596, lng: 85.7811, timezone: 5.5 },
  { name: 'Madhubani', stateOrRegion: 'Bihar', country: 'India', lat: 26.3541, lng: 86.0718, timezone: 5.5 },
  { name: 'Gopalganj', stateOrRegion: 'Bihar', country: 'India', lat: 26.4678, lng: 84.4449, timezone: 5.5 },
  { name: 'Bardhaman (Burdwan)', stateOrRegion: 'West Bengal', country: 'India', lat: 23.2324, lng: 87.8615, timezone: 5.5 },
  { name: 'Malda', stateOrRegion: 'West Bengal', country: 'India', lat: 25.0108, lng: 88.1411, timezone: 5.5 },
  { name: 'Baharampur', stateOrRegion: 'West Bengal', country: 'India', lat: 24.0988, lng: 88.2679, timezone: 5.5 },
  { name: 'Habra', stateOrRegion: 'West Bengal', country: 'India', lat: 22.8454, lng: 88.6608, timezone: 5.5 },
  { name: 'Kharagpur', stateOrRegion: 'West Bengal', country: 'India', lat: 22.346, lng: 87.232, timezone: 5.5 },
  { name: 'Shantipur', stateOrRegion: 'West Bengal', country: 'India', lat: 23.2505, lng: 88.4326, timezone: 5.5 },
  { name: 'Dankuni', stateOrRegion: 'West Bengal', country: 'India', lat: 22.686, lng: 88.2936, timezone: 5.5 },
  { name: 'Ranaghat', stateOrRegion: 'West Bengal', country: 'India', lat: 23.1809, lng: 88.5802, timezone: 5.5 },
  { name: 'Haldia', stateOrRegion: 'West Bengal', country: 'India', lat: 22.0645, lng: 88.0698, timezone: 5.5 },
  { name: 'Raiganj', stateOrRegion: 'West Bengal', country: 'India', lat: 25.62, lng: 88.12, timezone: 5.5 },
  { name: 'Krishnanagar', stateOrRegion: 'West Bengal', country: 'India', lat: 23.4013, lng: 88.5019, timezone: 5.5 },
  { name: 'Nabadwip', stateOrRegion: 'West Bengal', country: 'India', lat: 23.4056, lng: 88.3667, timezone: 5.5 },
  { name: 'Midnapore (Medinipur)', stateOrRegion: 'West Bengal', country: 'India', lat: 22.4257, lng: 87.3199, timezone: 5.5 },
  { name: 'Jalpaiguri', stateOrRegion: 'West Bengal', country: 'India', lat: 26.5407, lng: 88.7196, timezone: 5.5 },
  { name: 'Balurghat', stateOrRegion: 'West Bengal', country: 'India', lat: 25.2173, lng: 88.7656, timezone: 5.5 },
  { name: 'Basirhat', stateOrRegion: 'West Bengal', country: 'India', lat: 22.6573, lng: 88.8943, timezone: 5.5 },
  { name: 'Bankura', stateOrRegion: 'West Bengal', country: 'India', lat: 23.2324, lng: 87.0715, timezone: 5.5 },
  { name: 'Darjeeling', stateOrRegion: 'West Bengal', country: 'India', lat: 27.041, lng: 88.2663, timezone: 5.5 },
  { name: 'Kalimpong', stateOrRegion: 'West Bengal', country: 'India', lat: 27.0594, lng: 88.4695, timezone: 5.5 },
  { name: 'Alipurduar', stateOrRegion: 'West Bengal', country: 'India', lat: 26.4919, lng: 89.5271, timezone: 5.5 },
  { name: 'Cooch Behar', stateOrRegion: 'West Bengal', country: 'India', lat: 26.3452, lng: 89.4482, timezone: 5.5 },
  { name: 'Purulia', stateOrRegion: 'West Bengal', country: 'India', lat: 23.3321, lng: 86.3652, timezone: 5.5 },
  { name: 'Shantiniketan (Bolpur)', stateOrRegion: 'West Bengal', country: 'India', lat: 23.68, lng: 87.68, timezone: 5.5 },
  { name: 'Amravati', stateOrRegion: 'Maharashtra', country: 'India', lat: 20.9374, lng: 77.7796, timezone: 5.5 },
  { name: 'Nanded', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.1383, lng: 77.321, timezone: 5.5 },
  { name: 'Akola', stateOrRegion: 'Maharashtra', country: 'India', lat: 20.7002, lng: 77.0082, timezone: 5.5 },
  { name: 'Ulhasnagar', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.2215, lng: 73.1645, timezone: 5.5 },
  { name: 'Sangli-Miraj', stateOrRegion: 'Maharashtra', country: 'India', lat: 16.8524, lng: 74.5815, timezone: 5.5 },
  { name: 'Malegaon', stateOrRegion: 'Maharashtra', country: 'India', lat: 20.5539, lng: 74.5298, timezone: 5.5 },
  { name: 'Jalgaon', stateOrRegion: 'Maharashtra', country: 'India', lat: 21.0077, lng: 75.5626, timezone: 5.5 },
  { name: 'Latur', stateOrRegion: 'Maharashtra', country: 'India', lat: 18.4088, lng: 76.5604, timezone: 5.5 },
  { name: 'Dhule', stateOrRegion: 'Maharashtra', country: 'India', lat: 20.9042, lng: 74.7749, timezone: 5.5 },
  { name: 'Ahmednagar', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.0952, lng: 74.7496, timezone: 5.5 },
  { name: 'Chandrapur', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.9615, lng: 79.2961, timezone: 5.5 },
  { name: 'Parbhani', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.2644, lng: 76.7767, timezone: 5.5 },
  { name: 'Jalna', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.841, lng: 75.8864, timezone: 5.5 },
  { name: 'Panvel', stateOrRegion: 'Maharashtra', country: 'India', lat: 18.9894, lng: 73.1175, timezone: 5.5 },
  { name: 'Satara', stateOrRegion: 'Maharashtra', country: 'India', lat: 17.6805, lng: 73.9925, timezone: 5.5 },
  { name: 'Beed', stateOrRegion: 'Maharashtra', country: 'India', lat: 18.9891, lng: 75.7601, timezone: 5.5 },
  { name: 'Yavatmal', stateOrRegion: 'Maharashtra', country: 'India', lat: 20.3888, lng: 78.1204, timezone: 5.5 },
  { name: 'Gondia', stateOrRegion: 'Maharashtra', country: 'India', lat: 21.4555, lng: 80.1961, timezone: 5.5 },
  { name: 'Wardha', stateOrRegion: 'Maharashtra', country: 'India', lat: 20.7453, lng: 78.6022, timezone: 5.5 },
  { name: 'Baramati', stateOrRegion: 'Maharashtra', country: 'India', lat: 18.1517, lng: 74.5771, timezone: 5.5 },
  { name: 'Shirdi', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.7667, lng: 74.4766, timezone: 5.5 },
  { name: 'Ratnagiri', stateOrRegion: 'Maharashtra', country: 'India', lat: 16.9902, lng: 73.312, timezone: 5.5 },
  { name: 'Sindhudurg (Oros)', stateOrRegion: 'Maharashtra', country: 'India', lat: 16.1159, lng: 73.7029, timezone: 5.5 },
  { name: 'Alibag', stateOrRegion: 'Maharashtra', country: 'India', lat: 18.6414, lng: 72.8722, timezone: 5.5 },
  { name: 'Mahabaleshwar', stateOrRegion: 'Maharashtra', country: 'India', lat: 17.9237, lng: 73.6586, timezone: 5.5 },
  { name: 'Kalyan-Dombivli', stateOrRegion: 'Maharashtra', country: 'India', lat: 19.2403, lng: 73.1305, timezone: 5.5 },
  { name: 'Junagadh', stateOrRegion: 'Gujarat', country: 'India', lat: 21.5222, lng: 70.4579, timezone: 5.5 },
  { name: 'Gandhidham', stateOrRegion: 'Gujarat', country: 'India', lat: 23.0753, lng: 70.1337, timezone: 5.5 },
  { name: 'Anand', stateOrRegion: 'Gujarat', country: 'India', lat: 22.5645, lng: 72.9289, timezone: 5.5 },
  { name: 'Navsari', stateOrRegion: 'Gujarat', country: 'India', lat: 20.95, lng: 72.93, timezone: 5.5 },
  { name: 'Morbi', stateOrRegion: 'Gujarat', country: 'India', lat: 22.812, lng: 70.8377, timezone: 5.5 },
  { name: 'Nadiad', stateOrRegion: 'Gujarat', country: 'India', lat: 22.6916, lng: 72.8634, timezone: 5.5 },
  { name: 'Surendranagar', stateOrRegion: 'Gujarat', country: 'India', lat: 22.7278, lng: 71.6373, timezone: 5.5 },
  { name: 'Bharuch', stateOrRegion: 'Gujarat', country: 'India', lat: 21.7051, lng: 72.9959, timezone: 5.5 },
  { name: 'Mehsana', stateOrRegion: 'Gujarat', country: 'India', lat: 23.588, lng: 72.3693, timezone: 5.5 },
  { name: 'Bhuj', stateOrRegion: 'Gujarat', country: 'India', lat: 23.242, lng: 69.6669, timezone: 5.5 },
  { name: 'Porbandar', stateOrRegion: 'Gujarat', country: 'India', lat: 21.6417, lng: 69.6293, timezone: 5.5 },
  { name: 'Palanpur', stateOrRegion: 'Gujarat', country: 'India', lat: 24.1724, lng: 72.4346, timezone: 5.5 },
  { name: 'Valsad', stateOrRegion: 'Gujarat', country: 'India', lat: 20.5992, lng: 72.9342, timezone: 5.5 },
  { name: 'Vapi', stateOrRegion: 'Gujarat', country: 'India', lat: 20.3893, lng: 72.9106, timezone: 5.5 },
  { name: 'Godhra', stateOrRegion: 'Gujarat', country: 'India', lat: 22.7758, lng: 73.6149, timezone: 5.5 },
  { name: 'Patan', stateOrRegion: 'Gujarat', country: 'India', lat: 23.8493, lng: 72.1266, timezone: 5.5 },
  { name: 'Kalol', stateOrRegion: 'Gujarat', country: 'India', lat: 23.2384, lng: 72.4975, timezone: 5.5 },
  { name: 'Dahod', stateOrRegion: 'Gujarat', country: 'India', lat: 22.8373, lng: 74.2546, timezone: 5.5 },
  { name: 'Somnath (Veraval)', stateOrRegion: 'Gujarat', country: 'India', lat: 20.888, lng: 70.401, timezone: 5.5 },
  { name: 'Dwarka', stateOrRegion: 'Gujarat', country: 'India', lat: 22.2442, lng: 68.9685, timezone: 5.5 },
  { name: 'Kevadia (Statue of Unity)', stateOrRegion: 'Gujarat', country: 'India', lat: 21.838, lng: 73.7191, timezone: 5.5 },
  { name: 'Vadnagar', stateOrRegion: 'Gujarat', country: 'India', lat: 23.7842, lng: 72.6369, timezone: 5.5 },
  { name: 'Bhilwara', stateOrRegion: 'Rajasthan', country: 'India', lat: 25.3463, lng: 74.6381, timezone: 5.5 },
  { name: 'Alwar', stateOrRegion: 'Rajasthan', country: 'India', lat: 27.553, lng: 76.6346, timezone: 5.5 },
  { name: 'Bharatpur', stateOrRegion: 'Rajasthan', country: 'India', lat: 27.2152, lng: 77.503, timezone: 5.5 },
  { name: 'Sikar', stateOrRegion: 'Rajasthan', country: 'India', lat: 27.6094, lng: 75.1399, timezone: 5.5 },
  { name: 'Pali', stateOrRegion: 'Rajasthan', country: 'India', lat: 25.7711, lng: 73.3234, timezone: 5.5 },
  { name: 'Sri Ganganagar', stateOrRegion: 'Rajasthan', country: 'India', lat: 29.9038, lng: 73.8772, timezone: 5.5 },
  { name: 'Beawar', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.1011, lng: 74.3214, timezone: 5.5 },
  { name: 'Hanumangarh', stateOrRegion: 'Rajasthan', country: 'India', lat: 29.5818, lng: 74.3294, timezone: 5.5 },
  { name: 'Dhaulpur', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.7025, lng: 77.8934, timezone: 5.5 },
  { name: 'Kishangarh', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.5772, lng: 74.8653, timezone: 5.5 },
  { name: 'Tonk', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.1664, lng: 75.7885, timezone: 5.5 },
  { name: 'Sawai Madhopur', stateOrRegion: 'Rajasthan', country: 'India', lat: 25.9928, lng: 76.3712, timezone: 5.5 },
  { name: 'Churu', stateOrRegion: 'Rajasthan', country: 'India', lat: 28.29, lng: 74.96, timezone: 5.5 },
  { name: 'Chittorgarh', stateOrRegion: 'Rajasthan', country: 'India', lat: 24.8887, lng: 74.6269, timezone: 5.5 },
  { name: 'Jhunjhunu', stateOrRegion: 'Rajasthan', country: 'India', lat: 28.1289, lng: 75.3995, timezone: 5.5 },
  { name: 'Baran', stateOrRegion: 'Rajasthan', country: 'India', lat: 25.1011, lng: 76.5132, timezone: 5.5 },
  { name: 'Bundi', stateOrRegion: 'Rajasthan', country: 'India', lat: 25.4415, lng: 75.6441, timezone: 5.5 },
  { name: 'Nagaur', stateOrRegion: 'Rajasthan', country: 'India', lat: 27.207, lng: 73.7423, timezone: 5.5 },
  { name: 'Makrana', stateOrRegion: 'Rajasthan', country: 'India', lat: 27.0425, lng: 74.7297, timezone: 5.5 },
  { name: 'Jaisalmer', stateOrRegion: 'Rajasthan', country: 'India', lat: 26.9157, lng: 70.9083, timezone: 5.5 },
  { name: 'Barmer', stateOrRegion: 'Rajasthan', country: 'India', lat: 25.7521, lng: 71.3967, timezone: 5.5 },
  { name: 'Mount Abu', stateOrRegion: 'Rajasthan', country: 'India', lat: 24.5926, lng: 72.7156, timezone: 5.5 },
  { name: 'Nathdwara', stateOrRegion: 'Rajasthan', country: 'India', lat: 24.9317, lng: 73.8208, timezone: 5.5 },
  { name: 'Khatu Shyamji', stateOrRegion: 'Rajasthan', country: 'India', lat: 27.3622, lng: 75.4053, timezone: 5.5 },
  { name: 'Sagar', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.8388, lng: 78.7378, timezone: 5.5 },
  { name: 'Dewas', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 22.9676, lng: 76.0534, timezone: 5.5 },
  { name: 'Satna', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.6005, lng: 80.8322, timezone: 5.5 },
  { name: 'Ratlam', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.3315, lng: 75.0367, timezone: 5.5 },
  { name: 'Rewa', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.5362, lng: 81.3037, timezone: 5.5 },
  { name: 'Katni', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.8343, lng: 80.3957, timezone: 5.5 },
  { name: 'Singrauli', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.1997, lng: 82.6645, timezone: 5.5 },
  { name: 'Burhanpur', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 21.3145, lng: 76.2298, timezone: 5.5 },
  { name: 'Khandwa', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 21.8314, lng: 76.3498, timezone: 5.5 },
  { name: 'Bhind', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 26.5645, lng: 78.7905, timezone: 5.5 },
  { name: 'Chhindwara', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 22.0574, lng: 78.9382, timezone: 5.5 },
  { name: 'Guna', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.6465, lng: 77.311, timezone: 5.5 },
  { name: 'Shivpuri', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 25.4244, lng: 77.6583, timezone: 5.5 },
  { name: 'Vidisha', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.5251, lng: 77.8081, timezone: 5.5 },
  { name: 'Chhatarpur', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.9164, lng: 79.5811, timezone: 5.5 },
  { name: 'Damoh', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.8323, lng: 79.4387, timezone: 5.5 },
  { name: 'Mandsaur', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.0722, lng: 75.0694, timezone: 5.5 },
  { name: 'Khargone', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 21.8234, lng: 75.6111, timezone: 5.5 },
  { name: 'Neemuch', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.4764, lng: 74.8698, timezone: 5.5 },
  { name: 'Narmadapuram (Hoshangabad)', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 22.7519, lng: 77.7289, timezone: 5.5 },
  { name: 'Itarsi', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 22.612, lng: 77.761, timezone: 5.5 },
  { name: 'Sehore', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 23.203, lng: 77.0844, timezone: 5.5 },
  { name: 'Betul', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 21.9108, lng: 77.9014, timezone: 5.5 },
  { name: 'Seoni', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 22.0869, lng: 79.5435, timezone: 5.5 },
  { name: 'Datia', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 25.6653, lng: 78.4609, timezone: 5.5 },
  { name: 'Khajuraho', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.8318, lng: 79.9199, timezone: 5.5 },
  { name: 'Omkareshwar', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 22.2464, lng: 76.1508, timezone: 5.5 },
  { name: 'Orchha', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 25.3516, lng: 78.6416, timezone: 5.5 },
  { name: 'Maihar', stateOrRegion: 'Madhya Pradesh', country: 'India', lat: 24.2694, lng: 80.7589, timezone: 5.5 },
  { name: 'Bathinda', stateOrRegion: 'Punjab', country: 'India', lat: 30.211, lng: 74.9455, timezone: 5.5 },
  { name: 'Hoshiarpur', stateOrRegion: 'Punjab', country: 'India', lat: 31.5273, lng: 75.9149, timezone: 5.5 },
  { name: 'Mohali (SAS Nagar)', stateOrRegion: 'Punjab', country: 'India', lat: 30.7046, lng: 76.7179, timezone: 5.5 },
  { name: 'Batala', stateOrRegion: 'Punjab', country: 'India', lat: 31.8186, lng: 75.2028, timezone: 5.5 },
  { name: 'Pathankot', stateOrRegion: 'Punjab', country: 'India', lat: 32.2689, lng: 75.6499, timezone: 5.5 },
  { name: 'Moga', stateOrRegion: 'Punjab', country: 'India', lat: 30.823, lng: 75.1734, timezone: 5.5 },
  { name: 'Abohar', stateOrRegion: 'Punjab', country: 'India', lat: 30.1453, lng: 74.1994, timezone: 5.5 },
  { name: 'Malerkotla', stateOrRegion: 'Punjab', country: 'India', lat: 30.525, lng: 75.89, timezone: 5.5 },
  { name: 'Khanna', stateOrRegion: 'Punjab', country: 'India', lat: 30.7071, lng: 76.2167, timezone: 5.5 },
  { name: 'Phagwara', stateOrRegion: 'Punjab', country: 'India', lat: 31.224, lng: 75.7708, timezone: 5.5 },
  { name: 'Sri Muktsar Sahib', stateOrRegion: 'Punjab', country: 'India', lat: 30.4744, lng: 74.5166, timezone: 5.5 },
  { name: 'Barnala', stateOrRegion: 'Punjab', country: 'India', lat: 30.3819, lng: 75.5469, timezone: 5.5 },
  { name: 'Firozpur', stateOrRegion: 'Punjab', country: 'India', lat: 30.9237, lng: 74.6113, timezone: 5.5 },
  { name: 'Kapurthala', stateOrRegion: 'Punjab', country: 'India', lat: 31.3802, lng: 75.3819, timezone: 5.5 },
  { name: 'Sangrur', stateOrRegion: 'Punjab', country: 'India', lat: 30.2458, lng: 75.8421, timezone: 5.5 },
  { name: 'Fazilka', stateOrRegion: 'Punjab', country: 'India', lat: 30.4037, lng: 74.0254, timezone: 5.5 },
  { name: 'Mansa', stateOrRegion: 'Punjab', country: 'India', lat: 29.988, lng: 75.3934, timezone: 5.5 },
  { name: 'Gurdaspur', stateOrRegion: 'Punjab', country: 'India', lat: 32.0419, lng: 75.4053, timezone: 5.5 },
  { name: 'Sri Anandpur Sahib', stateOrRegion: 'Punjab', country: 'India', lat: 31.2356, lng: 76.4989, timezone: 5.5 },
  { name: 'Panipat', stateOrRegion: 'Haryana', country: 'India', lat: 29.3909, lng: 76.9635, timezone: 5.5 },
  { name: 'Ambala', stateOrRegion: 'Haryana', country: 'India', lat: 30.3782, lng: 76.7767, timezone: 5.5 },
  { name: 'Yamunanagar', stateOrRegion: 'Haryana', country: 'India', lat: 30.129, lng: 77.2674, timezone: 5.5 },
  { name: 'Rohtak', stateOrRegion: 'Haryana', country: 'India', lat: 28.8955, lng: 76.6066, timezone: 5.5 },
  { name: 'Hisar', stateOrRegion: 'Haryana', country: 'India', lat: 29.1492, lng: 75.7217, timezone: 5.5 },
  { name: 'Karnal', stateOrRegion: 'Haryana', country: 'India', lat: 29.6857, lng: 76.9905, timezone: 5.5 },
  { name: 'Sonipat', stateOrRegion: 'Haryana', country: 'India', lat: 28.9931, lng: 77.0151, timezone: 5.5 },
  { name: 'Panchkula', stateOrRegion: 'Haryana', country: 'India', lat: 30.6942, lng: 76.8606, timezone: 5.5 },
  { name: 'Bhiwani', stateOrRegion: 'Haryana', country: 'India', lat: 28.7932, lng: 76.139, timezone: 5.5 },
  { name: 'Sirsa', stateOrRegion: 'Haryana', country: 'India', lat: 29.5349, lng: 75.0278, timezone: 5.5 },
  { name: 'Bahadurgarh', stateOrRegion: 'Haryana', country: 'India', lat: 28.6924, lng: 76.924, timezone: 5.5 },
  { name: 'Jind', stateOrRegion: 'Haryana', country: 'India', lat: 29.315, lng: 76.315, timezone: 5.5 },
  { name: 'Kurukshetra (Thanesar)', stateOrRegion: 'Haryana', country: 'India', lat: 29.9695, lng: 76.8783, timezone: 5.5 },
  { name: 'Kaithal', stateOrRegion: 'Haryana', country: 'India', lat: 29.8015, lng: 76.3996, timezone: 5.5 },
  { name: 'Rewari', stateOrRegion: 'Haryana', country: 'India', lat: 28.1833, lng: 76.6167, timezone: 5.5 },
  { name: 'Palwal', stateOrRegion: 'Haryana', country: 'India', lat: 28.1447, lng: 77.326, timezone: 5.5 },
  { name: 'Hansi', stateOrRegion: 'Haryana', country: 'India', lat: 29.1006, lng: 75.961, timezone: 5.5 },
  { name: 'Narnaul', stateOrRegion: 'Haryana', country: 'India', lat: 28.0436, lng: 76.1077, timezone: 5.5 },
  { name: 'Fatehabad', stateOrRegion: 'Haryana', country: 'India', lat: 29.5152, lng: 75.4542, timezone: 5.5 },
  { name: 'Davanagere', stateOrRegion: 'Karnataka', country: 'India', lat: 14.4644, lng: 75.9218, timezone: 5.5 },
  { name: 'Ballari (Bellary)', stateOrRegion: 'Karnataka', country: 'India', lat: 15.1394, lng: 76.9214, timezone: 5.5 },
  { name: 'Vijayapura (Bijapur)', stateOrRegion: 'Karnataka', country: 'India', lat: 16.8302, lng: 75.71, timezone: 5.5 },
  { name: 'Shivamogga (Shimoga)', stateOrRegion: 'Karnataka', country: 'India', lat: 13.9299, lng: 75.5681, timezone: 5.5 },
  { name: 'Tumakuru (Tumkur)', stateOrRegion: 'Karnataka', country: 'India', lat: 13.3392, lng: 77.1017, timezone: 5.5 },
  { name: 'Raichur', stateOrRegion: 'Karnataka', country: 'India', lat: 16.212, lng: 77.3439, timezone: 5.5 },
  { name: 'Bidar', stateOrRegion: 'Karnataka', country: 'India', lat: 17.9104, lng: 77.5199, timezone: 5.5 },
  { name: 'Hosapete (Hospet)', stateOrRegion: 'Karnataka', country: 'India', lat: 15.2689, lng: 76.3909, timezone: 5.5 },
  { name: 'Gadag-Betageri', stateOrRegion: 'Karnataka', country: 'India', lat: 15.4167, lng: 75.6333, timezone: 5.5 },
  { name: 'Robertsonpet (KGF)', stateOrRegion: 'Karnataka', country: 'India', lat: 12.9587, lng: 78.2711, timezone: 5.5 },
  { name: 'Hassan', stateOrRegion: 'Karnataka', country: 'India', lat: 13.0033, lng: 76.1004, timezone: 5.5 },
  { name: 'Bhadravati', stateOrRegion: 'Karnataka', country: 'India', lat: 13.8474, lng: 75.7042, timezone: 5.5 },
  { name: 'Chitradurga', stateOrRegion: 'Karnataka', country: 'India', lat: 14.2251, lng: 76.398, timezone: 5.5 },
  { name: 'Kolar', stateOrRegion: 'Karnataka', country: 'India', lat: 13.1367, lng: 78.134, timezone: 5.5 },
  { name: 'Mandya', stateOrRegion: 'Karnataka', country: 'India', lat: 12.5218, lng: 76.8951, timezone: 5.5 },
  { name: 'Chikkamagaluru', stateOrRegion: 'Karnataka', country: 'India', lat: 13.3161, lng: 75.772, timezone: 5.5 },
  { name: 'Udupi', stateOrRegion: 'Karnataka', country: 'India', lat: 13.3409, lng: 74.7421, timezone: 5.5 },
  { name: 'Bagalkote', stateOrRegion: 'Karnataka', country: 'India', lat: 16.1691, lng: 75.6615, timezone: 5.5 },
  { name: 'Ranebennuru', stateOrRegion: 'Karnataka', country: 'India', lat: 14.6231, lng: 75.6218, timezone: 5.5 },
  { name: 'Karwar', stateOrRegion: 'Karnataka', country: 'India', lat: 14.8136, lng: 74.1298, timezone: 5.5 },
  { name: 'Sirsi', stateOrRegion: 'Karnataka', country: 'India', lat: 14.6195, lng: 74.8354, timezone: 5.5 },
  { name: 'Madikeri (Coorg)', stateOrRegion: 'Karnataka', country: 'India', lat: 12.4244, lng: 75.7382, timezone: 5.5 },
  { name: 'Hampi', stateOrRegion: 'Karnataka', country: 'India', lat: 15.335, lng: 76.46, timezone: 5.5 },
  { name: 'Gokarna', stateOrRegion: 'Karnataka', country: 'India', lat: 14.5479, lng: 74.3188, timezone: 5.5 },
  { name: 'Dharmasthala', stateOrRegion: 'Karnataka', country: 'India', lat: 12.9567, lng: 75.3789, timezone: 5.5 },
  { name: 'Sringeri', stateOrRegion: 'Karnataka', country: 'India', lat: 13.419, lng: 75.257, timezone: 5.5 },
  { name: 'Tiruppur', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.1085, lng: 77.3411, timezone: 5.5 },
  { name: 'Erode', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.341, lng: 77.7172, timezone: 5.5 },
  { name: 'Thoothukudi (Tuticorin)', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 8.7642, lng: 78.1348, timezone: 5.5 },
  { name: 'Dindigul', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.3673, lng: 77.9803, timezone: 5.5 },
  { name: 'Thanjavur (Tanjore)', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.787, lng: 79.1378, timezone: 5.5 },
  { name: 'Ranipet', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 12.9272, lng: 79.333, timezone: 5.5 },
  { name: 'Sivakasi', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 9.4533, lng: 77.7944, timezone: 5.5 },
  { name: 'Karur', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.9601, lng: 78.0766, timezone: 5.5 },
  { name: 'Udhagamandalam (Ooty)', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.4102, lng: 76.695, timezone: 5.5 },
  { name: 'Hosur', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 12.7409, lng: 77.8253, timezone: 5.5 },
  { name: 'Nagercoil', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 8.1833, lng: 77.4119, timezone: 5.5 },
  { name: 'Karaikkudi', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.0735, lng: 78.7732, timezone: 5.5 },
  { name: 'Neyveli', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.5976, lng: 79.4862, timezone: 5.5 },
  { name: 'Cuddalore', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.748, lng: 79.7714, timezone: 5.5 },
  { name: 'Kumbakonam', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.9602, lng: 79.3845, timezone: 5.5 },
  { name: 'Tiruvannamalai', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 12.2253, lng: 79.0747, timezone: 5.5 },
  { name: 'Pollachi', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.658, lng: 77.009, timezone: 5.5 },
  { name: 'Rajapalayam', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 9.4517, lng: 77.554, timezone: 5.5 },
  { name: 'Pudukkottai', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.3797, lng: 78.8208, timezone: 5.5 },
  { name: 'Kanyakumari', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 8.0883, lng: 77.5385, timezone: 5.5 },
  { name: 'Rameswaram', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 9.2876, lng: 79.3129, timezone: 5.5 },
  { name: 'Chidambaram', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 11.3992, lng: 79.6936, timezone: 5.5 },
  { name: 'Velankanni', stateOrRegion: 'Tamil Nadu', country: 'India', lat: 10.6807, lng: 79.8437, timezone: 5.5 },
  { name: 'Kollam (Quilon)', stateOrRegion: 'Kerala', country: 'India', lat: 8.8932, lng: 76.6141, timezone: 5.5 },
  { name: 'Palakkad', stateOrRegion: 'Kerala', country: 'India', lat: 10.7867, lng: 76.6548, timezone: 5.5 },
  { name: 'Alappuzha (Alleppey)', stateOrRegion: 'Kerala', country: 'India', lat: 9.4981, lng: 76.3388, timezone: 5.5 },
  { name: 'Malappuram', stateOrRegion: 'Kerala', country: 'India', lat: 11.0732, lng: 76.074, timezone: 5.5 },
  { name: 'Kannur (Cannanore)', stateOrRegion: 'Kerala', country: 'India', lat: 11.8745, lng: 75.3704, timezone: 5.5 },
  { name: 'Manjeri', stateOrRegion: 'Kerala', country: 'India', lat: 11.1219, lng: 76.1211, timezone: 5.5 },
  { name: 'Thalassery', stateOrRegion: 'Kerala', country: 'India', lat: 11.7491, lng: 75.489, timezone: 5.5 },
  { name: 'Thrippunithura', stateOrRegion: 'Kerala', country: 'India', lat: 9.9482, lng: 76.3498, timezone: 5.5 },
  { name: 'Ponnani', stateOrRegion: 'Kerala', country: 'India', lat: 10.7673, lng: 75.9253, timezone: 5.5 },
  { name: 'Vatakara', stateOrRegion: 'Kerala', country: 'India', lat: 11.6089, lng: 75.5917, timezone: 5.5 },
  { name: 'Kanhangad', stateOrRegion: 'Kerala', country: 'India', lat: 12.3088, lng: 75.0911, timezone: 5.5 },
  { name: 'Payyanur', stateOrRegion: 'Kerala', country: 'India', lat: 12.1009, lng: 75.2015, timezone: 5.5 },
  { name: 'Kottayam', stateOrRegion: 'Kerala', country: 'India', lat: 9.5916, lng: 76.5222, timezone: 5.5 },
  { name: 'Guruvayur', stateOrRegion: 'Kerala', country: 'India', lat: 10.5946, lng: 76.0416, timezone: 5.5 },
  { name: 'Sabarimala', stateOrRegion: 'Kerala', country: 'India', lat: 9.4402, lng: 77.0819, timezone: 5.5 },
  { name: 'Munnar', stateOrRegion: 'Kerala', country: 'India', lat: 10.0889, lng: 77.0595, timezone: 5.5 },
  { name: 'Wayanad (Kalpetta)', stateOrRegion: 'Kerala', country: 'India', lat: 11.6103, lng: 76.0829, timezone: 5.5 },
  { name: 'Varkala', stateOrRegion: 'Kerala', country: 'India', lat: 8.7379, lng: 76.7163, timezone: 5.5 },
  { name: 'Nellore', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 14.4426, lng: 79.9865, timezone: 5.5 },
  { name: 'Kurnool', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 15.8281, lng: 78.0373, timezone: 5.5 },
  { name: 'Kadapa', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 14.4673, lng: 78.8242, timezone: 5.5 },
  { name: 'Rajamahendravaram (Rajahmundry)', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 17.0005, lng: 81.804, timezone: 5.5 },
  { name: 'Kakinada', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.9891, lng: 82.2475, timezone: 5.5 },
  { name: 'Anantapur', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 14.6819, lng: 77.6006, timezone: 5.5 },
  { name: 'Eluru', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.7107, lng: 81.0952, timezone: 5.5 },
  { name: 'Vizianagaram', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 18.1133, lng: 83.4072, timezone: 5.5 },
  { name: 'Ongole', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 15.5057, lng: 80.0499, timezone: 5.5 },
  { name: 'Nandyal', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 15.4886, lng: 78.4836, timezone: 5.5 },
  { name: 'Machilipatnam', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.1875, lng: 81.1389, timezone: 5.5 },
  { name: 'Adoni', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 15.6322, lng: 77.2728, timezone: 5.5 },
  { name: 'Tenali', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.2437, lng: 80.64, timezone: 5.5 },
  { name: 'Proddatur', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 14.7504, lng: 78.5521, timezone: 5.5 },
  { name: 'Chittoor', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 13.2172, lng: 79.1003, timezone: 5.5 },
  { name: 'Hindupur', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 13.8294, lng: 77.4929, timezone: 5.5 },
  { name: 'Bhimavaram', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.5449, lng: 81.5212, timezone: 5.5 },
  { name: 'Madanapalle', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 13.556, lng: 78.501, timezone: 5.5 },
  { name: 'Guntakal', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 15.1685, lng: 77.3697, timezone: 5.5 },
  { name: 'Srikakulam', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 18.2969, lng: 83.8967, timezone: 5.5 },
  { name: 'Dharmavaram', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 14.4137, lng: 77.7126, timezone: 5.5 },
  { name: 'Gudivada', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.441, lng: 80.9926, timezone: 5.5 },
  { name: 'Narasaraopet', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.2361, lng: 80.0499, timezone: 5.5 },
  { name: 'Puttaparthi', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 14.1652, lng: 77.8105, timezone: 5.5 },
  { name: 'Srisailam', stateOrRegion: 'Andhra Pradesh', country: 'India', lat: 16.0743, lng: 78.8681, timezone: 5.5 },
  { name: 'Karimnagar', stateOrRegion: 'Telangana', country: 'India', lat: 18.4386, lng: 79.1288, timezone: 5.5 },
  { name: 'Ramagundam', stateOrRegion: 'Telangana', country: 'India', lat: 18.7557, lng: 79.5126, timezone: 5.5 },
  { name: 'Khammam', stateOrRegion: 'Telangana', country: 'India', lat: 17.2473, lng: 80.1514, timezone: 5.5 },
  { name: 'Mahbubnagar', stateOrRegion: 'Telangana', country: 'India', lat: 16.7488, lng: 77.9844, timezone: 5.5 },
  { name: 'Nalgonda', stateOrRegion: 'Telangana', country: 'India', lat: 17.0577, lng: 79.2684, timezone: 5.5 },
  { name: 'Adilabad', stateOrRegion: 'Telangana', country: 'India', lat: 19.6641, lng: 78.532, timezone: 5.5 },
  { name: 'Suryapet', stateOrRegion: 'Telangana', country: 'India', lat: 17.1439, lng: 79.6239, timezone: 5.5 },
  { name: 'Miryalaguda', stateOrRegion: 'Telangana', country: 'India', lat: 16.8744, lng: 79.5638, timezone: 5.5 },
  { name: 'Siddipet', stateOrRegion: 'Telangana', country: 'India', lat: 18.1018, lng: 78.852, timezone: 5.5 },
  { name: 'Jagtial', stateOrRegion: 'Telangana', country: 'India', lat: 18.7954, lng: 78.9126, timezone: 5.5 },
  { name: 'Nirmal', stateOrRegion: 'Telangana', country: 'India', lat: 19.0964, lng: 78.3428, timezone: 5.5 },
  { name: 'Kamareddy', stateOrRegion: 'Telangana', country: 'India', lat: 18.3229, lng: 78.3411, timezone: 5.5 },
  { name: 'Kothagudem', stateOrRegion: 'Telangana', country: 'India', lat: 17.5527, lng: 80.6173, timezone: 5.5 },
  { name: 'Secunderabad', stateOrRegion: 'Telangana', country: 'India', lat: 17.4399, lng: 78.4983, timezone: 5.5 },
  { name: 'Sangareddy', stateOrRegion: 'Telangana', country: 'India', lat: 17.6192, lng: 78.0818, timezone: 5.5 },
  { name: 'Medak', stateOrRegion: 'Telangana', country: 'India', lat: 18.0469, lng: 78.2618, timezone: 5.5 },
  { name: 'Basar', stateOrRegion: 'Telangana', country: 'India', lat: 18.877, lng: 77.9547, timezone: 5.5 },
  { name: 'Yadagirigutta', stateOrRegion: 'Telangana', country: 'India', lat: 17.5898, lng: 78.9419, timezone: 5.5 },
  { name: 'Berhampur (Brahmapur)', stateOrRegion: 'Odisha', country: 'India', lat: 19.315, lng: 84.7941, timezone: 5.5 },
  { name: 'Sambalpur', stateOrRegion: 'Odisha', country: 'India', lat: 21.4669, lng: 83.9812, timezone: 5.5 },
  { name: 'Balasore (Baleswar)', stateOrRegion: 'Odisha', country: 'India', lat: 21.4934, lng: 86.9135, timezone: 5.5 },
  { name: 'Bhadrak', stateOrRegion: 'Odisha', country: 'India', lat: 21.0544, lng: 86.4955, timezone: 5.5 },
  { name: 'Baripada', stateOrRegion: 'Odisha', country: 'India', lat: 21.9346, lng: 86.7329, timezone: 5.5 },
  { name: 'Jharsuguda', stateOrRegion: 'Odisha', country: 'India', lat: 21.8554, lng: 84.0063, timezone: 5.5 },
  { name: 'Jeypore', stateOrRegion: 'Odisha', country: 'India', lat: 18.8561, lng: 82.5694, timezone: 5.5 },
  { name: 'Balangir', stateOrRegion: 'Odisha', country: 'India', lat: 20.7107, lng: 83.4867, timezone: 5.5 },
  { name: 'Rayagada', stateOrRegion: 'Odisha', country: 'India', lat: 19.1717, lng: 83.4163, timezone: 5.5 },
  { name: 'Bargarh', stateOrRegion: 'Odisha', country: 'India', lat: 21.3344, lng: 83.6197, timezone: 5.5 },
  { name: 'Kendrapara', stateOrRegion: 'Odisha', country: 'India', lat: 20.5034, lng: 86.4225, timezone: 5.5 },
  { name: 'Angul', stateOrRegion: 'Odisha', country: 'India', lat: 20.84, lng: 85.1, timezone: 5.5 },
  { name: 'Dhenkanal', stateOrRegion: 'Odisha', country: 'India', lat: 20.6667, lng: 85.6, timezone: 5.5 },
  { name: 'Jagatsinghpur', stateOrRegion: 'Odisha', country: 'India', lat: 20.2667, lng: 86.1667, timezone: 5.5 },
  { name: 'Konark', stateOrRegion: 'Odisha', country: 'India', lat: 19.8876, lng: 86.0945, timezone: 5.5 },
  { name: 'Bokaro Steel City', stateOrRegion: 'Jharkhand', country: 'India', lat: 23.6693, lng: 86.1511, timezone: 5.5 },
  { name: 'Deoghar', stateOrRegion: 'Jharkhand', country: 'India', lat: 24.4826, lng: 86.7001, timezone: 5.5 },
  { name: 'Hazaribagh', stateOrRegion: 'Jharkhand', country: 'India', lat: 23.9925, lng: 85.3637, timezone: 5.5 },
  { name: 'Giridih', stateOrRegion: 'Jharkhand', country: 'India', lat: 24.1895, lng: 86.309, timezone: 5.5 },
  { name: 'Ramgarh', stateOrRegion: 'Jharkhand', country: 'India', lat: 23.6315, lng: 85.5186, timezone: 5.5 },
  { name: 'Medininagar (Daltonganj)', stateOrRegion: 'Jharkhand', country: 'India', lat: 24.0416, lng: 84.0722, timezone: 5.5 },
  { name: 'Chirkunda', stateOrRegion: 'Jharkhand', country: 'India', lat: 23.75, lng: 86.8, timezone: 5.5 },
  { name: 'Chaibasa', stateOrRegion: 'Jharkhand', country: 'India', lat: 22.5539, lng: 85.8077, timezone: 5.5 },
  { name: 'Gumla', stateOrRegion: 'Jharkhand', country: 'India', lat: 23.0436, lng: 84.5422, timezone: 5.5 },
  { name: 'Dumka', stateOrRegion: 'Jharkhand', country: 'India', lat: 24.2678, lng: 87.2486, timezone: 5.5 },
  { name: 'Sahibganj', stateOrRegion: 'Jharkhand', country: 'India', lat: 25.2425, lng: 87.6433, timezone: 5.5 },
  { name: 'Durg-Bhilai', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 21.1904, lng: 81.2849, timezone: 5.5 },
  { name: 'Korba', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 22.3595, lng: 82.7501, timezone: 5.5 },
  { name: 'Rajnandgaon', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 21.097, lng: 81.0366, timezone: 5.5 },
  { name: 'Jagdalpur', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 19.0744, lng: 82.0081, timezone: 5.5 },
  { name: 'Ambikapur', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 23.1189, lng: 83.1979, timezone: 5.5 },
  { name: 'Dhamtari', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 20.7071, lng: 81.5498, timezone: 5.5 },
  { name: 'Raigarh', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 21.8974, lng: 83.395, timezone: 5.5 },
  { name: 'Mahasamund', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 21.1086, lng: 82.0978, timezone: 5.5 },
  { name: 'Champa', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 22.0436, lng: 82.6568, timezone: 5.5 },
  { name: 'Kanker', stateOrRegion: 'Chhattisgarh', country: 'India', lat: 20.2719, lng: 81.4925, timezone: 5.5 },
  { name: 'Roorkee', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.8543, lng: 77.888, timezone: 5.5 },
  { name: 'Haldwani', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.2183, lng: 79.513, timezone: 5.5 },
  { name: 'Rudrapur', stateOrRegion: 'Uttarakhand', country: 'India', lat: 28.979, lng: 79.4004, timezone: 5.5 },
  { name: 'Kashipur', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.2104, lng: 78.9619, timezone: 5.5 },
  { name: 'Kotdwar', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.7465, lng: 78.5284, timezone: 5.5 },
  { name: 'Mussoorie', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.4598, lng: 78.0644, timezone: 5.5 },
  { name: 'Almora', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.5971, lng: 79.6591, timezone: 5.5 },
  { name: 'Pithoragarh', stateOrRegion: 'Uttarakhand', country: 'India', lat: 29.5829, lng: 80.2182, timezone: 5.5 },
  { name: 'Pauri', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.15, lng: 78.78, timezone: 5.5 },
  { name: 'Chamoli', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.2937, lng: 79.3199, timezone: 5.5 },
  { name: 'Tehri', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.38, lng: 78.48, timezone: 5.5 },
  { name: 'Badrinath', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.7433, lng: 79.4938, timezone: 5.5 },
  { name: 'Kedarnath', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.7346, lng: 79.0669, timezone: 5.5 },
  { name: 'Gangotri', stateOrRegion: 'Uttarakhand', country: 'India', lat: 30.9947, lng: 78.9398, timezone: 5.5 },
  { name: 'Yamunotri', stateOrRegion: 'Uttarakhand', country: 'India', lat: 31.014, lng: 78.46, timezone: 5.5 },
  { name: 'Solan', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 30.9045, lng: 77.0967, timezone: 5.5 },
  { name: 'Mandi', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 31.5892, lng: 76.9182, timezone: 5.5 },
  { name: 'Nahan', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 30.5599, lng: 77.2955, timezone: 5.5 },
  { name: 'Baddi', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 30.9578, lng: 76.7914, timezone: 5.5 },
  { name: 'Palampur', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 32.1109, lng: 76.5363, timezone: 5.5 },
  { name: 'Sundarnagar', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 31.5333, lng: 76.9, timezone: 5.5 },
  { name: 'Paonta Sahib', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 30.4378, lng: 77.6253, timezone: 5.5 },
  { name: 'Kullu', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 31.9579, lng: 77.1095, timezone: 5.5 },
  { name: 'Chamba', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 32.5534, lng: 76.1258, timezone: 5.5 },
  { name: 'Una', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 31.4685, lng: 76.2708, timezone: 5.5 },
  { name: 'Hamirpur', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 31.6862, lng: 76.5213, timezone: 5.5 },
  { name: 'Kangra', stateOrRegion: 'Himachal Pradesh', country: 'India', lat: 32.0998, lng: 76.2691, timezone: 5.5 },
  { name: 'Anantnag', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 33.7311, lng: 75.1487, timezone: 5.5 },
  { name: 'Baramulla', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 34.198, lng: 74.3636, timezone: 5.5 },
  { name: 'Udhampur', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 32.9255, lng: 75.1416, timezone: 5.5 },
  { name: 'Sopore', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 34.298, lng: 74.468, timezone: 5.5 },
  { name: 'Kathua', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 32.3688, lng: 75.5173, timezone: 5.5 },
  { name: 'Katra (Vaishno Devi)', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 32.9927, lng: 74.9317, timezone: 5.5 },
  { name: 'Poonch', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 33.771, lng: 74.095, timezone: 5.5 },
  { name: 'Rajouri', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 33.3711, lng: 74.3089, timezone: 5.5 },
  { name: 'Gulmarg', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 34.0484, lng: 74.3805, timezone: 5.5 },
  { name: 'Pahalgam', stateOrRegion: 'Jammu & Kashmir', country: 'India', lat: 34.0167, lng: 75.3167, timezone: 5.5 },
  { name: 'Vasco da Gama', stateOrRegion: 'Goa', country: 'India', lat: 15.3982, lng: 73.8113, timezone: 5.5 },
  { name: 'Mapusa', stateOrRegion: 'Goa', country: 'India', lat: 15.5937, lng: 73.8142, timezone: 5.5 },
  { name: 'Ponda', stateOrRegion: 'Goa', country: 'India', lat: 15.4026, lng: 74.0152, timezone: 5.5 },
  { name: 'Calangute', stateOrRegion: 'Goa', country: 'India', lat: 15.5439, lng: 73.7554, timezone: 5.5 },
  { name: 'Tawang', stateOrRegion: 'Arunachal Pradesh', country: 'India', lat: 27.5861, lng: 91.8594, timezone: 5.5 },
  { name: 'Naharlagun', stateOrRegion: 'Arunachal Pradesh', country: 'India', lat: 27.1054, lng: 93.6934, timezone: 5.5 },
  { name: 'Pasighat', stateOrRegion: 'Arunachal Pradesh', country: 'India', lat: 28.0667, lng: 95.3333, timezone: 5.5 },
  { name: 'Ziro', stateOrRegion: 'Arunachal Pradesh', country: 'India', lat: 27.5947, lng: 93.834, timezone: 5.5 },
  { name: 'Bomdila', stateOrRegion: 'Arunachal Pradesh', country: 'India', lat: 27.2645, lng: 92.4239, timezone: 5.5 },
  { name: 'Tura', stateOrRegion: 'Meghalaya', country: 'India', lat: 25.5139, lng: 90.2033, timezone: 5.5 },
  { name: 'Jowai', stateOrRegion: 'Meghalaya', country: 'India', lat: 25.45, lng: 92.2, timezone: 5.5 },
  { name: 'Cherrapunji (Sohra)', stateOrRegion: 'Meghalaya', country: 'India', lat: 25.2986, lng: 91.7317, timezone: 5.5 },
  { name: 'Nongpoh', stateOrRegion: 'Meghalaya', country: 'India', lat: 25.9, lng: 91.8833, timezone: 5.5 },
  { name: 'Lunglei', stateOrRegion: 'Mizoram', country: 'India', lat: 22.8847, lng: 92.7397, timezone: 5.5 },
  { name: 'Champhai', stateOrRegion: 'Mizoram', country: 'India', lat: 23.473, lng: 93.3283, timezone: 5.5 },
  { name: 'Serchhip', stateOrRegion: 'Mizoram', country: 'India', lat: 23.3411, lng: 92.8503, timezone: 5.5 },
  { name: 'Mokokchung', stateOrRegion: 'Nagaland', country: 'India', lat: 26.3249, lng: 94.5152, timezone: 5.5 },
  { name: 'Tuensang', stateOrRegion: 'Nagaland', country: 'India', lat: 26.28, lng: 94.83, timezone: 5.5 },
  { name: 'Wokha', stateOrRegion: 'Nagaland', country: 'India', lat: 26.1, lng: 94.2667, timezone: 5.5 },
  { name: 'Churachandpur', stateOrRegion: 'Manipur', country: 'India', lat: 24.3333, lng: 93.6667, timezone: 5.5 },
  { name: 'Thoubal', stateOrRegion: 'Manipur', country: 'India', lat: 24.6333, lng: 94.0167, timezone: 5.5 },
  { name: 'Kakching', stateOrRegion: 'Manipur', country: 'India', lat: 24.4833, lng: 93.9833, timezone: 5.5 },
  { name: 'Ukhrul', stateOrRegion: 'Manipur', country: 'India', lat: 25.1167, lng: 94.3667, timezone: 5.5 },
  { name: 'Dharmanagar', stateOrRegion: 'Tripura', country: 'India', lat: 24.375, lng: 92.1625, timezone: 5.5 },
  { name: 'Udaipur (Tripura)', stateOrRegion: 'Tripura', country: 'India', lat: 23.5333, lng: 91.4833, timezone: 5.5 },
  { name: 'Kailashahar', stateOrRegion: 'Tripura', country: 'India', lat: 24.3294, lng: 92.0078, timezone: 5.5 },
  { name: 'Belonia', stateOrRegion: 'Tripura', country: 'India', lat: 23.25, lng: 91.45, timezone: 5.5 },
  { name: 'Namchi', stateOrRegion: 'Sikkim', country: 'India', lat: 27.1667, lng: 88.35, timezone: 5.5 },
  { name: 'Pelling', stateOrRegion: 'Sikkim', country: 'India', lat: 27.3167, lng: 88.2333, timezone: 5.5 },
  { name: 'Geyzing', stateOrRegion: 'Sikkim', country: 'India', lat: 27.2833, lng: 88.25, timezone: 5.5 },
  { name: 'Mangan', stateOrRegion: 'Sikkim', country: 'India', lat: 27.5, lng: 88.5333, timezone: 5.5 },

  // --- NEIGHBOURING COUNTRIES ---
  { name: 'Kathmandu', stateOrRegion: 'Bagmati', country: 'Nepal', lat: 27.7172, lng: 85.3240, timezone: 5.75 },
  { name: 'Pokhara', stateOrRegion: 'Gandaki', country: 'Nepal', lat: 28.2096, lng: 83.9856, timezone: 5.75 },
  { name: 'Lalitpur (Patan)', stateOrRegion: 'Bagmati', country: 'Nepal', lat: 27.6644, lng: 85.3188, timezone: 5.75 },
  { name: 'Biratnagar', stateOrRegion: 'Koshi', country: 'Nepal', lat: 26.4525, lng: 87.2718, timezone: 5.75 },
  { name: 'Colombo', stateOrRegion: 'Western', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, timezone: 5.5 },
  { name: 'Kandy', stateOrRegion: 'Central', country: 'Sri Lanka', lat: 7.2906, lng: 80.6337, timezone: 5.5 },
  { name: 'Jaffna', stateOrRegion: 'Northern', country: 'Sri Lanka', lat: 9.6615, lng: 80.0255, timezone: 5.5 },
  { name: 'Dhaka', stateOrRegion: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezone: 6 },
  { name: 'Chittagong', stateOrRegion: 'Chittagong', country: 'Bangladesh', lat: 22.3569, lng: 91.7832, timezone: 6 },
  { name: 'Sylhet', stateOrRegion: 'Sylhet', country: 'Bangladesh', lat: 24.8949, lng: 91.8687, timezone: 6 },
  { name: 'Thimphu', stateOrRegion: 'Thimphu', country: 'Bhutan', lat: 27.4728, lng: 89.6393, timezone: 6 },
  { name: 'Male', stateOrRegion: 'Kaafu', country: 'Maldives', lat: 4.1755, lng: 73.5093, timezone: 5 },
  { name: 'Yangon', stateOrRegion: 'Yangon', country: 'Myanmar', lat: 16.8661, lng: 96.1951, timezone: 6.5 },

  // --- MIDDLE EAST & GULF ---
  { name: 'Dubai', stateOrRegion: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 4 },
  { name: 'Abu Dhabi', stateOrRegion: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lng: 54.3773, timezone: 4 },
  { name: 'Sharjah', stateOrRegion: 'Sharjah', country: 'United Arab Emirates', lat: 25.3463, lng: 55.4209, timezone: 4 },
  { name: 'Doha', stateOrRegion: 'Ad-Dawhah', country: 'Qatar', lat: 25.2854, lng: 51.5310, timezone: 3 },
  { name: 'Riyadh', stateOrRegion: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, timezone: 3 },
  { name: 'Jeddah', stateOrRegion: 'Makkah', country: 'Saudi Arabia', lat: 21.4858, lng: 39.1925, timezone: 3 },
  { name: 'Kuwait City', stateOrRegion: 'Al Asimah', country: 'Kuwait', lat: 29.3759, lng: 47.9774, timezone: 3 },
  { name: 'Muscat', stateOrRegion: 'Muscat', country: 'Oman', lat: 23.5859, lng: 58.4059, timezone: 4 },
  { name: 'Manama', stateOrRegion: 'Capital', country: 'Bahrain', lat: 26.2285, lng: 50.5860, timezone: 3 },
  { name: 'Tel Aviv', stateOrRegion: 'Tel Aviv', country: 'Israel', lat: 32.0853, lng: 34.7818, timezone: 2 },

  // --- ASIA PACIFIC ---
  { name: 'Singapore', stateOrRegion: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 8 },
  { name: 'Kuala Lumpur', stateOrRegion: 'Federal Territory', country: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 8 },
  { name: 'Penang (George Town)', stateOrRegion: 'Penang', country: 'Malaysia', lat: 5.4141, lng: 100.3288, timezone: 8 },
  { name: 'Bangkok', stateOrRegion: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, timezone: 7 },
  { name: 'Jakarta', stateOrRegion: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 7 },
  { name: 'Bali (Denpasar)', stateOrRegion: 'Bali', country: 'Indonesia', lat: -8.6705, lng: 115.2126, timezone: 8 },
  { name: 'Manila', stateOrRegion: 'Metro Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, timezone: 8 },
  { name: 'Hong Kong', stateOrRegion: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lng: 114.1694, timezone: 8 },
  { name: 'Tokyo', stateOrRegion: 'Kanto', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 9 },
  { name: 'Osaka', stateOrRegion: 'Kansai', country: 'Japan', lat: 34.6937, lng: 135.5023, timezone: 9 },
  { name: 'Seoul', stateOrRegion: 'Seoul Capital Area', country: 'South Korea', lat: 37.5665, lng: 126.9780, timezone: 9 },
  { name: 'Taipei', stateOrRegion: 'Taipei', country: 'Taiwan', lat: 25.0330, lng: 121.5654, timezone: 8 },
  { name: 'Sydney', stateOrRegion: 'New South Wales', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 10 },
  { name: 'Melbourne', stateOrRegion: 'Victoria', country: 'Australia', lat: -37.8136, lng: 144.9631, timezone: 10 },
  { name: 'Brisbane', stateOrRegion: 'Queensland', country: 'Australia', lat: -27.4698, lng: 153.0251, timezone: 10 },
  { name: 'Perth', stateOrRegion: 'Western Australia', country: 'Australia', lat: -31.9505, lng: 115.8605, timezone: 8 },
  { name: 'Auckland', stateOrRegion: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633, timezone: 12 },

  // --- EUROPE & UK ---
  { name: 'London', stateOrRegion: 'Greater London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 0 },
  { name: 'Birmingham', stateOrRegion: 'West Midlands', country: 'United Kingdom', lat: 52.4862, lng: -1.8904, timezone: 0 },
  { name: 'Manchester', stateOrRegion: 'Greater Manchester', country: 'United Kingdom', lat: 53.4808, lng: -2.2426, timezone: 0 },
  { name: 'Edinburgh', stateOrRegion: 'Scotland', country: 'United Kingdom', lat: 55.9533, lng: -3.1883, timezone: 0 },
  { name: 'Dublin', stateOrRegion: 'Leinster', country: 'Ireland', lat: 53.3498, lng: -6.2603, timezone: 0 },
  { name: 'Paris', stateOrRegion: 'Île-de-France', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 1 },
  { name: 'Berlin', stateOrRegion: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, timezone: 1 },
  { name: 'Frankfurt', stateOrRegion: 'Hesse', country: 'Germany', lat: 50.1109, lng: 8.6821, timezone: 1 },
  { name: 'Munich', stateOrRegion: 'Bavaria', country: 'Germany', lat: 48.1351, lng: 11.5820, timezone: 1 },
  { name: 'Amsterdam', stateOrRegion: 'North Holland', country: 'Netherlands', lat: 52.3676, lng: 4.9041, timezone: 1 },
  { name: 'Brussels', stateOrRegion: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, timezone: 1 },
  { name: 'Zurich', stateOrRegion: 'Zurich', country: 'Switzerland', lat: 47.3769, lng: 8.5417, timezone: 1 },
  { name: 'Geneva', stateOrRegion: 'Geneva', country: 'Switzerland', lat: 46.2044, lng: 6.1432, timezone: 1 },
  { name: 'Vienna', stateOrRegion: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738, timezone: 1 },
  { name: 'Rome', stateOrRegion: 'Lazio', country: 'Italy', lat: 41.9028, lng: 12.4964, timezone: 1 },
  { name: 'Milan', stateOrRegion: 'Lombardy', country: 'Italy', lat: 45.4642, lng: 9.1900, timezone: 1 },
  { name: 'Madrid', stateOrRegion: 'Community of Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038, timezone: 1 },
  { name: 'Barcelona', stateOrRegion: 'Catalonia', country: 'Spain', lat: 41.3879, lng: 2.1699, timezone: 1 },
  { name: 'Lisbon', stateOrRegion: 'Lisbon', country: 'Portugal', lat: 38.7223, lng: -9.1393, timezone: 0 },
  { name: 'Stockholm', stateOrRegion: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686, timezone: 1 },
  { name: 'Oslo', stateOrRegion: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522, timezone: 1 },
  { name: 'Copenhagen', stateOrRegion: 'Capital Region', country: 'Denmark', lat: 55.6761, lng: 12.5683, timezone: 1 },
  { name: 'Helsinki', stateOrRegion: 'Uusimaa', country: 'Finland', lat: 60.1699, lng: 24.9384, timezone: 2 },
  { name: 'Warsaw', stateOrRegion: 'Masovian', country: 'Poland', lat: 52.2297, lng: 21.0122, timezone: 1 },

  // --- NORTH AMERICA ---
  { name: 'New York', stateOrRegion: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezone: -5 },
  { name: 'Jersey City / Edison', stateOrRegion: 'New Jersey', country: 'United States', lat: 40.5187, lng: -74.4121, timezone: -5 },
  { name: 'San Francisco / Bay Area', stateOrRegion: 'California', country: 'United States', lat: 37.7749, lng: -122.4194, timezone: -8 },
  { name: 'San Jose / Silicon Valley', stateOrRegion: 'California', country: 'United States', lat: 37.3382, lng: -121.8863, timezone: -8 },
  { name: 'Los Angeles', stateOrRegion: 'California', country: 'United States', lat: 34.0522, lng: -118.2437, timezone: -8 },
  { name: 'Seattle', stateOrRegion: 'Washington', country: 'United States', lat: 47.6062, lng: -122.3321, timezone: -8 },
  { name: 'Chicago', stateOrRegion: 'Illinois', country: 'United States', lat: 41.8781, lng: -87.6298, timezone: -6 },
  { name: 'Houston', stateOrRegion: 'Texas', country: 'United States', lat: 29.7604, lng: -95.3698, timezone: -6 },
  { name: 'Dallas / Fort Worth', stateOrRegion: 'Texas', country: 'United States', lat: 32.7767, lng: -96.7970, timezone: -6 },
  { name: 'Austin', stateOrRegion: 'Texas', country: 'United States', lat: 30.2672, lng: -97.7431, timezone: -6 },
  { name: 'Atlanta', stateOrRegion: 'Georgia', country: 'United States', lat: 33.7490, lng: -84.3880, timezone: -5 },
  { name: 'Boston', stateOrRegion: 'Massachusetts', country: 'United States', lat: 42.3601, lng: -71.0589, timezone: -5 },
  { name: 'Washington D.C.', stateOrRegion: 'District of Columbia', country: 'United States', lat: 38.9072, lng: -77.0369, timezone: -5 },
  { name: 'Miami', stateOrRegion: 'Florida', country: 'United States', lat: 25.7617, lng: -80.1918, timezone: -5 },
  { name: 'Denver', stateOrRegion: 'Colorado', country: 'United States', lat: 39.7392, lng: -104.9903, timezone: -7 },
  { name: 'Phoenix', stateOrRegion: 'Arizona', country: 'United States', lat: 33.4484, lng: -112.0740, timezone: -7 },
  { name: 'Toronto', stateOrRegion: 'Ontario', country: 'Canada', lat: 43.6532, lng: -79.3832, timezone: -5 },
  { name: 'Vancouver', stateOrRegion: 'British Columbia', country: 'Canada', lat: 49.2827, lng: -123.1207, timezone: -8 },
  { name: 'Calgary', stateOrRegion: 'Alberta', country: 'Canada', lat: 51.0447, lng: -114.0719, timezone: -7 },
  { name: 'Montreal', stateOrRegion: 'Quebec', country: 'Canada', lat: 45.5017, lng: -73.5673, timezone: -5 },
  { name: 'Ottawa', stateOrRegion: 'Ontario', country: 'Canada', lat: 45.4215, lng: -75.6972, timezone: -5 },

  // --- AFRICA & SOUTH AMERICA ---
  { name: 'Johannesburg', stateOrRegion: 'Gauteng', country: 'South Africa', lat: -26.2041, lng: 28.0473, timezone: 2 },
  { name: 'Cape Town', stateOrRegion: 'Western Cape', country: 'South Africa', lat: -33.9249, lng: 18.4241, timezone: 2 },
  { name: 'Durban', stateOrRegion: 'KwaZulu-Natal', country: 'South Africa', lat: -29.8587, lng: 31.0218, timezone: 2 },
  { name: 'Nairobi', stateOrRegion: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219, timezone: 3 },
  { name: 'Port Louis', stateOrRegion: 'Port Louis', country: 'Mauritius', lat: -20.1609, lng: 57.5012, timezone: 4 },
  { name: 'São Paulo', stateOrRegion: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, timezone: -3 },
  { name: 'Buenos Aires', stateOrRegion: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816, timezone: -3 },
];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const RASHI_NAMES = [
  'Aries (Mesha)',
  'Taurus (Vrishabha)',
  'Gemini (Mithuna)',
  'Cancer (Karka)',
  'Leo (Simha)',
  'Virgo (Kanya)',
  'Libra (Tula)',
  'Scorpio (Vrishchika)',
  'Sagittarius (Dhanu)',
  'Capricorn (Makara)',
  'Aquarius (Kumbha)',
  'Pisces (Meena)'
];

export const RASHI_LORDS: PlanetId[] = [
  'mars',    // Aries
  'venus',   // Taurus
  'mercury', // Gemini
  'moon',    // Cancer
  'sun',     // Leo
  'mercury', // Virgo
  'venus',   // Libra
  'mars',    // Scorpio
  'jupiter', // Sagittarius
  'saturn',  // Capricorn
  'saturn',  // Aquarius
  'jupiter'  // Pisces
];

export interface CalculatedBirthProfile {
  lagnaNumber: number; // 1-12
  lagnaName: string;
  lagnaLord: PlanetId;
  lagnaDegree: number;
  sunSignNumber: number;
  sunSignName: string;
  moonSignNumber: number;
  moonSignName: string;
  moonLord: PlanetId;
  nakshatraName: string;
  nakshatraPada: number;
  nameRashiNumber: number;
  nameRashiName: string;
  destinyNumber: number;
  destinyPlanet: PlanetId;
  // Weight & Dosage Metrics
  gender: 'male' | 'female' | 'other';
  bodyWeightKg: number;
  prescribedMinRatti: number;
  prescribedIdealRatti: number;
  prescribedCarat: number;
  prescribedWeightRationale: string;
}

// Convert Date & Time to Julian Day Number
function getJulianDay(year: number, month: number, day: number, hour: number, minute: number, tzOffset: number): number {
  const utcHours = hour + minute / 60 - tzOffset;
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const dayFraction = day + utcHours / 24.0;
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFraction + b - 1524.5;
  return jd;
}

// Lahiri Ayanamsha for a given Julian Day
function getLahiriAyanamsha(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0; // centuries from J2000
  // Standard Lahiri formula approximation (~23.85° at J2000 with 50.29 arcseconds/year precession)
  const ayanamsha = 23.856 + 1.396 * t;
  return ayanamsha;
}

// Calculate Sidereal Ascendant (Lagna)
export function calculateVedicBirthProfile(details: BirthDetails): CalculatedBirthProfile {
  const [yearStr, monthStr, dayStr] = details.dob.split('-');
  const [hourStr, minStr] = details.tob.split(':');
  
  const year = parseInt(yearStr || '1995', 10);
  const month = parseInt(monthStr || '1', 10);
  const day = parseInt(dayStr || '1', 10);
  const hour = parseInt(hourStr || '12', 10);
  const minute = parseInt(minStr || '0', 10);

  const jd = getJulianDay(year, month, day, hour, minute, details.timezoneOffset);
  const d = jd - 2451545.0;
  
  // Greenwich Mean Sidereal Time (GMST) in degrees
  const gmstHours = (18.697374558 + 24.06570982441908 * d) % 24;
  const gmstDeg = (gmstHours * 15) % 360;
  
  // Local Sidereal Time (LST)
  const lstDeg = (gmstDeg + details.longitude + 360) % 360;
  const lstRad = (lstDeg * Math.PI) / 180;
  const latRad = (details.latitude * Math.PI) / 180;
  
  // Obliquity of the Ecliptic (eps)
  const epsDeg = 23.4392911 - (46.815 * (d / 36525)) / 3600;
  const epsRad = (epsDeg * Math.PI) / 180;
  
  // Tropical Ascendant computation
  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let ascTropical = (Math.atan2(y, x) * 180) / Math.PI;
  if (ascTropical < 0) ascTropical += 360;
  ascTropical = (ascTropical + 90) % 360; // offset quadrant alignment

  // Apply Lahiri Ayanamsha to obtain Sidereal (Nirayana) Ascendant
  const ayanamsha = getLahiriAyanamsha(jd);
  let ascSidereal = (ascTropical - ayanamsha + 360) % 360;

  // Determine Lagna sign (1 to 12)
  const lagnaNum = Math.floor(ascSidereal / 30) + 1;
  const lagnaDegree = Number((ascSidereal % 30).toFixed(2));

  // Approximate Sun longitude (Sidereal)
  const meanSun = (280.460 + 0.9856474 * d) % 360;
  const gSun = ((357.528 + 0.9856003 * d) * Math.PI) / 180;
  const sunEcliptic = (meanSun + 1.915 * Math.sin(gSun) + 0.020 * Math.sin(2 * gSun) + 360) % 360;
  const sunSidereal = (sunEcliptic - ayanamsha + 360) % 360;
  const sunSignNum = Math.floor(sunSidereal / 30) + 1;

  // Approximate Moon longitude (Sidereal)
  const meanMoon = (218.316 + 13.176396 * d) % 360;
  const moonEcliptic = (meanMoon + 6.289 * Math.sin(gSun) + 360) % 360;
  const moonSidereal = (moonEcliptic - ayanamsha + 360) % 360;
  const moonSignNum = Math.floor(moonSidereal / 30) + 1;

  // Nakshatra from Moon longitude (360 / 27 = 13.3333 degrees each)
  const nakshatraIndex = Math.floor(moonSidereal / (360 / 27)) % 27;
  const nakshatraName = NAKSHATRAS[nakshatraIndex];
  const nakshatraPada = Math.floor((moonSidereal % (360 / 27)) / (360 / 108)) + 1;

  // Calculate Name Rashi & Destiny Vibration
  const { nameRashiNum, destinyNum, destinyPlanet } = calculateNameAstrology(details.name);

  // Compute Classical Vedic Gemstone Dosage (Ratti & Metric Carats) by Body Weight & Gender
  const rawWeight = details.weightKg || 65;
  const weightInKg = details.weightUnit === 'lbs' ? Math.round(rawWeight * 0.453592) : rawWeight;
  const gender = details.gender || 'male';

  // Classical formula: Minimum ~ (Weight in Kg / 12) Ratti, Ideal ~ (Weight in Kg / 10 + 0.5) Ratti
  // Weight threshold baseline: 3.25 Ratti minimum for effective dermal prana transmission
  const minRatti = Math.max(3.25, Number((weightInKg / 12).toFixed(2)));
  const idealRatti = Math.max(4.5, Number((weightInKg / 10 + 0.5).toFixed(2)));
  const metricCarat = Number((idealRatti * 0.91).toFixed(2));
  const rationale = `Based on a ${gender} body constitution of ${weightInKg} kg, a minimum planetary radiation threshold of ${idealRatti} Ratti (${metricCarat} Carats) is required for unobstructed dermal aura absorption.`;

  return {
    lagnaNumber: lagnaNum,
    lagnaName: RASHI_NAMES[lagnaNum - 1],
    lagnaLord: RASHI_LORDS[lagnaNum - 1],
    lagnaDegree,
    sunSignNumber: sunSignNum,
    sunSignName: RASHI_NAMES[sunSignNum - 1],
    moonSignNumber: moonSignNum,
    moonSignName: RASHI_NAMES[moonSignNum - 1],
    moonLord: RASHI_LORDS[moonSignNum - 1],
    nakshatraName,
    nakshatraPada,
    nameRashiNumber: nameRashiNum,
    nameRashiName: RASHI_NAMES[nameRashiNum - 1],
    destinyNumber: destinyNum,
    destinyPlanet,
    gender,
    bodyWeightKg: weightInKg,
    prescribedMinRatti: minRatti,
    prescribedIdealRatti: idealRatti,
    prescribedCarat: metricCarat,
    prescribedWeightRationale: rationale
  };
}

// Calculate Name Rashi & Numerological Planet Vibration
export function calculateNameAstrology(name: string): {
  nameRashiNum: number;
  destinyNum: number;
  destinyPlanet: PlanetId;
} {
  const cleanName = (name || '').trim().toUpperCase();
  if (!cleanName) {
    return { nameRashiNum: 1, destinyNum: 1, destinyPlanet: 'sun' };
  }

  const firstChar = cleanName[0];
  const firstTwo = cleanName.substring(0, 2);

  // Classical Vedic Avakahada Swara map
  let rashiNum = 1; // Default Aries

  if (/^(A|CH|LA|LI|LU|LE|LO)/.test(cleanName)) rashiNum = 1; // Aries
  else if (/^(I|U|E|O|V|BA|BI|BU|BE|BO)/.test(cleanName)) rashiNum = 2; // Taurus
  else if (/^(K|KA|KI|KU|GHA|CHH|HA)/.test(cleanName)) rashiNum = 3; // Gemini
  else if (/^(HI|HU|HE|HO|DA|DI|DU|DE|DO)/.test(cleanName)) rashiNum = 4; // Cancer
  else if (/^(M|MA|MI|MU|ME|MO|TA|TI|TU|TE)/.test(cleanName)) rashiNum = 5; // Leo
  else if (/^(TO|PA|PI|PU|SH|THA|PE|PO)/.test(cleanName)) rashiNum = 6; // Virgo
  else if (/^(R|RA|RI|RU|RE|RO|TA|TI|TE|TU)/.test(cleanName)) rashiNum = 7; // Libra
  else if (/^(N|NA|NI|NU|NE|NO|YA|YI|YU)/.test(cleanName)) rashiNum = 8; // Scorpio
  else if (/^(YE|YO|BHA|BHI|BHU|DHA|PHA|DHA|BHE)/.test(cleanName)) rashiNum = 9; // Sagittarius
  else if (/^(BHO|JA|JI|KHI|KHU|KHE|KHO|GA|GI)/.test(cleanName)) rashiNum = 10; // Capricorn
  else if (/^(GU|GE|GO|SA|SI|SU|SE|SO|DA)/.test(cleanName)) rashiNum = 11; // Aquarius
  else if (/^(DI|DU|TH|JHA|DE|DO|CHA|CHI)/.test(cleanName)) rashiNum = 12; // Pisces
  else {
    // Fallback: character code modulo 12
    rashiNum = (cleanName.charCodeAt(0) % 12) + 1;
  }

  // Chaldean / Pythagorean Numerology mapping for Name Destiny Number
  const charValues: Record<string, number> = {
    A: 1, I: 1, J: 1, Q: 1, Y: 1,
    B: 2, K: 2, R: 2,
    C: 3, G: 3, L: 3, S: 3,
    D: 4, M: 4, T: 4,
    E: 5, H: 5, N: 5, X: 5,
    U: 6, V: 6, W: 6,
    O: 7, Z: 7,
    F: 8, P: 8
  };

  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    const ch = cleanName[i];
    if (charValues[ch]) {
      sum += charValues[ch];
    }
  }

  // Reduce to single digit (1-9)
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  const destinyNum = sum || 1;

  const planetMap: Record<number, PlanetId> = {
    1: 'sun',
    2: 'moon',
    3: 'jupiter',
    4: 'rahu',
    5: 'mercury',
    6: 'venus',
    7: 'ketu',
    8: 'saturn',
    9: 'mars'
  };

  return {
    nameRashiNum: rashiNum,
    destinyNum,
    destinyPlanet: planetMap[destinyNum] || 'sun'
  };
}
