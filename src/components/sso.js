import React, { useState } from "react"
import "../styles/form.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { COLORS, GRADIENT, BORDER_RADIUS } from "../styles/constants"

import axios from "axios"
const superagent = require("superagent")

const gcfURL =
  "https://australia-southeast1-innate-life-318504.cloudfunctions.net/update-db"

const submitForm = userDetails => {
  const headers = {
    "Content-Type": "application/json",
  }
  axios.post(gcfURL, JSON.stringify(userDetails), { headers })
  alert(JSON.stringify(userDetails))
  // superagent.post(gcfURL).send(JSON.stringify(userDetails))
}

export default function Login(props) {
  const [isSignIn, setIsSignIn] = useState(true)
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")

  return (
    <form className="shadow min-vw-25">
      <div className="form-group">
        <label htmlFor="fname">First Name:</label>
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
        <label htmlFor="lname">Last Name:</label>
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
          checked={isSignIn}
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
          checked={!isSignIn}
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
            submitForm({ fName, lName, isSignIn: isSignIn.toString() })
          }}
        >
          Submit
        </button>
      </div>
    </form>
  )
}
