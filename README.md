


# Multiplayer Tank Game ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=flat&logo=websocket&logoColor=white)

![Tank Game](https://github.com/WilerMS/ts-game/assets/70902862/a0d26c27-da56-4a9f-8788-26ed46c4ac44)

## Description
This multiplayer tank game features a 2D top-down view where players can drive tanks using the WASD keys and shoot by clicking. It's designed to be played on a local network, where multiple players can join and battle it out until the last tank stands. The game leverages WebSockets for real-time multiplayer interaction.

## Features
- [x] **2D Aerial View:** Engage in combat with a top[ ]down perspective.
- [x] **Following Camera:** A camera that follows your tank, ensuring you're always in the action.
- [x] **Projectile Firing:** Click to shoot projectiles at your enemies.
- [x] **Multiplayer via WebSockets:** Real-time gameplay with multiple players over a local network.
- [x] **Canvas Graphics:** Rendered using HTML5 Canvas for smooth graphical output.
- [x] **Developed in Pure TypeScript, HTML, and CSS:** Clean and maintainable codebase.
- [x] **Node.js and Express Backend:** Robust server-side logic to handle multiplayer interactions.

## How to Run
### Server Setup
To deploy the server, navigate to the server directory and run:
```bash
cd server
npm install
npm run dev
```

### Client Setup
To deploy the client, navigate to the web directory and execute:
```bash
cd web
npm install
npm run dev
```

## Additional Features (Coming soon)
- [x] **Responsive Design:** Ensures a great experience across various devices.
- [x] **Game Rooms:** Ability to create and join dedicated game rooms for organized play.

## Contributing
Contributions to improve the game are highly welcome. Feel free to fork this repository, make changes, and submit a pull request.
