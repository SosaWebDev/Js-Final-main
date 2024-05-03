document.addEventListener("DOMContentLoaded", () => {
    const eventsList = document.getElementById("events-list");

    // Function to fetch events data from the API
    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/events");
            const events = await response.json();
            displayEvents(events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    // Function to display events in the HTML
    const displayEvents = (events) => {
        eventsList.innerHTML = ""; // Clear existing content
        events.forEach((event) => {
            const listItem = document.createElement("li");
            const eventName = document.createElement("h2");
            eventName.textContent = event.name;
            listItem.appendChild(eventName);

            // Create event details container
            const eventDetails = document.createElement("p");
            eventDetails.classList.add("event-details");
            eventDetails.textContent = `Location: ${event.location}, Date: ${event.date}, Time: ${event.hour}`;
            eventDetails.style.display = "none"; // Initially hide event details
            listItem.appendChild(eventDetails);

            // Create "Read more" button
            const readMoreBtn = document.createElement("button");
            readMoreBtn.textContent = "Read more";
            readMoreBtn.addEventListener("click", () => toggleEventDetails(eventDetails, readMoreBtn));
            listItem.appendChild(readMoreBtn);

            eventsList.appendChild(listItem);
        });
    };

    // Function to toggle event details visibility
    const toggleEventDetails = (detailsElement, btn) => {
        if (detailsElement.style.display === "none") {
            detailsElement.style.display = "block";
            btn.textContent = "Read less";
        } else {
            detailsElement.style.display = "none";
            btn.textContent = "Read more";
        }
    };

    fetchEvents(); // Fetch events when the page loads
});
