import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Messsage from '../../components/message/message'


const CartScreen = ({ match, location, hitory }) => {
    const artId = match.params.id
    const quatity = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if (artId) {
            dispatch(addToCart(artId, quatity))
        } [dispatch, artId, quatity]
    }, [dispatch, artId, quatity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>

            </Col>
        </Row>
    )
}
export default CartScreen