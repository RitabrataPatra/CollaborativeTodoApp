import { useOthers } from '@liveblocks/react'
import React from 'react'

const SomeoneisTyping = () => {
    const someoneIsTyping = useOthers((others) =>
        others.some((other) => other.presence.isTyping))
  return (
    
    <div className='someone-is-typing' >
        {someoneIsTyping ? "Someone is typing..." : ""}
    </div>
  )
}

export default SomeoneisTyping