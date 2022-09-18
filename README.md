# Brolly Drone Service
## Some assumptions made
### Registering a drone
- Serial Numbers are auto generated for drones
- Battery is set to 100 when drone is first created
- Drone state is set to idle when drone is first created

### Creating models
- Loaded medication array for storing the various medications on the drone at a any given time

### Available drones
- Drones are only available when they are in `IDLE` and `LOADING` states.

### Logger
- Logger runs every 5 hours

## Setup Instructions
1. Install packages using `npm run build`
2. Run `docker pull mongo` to download the docker image for the database
3. Run `docker-compose up -d` to run the database
4. Run `docker ps -a` to check if the database is running. The status section should be `UP x minutes ago`
5. Run `npm start` to start the Drone API
6. Five drones are pre loaded in the database and their serial numbers stored in `api\db\droneSerialNumbers.txt`
