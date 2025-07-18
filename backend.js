// Aurora Airways Backend Server
// Node.js Express server with Air India API integration patterns

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Simulated Air India Flight Database
const flightDatabase = [
    {
        id: 'AI101',
        airline: 'Air India',
        aircraft: 'Boeing 787-8',
        from: 'DEL',
        to: 'BOM',
        departure: '06:00',
        arrival: '08:30',
        duration: '2h 30m',
        price: {
            economy: 4500,
            business: 12000,
            first: 25000
        },
        seats: {
            economy: 150,
            business: 20,
            first: 8
        },
        amenities: ['WiFi', 'Meals', 'Entertainment']
    },
    {
        id: 'AI102',
        airline: 'Air India',
        aircraft: 'Airbus A320',
        from: 'BOM',
        to: 'DEL',
        departure: '14:30',
        arrival: '17:00',
        duration: '2h 30m',
        price: {
            economy: 4800,
            business: 13000,
            first: 26000
        },
        seats: {
            economy: 140,
            business: 16,
            first: 6
        },
        amenities: ['WiFi', 'Meals', 'Entertainment']
    },
    {
        id: 'AI201',
        airline: 'Air India',
        aircraft: 'Boeing 777-300ER',
        from: 'DEL',
        to: 'LHR',
        departure: '02:00',
        arrival: '06:30',
        duration: '8h 30m',
        price: {
            economy: 35000,
            business: 85000,
            first: 150000
        },
        seats: {
            economy: 280,
            business: 42,
            first: 12
        },
        amenities: ['WiFi', 'Meals', 'Entertainment', 'Flat Bed']
    },
    {
        id: 'AI301',
        airline: 'Air India',
        aircraft: 'Boeing 787-9',
        from: 'BLR',
        to: 'SFO',
        departure: '01:30',
        arrival: '06:45',
        duration: '17h 15m',
        price: {
            economy: 55000,
            business: 120000,
            first: 200000
        },
        seats: {
            economy: 250,
            business: 30,
            first: 8
        },
        amenities: ['WiFi', 'Meals', 'Entertainment', 'Flat Bed']
    },
    {
        id: 'AI401',
        airline: 'Air India',
        aircraft: 'Airbus A321',
        from: 'CCU',
        to: 'BLR',
        departure: '11:15',
        arrival: '14:00',
        duration: '2h 45m',
        price: {
            economy: 5200,
            business: 14000,
            first: 28000
        },
        seats: {
            economy: 170,
            business: 20,
            first: 8
        },
        amenities: ['WiFi', 'Meals', 'Entertainment']
    }
];

// Booking storage (in production, use database)
let bookings = [];

// API Routes

// Search Flights - Simulating Air India API response
app.post('/api/flights/search', (req, res) => {
    const { from, to, departureDate, returnDate, passengers, class: travelClass } = req.body;
    
    // Simulate API delay
    setTimeout(() => {
        let matchingFlights = flightDatabase.filter(flight => 
            flight.from === from && flight.to === to
        );
        
        // Add date-based variations (simulate different dates)
        const flightsWithDates = matchingFlights.map(flight => ({
            ...flight,
            id: `${flight.id}-${departureDate}`,
            date: departureDate,
            availableSeats: Math.max(0, flight.seats[travelClass] - Math.floor(Math.random() * 20)),
            priceVariation: 1 + (Math.random() * 0.4 - 0.2) // ±20% price variation
        }));
        
        // Add return flights if roundtrip
        if (returnDate) {
            const returnFlights = flightDatabase.filter(flight => 
                flight.from === to && flight.to === from
            ).map(flight => ({
                ...flight,
                id: `${flight.id}-${returnDate}`,
                date: returnDate,
                availableSeats: Math.max(0, flight.seats[travelClass] - Math.floor(Math.random() * 20)),
                priceVariation: 1 + (Math.random() * 0.4 - 0.2)
            }));
            
            res.json({
                success: true,
                outboundFlights: flightsWithDates,
                returnFlights: returnFlights,
                searchId: uuidv4()
            });
        } else {
            res.json({
                success: true,
                flights: flightsWithDates,
                searchId: uuidv4()
            });
        }
    }, 1000);
});

