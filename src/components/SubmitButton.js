import React from "react"
import { COLORS, GRADIENT, BORDER_RADIUS } from "../styles/constants"

const SubmitButton = props => {
  const { setIsLoading, handleSubmitForm } = props
  return (
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
        handleSubmitForm();
      }}
    >
      Submit
    </button>
  )
}

export default SubmitButton
