

const burgerForm = document.getElementById('burger-form');
const burgerLayerList = document.getElementById('burger-layer-list');
const burgerTotalPriceElement = document.getElementById('burger-total-price');
const burgerResetBtn = document.getElementById('burger-reset-btn');
const burgerPrintBtn = document.getElementById('burger-print-btn');


function updateBurgerSummary() {
    let burgerTotalCost = 0;
    const selectedLayers = [];

    
    const selectedPatty = burgerForm.querySelector('input[name="patty_type"]:checked');
    if (selectedPatty) {
        const pattyPrice = parseFloat(selectedPatty.dataset.price);
        burgerTotalCost += pattyPrice;
        selectedLayers.push({ name: selectedPatty.value, price: pattyPrice });
    }

    
    const selectedCheese = burgerForm.querySelector('input[name="cheese_selection"]:checked');
    if (selectedCheese) {
        const cheesePrice = parseFloat(selectedCheese.dataset.price);
        burgerTotalCost += cheesePrice;
        selectedLayers.push({ name: selectedCheese.value, price: cheesePrice });
    }

   
    const selectedSauces = burgerForm.querySelectorAll('input[name="sauce_options"]:checked');
    selectedSauces.forEach(sauce => {
        const saucePrice = parseFloat(sauce.dataset.price);
        burgerTotalCost += saucePrice;
        selectedLayers.push({ name: sauce.value, price: saucePrice });
    });

    
    burgerLayerList.innerHTML = '';
    if (selectedLayers.length === 0) {
        burgerLayerList.innerHTML = '<li class="empty-receipt-msg">No options selected yet. Start customizing!</li>';
    } else {
        selectedLayers.forEach(layer => {
            const listItem = document.createElement('li');
            listItem.className = 'burger-layer-item';
            listItem.innerHTML = `
                <span class="item-name">${layer.name}</span>
                <span class="item-price">+$${layer.price.toFixed(2)}</span>
            `;
            burgerLayerList.appendChild(listItem);
        });
    }

    
    burgerTotalPriceElement.textContent = `$${burgerTotalCost.toFixed(2)}`;
}

burgerForm.addEventListener('change', updateBurgerSummary);


burgerResetBtn.addEventListener('click', () => {
    burgerForm.reset();
    updateBurgerSummary();
});


burgerPrintBtn.addEventListener('click', () => {
    window.print();
});
