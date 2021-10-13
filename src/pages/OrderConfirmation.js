import React from "react";
import {delivery} from './delivery.jpg'


export default function OrderConfirmation() {
    return (
       <div className='container'>
           <br/><br/>
           <div className='cart-header'>Thanks for your order</div>
           <div>Your order will soon be delivered</div>
           <br/>
           <div className='animation-div'><img alt='delivery van' className='animate-delivery' src={delivery}/></div>
           <br/>
       </div>
    );
}