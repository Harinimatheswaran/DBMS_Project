document.addEventListener('DOMContentLoaded', function () {
    const bookTicketForm = document.getElementById('bookTicketForm');
    const cancelTicketForm = document.getElementById('cancelTicketForm');
    const bookedTicketsList = document.getElementById('bookedTicketsList');
    const availableTicketsList = document.getElementById('availableTicketsList');
    const viewBookedTicketsButton = document.getElementById('viewBookedTicketsButton');
    const viewAvailableTicketsButton = document.getElementById('viewAvailableTicketsButton');

    const maxTickets = 100; // Assuming maximum 100 tickets available for simplicity

    function getBookedTickets() {
        return JSON.parse(localStorage.getItem('bookedTickets')) || [];
    }

    function saveBookedTickets(tickets) {
        localStorage.setItem('bookedTickets', JSON.stringify(tickets));
    }

    function bookTicket(name, trainNumber, berthPreference, travelDate) {
        const tickets = getBookedTickets();
        if (tickets.length >= maxTickets) {
            alert('No more tickets available.');
            return;
        }
        tickets.push({ name, trainNumber, berthPreference, travelDate });
        saveBookedTickets(tickets);
        alert('Ticket booked successfully.');
    }

    function cancelTicket(name, trainNumber) {
        let tickets = getBookedTickets();
        tickets = tickets.filter(ticket => ticket.name !== name || ticket.trainNumber !== trainNumber);
        saveBookedTickets(tickets);
        alert('Ticket cancelled successfully.');
    }

    function displayTickets(tickets, listElement) {
        listElement.innerHTML = '';
        tickets.forEach(ticket => {
            const li = document.createElement('li');
            li.textContent = `Name: ${ticket.name}, Train Number: ${ticket.trainNumber}, Berth: ${ticket.berthPreference}, Date: ${ticket.travelDate}`;
            listElement.appendChild(li);
        });
    }

    bookTicketForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const trainNumber = document.getElementById('trainNumber').value;
        const berthPreference = document.getElementById('berthPreference').value;
        const travelDate = document.getElementById('travelDate').value;
        bookTicket(name, trainNumber, berthPreference, travelDate);
        bookTicketForm.reset();
    });

    cancelTicketForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('cancelName').value;
        const trainNumber = document.getElementById('cancelTrainNumber').value;
        cancelTicket(name, trainNumber);
        cancelTicketForm.reset();
    });

    viewBookedTicketsButton.addEventListener('click', function () {
        const tickets = getBookedTickets();
        displayTickets(tickets, bookedTicketsList);
    });

    viewAvailableTicketsButton.addEventListener('click', function () {
        const bookedTickets = getBookedTickets().length;
        const availableTickets = maxTickets - bookedTickets;
        availableTicketsList.innerHTML = `<li>Available Tickets: ${availableTickets}</li>`;
    });
});
