// API key and base URL for the currency exchange service
const apiKey = '7995afcad60c50707e6656e2';
const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/';

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('converter-form');

    // Populate currency options
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrencySelect.appendChild(option2);
    });

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        try {
            const response = await fetch(apiUrl + fromCurrency);
            const data = await response.json();
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);

            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } catch (error) {
            resultDiv.textContent = 'Error retrieving exchange rates. Please try again later.';
        }
    });
});
