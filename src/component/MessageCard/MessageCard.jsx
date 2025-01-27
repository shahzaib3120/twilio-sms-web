import {CopyTwoTone, RightCircleFilled} from "@ant-design/icons";
import "./MessageCard.css";
import MessageAction from "../MessageAction/MessageAction";
import {useComposerContext} from "../../context/ComposerProvider"

// const toBaseDirection = direction => direction.includes('inbound') ? 'inbound' : 'outbound'
const toBaseDirection = (fNumber, iNumber) => fNumber === iNumber ? 'outbound' : 'inbound'
// const messageLabelClass = direction => `message-card-label text-code text-small ${toBaseDirection(direction)}`
const messageLabelClass = (fNumber, iNumber) => `message-card-label text-code text-small ${toBaseDirection(fNumber, iNumber)}`
// const messageLabelRotation = direction => toBaseDirection(direction) === 'inbound' ? 180 : 0
const messageLabelRotation = (fNumber, iNumber) => toBaseDirection(fNumber, iNumber) === 'inbound' ? 180 : 0
const copyStyle = {padding: '0', margin: '0'}

const toDateString = (date) => {
  const d = new Date(date)
  return `${d.toDateString()} ${d.toLocaleTimeString()}`
}

const copyToClipboard = (s) =>
  navigator.clipboard.writeText(s)
    .then(() => console.log('Text copied', s))
    .catch(() => console.log('Unable to copy to clipboard'))

const CopyToClipboard = ({txt}) => <>
  <div className="tooltip message-card-copy-btn" data-tooltip="Copy to clipboard" onClick={() => copyToClipboard(txt)}>
    <CopyTwoTone twoToneColor="#5755d9" style={copyStyle}/>
  </div>
</>

const messageActionOnClick = (baseDirection, from, to, setComposerContext, onActionClick) => {
  if (baseDirection === 'inbound') {
    setComposerContext(from)
  } else {
    setComposerContext(to)
  }
  onActionClick()
}

const MessageCard = ({messageSid='', direction='', from='', to='',
                      date=new Date(), status='', body='', fromNumber='', onActionClick=()=>{}}) => {

  const [ , setComposerContext] = useComposerContext()
  const baseDirection = toBaseDirection(from, fromNumber)

  return <>
    <div className="message-card">
      <div className={messageLabelClass(from, fromNumber)}>
        <RightCircleFilled rotate={messageLabelRotation(from, fromNumber)} />
      </div>
      <div className="message-card-main-container">
        <div className="message-card-header text-tiny">
        <span>
          <CopyToClipboard txt={from}/>
          <strong>From:</strong> {from}
        </span>
        <span>
          <CopyToClipboard txt={to}/>
          <strong>To:</strong> {to}
        </span>
        {/* <span className="message-card-header-status">
          <strong>Status:</strong> {status}
        </span> */}
        {/* <span>
          <strong>Direction:</strong> {direction}
        </span> */}
        </div>
        <div className="message-card-body text-code text-small">
          {body}
        </div>
        <div className="message-card-footer text-tiny">
          <strong>Date: </strong>{toDateString(date)}
          {/* <span>
            <strong>MessageSid: </strong>{messageSid}
          </span> */}
        </div>
        <div className="message-card-action-container">
          <MessageAction
            direction={baseDirection}
            onClick={() => messageActionOnClick(baseDirection, from, to, setComposerContext, onActionClick)}
          />
        </div>
      </div>
    </div>
  </>
}

export default MessageCard
