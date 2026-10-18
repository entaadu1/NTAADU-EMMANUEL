

document.addEventListener('DOMContentLoaded', () => {
    
    let burger_patty_selection = null;
    let burger_cheese_selection = null;
    let burger_sauce_selections = [];
    let burger_total_cost = 0.00;

    
    const option_buttons = document.querySelectorAll('.option-btn');
    const burger_layers_list = document.getElementById('burger-layers-list');
    const total_cost_display = document.getElementById('total-cost');
    const reset_btn = document.getElementById('reset-btn');
    const print_btn = document.getElementById('print-btn');
    const receipt_date = document.getElementById('receipt-date');

    
    const now = new Date();
    receipt_date.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    
    option_buttons.forEach(button => {
        button.addEventListener('click', () => {
            const option_type = button.getAttribute('data-type');
            const option_name = button.getAttribute('data-name');
            const option_price = parseFloat(button.getAttribute('data-price'));

            if (option_type === 'patty') {
                document.querySelectorAll('#patty-group .option-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                burger_patty_selection = { name: option_name, price: option_price };

            } else if (option_type === 'cheese') {
                document.querySelectorAll('#cheese-group .option-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                burger_cheese_selection = { name: option_name, price: option_price };

            } else if (option_type === 'sauce') {
                if (button.classList.contains('selected')) {
                    button.classList.remove('selected');
                    burger_sauce_selections = burger_sauce_selections.filter(sauce => sauce.name !== option_name);
                } else {
                    button.classList.add('selected');
                    burger_sauce_selections.push({ name: option_name, price: option_price });
                }
            }

            updateBurgerSummary();
        });
    });

    
    function updateBurgerSummary() {
        burger_layers_list.innerHTML = '';
        burger_total_cost = 0.00;

        let has_items = false;

        if (burger_patty_selection) {
            has_items = true;
            const li = document.createElement('li');
            li.innerHTML = `${burger_patty_selection.name} <span class="layer-price">+$${burger_patty_selection.price.toFixed(2)}</span>`;
            burger_layers_list.appendChild(li);
            burger_total_cost += burger_patty_selection.price;
        }

        if (burger_cheese_selection) {
            has_items = true;
            const li = document.createElement('li');
            li.innerHTML = `${burger_cheese_selection.name} <span class="layer-price">+$${burger_cheese_selection.price.toFixed(2)}</span>`;
            burger_layers_list.appendChild(li);
            burger_total_cost += burger_cheese_selection.price;
        }

        burger_sauce_selections.forEach(sauce => {
            has_items = true;
            const li = document.createElement('li');
            li.innerHTML = `${sauce.name} <span class="layer-price">+$${sauce.price.toFixed(2)}</span>`;
            burger_layers_list.appendChild(li);
            burger_total_cost += sauce.price;
        });

        if (!has_items) {
            burger_layers_list.innerHTML = '<li><em>No layers selected yet.</em></li>';
        }

        total_cost_display.textContent = `$${burger_total_cost.toFixed(2)}`;
    }

    
    reset_btn.addEventListener('click', () => {
        burger_patty_selection = null;
        burger_cheese_selection = null;
        burger_sauce_selections = [];
        burger_total_cost = 0.00;

        option_buttons.forEach(btn => btn.classList.remove('selected'));
        updateBurgerSummary();
    });

    
    print_btn.addEventListener('click', () => {
        window.print();
    });
});
