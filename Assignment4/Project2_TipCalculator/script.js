const calculateBtn = document.querySelector('#calculateBtn');
const billAmountInput = document.querySelector('#billAmount');
const tipPercentageInput = document.querySelector('#tipPercentage');
const tipAmountDisplay = document.querySelector('#tipAmount');
const totalBillDisplay = document.querySelector('#totalBill');

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const bill = parseFloat(billAmountInput.value);
    const tipPercent = parseFloat(tipPercentageInput.value);

    if (isNaN(bill) || isNaN(tipPercent) || bill < 0 || tipPercent < 0) {
        alert("Please enter valid positive numbers for bill and tip percentage.");
        return;
    }

  
    const tipAmount = bill * (tipPercent / 100);
    const totalBill = bill + tipAmount;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalBillDisplay.textContent = `$${totalBill.toFixed(2)}`;
});