// Configuración de Ingredientes
const FRUITS = ['Fresa 🍓', 'Banano 🍌', 'Uva 🍇', 'Melocoton 🍑'];
const TOPPINGS = ['Chispas de Chocolate 🍫', 'Galleta Oreo 🍪', 'Botonetas 🌈', 'Marshmallows 🍥'];
const SAUCES = ['hershey s 🌰', 'Leche Condensada 🥛', 'Miel de Maple 🍁', 'Miel 🍯'];

// Estado del pedido
let currentCategory = {
  name: 'Individual', price: 20, pancakes: 12, maxFruits: 1, maxToppings: 1, maxSauces: 1, stickers: 0
};

let selectedFruits = [];
let selectedToppings = [];
let selectedSauces = [];

// Inicialización de la Interfaz
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  selectCategory('Individual', 20, 12, 1, 1, 1, 0);
});

// Función para seleccionar la categoría
window.selectCategory = function(name, price, pancakes, maxFruits, maxToppings, maxSauces, stickers) {
  currentCategory = { name, price, pancakes, maxFruits, maxToppings, maxSauces, stickers };
  
  selectedFruits = [];
  selectedToppings = [];
  selectedSauces = [];

  document.querySelectorAll('.cat-select-btn').forEach(btn => {
    btn.classList.remove('border-pancake-500', 'bg-pancake-50', 'ring-2', 'ring-pancake-500');
    btn.classList.add('bg-white', 'border-gray-200');
  });

  const activeBtn = document.getElementById(`cat-btn-${name}`);
  if (activeBtn) {
    activeBtn.classList.add('border-pancake-500', 'bg-pancake-50', 'ring-2', 'ring-pancake-500');
  }

  renderOptions();
  updateSummary();
}

// Renderizado dinámico de opciones
function renderOptions() {
  const renderGrid = (containerId, items, selectedArray, type) => {
    const container = document.getElementById(containerId);
    if(!container) return;
    
    container.innerHTML = items.map(item => {
      const isSelected = selectedArray.includes(item);
      let colors = type === 'fruit' ? 'berry' : type === 'topping' ? 'pancake' : 'amber';
      let bgColor = isSelected ? `bg-${colors}-50 border-${colors}-500 text-${colors}-600 ring-1 ring-${colors}-500` : 'bg-white border-gray-200 text-gray-700 hover:border-pancake-300';
      
      return `
        <button type="button" onclick="toggleOption('${type}', '${item}')" 
          class="p-2.5 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${bgColor}">
          <span>${item}</span>
          ${isSelected ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-${colors}-500"></i>` : ''}
        </button>
      `;
    }).join('');
  };

  renderGrid('fruits-grid', FRUITS, selectedFruits, 'fruit');
  renderGrid('toppings-grid', TOPPINGS, selectedToppings, 'topping');
  renderGrid('sauces-grid', SAUCES, selectedSauces, 'sauce');

  document.getElementById('fruit-count-badge').textContent = `${selectedFruits.length} / ${currentCategory.maxFruits} elegidas`;
  document.getElementById('topping-count-badge').textContent = `${selectedToppings.length} / ${currentCategory.maxToppings} elegidos`;
  document.getElementById('sauce-count-badge').textContent = `${selectedSauces.length} / ${currentCategory.maxSauces} elegidas`;

  lucide.createIcons();
}

// Lógica de selección
window.toggleOption = function(type, item) {
  const handleSelection = (arr, maxLimit, typeName) => {
    if (arr.includes(item)) {
      return arr.filter(i => i !== item);
    } else {
      if (arr.length < maxLimit) {
        arr.push(item);
        return arr;
      } else {
        showToast(`Solo puedes elegir ${maxLimit} ${typeName}(s) para este tamaño.`);
        return arr;
      }
    }
  };

  if (type === 'fruit') selectedFruits = handleSelection(selectedFruits, currentCategory.maxFruits, 'fruta');
  if (type === 'topping') selectedToppings = handleSelection(selectedToppings, currentCategory.maxToppings, 'topping');
  if (type === 'sauce') selectedSauces = handleSelection(selectedSauces, currentCategory.maxSauces, 'salsa');

  renderOptions();
  updateSummary();
}

// Resumen del pedido
function updateSummary() {
  document.getElementById('summary-category').textContent = `Categoría: ${currentCategory.name}`;
  document.getElementById('summary-price').textContent = `Q${currentCategory.price}.00`;
  document.getElementById('summary-details').textContent = `Incluye ${currentCategory.pancakes} mini pancakes`;

  document.getElementById('summary-fruits').textContent = selectedFruits.length ? selectedFruits.join(', ') : 'Ninguna';
  document.getElementById('summary-toppings').textContent = selectedToppings.length ? selectedToppings.join(', ') : 'Ninguno';
  document.getElementById('summary-sauces').textContent = selectedSauces.length ? selectedSauces.join(', ') : 'Ninguna';

  const stickersRow = document.getElementById('summary-stickers-row');
  currentCategory.stickers > 0 ? stickersRow.classList.remove('hidden') : stickersRow.classList.add('hidden');
}

// Interfaz de Usuario
window.showToast = function(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
}

window.scrollToBuilder = function() {
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
}

// Envío a WhatsApp con Nombre y Comentario integrado
window.sendOrderWhatsApp = function() {
  // Capturar los inputs de nombre y notas
  const customerNameInput = document.getElementById('customer-name').value.trim();
  const customerNoteInput = document.getElementById('customer-note').value.trim();

  // Validación: Obligar a ingresar el nombre
  if (customerNameInput === "") {
    showToast("⚠️ Por favor, ingresa tu nombre antes de enviar el pedido.");
    document.getElementById('customer-name').focus();
    return;
  }

  // Estructura del mensaje para WhatsApp
  let message = 
    `¡Hola! 👋 Quisiera hacer un pedido de Mini Pancakes 🥞\n\n` +
    `👤 *Cliente:* ${customerNameInput}\n` +
    `*Categoría:* ${currentCategory.name} (Q${currentCategory.price}.00)\n` +
    `*Cantidad:* ${currentCategory.pancakes} mini pancakes\n\n` +
    `🍓 *Frutas:* ${selectedFruits.length ? selectedFruits.join(', ') : 'Ninguna'}\n` +
    `🍪 *Toppings:* ${selectedToppings.length ? selectedToppings.join(', ') : 'Ninguno'}\n` +
    `🍯 *Salsas:* ${selectedSauces.length ? selectedSauces.join(', ') : 'Ninguna'}\n`;

  // Agregar comentario personalizado solo si el usuario escribió algo
  if (customerNoteInput !== "") {
    message += `📝 *Comentario:* ${customerNoteInput}\n`;
  }

  // Agregar stickers si la promoción aplica
  if (currentCategory.stickers > 0) {
    message += `🎁 *Incluye:* 2 Stickers sorpresa\n`;
  }

  message += `\n*Total a pagar:* Q${currentCategory.price}.00\n\n` +
             `¡Quedo a la espera de confirmación! ✨`;

  const encodedUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}