const redis = require('redis');
const { promisify } = require('util');

class EventModel {
  constructor() {
    this.redisClient = redis.createClient();
    this.rpushAsync = promisify(this.redisClient.rpush).bind(this.redisClient);
  }

  async saveEvent(event) {
    await this.rpushAsync('events', JSON.stringify(event));
  }

  async getEvents() {
    const events = await this.redisClient.lrangeAsync('events', 0, -1);
    return events.map(event => JSON.parse(event));
  }

  async markEventAsProcessed(event) {
    await this.redisClient.lremAsync('events', 0, JSON.stringify(event));
  }

  async getFailedEvents() {
    const failedEvents = await this.redisClient.lrangeAsync('failed_events', 0, -1);
    return failedEvents.map(event => JSON.parse(event));
  }

  async markEventAsFailed(event) {
    await this.rpushAsync('failed_events', JSON.stringify(event));
  }

  async clearFailedEvents() {
    await this.redisClient.delAsync('failed_events');
  }
}

module.exports = new EventModel();
