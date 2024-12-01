import React from 'react'
import { useOthers } from '@liveblocks/react'
const Whoistyping = () => {
        //useOthers hook
        const userCount= useOthers((others)=>others.length);
  return (
    <div className='text-xs text-slate-400 dark:text-slate-400 self-end space-y-4'> 
        <h5>{userCount} user(s) online</h5>
    </div>
  )
}

export default Whoistyping