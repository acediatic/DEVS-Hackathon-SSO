import React, { useState } from "react"
import "../styles/form.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { COLORS, GRADIENT, BORDER_RADIUS } from "../styles/constants"
import submitForm from "../utils/connect-to-server"

export default function Login(props) {
  const [isSignIn, setIsSignIn] = useState(null)
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
        {isLoading ? (
          <div className="col-xs-4 text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <button
            style={{
              color: COLORS.lightWhite,
              background: GRADIENT,
              borderRadius: BORDER_RADIUS,
              width: "100%",
            }}
            type="submit"
            onClick={e => {
              e.preventDefault()
              setIsLoading(true)
              submitForm(
                { fName, lName, isSignIn: isSignIn.toString() },
                // Passed to remove spinner when complete.
                setIsLoading
              )
            }}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  )
}
