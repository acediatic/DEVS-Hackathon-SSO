import axios from "axios"
import swal from "sweetalert"

const gcfURL =
  "https://australia-southeast1-innate-life-318504.cloudfunctions.net/update-db"

const displaySuccessAlert = isSignIn => {
  swal({
    title: isSignIn === "true" ? "Ahoy, Matey!" : "You're Outta Here!",
    text: `You've successfully signed ${isSignIn === "true" ? "in" : "out"}!`,
    icon: "success",
    button: "Aww yiss!",
  })
}

const displayErrorAlert = () => {
  swal({
    title: "Uh Oh!",
    text:
      "It's us, not you. We hit a snag and couldn't sign you out. Please try again, or let a member of DEVS know!",
    icon: "error",
    button: "*Angry Reaccs*",
  })
}

const submitForm = (userDetails, setIsLoading) => {
  const headers = {
    "Content-Type": "application/json",
  }

  axios
    .post(gcfURL, JSON.stringify(userDetails), { headers })
    .then(response => {
      const success = response.status === 200

      if (success) {
        displaySuccessAlert(userDetails.isSignIn)
      } else {
        displayErrorAlert()
      }
    })
    .catch(error => {
      displayErrorAlert()
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
}

export default submitForm
