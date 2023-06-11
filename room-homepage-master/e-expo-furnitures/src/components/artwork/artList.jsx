import React from 'react'

const ArtList = ({ artworks }) => {
  return (
    <div>
      <h3>Art List</h3>
      {artworks.map(artwork => (
        <div key={artwork.id}>
          <h4>{artwork.title}</h4>
          <p>{artwork.description}</p>
          {/* Render other artwork details */}
        </div>
      ))}
    </div>
  )
}
export default ArtList
