# Aurora Airways - Complete Flight Booking Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-lightgrey)](https://expressjs.com/)

A modern, responsive flight booking website for Aurora Airways with Air India flight integration patterns. Features a complete booking system with flight search, passenger management, payment processing, and booking management.

## 🚀 Features

### Frontend Features
- **Modern Responsive Design** - Mobile-first approach with beautiful UI
- **Flight Search** - Advanced search with filters for dates, destinations, and preferences
- **Real-time Flight Results** - Dynamic flight listings with pricing and availability
- **Passenger Management** - Add multiple passengers with different categories
- **Seat Selection** - Interactive seat map for choosing preferred seats
- **Booking Management** - View, modify, and cancel bookings
- **User Authentication** - Login/register system for personalized experience
- **Multi-language Support** - English and Hindi language options
- **Payment Integration** - Secure payment processing simulation
- **Mobile Check-in** - Online check-in with boarding pass generation

### Backend Features
- **RESTful API** - Complete API for flight operations
- **Air India Integration Patterns** - Simulated Air India flight data and responses
- **Booking System** - Complete booking lifecycle management
- **PNR Generation** - Unique booking reference generation
- **Flight Search Algorithm** - Intelligent flight matching and filtering
- **Real-time Pricing** - Dynamic pricing with variations
- **Seat Management** - Seat availability and assignment system
- **Weather Integration** - Flight weather information
- **Delay Notifications** - Real-time flight delay updates

## 🛠 Technology Stack

### Frontend
- **HTML5** - Semantic markup with modern standards
- **CSS3** - Custom CSS with CSS Grid and Flexbox
- **Vanilla JavaScript** - ES6+ features with modern JavaScript
- **Font Awesome** - Icon library for UI elements
- **Google Fonts** - Typography with Inter font family

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web framework for Node.js
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **Moment.js** - Date and time manipulation

## 📦 Installation

### Prerequisites
- Node.js (>=14.0.0)
- npm (>=6.0.0)
- Web browser (Chrome, Firefox, Safari, Edge)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/aurora-airways/booking-system.git
cd aurora-airways
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Access the application**
Open your browser and navigate to:
```
http://localhost:3000
```

### Alternative Development Mode
For development with auto-restart:
```bash
npm run dev
```

## 🌐 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Flight Search
```http
POST /api/flights/search
Content-Type: application/json

{
  "from": "DEL",
  "to": "BOM",
  "departureDate": "2024-02-15",
  "returnDate": "2024-02-20",
  "passengers": {
    "adults": 2,
    "children": 1,
    "infants": 0
  },
  "class": "economy"
}
```

#### Get Flight Details
```http
GET /api/flights/:flightId
```

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "flightId": "AI101-2024-02-15",
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-01",
      "gender": "male",
      "nationality": "Indian"
    }
  ],
  "contactInfo": {
    "email": "john.doe@email.com",
    "phone": "+91-9876543210"
  },
  "paymentInfo": {
    "method": "card",
    "cardNumber": "****-****-****-1234"
  }
}
```

#### Get Booking Details
```http
GET /api/bookings/:pnr
```

#### Check-in
```http
POST /api/checkin
Content-Type: application/json

{
  "pnr": "ABC123",
  "lastName": "Doe"
}
```

## 🛫 Air India Integration

This application simulates Air India's flight booking system with:

### Flight Database
- **Domestic Routes**: Delhi-Mumbai, Bangalore-Chennai, Kolkata-Bangalore
- **International Routes**: Delhi-London, Bangalore-San Francisco
- **Aircraft Types**: Boeing 787-8, Boeing 777-300ER, Airbus A320, Airbus A321
- **Service Classes**: Economy, Business, First Class

### Pricing Structure
- **Dynamic Pricing**: ±20% variation based on demand
- **Tax Calculation**: 12% taxes included
- **Class-based Pricing**: Different rates for Economy, Business, First

### Flight Features
- Real-time seat availability
- Weather information for departure/arrival cities
- Flight delay notifications
- In-flight amenities (WiFi, Meals, Entertainment)

## 🎨 UI/UX Features

### Design Elements
- **Color Scheme**: Professional blue (#2563eb) with accent colors
- **Typography**: Inter font family for modern readability
- **Icons**: Font Awesome for consistent iconography
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

### User Experience
- **Intuitive Navigation**: Clear menu structure and breadcrumbs
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation support

## 📱 Mobile Features

### Responsive Design
- Mobile-optimized layouts
- Touch-friendly interface
- Swipe gestures for flight selection
- Collapsible navigation menu

### Mobile-specific Features
- Mobile check-in
- Boarding pass in mobile format
- GPS-based airport information
- Push notification simulation

## 🔒 Security Features

### Frontend Security
- Input validation and sanitization
- XSS prevention measures
- CSRF protection patterns
- Secure form handling

### Backend Security
- CORS configuration
- Input validation
- Error handling without sensitive data exposure
- Rate limiting considerations

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
- API endpoint testing
- Form validation testing
- Booking flow testing
- Error handling testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email**: support@aurora-airways.com
- **Phone**: +91-1800-123-4567
- **Website**: https://aurora-airways.com

## 🗺 Roadmap

### Upcoming Features
- [ ] Real Air India API integration
- [ ] Advanced seat selection with 3D view
- [ ] Loyalty program integration
- [ ] Multi-currency support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered chatbot support

## 🙏 Acknowledgments

- Air India for inspiration and flight data patterns
- Font Awesome for icons
- Google Fonts for typography
- Express.js community for excellent documentation
- Open source community for various libraries and tools

---

**Aurora Airways** - Your Journey Begins Here ✈️