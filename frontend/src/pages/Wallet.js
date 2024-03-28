import { React, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout"
import { UserContext } from "../context/userContext";

export default function Wallet() {
  const context = useContext(UserContext);

  if (context.login) {
    return (
      <Layout>
        <div className="wallet page">
          <p>{context.username}'s Wallet</p>
        </div>
      </Layout>
    );
  } else {
    return <Navigate to='/login' replace={true}/>
  }
}