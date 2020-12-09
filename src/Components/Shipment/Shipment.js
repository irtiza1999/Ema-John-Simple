import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'
const Shipment = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   const { register, handleSubmit, watch, errors } = useForm();
   const onSubmit = data => {
      const savedCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};
      fetch("https://nameless-lowlands-58863.herokuapp.com/addOrder",{
        method: "POST",
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          processOrder();
          alert("Order placed successfully")
        }
      })
   }
   console.log(watch("example"));
 
   return (
     <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
       <input defaultValue = {loggedInUser.name} placeholder="Name" name="name" ref={register({ required: true })} />
       {errors.name && <span className="error">Name is required</span>}
       
       <input defaultValue = {loggedInUser.email}name="email" placeholder="E-mail" ref={register({ required: true })} />
       {errors.email && <span className="error">E-Mail is required</span>}
       
       <input name="address" placeholder="Enter your address" ref={register({ required: true })} />
       {errors.address && <span className="error">Address is required</span>}
       
       <input name="phone" placeholder="Enter your phone number" ref={register({ required: true })} />
       {errors.phone && <span className="error">Phone number is required</span>}
       <input type="submit" />
     </form>
   );
};
export default Shipment;