
# Parking Lot API

## Overview

The Parking Lot API is a backend service created using Node.js, Express, and MongoDB. It enables efficient management of a parking lot with rate limiting based on IP Address. This API provides endpoints to park a car, unpark a car, and get car/slot information. It also enforces rate limiting based on the IP address of clients.

### Backend Deploy
[Live Demo](https://parking-lot-qjm6.vercel.app/)

### .env

Before running the application, make sure to set the following environment variables in a .env file in the project root directory:

```
PORT=8000
MONGODBURL=your_mongodb_connection_url
PARKING_LOT_SIZE=20
```

## Installation

```
git clone https://github.com/your-username/Parking-Lot.git
cd Parking-Lot
npm install
npm start
```

## API Endpoints

### Park a Car

- **POST /park**: Park a car in the parking lot.

  - Input: Car number [String]
  - Output: Slot where the car is parked
  - If the parking lot is full, return an appropriate error message.

### Unpark the Car

- **DELETE /unpark/:slotNumber**: Remove the car from the specified slot and free it for other cars.

### Get Car/Slot Information

- **GET /info/:query**: Retrieve car number and slot number for the given input (either slot number or car number).

### Constraints

- Parking Lot Size:
  - The size of the parking lot is specified using an environment variable in the .env file.
  - The .env file should be added as .env.sample in the codebase. Do not commit the .env file.
  - The size of the parking lot can be changed when starting the server.

## Contact Information

For any queries and feedback, please contact me at [bethimanideep@gmail.com](mailto:bethimanideep@gmail.com).

---

<h1 align="center">✨Thank You✨</h1>
