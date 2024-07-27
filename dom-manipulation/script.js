// Initialize the array of quotes
let quotes = [];
  
  // Function to display a random quote
  function displayRandomQuote() {
    if (quotes.length === 0) {
      alert('No quotes available. Please add a new quote.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText !== "" && newQuoteCategory !== "") {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      displayRandomQuote();
      alert('Quote added successfully!');
    } else {
      alert('Please fill out both fields.');
    }
  }
  
  // Function to create the form for adding a new quote
  function createAddQuoteForm() {
    const form = document.createElement('div');
  
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('placeholder', 'Enter a new quote');
  
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
  
    const addButton = document.createElement('button');
    addButton.innerHTML = 'Add Quote';
    addButton.addEventListener('click', addQuote);
  
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(addButton);
  
    document.body.appendChild(form);
  }
  
  // Add event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
  
  // Call the createAddQuoteForm function to create and display the form
  createAddQuoteForm();
  
  // Display a random quote on initial load (if there are quotes available)
  displayRandomQuote();
  