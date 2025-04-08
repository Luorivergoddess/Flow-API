# Getting Started with Flow-API

Welcome to the Flow-API documentation. This guide will help you get started quickly with integrating Flow-API into your applications.

## Installation

```bash
npm install flow-api-client
# OR
yarn add flow-api-client
```

## Basic Usage

```javascript
import { FlowClient } from 'flow-api-client';

// Initialize the client
const client = new FlowClient({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'development'
});

// Make your first API call
async function getData() {
  try {
    const response = await client.data.fetch({
      endpoint: 'users',
      params: { limit: 10 }
    });
    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getData();
```

## Authentication

Flow-API uses API keys for authentication. You can get your API key from the dashboard.

```javascript
// Authentication example
const client = new FlowClient({
  apiKey: process.env.FLOW_API_KEY,
  environment: 'production'
});
```

## Next Steps

- Explore the [API Reference](/documentation/api) for detailed information on all endpoints
- Check out [Examples](/documentation/examples) for common use cases
- Configure [Advanced Settings](/documentation/advanced) for production deployments
