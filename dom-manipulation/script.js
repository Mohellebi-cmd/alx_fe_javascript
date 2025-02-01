// Load quotes from local storage or use default quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Be the change you wish to see in the world.", category: "Inspiration" },
    { text: "The only way to do great work is to love what you do.", category: "Success" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Simulated server URL (using JSONPlaceholder or mock API)
const serverUrl = "https://jsonplaceholder.typicode.com/posts";

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const syncStatus = document.getElementById('syncStatus');

// Function to populate category dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '';
    
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categoryFilter.appendChild(allOption);
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
    
    const lastFilter = localStorage.getItem('selectedCategory');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
        filterQuotes();
    }
}

// Function to display a random quote based on filter
function showRandomQuote() {
    let filteredQuotes = quotes;
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = 'No quotes available';
        return;
    }
    
    const index = Math.floor(Math.random() * filteredQuotes.length);
    const selectedQuote = filteredQuotes[index];
    
    sessionStorage.setItem('lastQuote', JSON.stringify(selectedQuote));
    
    quoteDisplay.textContent = `${selectedQuote.text}\nCategory: ${selectedQuote.category}`;
}

// Function to fetch quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();
        return serverQuotes.map(q => ({ text: q.title, category: 'Imported' }));
    } catch (error) {
        console.error('Error fetching from server:', error);
        return [];
    }
}

// Function to show sync success message
function showSyncSuccessMessage() {
    syncStatus.style.display = 'block'; // Show the message
    setTimeout(() => {
        syncStatus.style.display = 'none'; // Hide the message after 3 seconds
    }, 3000);
}

// Function to sync quotes with server
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    if (serverQuotes.length > 0) {
        const mergedQuotes = [...quotes, ...serverQuotes];
        localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
        quotes.length = 0;
        quotes.push(...mergedQuotes);
        populateCategories();
        showRandomQuote();
        
        // Show success message after syncing
        showSyncSuccessMessage();
    }
}

// Function to send new quotes to the server
async function sendQuoteToServer(quote) {
    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
        return await response.json();
    } catch (error) {
        console.error('Error sending quote to server:', error);
    }
}

// Restore last viewed quote from session storage
window.addEventListener('load', () => {
    populateCategories();
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
        quoteDisplay.textContent = `${lastQuote.text}\nCategory: ${lastQuote.category}`;
    } else {
        showRandomQuote();
    }
    syncQuotes();
    setInterval(syncQuotes, 30000); // Sync with the server every 30 seconds
});

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText');
    const quoteCategory = document.getElementById('newQuoteCategory');
    
    if (quoteText.value && quoteCategory.value) {
        const newQuote = { text: quoteText.value, category: quoteCategory.value };
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        localStorage.setItem('selectedCategory', categoryFilter.value);
        
        quoteText.value = '';
        quoteCategory.value = '';
        populateCategories();
        showRandomQuote();
        sendQuoteToServer(newQuote);
        syncQuotes();
    } else {
        alert('Please enter both quote and category');
    }
}

// Function to filter quotes based on selected category
function filterQuotes() {
    localStorage.setItem('selectedCategory', categoryFilter.value);
    showRandomQuote();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    newQuoteBtn.addEventListener('click', showRandomQuote);
    categoryFilter.addEventListener('change', filterQuotes);
});
