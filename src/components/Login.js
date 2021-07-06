// Component to manage user input for the SSO.

import React, { useState } from "react"
import "../styles/form.css"
import "bootstrap/dist/css/bootstrap.min.css"

import LoadingSpinner from "./LoadingSpinner"
import SubmitButton from "./SubmitButton"

import submitForm from "../utils/connect-to-server"

export default function Login(props) {
  // Stores whether the user is signing in (true) or out (false)
  // Set as null so neither is selected initially.
  const [isSignIn, setIsSignIn] = useState(null)
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  // Stores whether the site is currently executing a sign in / out request.
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = () => {
    submitForm(
      { fName, lName, isSignIn: isSignIn.toString() },
      // Passed to remove spinner when complete.
      setIsLoading
    );
  }

  return (
    <form className="shadow min-vw-25">
      <div className="form-group">
        <label htmlFor="fname">First name:</label>
        <input
          id="fname"
          type="text"
          className="form-control"
          placeholder="Bruce"
          value={fName}
          onChange={e => setFName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lname">Last name:</label>
        <input
          id="lname"
          type="text"
          className="form-control"
          placeholder="Wayne"
          value={lName}
          onChange={e => setLName(e.target.value)}
        />
      </div>

      <div>
        <input
          type="radio"
          className="btn-check"
          name="is-sign-in"
          id="success-outlined"
          autoComplete="off"
          checked={isSignIn !== null && isSignIn}
          onChange={e => setIsSignIn(true)}
        />
        <label
          style={{ marginRight: "1rem" }}
          className="btn btn-outline-success"
          htmlFor="success-outlined"
        >
          Sign In{" "}
          <span role="img" aria-label="party emoji">
            🥳
          </span>
        </label>
        <input
          type="radio"
          className="btn-check"
          name="is-sign-in"
          id="danger-outlined"
          autoComplete="off"
          checked={isSignIn !== null && !isSignIn}
          onChange={e => setIsSignIn(false)}
        />
        <label className="btn btn-outline-danger" htmlFor="danger-outlined">
          Sign Out{" "}
          <span role="img" aria-label="sad emoji">
            🥺
          </span>
        </label>
      </div>
      <br />
      <div>
        {/* Renders a spinner if the site is loading, otherwise the submit button */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SubmitButton
            setIsLoading={setIsLoading}
            handleSubmitForm={handleSubmitForm}
          />
        )}
      </div>
    </form>
  )
}
