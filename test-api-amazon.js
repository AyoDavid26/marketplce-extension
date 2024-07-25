import fetch from 'node-fetch';

const RAPIDAPI_HOST = 'amazon-price1.p.rapidapi.com';
const RAPIDAPI_KEY = '855436e51fmshac117924b5ecaddp102349jsna721a482014e';

async function fetchAmazonData(query) {
    const url = `https://${RAPIDAPI_HOST}/search?keywords=${query}`;
    try {
        const response = await fetch(url, {
            headers: {
                'x-rapidapi-host': RAPIDAPI_HOST,
                'x-rapidapi-key': RAPIDAPI_KEY
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return;
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch Error:', error.message);
    }
}

fetchAmazonData('laptop');
