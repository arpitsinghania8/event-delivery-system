# Event Delivery System

This is a simple event delivery system implemented using Node.js, Express, and Redis. The system receives events from an HTTP endpoint, queues them for delivery, and processes the events using retry mechanisms with exponential backoff.

## Getting Started

Follow the steps below to set up and run the event delivery system on your local machine.

### Prerequisites

- Node.js (14 or later)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/event-delivery-system.git
   cd event-delivery-system
Install dependencies:

bash
Copy code
npm install
Usage
Start the Node.js server:

bash
Copy code
npm start
The server will start on port 3000 by default.

To receive and queue events:

Send a POST request with an event payload to http://localhost:3000/api/events. Replace { "userID": "123", "payload": "Event data" } with your event data.

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{ "userID": "123", "payload": "Event data" }' http://localhost:3000/api/events
To process events with retries and backoff:

Send a GET request to http://localhost:3000/api/process-events.

bash
Copy code
curl http://localhost:3000/api/process-events
The system will simulate delivery attempts with exponential backoff for failed events.

Docker (Optional)
You can also run the system using Docker for containerized deployment.

Build the Docker image:

bash
Copy code
docker build -t event-delivery-system .
Run a Docker container:

bash
Copy code
docker run -p 3000:3000 event-delivery-system
Customization
You can modify the event payload structure in the EventModel.js file.
Replace the simulateDelivery function in EventController.js with your actual delivery logic.