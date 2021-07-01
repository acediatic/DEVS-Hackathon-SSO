import React from "react"
import PropTypes from "prop-types"

import headerImage from "../images/header.png"
import SSO from "./sso"

const Header = ({ siteTitle }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: "4rem 1rem",
    }}
  >
    <div
      style={{
        backgroundImage: `url(${headerImage})`,
        position: "absolute",
        top: 0,
        zIndex: -5,
        height: "100vh",
        width: "100vw",
        opacity: 0.5,
      }}
    />
    <h1 style={{ textAlign: "center" }}>DEVS 2021 Hackathon</h1>
    <h2 style={{ textAlign: "center" }}>Sign In / Sign Out Utility</h2>
    <p style={{ textAlign: "center", maxWidth: 440 }}>
      When you come and go from{" "}
      <a href="https://gridakl.com/12-madden-street/">the Grid,</a> please sign
      in and out for safety reasons - it would sure save our bacon, and it might
      just save yours too!
    </p>
    <SSO />
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
