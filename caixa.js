document.addEventListener('DOMContentLoaded', () => {
    // Função de login
    function login(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'aukimia' && password === 'admin') {
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('caixa-container').classList.remove('hidden');
            updateClock(); // Atualiza o relógio
        } else {
            document.getElementById('error').style.display = 'block';
        }
    }

    let items = [];

    // Atualiza totais de quantidade e valor
    function updateTotals() {
        let totalQty = 0;
        let totalValue = 0;
        items.forEach(item => {
            totalQty += parseInt(item.qty, 10); // Usando parseInt para quantidade inteira
            totalValue += parseFloat(item.value);
        });

        document.getElementById('total-qty').innerText = totalQty.toFixed(0); // Exibindo quantidade inteira
        document.getElementById('total-volumes').innerText = totalQty.toFixed(0); // Exibindo quantidade inteira
        document.getElementById('total-value').innerText = totalValue.toFixed(2); // Exibindo valor com 2 casas decimais
    }

    // Adiciona um novo item aleatório à lista
    function addRandomItem() {
        if (items.length >= 10) {
            alert('Você só pode adicionar até 10 itens.');
            return;
        }

        const codes = ['0010 000001', '0010 000002', '0010 000003', '0010 000004', '0010 000005', '0010 000006', '0010 000007', '0010 000008', '0010 000009', '0010 000010'];
        const descriptions = ['Ração para Cachorro', 'Ração para Gato', 'Areia para Gato', 'Brinquedo para Cachorro', 'Coleira para Cachorro', 'Cama para Cachorro', 'Ração para Pássaro', 'Comida para Peixe', 'Brinquedo para Gato', 'Medicamento para Cachorro'];
        const unitPrices = [25.00, 20.00, 15.00, 30.00, 22.00, 55.00, 10.00, 12.00, 18.00, 5.00];
        
        const randomIndex = Math.floor(Math.random() * codes.length);

        const newItem = {
            code: codes[randomIndex],
            description: descriptions[randomIndex],
            qty: 1,
            unitPrice: unitPrices[randomIndex],
            value: unitPrices[randomIndex].toFixed(2)
        };

        items.push(newItem);
        renderItems();
        updateTotals();
    }

    // Edita um item existente
    function editItem(index, field, value) {
        if (field === 'qty') {
            value = parseInt(value, 10); // Garantir que a quantidade seja um número inteiro
        }
        items[index][field] = value;
        if (field === 'unitPrice' || field === 'qty') {
            items[index].value = (items[index].unitPrice * items[index].qty).toFixed(2);
        }
        renderItems();
        updateTotals();
    }

    // Renderiza os itens na tabela
    function renderItems() {
        const tbody = document.getElementById('items');
        tbody.innerHTML = '';

        items.forEach((item, index) => {
            tbody.innerHTML += `
                <tr>
                    <td><input type="text" value="${item.code}" onchange="editItem(${index}, 'code', this.value)" /></td>
                    <td><input type="text" value="${item.description}" onchange="editItem(${index}, 'description', this.value)" /></td>
                    <td><input type="number" value="${item.qty}" step="1" onchange="editItem(${index}, 'qty', this.value)" /></td>
                    <td><input type="number" value="${item.unitPrice}" step="0.01" onchange="editItem(${index}, 'unitPrice', this.value)" /></td>
                    <td>${item.value}</td>
                    <td><button onclick="removeItem(${index})" data-index="${index}">Remover</button></td>
                </tr>
            `;
        });
    }

    // Remove um item da lista
    function removeItem(index) {
        items.splice(index, 1);
        renderItems();
        updateTotals();
    }

    // Atualiza o horário no formato de hora local
    function updateClock() {
        setInterval(() => {
            const now = new Date();
            document.getElementById('horario').innerText = now.toLocaleTimeString();
        }, 1000);
    }

    // Adiciona o listener de evento para o formulário de login
    document.getElementById('loginForm').addEventListener('submit', login);

    // Adiciona o listener para o botão de adicionar item aleatório
    document.querySelector('.add-item-button').addEventListener('click', addRandomItem);

    // Opcional: Adicionar 1 item aleatório ao carregar a página para testes
    // addRandomItem();
});
