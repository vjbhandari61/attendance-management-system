# Attendance Management System

A modern web-based attendance management system built with Next.js, TypeScript, and Tailwind CSS. The system allows users to mark their attendance with facial recognition and location tracking, while administrators can monitor and manage attendance records.

## Features

### User Dashboard
- Mark attendance with facial verification
- Capture location data
- View recent attendance history
- Real-time camera feed for photo capture
- Location tracking
- Face verification simulation

### Admin Dashboard
- View all attendance records
- Search employees by name or email
- Filter attendance by date
- View attendance statistics
- Monitor attendance status (Present/Absent)
- View captured photos and location data

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Tailwind
- **State Management**: React Hooks
- **Camera Access**: Web APIs (getUserMedia)
- **Location Services**: Geolocation API

## Project Structure

```
attendance-management-system/
├── app/                      # Next.js app directory
│   ├── page.tsx             # User dashboard
│   ├── admin/               # Admin routes
│   │   └── page.tsx         # Admin dashboard
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── navigation.tsx       # Navigation bar
│   └── attendance-modal.tsx # Attendance marking modal
└── lib/                     # Utility functions
```

## Key Components

### AttendanceModal
- Handles camera initialization and cleanup
- Manages photo capture process
- Implements face verification simulation
- Handles location tracking
- Error handling for camera and location services

### Navigation
- Provides navigation between user and admin dashboards
- Responsive design with mobile menu
- User profile section

### UI Components
- Button: Reusable button component with variants
- Card: Flexible card component for content sections

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd attendance-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - User Dashboard: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## Current Implementation Status

### Completed
- Basic UI implementation
- Camera integration
- Location tracking
- Mock data structure
- Navigation setup
- Responsive design
- Basic error handling

### Pending Implementation
- Backend API integration
- Real face verification
- User authentication
- Database integration
- Employee management
- Attendance reports
- Data persistence
- Real-time updates

## Contributing

To continue development:

1. **Backend Integration**
   - Create API endpoints for attendance marking
   - Implement user authentication
   - Set up database schema
   - Add real face verification logic

2. **Data Management**
   - Implement proper data storage
   - Add attendance history
   - Create reporting features
   - Add export functionality

3. **Security Features**
   - Add user roles and permissions
   - Implement secure authentication
   - Add data encryption
   - Implement API security

## Environment Setup

The project requires the following permissions:
- Camera access for photo capture
- Location services for attendance tracking
- Local storage for data persistence

## Browser Support

The application requires browsers with support for:
- `getUserMedia` API for camera access
- Geolocation API
- Modern JavaScript features
- WebRTC

## Notes for Developers

- The camera initialization is handled in `AttendanceModal` component
- Mock data is currently used for demonstration
- The face verification is currently simulated
- Location data is captured in real-time
- The UI is fully responsive
- Error handling is implemented for camera and location services

## Next Steps

1. Implement the backend API
2. Add real face verification
3. Set up user authentication
4. Create database schema
5. Add attendance reports
6. Implement data persistence
7. Add real-time updates
8. Enhance security features

## Need Help?

For any questions or issues:
1. Check the existing code comments
2. Review the component structure
3. Test in development mode
4. Contact the project maintainers
