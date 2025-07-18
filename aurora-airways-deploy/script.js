// Aurora Airways - Flight Booking System
// Enhanced JavaScript with Air India API Integration Patterns

// Global Variables
let passengerCounts = {
    adults: 1,
    children: 0,
    infants: 0
};

let currentFlights = [];
let selectedFlight = null;

// Air India Style Airport Data (Extended)
const airports = [
    { code: "DEL", name: "Indira Gandhi International Airport", city: "Delhi", country: "India" },
    { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
    { code: "BLR", name: "Kempegowda International Airport", city: "Bangalore", country: "India" },
    { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India" },
    { code: "CCU", name: "Netaji Subhash Chandra Bose International Airport", city: "Kolkata", country: "India" },
    { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India" },
    { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", country: "India" },
    { code: "COK", name: "Cochin International Airport", city: "Kochi", country: "India" },
    { code: "GOI", name: "Goa International Airport", city: "Goa", country: "India" },
    { code: "JAI", name: "Jaipur International Airport", city: "Jaipur", country: "India" },
    { code: "LKO", name: "Chaudhary Charan Singh International Airport", city: "Lucknow", country: "India" },
    { code: "PNQ", name: "Pune Airport", city: "Pune", country: "India" },
    
    // International destinations that Air India serves
    { code: "LHR", name: "Heathrow Airport", city: "London", country: "United Kingdom" },
    { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States" },
    { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "United States" },
    { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States" },
    { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
    { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
    { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
    { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
    { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
    { code: "LGW", name: "London Gatwick Airport", city: "London", country: "United Kingdom" },
    { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
    { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" }
];

// Simulated Air India Flight Data
const flightData = [
    {
        id: "AI131",
        airline: "Aurora Airways",
        aircraft: "Boeing 787-8",
        departure: { time: "06:00", airport: "DEL", terminal: "T3" },
        arrival: { time: "08:30", airport: "BOM", terminal: "T2" },
        duration: "2h 30m",
        price: 8500,
        currency: "INR",
        stops: 0,
        class: "economy",
        amenities: ["WiFi", "Meals", "Entertainment"]
    },
    {
        id: "AI132",
        airline: "Aurora Airways",
        aircraft: "Airbus A320",
        departure: { time: "14:30", airport: "DEL", terminal: "T3" },
        arrival: { time: "17:00", airport: "BOM", terminal: "T2" },
        duration: "2h 30m",
        price: 9200,
        currency: "INR",
        stops: 0,
        class: "economy",
        amenities: ["WiFi", "Meals"]
    },
    {
        id: "AI133",
        airline: "Aurora Airways",
        aircraft: "Boeing 777-300ER",
        departure: { time: "09:15", airport: "DEL", terminal: "T3" },
        arrival: { time: "14:45", airport: "LHR", terminal: "4" },
        duration: "8h 30m",
        price: 45000,
        currency: "INR",
        stops: 0,
        class: "economy",
        amenities: ["WiFi", "Meals", "Entertainment", "USB Power"]
    },
    {
        id: "AI134",
        airline: "Aurora Airways",
        aircraft: "Boeing 787-9",
        departure: { time: "22:30", airport: "BOM", terminal: "T2" },
        arrival: { time: "06:45+1", airport: "LHR", terminal: "4" },
        duration: "9h 15m",
        price: 42000,
        currency: "INR",
        stops: 0,
        class: "economy",
        amenities: ["WiFi", "Meals", "Entertainment", "Lie-flat seats"]
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupNavigation();
    setupFormValidation();
    setMinDate();
    populateAirportSuggestions();
}

function setupEventListeners() {
    // Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Trip type radio buttons
    const tripTypeRadios = document.querySelectorAll('input[name="tripType"]');
    tripTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleTripTypeChange);
    });

    // Flight search form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleFlightSearch);
    }

    // Passenger selector
    setupPassengerSelector();

    // Airport input autocomplete
    setupAirportAutocomplete();

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Auth forms
    setupAuthForms();

    // Booking form
    setupBookingForm();
}

function setupNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu
            document.getElementById('nav-menu').classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

function handleTripTypeChange(event) {
    const returnDateGroup = document.querySelector('.return-date');
    if (event.target.value === 'roundTrip') {
        returnDateGroup.style.display = 'block';
        document.getElementById('returnDate').required = true;
    } else {
        returnDateGroup.style.display = 'none';
        document.getElementById('returnDate').required = false;
    }
}

function setupPassengerSelector() {
    updatePassengerText();
}

function togglePassengerDropdown() {
    const dropdown = document.getElementById('passengerDropdown');
    dropdown.classList.toggle('show');
}

function updatePassenger(type, change) {
    const currentCount = passengerCounts[type];
    const newCount = Math.max(0, currentCount + change);
    
    // Validation rules
    if (type === 'adults' && newCount < 1) return;
    if (type === 'infants' && newCount > passengerCounts.adults) return;
    if (newCount > 9) return; // Max 9 passengers
    
    passengerCounts[type] = newCount;
    document.getElementById(type + 'Count').textContent = newCount;
    updatePassengerText();
}

function updatePassengerText() {
    const total = passengerCounts.adults + passengerCounts.children;
    let text = '';
    
    if (passengerCounts.adults > 0) {
        text += `${passengerCounts.adults} Adult${passengerCounts.adults > 1 ? 's' : ''}`;
    }
    
    if (passengerCounts.children > 0) {
        text += `${text ? ', ' : ''}${passengerCounts.children} Child${passengerCounts.children > 1 ? 'ren' : ''}`;
    }
    
    if (passengerCounts.infants > 0) {
        text += `${text ? ', ' : ''}${passengerCounts.infants} Infant${passengerCounts.infants > 1 ? 's' : ''}`;
    }
    
    document.getElementById('passengerText').textContent = text || '0 Passengers';
}

function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const departureInput = document.getElementById('departureDate');
    const returnInput = document.getElementById('returnDate');
    
    if (departureInput) {
        departureInput.min = today;
        departureInput.addEventListener('change', function() {
            if (returnInput) {
                returnInput.min = this.value;
            }
        });
    }
    
    if (returnInput) {
        returnInput.min = today;
    }
}

function setupAirportAutocomplete() {
    const fromInput = document.getElementById('fromCity');
    const toInput = document.getElementById('toCity');
    
    if (fromInput) {
        setupSingleAutocomplete(fromInput, 'fromSuggestions');
    }
    
    if (toInput) {
        setupSingleAutocomplete(toInput, 'toSuggestions');
    }
}

function setupSingleAutocomplete(input, suggestionsId) {
    const suggestionsContainer = document.getElementById(suggestionsId);
    
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length < 2) {
            hideSuggestions(suggestionsContainer);
            return;
        }
        
        const matches = airports.filter(airport => 
            airport.city.toLowerCase().includes(query) ||
            airport.name.toLowerCase().includes(query) ||
            airport.code.toLowerCase().includes(query)
        ).slice(0, 5);
        
        showSuggestions(matches, suggestionsContainer, input);
    });
    
    input.addEventListener('blur', function() {
        setTimeout(() => hideSuggestions(suggestionsContainer), 200);
    });
}

function showSuggestions(matches, container, input) {
    container.innerHTML = '';
    
    if (matches.length === 0) {
        hideSuggestions(container);
        return;
    }
    
    matches.forEach(airport => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <div style="font-weight: 600;">${airport.city} (${airport.code})</div>
            <div style="font-size: 0.9rem; color: var(--text-secondary);">${airport.name}</div>
        `;
        
        item.addEventListener('click', function() {
            input.value = `${airport.city} (${airport.code})`;
            input.dataset.airportCode = airport.code;
            hideSuggestions(container);
        });
        
        container.appendChild(item);
    });
    
    container.classList.add('show');
}

function hideSuggestions(container) {
    container.classList.remove('show');
}

function populateAirportSuggestions() {
    // Pre-populate popular routes for demo
    const fromInput = document.getElementById('fromCity');
    const toInput = document.getElementById('toCity');
    
    if (fromInput && toInput) {
        fromInput.value = 'Delhi (DEL)';
        fromInput.dataset.airportCode = 'DEL';
        toInput.value = 'Mumbai (BOM)';
        toInput.dataset.airportCode = 'BOM';
    }
}

function handleFlightSearch(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const searchParams = {
        from: document.getElementById('fromCity').dataset.airportCode || 'DEL',
        to: document.getElementById('toCity').dataset.airportCode || 'BOM',
        departureDate: document.getElementById('departureDate').value,
        returnDate: document.getElementById('returnDate').value,
        passengers: passengerCounts,
        class: document.getElementById('travelClass').value,
        tripType: document.querySelector('input[name="tripType"]:checked').value
    };
    
    // Validate required fields
    if (!searchParams.from || !searchParams.to || !searchParams.departureDate) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (searchParams.from === searchParams.to) {
        showNotification('Departure and destination cities must be different', 'error');
        return;
    }
    
    // Show loading spinner
    showLoadingSpinner();
    
    // Simulate API call with delay
    setTimeout(() => {
        searchFlights(searchParams);
        hideLoadingSpinner();
    }, 2000);
}

function searchFlights(params) {
    // Simulate Air India API integration
    console.log('Searching flights with Air India integration...', params);
    
    // Filter flights based on search criteria
    currentFlights = flightData.filter(flight => 
        flight.departure.airport === params.from &&
        flight.arrival.airport === params.to
    );
    
    // Add some dynamic pricing based on date and passenger count
    currentFlights = currentFlights.map(flight => ({
        ...flight,
        price: calculateDynamicPrice(flight.price, params),
        searchParams: params
    }));
    
    displayFlightResults(currentFlights);
    
    // Scroll to results
    document.getElementById('flightResults').scrollIntoView({
        behavior: 'smooth'
    });
}

function calculateDynamicPrice(basePrice, params) {
    let price = basePrice;
    
    // Weekend surcharge
    const date = new Date(params.departureDate);
    if (date.getDay() === 0 || date.getDay() === 6) {
        price *= 1.15;
    }
    
    // Class multipliers
    const classMultipliers = {
        economy: 1,
        premium: 1.5,
        business: 3,
        first: 5
    };
    
    price *= classMultipliers[params.class] || 1;
    
    return Math.round(price);
}

function displayFlightResults(flights) {
    const resultsContainer = document.getElementById('resultsContainer');
    const flightResults = document.getElementById('flightResults');
    
    if (flights.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-plane-slash" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>No flights found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = flights.map(flight => createFlightCard(flight)).join('');
        
        // Add click listeners to flight cards
        document.querySelectorAll('.flight-card').forEach(card => {
            card.addEventListener('click', function() {
                const flightId = this.dataset.flightId;
                selectFlight(flights.find(f => f.id === flightId));
            });
        });
    }
    
    flightResults.style.display = 'block';
}

function createFlightCard(flight) {
    const fromAirport = airports.find(a => a.code === flight.departure.airport);
    const toAirport = airports.find(a => a.code === flight.arrival.airport);
    
    return `
        <div class="flight-card" data-flight-id="${flight.id}">
            <div class="flight-header">
                <div class="airline-info">
                    <div class="airline-logo">AI</div>
                    <div>
                        <div style="font-weight: 600;">${flight.airline}</div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">${flight.aircraft}</div>
                    </div>
                </div>
                <div class="flight-price">₹${flight.price.toLocaleString()}</div>
            </div>
            
            <div class="flight-details">
                <div class="flight-time">
                    <div class="time">${flight.departure.time}</div>
                    <div class="airport">${flight.departure.airport}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">${fromAirport?.city}</div>
                </div>
                
                <div class="flight-duration">
                    <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">${flight.duration}</div>
                    <div class="duration-line">
                        <div class="plane-icon"><i class="fas fa-plane"></i></div>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">
                        ${flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </div>
                </div>
                
                <div class="flight-time">
                    <div class="time">${flight.arrival.time}</div>
                    <div class="airport">${flight.arrival.airport}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">${toAirport?.city}</div>
                </div>
            </div>
            
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                ${flight.amenities.map(amenity => `
                    <span style="background: var(--background-color); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                        ${amenity}
                    </span>
                `).join('')}
            </div>
        </div>
    `;
}

function selectFlight(flight) {
    selectedFlight = flight;
    openBookingModal(flight);
}

function openBookingModal(flight) {
    const modal = document.getElementById('bookingModal');
    const summary = document.getElementById('bookingSummary');
    
    // Create booking summary
    const fromAirport = airports.find(a => a.code === flight.departure.airport);
    const toAirport = airports.find(a => a.code === flight.arrival.airport);
    
    const totalPassengers = passengerCounts.adults + passengerCounts.children + passengerCounts.infants;
    const totalPrice = flight.price * (passengerCounts.adults + passengerCounts.children);
    
    summary.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Flight Summary</h3>
        <div style="background: white; padding: 1rem; border-radius: var(--border-radius); margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div style="font-weight: 600;">${flight.airline} ${flight.id}</div>
                <div style="color: var(--text-secondary);">${flight.aircraft}</div>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <div>
                    <div style="font-weight: 600; font-size: 1.1rem;">${flight.departure.time}</div>
                    <div style="color: var(--text-secondary);">${fromAirport.city} (${flight.departure.airport})</div>
                </div>
                <div style="text-align: center; color: var(--text-secondary);">
                    <div>${flight.duration}</div>
                    <div><i class="fas fa-plane"></i></div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 600; font-size: 1.1rem;">${flight.arrival.time}</div>
                    <div style="color: var(--text-secondary);">${toAirport.city} (${flight.arrival.airport})</div>
                </div>
            </div>
        </div>
        
        <div style="background: white; padding: 1rem; border-radius: var(--border-radius); margin-bottom: 1rem;">
            <h4 style="margin-bottom: 0.5rem;">Passengers</h4>
            <div style="color: var(--text-secondary);">
                ${passengerCounts.adults} Adult${passengerCounts.adults > 1 ? 's' : ''}
                ${passengerCounts.children > 0 ? `, ${passengerCounts.children} Child${passengerCounts.children > 1 ? 'ren' : ''}` : ''}
                ${passengerCounts.infants > 0 ? `, ${passengerCounts.infants} Infant${passengerCounts.infants > 1 ? 's' : ''}` : ''}
            </div>
        </div>
        
        <div style="background: white; padding: 1rem; border-radius: var(--border-radius);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Base Fare:</span>
                <span>₹${flight.price.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Taxes & Fees:</span>
                <span>₹${Math.round(flight.price * 0.15).toLocaleString()}</span>
            </div>
            <hr style="margin: 0.5rem 0;">
            <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 1.1rem;">
                <span>Total:</span>
                <span style="color: var(--primary-color);">₹${(totalPrice + Math.round(flight.price * 0.15)).toLocaleString()}</span>
            </div>
        </div>
    `;
    
    // Generate passenger forms
    generatePassengerForms();
    
    modal.classList.add('show');
}

function generatePassengerForms() {
    const container = document.getElementById('passengerForms');
    container.innerHTML = '';
    
    let passengerIndex = 1;
    
    // Adult passengers
    for (let i = 0; i < passengerCounts.adults; i++) {
        container.appendChild(createPassengerForm('Adult', passengerIndex++));
    }
    
    // Child passengers
    for (let i = 0; i < passengerCounts.children; i++) {
        container.appendChild(createPassengerForm('Child', passengerIndex++));
    }
    
    // Infant passengers
    for (let i = 0; i < passengerCounts.infants; i++) {
        container.appendChild(createPassengerForm('Infant', passengerIndex++));
    }
}

function createPassengerForm(type, index) {
    const form = document.createElement('div');
    form.className = 'passenger-form';
    
    form.innerHTML = `
        <h4 style="margin-bottom: 1rem;">${type} ${index}</h4>
        <div class="form-row">
            <div class="form-group">
                <label>Title</label>
                <select required>
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                    ${type === 'Child' || type === 'Infant' ? '<option value="Master">Master</option><option value="Miss">Miss</option>' : ''}
                </select>
            </div>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Date of Birth</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Gender</label>
                <select required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            ${type === 'Adult' ? `
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" required>
                </div>
            ` : ''}
        </div>
    `;
    
    return form;
}

function setupBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
}

function handleBookingSubmit(event) {
    event.preventDefault();
    
    // Show loading
    showLoadingSpinner();
    
    // Simulate booking process
    setTimeout(() => {
        hideLoadingSpinner();
        closeModal('bookingModal');
        showBookingConfirmation();
    }, 3000);
}

function showBookingConfirmation() {
    const confirmationHtml = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
            <h2 style="color: var(--accent-color); margin-bottom: 1rem;">Booking Confirmed!</h2>
            <p>Your flight has been successfully booked. A confirmation email has been sent to your registered email address.</p>
            <p style="margin-top: 2rem;"><strong>Booking Reference:</strong> AUR${Date.now().toString().slice(-6)}</p>
            <button onclick="closeModal('confirmationModal')" class="btn-submit" style="margin-top: 2rem;">Close</button>
        </div>
    `;
    
    showCustomModal('Booking Confirmation', confirmationHtml, 'confirmationModal');
}

function setupAuthForms() {
    // Login form
    const loginForm = document.querySelector('#loginModal .auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Login functionality will be implemented with backend integration', 'info');
            closeModal('loginModal');
        });
    }
    
    // Signup form
    const signupForm = document.querySelector('#signupModal .auth-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Registration functionality will be implemented with backend integration', 'info');
            closeModal('signupModal');
        });
    }
}

function handleContactForm(event) {
    event.preventDefault();
    
    showLoadingSpinner();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoadingSpinner();
        showNotification('Thank you for your message. We will get back to you soon!', 'success');
        event.target.reset();
    }, 1500);
}

function setupFormValidation() {
    // Add custom validation styles
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.style.borderColor = '#ef4444';
        });
        
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    setTimeout(() => openModal(toModalId), 300);
}

function showCustomModal(title, content, id = 'customModal') {
    // Remove existing custom modal
    const existingModal = document.getElementById(id);
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create new modal
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('${id}')">&times;</span>
            <h2>${title}</h2>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Utility Functions
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'flex';
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        background: white;
        border-left: 4px solid ${type === 'success' ? 'var(--accent-color)' : type === 'error' ? '#ef4444' : 'var(--primary-color)'};
        box-shadow: var(--shadow-lg);
        z-index: 1003;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" 
               style="color: ${type === 'success' ? 'var(--accent-color)' : type === 'error' ? '#ef4444' : 'var(--primary-color)'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// API Base URL - automatically detects if running locally or deployed
const API_BASE_URL = window.location.hostname === 'localhost' ? 
    'http://localhost:3000' : 
    window.location.origin;

// Air India API Integration Simulation
class AuroraAirwaysAPI {
    static async searchFlights(params) {
        // Make actual API call to our backend
        try {
            const response = await fetch(`${API_BASE_URL}/api/flights/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            
            if (!response.ok) {
                throw new Error('Flight search failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            // Fallback to simulated data
            return {
                success: true,
                flights: flightData.filter(flight => 
                    flight.departure.airport === params.from &&
                    flight.arrival.airport === params.to
                ),
                searchId: 'AUR' + Date.now()
            };
        }
    }
    
    static async priceFlights(flightIds) {
        console.log('Pricing flights:', flightIds);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            success: true,
            prices: flightIds.map(id => ({
                flightId: id,
                price: Math.floor(Math.random() * 50000) + 5000,
                currency: 'INR',
                validUntil: new Date(Date.now() + 15 * 60 * 1000).toISOString()
            }))
        };
    }
    
    static async bookFlight(bookingData) {
        console.log('Creating booking with Air India integration:', bookingData);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
            success: true,
            booking: {
                pnr: 'AUR' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                status: 'CONFIRMED',
                totalAmount: bookingData.totalAmount,
                currency: 'INR',
                createdAt: new Date().toISOString(),
                passengers: bookingData.passengers
            }
        };
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});

// Close passenger dropdown when clicking outside
document.addEventListener('click', function(event) {
    const passengerSelector = document.querySelector('.passenger-selector');
    const dropdown = document.getElementById('passengerDropdown');
    
    if (passengerSelector && dropdown && !passengerSelector.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Add some visual feedback for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AuroraAirwaysAPI,
        airports,
        flightData
    };
}