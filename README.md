# Exploding Kittens

## Objective
Draw all 5 cards from a deck consisting of Cat, Defuse, Shuffle, and Exploding Kitten cards before the deck runs out.

## How to Play
1. Click "Start Game" to begin.
2. Draw cards from the deck.
3. Win by drawing all 5 cards before the deck is empty.

## Technologies Used
- React: Frontend library for building user interfaces
- Redux: State management library for managing application state
- Tailwind CSS: for styling
- Golang: Backend language for server-side logic
- Gin: Web framework for Golang
- Redis: Database

## Getting Started

### Prerequisites
- Docker installed on your machine
- Node.js and npm installed (Node version :v18.18.0)
- Golang installed (Go version: 1.22.0)

### Setting Up the Server

#### Setting Up Redis via Docker Image
1. Change directory to the server directory.
2. Run `docker pull redis` to pull the Redis Docker image.
3. Run `docker run --name redis-test-instance -p 6379:6379 -d redis` to start a Redis container.

#### Running the Golang Server
1. Run `go get` to download the project dependencies.
2. Run `go run main.go` to start the Golang server with Gin.

### Setting Up the Client
1. Change directory to the client directory.
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start the client on port 5173.

If everything is set up correctly, you should see the game running in your browser.
![1](https://github.com/atharva3333/exploding-kittens/assets/73531009/98f7aa63-cdc9-4d79-ac1f-02a1ac3c94a2)

![2](https://github.com/atharva3333/exploding-kittens/assets/73531009/81aac79f-6c47-4023-8a2c-3f0f6c515435)
![6](https://github.com/atharva3333/exploding-kittens/assets/73531009/ee5a73a8-9baa-49b0-aab2-376f3d3fbf07)
![5](https://github.com/atharva3333/exploding-kittens/assets/73531009/d2267a8f-f642-4748-821e-a357dd0d6554)
![4](https://github.com/atharva3333/exploding-kittens/assets/73531009/5f6fc80c-7736-4e06-b1c8-8bb3d96f040f)
![3](https://github.com/atharva3333/exploding-kittens/assets/73531009/a36a5c3a-3df1-47c4-b1ab-0ee8882c2a76)
