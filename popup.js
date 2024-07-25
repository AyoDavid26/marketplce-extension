document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchQuery');
    const resultsDiv = document.getElementById('results');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Sending search term to background script:', searchTerm);
                chrome.runtime.sendMessage({ action: "fetchPrices", searchTerm: searchTerm }, function (response) {
                    if (chrome.runtime.lastError) {
                        console.error("Fetching prices failed:", chrome.runtime.lastError);
                    } else if (response && response.status === "success") {
                        console.log('Received prices from background script:', response.data);
                        displayResults(response.data);
                    } else {
                        console.error('No response or error from background script');
                        resultsDiv.textContent = 'Error fetching prices.';
                    }
                });
            } else {
                console.error('Search input is empty.');
                resultsDiv.textContent = 'Please enter a search term.';
            }
        });
    } else {
        console.error('Search button or input not found on the page.');
    }

    function displayResults(data) {
        console.log('Displaying results:', data);
        resultsDiv.innerHTML = '';  // Clear previous results

        if (data.length === 0) {
            resultsDiv.textContent = 'No prices found.';
            return;
        }

        data.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'product';  // Apply product class for styling
            resultItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>Price: ${item.price}</p>
                ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}">` : ''}
                <p><a href="${item.link}" target="_blank">Buy Now</a></p>
            `;
            resultsDiv.appendChild(resultItem);
        });
    }
});
