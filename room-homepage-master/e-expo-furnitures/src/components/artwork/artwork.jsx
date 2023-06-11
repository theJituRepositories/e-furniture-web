import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchArtworks } from '../actions/artworkActions'
import ArtList from './artList'

const Artwork = () => {
  const dispatch = useDispatch()
  const artworks = useSelector(state => state.artworks)

  useEffect(() => {
    dispatch(fetchArtworks())
  }, [dispatch])

  return (
    <div>
      <h2>Artwork</h2>
      {artworks.loading ? (
        <p>Loading artworks...</p>
      ) : artworks.error ? (
        <p>Error: {artworks.error}</p>
      ) : (
        <ArtList artworks={artworks.items} />
      )}
    </div>
  )
}

export default Artwork
