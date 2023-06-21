const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Artwork {
    id: ID!
    title: String!
    artist: String!
    description: String
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  type NFT {
    id: ID!
    title: String!
    artist: String!
    description: String
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    artworks: [Artwork!]!
    artwork(id: ID!): Artwork
    nfts: [NFT!]!
    nft(id: ID!): NFT
  }

  input ArtworkInput {
    title: String!
    artist: String!
    description: String
    price: Float!
  }

  input NFTInput {
    title: String!
    artist: String!
    description: String
    price: Float!
  }

  type Mutation {
    createArtwork(input: ArtworkInput!): Artwork!
    updateArtwork(id: ID!, input: ArtworkInput!): Artwork!
    deleteArtwork(id: ID!): Artwork!
    createNFT(input: NFTInput!): NFT!
    updateNFT(id: ID!, input: NFTInput!): NFT!
    deleteNFT(id: ID!): NFT!
  }
`

module.exports = typeDefs
