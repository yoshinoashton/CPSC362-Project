import React from "react"


export default function SignUp() {

  return (
    <div className="signup-page">
      <form className="signup-form">
        <input type="text" id="username" name="username" placeholder="Username"/>
        <input type="text" id="email" name="email" placeholder="Email"/>
        <input type="text" id="password" name="password" placeholder="Password"/>
      </form>
    </div>
  );
}