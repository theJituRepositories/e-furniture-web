const db = require('../database/connection');

const nftResolvers = {
  Query: {
    nfts: () => {
      // Retrieve all NFTs from the database
      return db.select().from('nfts');
    },
    nft: (_, { id }) => {
      // Retrieve a specific NFT by ID from the database
      return db.select().from('nfts').where('id', id).first();
    },
  },
  Mutation: {
    createNFT: (_, { input }) => {
      // Create a new NFT in the database
      return db('nfts').insert(input).returning('*');
    },
    updateNFT: (_, { id, input }) => {
      // Update an existing NFT in the database
      return db('nfts').where('id', id).update(input).returning('*');
    },
    deleteNFT: (_, { id }) => {
      // Delete an NFT from the database
      return db('nfts').where('id', id).del().returning('*');
    },
  },
};

module.exports = nftResolvers;
