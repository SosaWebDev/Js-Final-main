// Admin Page JavaScript

// Global variables to store menu items and events
let menuItems = [];
let events = [];

// Function to fetch and display menu items
const displayMenuItems = async () => {
  try {
    const response = await fetch("/api/menu");
    menuItems = await response.json();

    // Clear existing menu items
    const menuItemsList = document.getElementById("menuItems");
    menuItemsList.innerHTML = "";

    // Populate menu items list
    menuItems.forEach((menuItem) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${menuItem.name} - ${menuItem.description} - $${menuItem.price}`;

      menuItemsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    alert("Failed to fetch menu items. Please try again.");
  }
};

// Function to fetch and display events
const displayEvents = async () => {
  try {
    const response = await fetch("/api/events");
    events = await response.json();

    // Clear existing events
    const eventsList = document.getElementById("events");
    eventsList.innerHTML = "";

    // Populate events list
    events.forEach((event) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${event.name} - ${event.location} - ${event.date}, ${event.hour}`;

      eventsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    alert("Failed to fetch events. Please try again.");
  }
};

// Function to populate dropdown menu with menu item options
const populateMenuItemOptions = async () => {
  try {
    const response = await fetch("/api/menu");
    const menuItems = await response.json();

    // Clear existing options
    const menuItemSelect = document.getElementById("menuItemSelect");
    menuItemSelect.innerHTML = "";

    // Add default "Choose" option
    const chooseOption = document.createElement("option");
    chooseOption.textContent = "Choose";
    chooseOption.value = "";
    menuItemSelect.appendChild(chooseOption);

    // Populate options with menu items
    menuItems.forEach((menuItem) => {
      const option = document.createElement("option");
      option.textContent = menuItem.name;
      option.value = menuItem.id;
      menuItemSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    alert("Failed to fetch menu items. Please try again.");
  }
};

// Function to populate dropdown menu with event options
const populateEventOptions = async () => {
  try {
    const response = await fetch("/api/events");
    const events = await response.json();

    // Clear existing options
    const eventSelect = document.getElementById("eventSelect");
    eventSelect.innerHTML = "";

    // Add default "Choose" option
    const chooseOption = document.createElement("option");
    chooseOption.textContent = "Choose";
    chooseOption.value = "";
    eventSelect.appendChild(chooseOption);

    // Populate options with events
    events.forEach((event) => {
      const option = document.createElement("option");
      option.textContent = event.name;
      option.value = event.id;
      eventSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    alert("Failed to fetch events. Please try again.");
  }
};

// Function to populate menu item fields when selected from dropdown
const populateMenuItemFields = () => {
  const selectedItemId = document.getElementById("menuItemSelect").value;
  const selectedMenuItem = menuItems.find(item => item.id === selectedItemId);

  // Populate fields with selected menu item data
  document.getElementById("newName").value = selectedMenuItem.name;
  document.getElementById("newDescription").value = selectedMenuItem.description;
  document.getElementById("newPrice").value = selectedMenuItem.price;
};

// Function to populate event fields when selected from dropdown
const populateEventFields = () => {
  const selectedEventId = document.getElementById("eventSelect").value;
  const selectedEvent = events.find(event => event.id === selectedEventId);

  // Populate fields with selected event data
  document.getElementById("newEventName").value = selectedEvent.name;
  document.getElementById("newLocation").value = selectedEvent.location;
  document.getElementById("newDate").value = selectedEvent.date;
  document.getElementById("newHour").value = selectedEvent.hour;
};

// Function to update a menu item
const updateMenuItem = async () => {
  const itemId = document.getElementById("menuItemSelect").value;
  const newName = document.getElementById("newName").value;
  const newDescription = document.getElementById("newDescription").value;
  const newPrice = document.getElementById("newPrice").value;

  try {
    const response = await fetch(`/api/menu/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName, description: newDescription, price: newPrice }),
    });

    if (response.ok) {
      alert("Menu item updated successfully!");
      await displayMenuItems();
      await populateMenuItemOptions();
    } else {
      throw new Error("Failed to update menu item");
    }
  } catch (error) {
    console.error("Error updating menu item:", error);
    alert("Failed to update menu item. Please try again.");
  }
};

// Function to update an event
const updateEvent = async () => {
  const eventId = document.getElementById("eventSelect").value;
  const newName = document.getElementById("newEventName").value;
  const newLocation = document.getElementById("newLocation").value;
  const newDate = document.getElementById("newDate").value;
  const newHour = document.getElementById("newHour").value;

  try {
    const response = await fetch(`/api/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName, location: newLocation, date: newDate, hour: newHour }),
    });

    if (response.ok) {
      alert("Event updated successfully!");
      await displayEvents();
      await populateEventOptions();
    } else {
      throw new Error("Failed to update event");
    }
  } catch (error) {
    console.error("Error updating event:", error);
    alert("Failed to update event. Please try again.");
  }
};

// Function to handle form submission for adding a new menu item
const handleMenuFormSubmit = async (event) => {
  event.preventDefault();

  const name = document.getElementById("menuItemName").value;
  const description = document.getElementById("menuItemDescription").value;
  const price = document.getElementById("menuItemPrice").value;

  try {
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price }),
    });

    if (response.ok) {
      alert("Menu item added successfully!");
      document.getElementById("menuForm").reset();
      await displayMenuItems();
      await populateMenuItemOptions();
    } else {
      throw new Error("Failed to add menu item");
    }
  } catch (error) {
    console.error("Error adding menu item:", error);
    alert("Failed to add menu item. Please try again.");
  }
};

