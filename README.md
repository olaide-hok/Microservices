# Blogpost Microservices Application

A microservices-based blog platform allowing users to create posts and comment on them. The app includes content moderation to ensure that comments meet set criteria, providing users with a moderated experience for discussions on posts.

## Features

### Core Functionality

-   **Create Posts**: Users can submit posts.
-   **Comments**: Each post has a form to add comments, which can only be retrieved by their associated post.
-   **Moderation**: Each comment is examined for inappropriate content. Comments containing specific keywords (e.g., "orange") are flagged and their status updated to inform users.

### Moderation States

1. **Approved**: The comment meets criteria and is displayed under the post.
2. **Pending**: Comment is awaiting moderation.
3. **Rejected**: Comment has been flagged as inappropriate and is not displayed.

### Event-Bus

The Event-Bus service receives and publishes events across services. Events are broadcasted to:

-   **Posts Service**
-   **Comments Service**
-   **Moderation Service**
-   **Query Service**

### Technologies Used

-   **Backend Framework**: Express.js
-   **HTTP Client**: Axios
-   **Cross-Origin Resource Sharing**: CORS
-   **Auto-reload**: Nodemon

### Microservices Overview

1. **Posts Service**: Manages post creation and stores posts with basic details.
2. **Comments Service**: Adds comments to posts and interacts with the moderation service.
3. **Moderation Service**: Scans comments for flagged keywords and updates their moderation state.
4. **Query Service**: Handles complex queries to aggregate posts and comments data.

## System Design

### Event-Bus Service

The Event-Bus acts as the communication hub between services. It receives event data, then republishes it to all other services:

```js
// Event structure example
{
  type: 'CommentCreated',
  data: {
    id: '12345',
    postId: '67890',
    content: 'Sample comment content'
  }
}
```

### Moderation Service

Moderates comments based on content:

-   Checks for flagged words (e.g., "orange").
-   Updates comment states to “approved”, “pending”, or “rejected”.
-   Transmits the updated status back to the React app for user visibility.

## Project Structure

Microservices
Each microservice has a Dockerfile for containerization and is managed with Kubernetes for scaling and deployment.

blogpost-microservices/
├── client/
│ ├── Dockerfile
│ └── index.js
├── comments/
│ ├── Dockerfile
│ └── index.js
├── moderation/
│ ├── Dockerfile
│ └── index.js
├── posts/
│ ├── Dockerfile
│ └── index.js
├── query/
│ ├── Dockerfile
│ └── index.js
└── event-bus/
│ ├── Dockerfile
│ └── index.js

## Kubernetes

Deployment and services configurations for each microservice are stored in the infra/k8s folder.

infra/k8s/
├── client-depl.yaml
├── comments-depl.yaml
├── event-bus-depl.yaml
├── ingress-srv-depl.yaml
├── moderation-depl.yaml
├── posts-depl.yaml
├── posts-srv.yaml
└── query-depl.yaml

## Setup & Installation

1. Clone this repository

    ```bash
    git clone https://github.com/olaide-hok/Microservices.git
    ```

2. Install Dependencies

    ```bash
    cd Microservices
    cd into each folder (i.e. client, comments, event-bus,  moderation, posts, query) and run "npm install"
    ```

3. Run locally

    ```bash
    cd into each folder (i.e. client, comments, event-bus,  moderation, posts, query) and run "npm start"
    ```

4. Docker Setup

    ```bash
    cd into each folder (i.e. client, comments, event-bus,  moderation, posts, query) and run docker-compose up --build
    ```

5. Kubernetes Deployment

    ```bash
    kubectl apply -f infra/k8s/
    ```
