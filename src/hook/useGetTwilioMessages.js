import axios from "axios";
import {
  toCredentials,
  useAuthentication,
} from "../context/AuthenticationProvider";

const useGetTwilioMessages = () => {
  const [authentication] = useAuthentication();
  const credentials = toCredentials(authentication);

  const request = async ({ phoneNumber, interestedPhoneNumber }) => {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${authentication.accountSid}/Messages.json`;
    let result = [];
    // console.log(url);
    // Get messages from the phone number to the interested phone number
    const fromResult = await axios.get(url, {
      auth: credentials,
      params: { From: phoneNumber, To: interestedPhoneNumber },
    });
    const toResult = await axios.get(url, {
      auth: credentials,
      params: { To: phoneNumber, From: interestedPhoneNumber },
    });
    result = result
      .concat(fromResult.data.messages)
      .concat(toResult.data.messages);
    const sortByDate = (a, b) =>
      Date.parse(a.date_created) > Date.parse(b.date_created) ? -1 : 1;
    // console.log(result);
    return result.sort(sortByDate);
  };

  return request;
};

export default useGetTwilioMessages;
