import fetch from 'node-fetch';

const RAPIDAPI_HOST = 'pricer.p.rapidapi.com';
const RAPIDAPI_KEY = '855436e51fmshac117924b5ecaddp102349jsna721a482014e';
const SERPAPI_KEY = '3f8d481c12f86071fc2a02b8fd3dcfc8019726b43eb4a929f53fe7ad4281d411';

async function fetchRapidApiData(query) {
    try {
        const response = await fetch(`https://${RAPIDAPI_HOST}/search?query=${query}`, {
            headers: {
                'x-rapidapi-host': RAPIDAPI_HOST,
                'x-rapidapi-key': RAPIDAPI_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`RapidAPI error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('RapidAPI Data:', data);
    } catch (error) {
        console.error('Error fetching data from RapidAPI:', error);
    }
}

async function fetchSerpApiData(query) {
    try {
        const response = await fetch(`https://serpapi.com/search?engine=google_shopping&q=${query}&api_key=${SERPAPI_KEY}`);
        if (!response.ok) {
            throw new Error(`SerpAPI error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('SerpAPI Data:', data);
    } catch (error) {
        console.error('Error fetching data from SerpAPI:', error);
    }
}

// Test the APIs
const testQuery = 'laptop';
fetchRapidApiData(testQuery);
fetchSerpApiData(testQuery);
