# ♟️ Multiplayer Chess Game

A real-time two-player Chess game with spectator support, built using HTML, CSS, JavaScript, and WebSockets. Designed for an engaging experience where:
- 🧑‍🤝‍🧑 The **first user** becomes **White**
- 👤 The **second user** joins as **Black**
- 👁️‍🗨️ Any additional user becomes a **Spectator**

[🔗 Live Demo](https://abhradip001.github.io/chess/) *(if hosted)*

---

## 🖼️ Game Screenshots

### 🎮 Player 1 (White)
![Player 1 Screenshot](./assets/player1.png)

### 🎮 Player 2 (Black)
![Player 2 Screenshot](./assets/player2.png)

### 👁️ Spectator View
![Spectator Screenshot](./assets/spectator.png)

---

## ⚙️ Features

- ♟️ Standard chess gameplay rules with legal move enforcement
- 🔄 Real-time communication between players using WebSockets
- 👁️ Live board view for spectators
- 🧠 Built on top of `chess.js` (game logic) and `chessboard.js` (UI)
- 🧼 Clean, responsive UI with intuitive controls
- 🔐 Turn-based move locking

---

## 🧑‍💻 Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Game Logic:** [`chess.js`](https://github.com/jhlywa/chess.js)
- **Board Rendering:** [`chessboard.js`](https://github.com/oakmac/chessboardjs)
- **Real-time Communication:** Socket.IO (Node.js WebSocket library)

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (for WebSocket server)
- Git

### 🔧 Setup Instructions

```bash
git clone https://github.com/abhradip001/chess.git
cd chess
npm install
npm start
