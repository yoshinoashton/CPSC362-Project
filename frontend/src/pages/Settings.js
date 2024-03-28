import { React, useContext } from "react"
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout"
import { UserContext } from "../context/userContext";

export default function Settings() {
  const context = useContext(UserContext);
  console.log(context.login);


  if (context.login) {
    return (
      <Layout>
        <div className="wallet page">
          <p>{context.username}'s Settings</p>
        </div>
      </Layout>
    );
  } else {
    return <Navigate to='/login' replace={true}/>
  }
}