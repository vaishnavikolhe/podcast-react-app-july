import React from 'react'
import './styles.css'
function Loader() {
    return (
        <div className='wrapper'>
            <div className='lds-ripple'><div></div><div></div></div>
        </div>
    )
}

export default Loader