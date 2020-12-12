import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CardForm from './CardForm'
import SplitCardForm from './SplitCardForm'
const stripePromise = loadStripe(
  'pk_test_51HubhJHonQARCwkeqhDsoRgvql1fz9wDOl3tY2LwQ67mYp06UBDvNAJ45pS3Zffa2rIJMt22ATNLieFUq8OzDDfS00IB1GOyfL'
)

const ProcessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <CardForm handlePayment={handlePayment} />
    </Elements>
  )
}

export default ProcessPayment
