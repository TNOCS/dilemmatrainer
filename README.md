# Dilemma trainer

Dilemma trainer (game) for the Dutch Regional Management Team (Regionaal Beleidsteam, RBT).

## Installation

The application is a mono-repository, developed in node.js and TypeScript, consisting of the following packages:

- Server: to serve and store the games
- Trainer: to create the games
- Trainee: to select and play the game with a group of people or alone
- Common: common functionality and data models (interfaces)

```bash
pnpm m i   # If you don't have pnpm installed, you can install it using `npm i -g pnpm`
npm start  # Note that the first time, you may have to run it twice, since the models haven't been built yet
```

## Development

Assuming the project is running using `npm start`, you can access the server at http://localhost:3030 and the trainer at http://localhost:1234 if you haven't changed the settings or environment variables in the `.env` files.
