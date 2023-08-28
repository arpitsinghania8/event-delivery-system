const eventModel = require("../models/EventModel");

class EventController {
  async receiveEvent(req, res) {
    try {
      const event = req.body;
      await eventModel.saveEvent(event);
      res
        .status(202)
        .json({ message: "Event received and queued for delivery." });
    } catch (error) {
      console.error("Error receiving event:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the event." });
    }
  }

  //   async processEvents(req, res) {
  //     try {
  //       const events = await eventModel.getEvents();

  //       for (const event of events) {
  //         // Simulate delivery to destinations (replace with actual delivery code)
  //         console.log('Delivering event:', event);

  //         // Mark the event as processed
  //         await eventModel.markEventAsProcessed(event);
  //       }

  //       res.status(200).json({ message: 'Event processing completed.' });
  //     } catch (error) {
  //       console.error('Error processing events:', error);
  //       res.status(500).json({ error: 'An error occurred while processing events.' });
  //     }
  //   }

  async processEvents(req, res) {
    try {
      const events = await eventModel.getFailedEvents();

      for (const event of events) {
        // Simulate event delivery (replace with actual delivery code)
        const success = await simulateDelivery(event);

        if (success) {
          await eventModel.markEventAsProcessed(event);
        } else {
          await eventModel.markEventAsFailed(event);
        }
      }

      res.status(200).json({ message: "Event processing completed." });
    } catch (error) {
      console.error("Error processing events:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing events." });
    }
  }
}

async function simulateDelivery(event) {
  const maxRetries = 3;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      // Simulate event delivery success (replace with actual delivery code)
      const success = Math.random() < 0.8; // 80% success rate
      if (success) {
        return true;
      }

      // Simulate exponential backoff
      const backoffTime = Math.pow(2, currentRetry) * 1000; // Milliseconds
      await new Promise((resolve) => setTimeout(resolve, backoffTime));

      currentRetry++;
    } catch (error) {
      console.error("Error delivering event:", error);
    }
  }

  return false;
}

module.exports = new EventController();
