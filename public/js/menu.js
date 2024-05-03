window.addEventListener('DOMContentLoaded', async () => {
    const menuContainer = document.getElementById('menu-container');
  
    // Fetch menu items from the API
    const response = await fetch('/api/menu');
    const menuItems = await response.json();
  
    // Loop through the menu items and create HTML elements to display them
    menuItems.forEach(item => {
      const menuItemElement = document.createElement('div');
      menuItemElement.classList.add('menu-item');
  
      const itemName = document.createElement('h3');
      itemName.textContent = item.name;
  
      const itemDescription = document.createElement('p');
      itemDescription.textContent = `Description: ${item.description}`;
  
      const itemPrice = document.createElement('p');
      itemPrice.textContent = `Price: $${item.price}`;
  
      menuItemElement.appendChild(itemName);
      menuItemElement.appendChild(itemDescription);
      menuItemElement.appendChild(itemPrice);
  
      menuContainer.appendChild(menuItemElement);
    });
  });
  