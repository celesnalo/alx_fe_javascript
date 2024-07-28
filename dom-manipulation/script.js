// Mock server URL
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

// Array of quote objects
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", category: "Success" }
];

// Retrieve the last selected filter from localStorage
let selectedCategory = localStorage.getItem('selectedCategory') || 'all';

// Function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const filteredQuotes = quotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
  } else {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>No quotes available for the selected category.</p>`;
  }
}

// Function to add a new quote and post it to the server
async function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };

    // Post new quote to the server
    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
      });

      if (response.ok) {
        const serverResponse = await response.json();
        // Simulate adding the quote returned from the server
        quotes.push({ text: serverResponse.title, category: 'Server' });
        saveQuotes(); // Save updated quotes to localStorage
        updateCategoryFilter(); // Update the category filter options
        showRandomQuote(); // Optionally, display the newly added quote
        alert('Quote added and posted to the server successfully!');
      } else {
        alert('Failed to post the quote to the server.');
      }
    } catch (error) {
      console.error('Error posting the quote:', error);
    }
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Function to update the category filter options
function updateCategoryFilter() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  categoryFilter.value = selectedCategory;
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter');
  selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory); // Save selected category to localStorage
  showRandomQuote();
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes(); // Save updated quotes to localStorage
    alert('Quotes imported successfully!');
    updateCategoryFilter();
    showRandomQuote();
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();
    // Simulate server data having precedence
    quotes = serverQuotes.map(item => ({ text: item.title, category: 'Server' }));
    saveQuotes();
    updateCategoryFilter();
    showRandomQuote();
    notifyUser('Data has been updated from the server.');
  } catch (error) {
    console.error('Failed to fetch data from the server:', error);
  }
}

// Function to notify user about data updates
function notifyUser(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Periodically fetch data from server
setInterval(fetchQuotesFromServer, 60000); // Fetch data every 60 seconds

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the "Export Quotes" button
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// Initial setup
updateCategoryFilter();
showRandomQuote();
fetchQuotesFromServer(); // Initial data fetch
