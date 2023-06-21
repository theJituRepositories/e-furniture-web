const db = require('../database/connection');

const artworkResolvers = {
  Query: {
    artworks: () => {
      // Retrieve all artworks from the database
      return db.select().from('artworks');
    },
    artwork: (_, { id }) => {
      // Retrieve a specific artwork by ID from the database
      return db.select().from('artworks').where('id', id).first();
    },
  },
  Mutation: {
    createArtwork: (_, { input }) => {
      // Create a new artwork in the database
      return db('artworks').insert(input).returning('*');
    },
    updateArtwork: (_, { id, input }) => {
      // Update an existing artwork in the database
      return db('artworks').where('id', id).update(input).returning('*');
    },
    deleteArtwork: (_, { id }) => {
      // Delete an artwork from the database
      return db('artworks').where('id', id).del().returning('*');
    },
  },
};

module.exports = artworkResolvers;
