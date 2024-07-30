console.log('Background script loaded.');

const marketplaces = [
    "amazon.com",
    "ebay.com",
    "walmart.com",
    "google.com",
    "alibaba.com",
    "shopify.com"
];

chrome.webNavigation.onCompleted.addListener(function(details) {
    const url = new URL(details.url);
    const hostname = url.hostname;

    if (marketplaces.some(marketplace => hostname.includes(marketplace))) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["content.js"]
        }, () => {
            if (chrome.runtime.lastError) {
                console.error("Script injection failed: ", chrome.runtime.lastError);
            } else {
                console.log(`Injected content script into ${details.url}`);
            }
        });
    }
}, { url: [{ urlMatches: 'https?://*/*' }] });

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlMatches: '.*' }
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

const SERPAPI_KEY = '3f8d481c12f86071fc2a02b8fd3dcfc8019726b43eb4a929f53fe7ad4281d411';
const PROXY_URL = 'https://marktplce-heroku.herokuapp.com/';

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchPrices") {
        const searchTerm = request.searchTerm;
        console.log(`Fetching prices for: ${searchTerm}`);

        fetchSerpApiData(searchTerm).then(results => {
            console.log('Fetched results from SerpApi:', results);
            sendResponse({ status: "success", data: results });
        }).catch(error => {
            console.error('Error fetching prices:', error);
            sendResponse({ status: "error", message: error.message });
        });

        return true; // Required to indicate that we will send a response asynchronously
    }
});