// Function to handle form submission for adding a new event
const handleEventFormSubmit = async (event) => {
  event.preventDefault();

  const name = document.getElementById("eventName").value;
  const location = document.getElementById("eventLocation").value;
  const date = document.getElementById("eventDate").value;
  const hour = document.getElementById("eventHour").value;

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, location, date, hour }),
    });

    if (response.ok) {
      alert("Event added successfully!");
      document.getElementById("eventForm").reset();
      await displayEvents();
      await populateEventOptions();
    } else {
      throw new Error("Failed to add event");
    }
  } catch (error) {
    console.error("Error adding event:", error);
    alert("Failed to add event. Please try again.");
  }
};

// Function to handle deletion of menu item
const deleteMenuItem = async (itemId) => {
  try {
    const response = await fetch(`/api/menu/${itemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Menu item deleted successfully!");
      await displayMenuItems();
      await populateMenuItemOptions();
    } else {
      throw new Error("Failed to delete menu item");
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
    alert("Failed to delete menu item. Please try again.");
  }
};

// Function to handle deletion of event
const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Event deleted successfully!");
      await displayEvents();
      await populateEventOptions();
    } else {
      throw new Error("Failed to delete event");
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Failed to delete event. Please try again.");
  }
};

// Event listener for delete button in the update menu item modal
document.getElementById("menuItemDelete").addEventListener("click", async () => {
  const selectedMenuItemId = document.getElementById("menuItemSelect").value;

  if (!selectedMenuItemId) {
    alert("Please select a menu item to delete.");
    return;
  }

  const confirmed = confirm(`Are you sure you want to delete this menu item?`);
  if (confirmed) {
    try {
      await deleteMenuItem(selectedMenuItemId);
      await displayMenuItems();
      await populateMenuItemOptions();
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Failed to delete menu item. Please try again.");
    }
  }
});

// Event listener for delete button in the update event modal
document.getElementById("eventDelete").addEventListener("click", async () => {
  const selectedEventId = document.getElementById("eventSelect").value;

  if (!selectedEventId) {
    alert("Please select an event to delete.");
    return;
  }

  const confirmed = confirm(`Are you sure you want to delete this event?`);
  if (confirmed) {
    try {
      await deleteEvent(selectedEventId);
      await displayEvents();
      await populateEventOptions();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  }
});

//********************************************************************** */

// Function to handle deletion of menu items or events
function handleDelete(action, itemId) {
  if (action === 'menuItem') {
    deleteMenuItem(itemId);
  } else if (action === 'event') {
    deleteEvent(itemId);
  }
}

// Event listener for delete button clicks
function handleDeleteButtonClick(event) {
  const action = event.target.dataset.action;
  const itemId = event.target.dataset.itemId;
  
  if (action && itemId) {
    handleDelete(action, itemId);
  }
}

// Attach event listener for delete button clicks
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteMenuItem") || event.target.classList.contains("deleteEvent")) {
    handleDeleteButtonClick(event);
  }
});

// Additional event listeners for form submissions and dropdown changes
document.getElementById("menuForm").addEventListener("submit", handleMenuFormSubmit);
document.getElementById("eventForm").addEventListener("submit", handleEventFormSubmit);

document.getElementById("menuItems").addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteMenuItem")) {
    const itemId = event.target.dataset.itemId;
    deleteMenuItem(itemId);
  }
});

document.getElementById("events").addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteEvent")) {
    const eventId = event.target.dataset.eventId;
    deleteEvent(eventId);
  }
});

document.getElementById("menuItemSelect").addEventListener("change", populateMenuItemFields);
document.getElementById("eventSelect").addEventListener("change", populateEventFields);

// Event listener for form submission to update menu item
document.getElementById("updateMenuItemForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  updateMenuItem();
});

// Event listener for form submission to update event
document.getElementById("updateEventForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  updateEvent();
});

// Call displayMenuItems and displayEvents when the page loads
window.onload = async () => {
  await displayMenuItems();
  await displayEvents();
  await populateMenuItemOptions();
  await populateEventOptions();
};
