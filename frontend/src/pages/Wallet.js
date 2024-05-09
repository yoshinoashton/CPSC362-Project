import { React, useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout"
import { UserContext } from "../context/userContext";

export default function Wallet() {
  const context = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [response, setResponse]= useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      amount: amount
    }

    const response = await fetch(`/api/user/balance/${context.username}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return;
    } else {
      const data = await response.json();
      if (data.success) {
        console.log(data);
        context.setBalance(Number(context.balance) + Number(amount));
        localStorage.setItem('balance', Number(context.balance) + Number(amount) )
        setResponse(data);
      } else {
        setResponse(data);
      }
    }
  }




    return (
      <Layout>
        <div className="wallet-page">
          <form className='wallet-form' onSubmit={handleSubmit}>
            <hi>Add Funds</hi>
            <div className='wallet-container'>
              <input type='value' id='amount' name='amount' placeholder='Enter amount'
                    onChange={(e) => { setAmount(e.target.value)}}/>
              <br/><br/>
              <button type='submit'>Add funds</button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }