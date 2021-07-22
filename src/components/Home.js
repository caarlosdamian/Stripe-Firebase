import React from 'react'
import { auth } from '../firebase'

const Home = () => {
    return (
        <div>
            <h1>Welcome Home</h1>
            <button className="waves-effect red btn" onClick={()=>auth.signOut()}>Sing out</button>

        </div>
    )
}

export default Home