// Get Flight Details
app.get('/api/flights/:flightId', (req, res) => {
    const { flightId } = req.params;
    const baseFlightId = flightId.split('-')[0];
    const flight = flightDatabase.find(f => f.id === baseFlightId);
    
    if (flight) {
        res.json({
            success: true,
            flight: {
                ...flight,
                id: flightId,
                seatMap: generateSeatMap(flight),
                weatherInfo: generateWeatherInfo(),
                delayInfo: generateDelayInfo()
            }
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Flight not found'
        });
    }
});

// Create Booking
app.post('/api/bookings', (req, res) => {
    const { flightId, passengers, contactInfo, paymentInfo } = req.body;
    
    // Validate request
    if (!flightId || !passengers || !contactInfo) {
        return res.status(400).json({
            success: false,
            message: 'Missing required booking information'
        });
    }
    
    // Generate booking
    const booking = {
        id: `AU${Date.now()}`,
        pnr: generatePNR(),
        flightId,
        passengers,
        contactInfo,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        totalAmount: calculateTotalAmount(flightId, passengers),
        paymentStatus: 'completed'
    };
    
    bookings.push(booking);
    
    // Simulate booking confirmation delay
    setTimeout(() => {
        res.json({
            success: true,
            booking,
            message: 'Booking confirmed successfully'
        });
    }, 2000);
});

// Get Booking Details
app.get('/api/bookings/:pnr', (req, res) => {
    const { pnr } = req.params;
    const booking = bookings.find(b => b.pnr === pnr);
    
    if (booking) {
        res.json({
            success: true,
            booking
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Booking not found'
        });
    }
});

// Check-in API
app.post('/api/checkin', (req, res) => {
    const { pnr, lastName } = req.body;
    const booking = bookings.find(b => b.pnr === pnr);
    
    if (booking) {
        // Generate boarding passes
        const boardingPasses = booking.passengers.map((passenger, index) => ({
            passengerName: `${passenger.firstName} ${passenger.lastName}`,
            seat: `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`,
            gate: `A${Math.floor(Math.random() * 20) + 1}`,
            boardingTime: moment().add(2, 'hours').format('HH:mm'),
            barcode: generateBarcode()
        }));
        
        res.json({
            success: true,
            boardingPasses,
            message: 'Check-in successful'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Booking not found'
        });
    }
});

// Helper Functions
function generateSeatMap(flight) {
    const seatMap = [];
    const rows = Math.ceil(flight.seats.economy / 6);
    
    for (let row = 1; row <= rows; row++) {
        const rowSeats = ['A', 'B', 'C', 'D', 'E', 'F'].map(letter => ({
            seat: `${row}${letter}`,
            available: Math.random() > 0.3,
            type: row <= 5 ? 'business' : 'economy'
        }));
        seatMap.push(rowSeats);
    }
    
    return seatMap;
}

function generateWeatherInfo() {
    return {
        departure: {
            condition: 'Clear',
            temperature: Math.floor(Math.random() * 20) + 15,
            humidity: Math.floor(Math.random() * 40) + 40
        },
        arrival: {
            condition: 'Partly Cloudy',
            temperature: Math.floor(Math.random() * 25) + 10,
            humidity: Math.floor(Math.random() * 50) + 30
        }
    };
}

function generateDelayInfo() {
    const isDelayed = Math.random() < 0.1; // 10% chance of delay
    return {
        delayed: isDelayed,
        delayMinutes: isDelayed ? Math.floor(Math.random() * 60) + 15 : 0,
        reason: isDelayed ? 'Weather conditions' : null
    };
}

function generatePNR() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pnr = '';
    for (let i = 0; i < 6; i++) {
        pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pnr;
}

function generateBarcode() {
    return Math.random().toString(36).substr(2, 12).toUpperCase();
}

function calculateTotalAmount(flightId, passengers) {
    const baseFlightId = flightId.split('-')[0];
    const flight = flightDatabase.find(f => f.id === baseFlightId);
    
    if (!flight) return 0;
    
    const basePrice = flight.price.economy; // Simplified - use economy price
    const totalPassengers = passengers.length;
    const taxes = basePrice * 0.12; // 12% taxes
    
    return Math.round((basePrice + taxes) * totalPassengers);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Aurora Airways Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

module.exports = app;