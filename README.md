# Dilemma trainer

Dilemma training tool for the Dutch Regional Management Team (Regionaal Beleidsteam, RBT).

## Installation

The application is a mono-repository, developed in node.js, TypeScript and Mitril. It consistes of the following packages:

- Server: to serve and store the scenarios
- Trainer: to create the scenarios
- Trainee: to select and play the scenarios with a group of people or alone
- Common: common functionality and data models (interfaces)

```bash
# If you want to start the server and the trainer 
pnpm m i   # If you don't have pnpm installed, you can install it using `npm i -g pnpm`
npm start  # Note that the first time, you may have to run it twice, since the models haven't been built yet

# If you want to start the trainee 
cd packages/trainee 
npm start # Trainer and server need to be runnning for it to be used.
```

## Development

Assuming the project is running using `npm start`, you can access the server at http://localhost:3030 and the trainer/trainee at http://localhost:1234 . If you start both the trainer and the trainee, the second one you started will go on a random available port. That is if you haven't changed the settings or environment variables in the `.env` files.
