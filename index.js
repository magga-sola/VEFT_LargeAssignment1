
const ApolloServer = require('apollo-server').ApolloServer;
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://eva:eva@hoopdreamscluster.irlk9.gcp.mongodb.net/test",
    { useNewUrlParser: true }
);

const db = mongoose.connection;

//testing
const playerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    playedGames: { type: PickupGame, required: true },
});

const pickupGameSchema = new mongoose.Schema({
    id: { type: String, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    location: { type: BasketballField, required: true },
    registeredPlayers: {type: [Player], required: true},
    host: {type: Player, required:true}
});
const basketballFieldSchema = new mongoose.Schema({
    capacity: { type: Number, required: true },
    yearOfCreation: { type: Number, required: true },
    pickupGames: { type: [PickupGame], required: true },
    status: { type: BasketballFieldStatus, required: true },
});

const Player = mongoose.model("Player", playerSchema);
const PickupGame = mongoose.model("PickupGame", pickupGameSchema);
const BasketballField = mongoose.model("BasketballField", basketballFieldSchema);

//testing

const resolvers = {};
const typeDefs = require('./schema');

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server
    .listen()
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));