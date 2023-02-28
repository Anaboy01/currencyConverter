// fething the symbol data (currency option ) from API endpoint 
const getCurrencyOption = async () => {
      const optionUrl =  'https://api.exchangerate.host/symbols';
      const response = await fetch( optionUrl);
      const json = await response.json();
      
      return json.symbols
}

// getCurrencyOption().then(console.log)

// fethcing the currency rates (convert endpoint results) data from API endpoint
const getCurrencyRates = async(fromCurrency, toCurrency) => {
      const currencyConvertUrl = new URL('https://api.exchangerate.host/convert');
      currencyConvertUrl.searchParams.append('from', fromCurrency);
      currencyConvertUrl.searchParams.append('to', toCurrency);

      const resp = await fetch (currencyConvertUrl)
      const json = await resp.json()

      return json.result;
}

//this function will create now option element and create it for the select element being passed as an argument

const appendSelectOptions = (selectEl, optionItem) =>{
      const optionEl = document.createElement('option')
      optionEl.value = optionItem.code;
      optionEl.textContent = optionItem.code;
      // optionEl.textContent = optionItem.description;

      selectEl.appendChild(optionEl)
}

const populateSelectEl = (selectEl, optionList) => {
      optionList.forEach((optionItem) => {
            appendSelectOptions(selectEl, optionItem);
      })
}


// set up currencies and make reference to the DOM elements
const setUpCurrencies = async () =>{
  const fromCurrency = document.querySelector('#from')
  const toCurrency = document.querySelector('#to')
  const currencyOptions = await getCurrencyOption()
  const currencies = Object.keys(currencyOptions).map((currencyKeys) => currencyOptions[currencyKeys])

  populateSelectEl(fromCurrency, currencies)
  populateSelectEl(toCurrency, currencies)
}

setUpCurrencies();
// setting up the event listener for our form element
const setupEventListner = () => {
      const formEl = document.getElementById('convertForm')
      formEl.addEventListener('submit', async event => {
            event.preventDefault()
            const fromCurrency = document.querySelector('#from');
            const toCurrency = document.querySelector('#to');
            const amount = document.querySelector('#amount');
            const convertResult = document.querySelector('#result');

           

            try{
                  const rate = await getCurrencyRates(fromCurrency.value, toCurrency.value);

                  const amountValue = Number(amount.value);
                  const conversionRate = Number(amountValue * rate).toFixed(2);
                  convertResult.textContent = `${amountValue} ${fromCurrency.value} = ${conversionRate} ${toCurrency.value}`  
            }catch(err){
                  convertResult.textContent = `There is an error fetching data[${err.message}]`
                  convertResult.classList.add('error');
            }
      })
}


setupEventListner();


// const amount = document.querySelector('#amount');
// console.log(amount)