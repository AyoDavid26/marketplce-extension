console.log('Content script loaded.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "searchProducts") {
        const searchInput = getSearchInput();
        if (searchInput) {
            const searchTerm = searchInput.value;
            console.log(`Received search term: ${searchTerm}`);
            sendResponse({ status: "success", searchTerm: searchTerm });
        } else {
            console.error('Search input not found on the page.');
            sendResponse({ status: "error", message: 'Search input not found.' });
        }
    }
});

function getSearchInput() {
    const hostname = window.location.hostname;
    console.log(`Current hostname: ${hostname}`);
    let searchInput = null;

    if (hostname.includes('ebay.com')) {
        searchInput = document.querySelector('input#gh-ac');
    } else if (hostname.includes('amazon.com')) {
        searchInput = document.querySelector('input#twotabsearchtextbox');
    } else if (hostname.includes('walmart.com')) {
        searchInput = document.querySelector('input#global-search-input');
    } else if (hostname.includes('alibaba.com')) {
        searchInput = document.querySelector('input#search-key');
    }

    if (searchInput) {
        console.log(`Found search input for ${hostname}`);
    } else {
        console.error(`Search input not found for ${hostname}`);
    }
    return searchInput;
}
