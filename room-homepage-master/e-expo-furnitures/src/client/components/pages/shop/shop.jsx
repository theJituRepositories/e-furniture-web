import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Shop = ({ }) => {
    return (
        <Card classname='my-3-p-3 rounded'>
            <Link to={`/shop/artworks/&&id=${artwork._id}`}>
            <Card.Img src={artwork.img} variant='top'/>
            </Link>
           <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{artwork.name}</strong>
          </Card.Title>
                </Link>
                <Card.Text as='div'>
                <strong>{artwork.price}</strong>
                </Card.Text>
                <Card.Text as='div'>
                <p>{artwork.description}</p>
                </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default Shop
