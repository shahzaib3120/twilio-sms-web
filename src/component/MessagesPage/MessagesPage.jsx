import {useState} from "react";
import {Tabs} from "./MessagesPageView";
import {useAuthentication} from "../../context/AuthenticationProvider";
import {useHistory} from "react-router-dom";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import PhoneNumberSelector from "../PhoneNumberSelector/PhoneNumberSelector";

const EMPTY_PHONE_NUMBER = ''

const MessagesPage = () => {
  const [error, setError] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(EMPTY_PHONE_NUMBER)
  const [interestedPhoneNumber, setInterestedPhoneNumber] = useState(EMPTY_PHONE_NUMBER)
  const [authentication] = useAuthentication()
  const history = useHistory()

  // TODO: Move this to a router guard
  if (!authentication?.accountSid) {
    history.push('/authentication')
    return null
  }

  const handleError = (err) => setError(err)

  const handlePhoneNumberChange = (v) => setPhoneNumber(v)
  const handleInterestedPhoneNumberChange = (v) => setInterestedPhoneNumber(v)

  const isPhoneNumberSelected = (phoneNumber !== EMPTY_PHONE_NUMBER) && (interestedPhoneNumber !== EMPTY_PHONE_NUMBER)

  return <DefaultLayout>
    <h4>Messages</h4>
    <ErrorLabel error={error}/>
    <br/>
    <h4>Thread of:</h4>
    <PhoneNumberSelector onError={handleError} onPhoneNumberChange={handlePhoneNumberChange}/>
    <h4>with:</h4>
    <input type="text" placeholder="Enter a phone number" value={interestedPhoneNumber} onChange={e => handleInterestedPhoneNumberChange(e.target.value)}/>
    {isPhoneNumberSelected && <Tabs phoneNumber={phoneNumber} interestedPhoneNumber={interestedPhoneNumber}/>}
  </DefaultLayout>
}

export default MessagesPage
