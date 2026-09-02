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
  { name: 'Guwahati', stateOrRegion: 'Assam', country: 'India', lat: 26.1445, lng: 91.7362, timezone: 5.5 },
  { name: 'Silchar', stateOrRegion: 'Assam', country: 'India', lat: 24.8333, lng: 92.7789, timezone: 5.5 },
  { name: 'Dibrugarh', stateOrRegion: 'Assam', country: 'India', lat: 27.4728, lng: 94.9120, timezone: 5.5 },
  { name: 'Jorhat', stateOrRegion: 'Assam', country: 'India', lat: 26.7509, lng: 94.2037, timezone: 5.5 },
  { name: 'Tezpur', stateOrRegion: 'Assam', country: 'India', lat: 26.6528, lng: 92.7926, timezone: 5.5 },
  { name: 'Nagaon', stateOrRegion: 'Assam', country: 'India', lat: 26.3466, lng: 92.6840, timezone: 5.5 },
  { name: 'Shillong', stateOrRegion: 'Meghalaya', country: 'India', lat: 25.5788, lng: 91.8933, timezone: 5.5 },
  { name: 'Agartala', stateOrRegion: 'Tripura', country: 'India', lat: 23.8315, lng: 91.2868, timezone: 5.5 },
  { name: 'Imphal', stateOrRegion: 'Manipur', country: 'India', lat: 24.8170, lng: 93.9368, timezone: 5.5 },
  { name: 'Aizawl', stateOrRegion: 'Mizoram', country: 'India', lat: 23.7271, lng: 92.7176, timezone: 5.5 },
  { name: 'Kohima', stateOrRegion: 'Nagaland', country: 'India', lat: 25.6751, lng: 94.1086, timezone: 5.5 },
  { name: 'Dimapur', stateOrRegion: 'Nagaland', country: 'India', lat: 25.9094, lng: 93.7266, timezone: 5.5 },
  { name: 'Itanagar', stateOrRegion: 'Arunachal Pradesh', country: 'India', lat: 27.0844, lng: 93.6053, timezone: 5.5 },
  { name: 'Gangtok', stateOrRegion: 'Sikkim', country: 'India', lat: 27.3389, lng: 88.6065, timezone: 5.5 },
  { name: 'Port Blair', stateOrRegion: 'Andaman & Nicobar', country: 'India', lat: 11.6234, lng: 92.7265, timezone: 5.5 },

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
