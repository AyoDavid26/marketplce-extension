import fetch from 'node-fetch';

const SERPAPI_KEY = '3f8d481c12f86071fc2a02b8fd3dcfc8019726b43eb4a929f53fe7ad4281d411'; 
const PROXY_URL = 'http://localhost:8080/';

async function fetchSerpApiData(query) {
    try {
        const response = await fetch(`${PROXY_URL}https://serpapi.com/search.json?engine=google_shopping&q=${query}&api_key=${SERPAPI_KEY}`);
        if (!response.ok) {
            throw new Error(`SerpApi error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Full SerpApi response:', JSON.stringify(data, null, 2)); // Detailed logging
        return data.shopping_results || [];
    } catch (error) {
        console.error('Error fetching data from SerpApi:', error);
        return [];
    }
}

fetchSerpApiData('laptop').then(results => {
    if (results.length === 0) {
        console.log('No prices found.');
    } else {
        console.log('Fetched results from SerpApi:', results);
    }
}).catch(error => {
    console.error('Error:', error);
});
