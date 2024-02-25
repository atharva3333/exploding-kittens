import { NavLink } from "react-router-dom"
import HeroImg from "../assets/hero-img.png"

const StartPage = () => {
  return (
    <div>
        <div className="text-center pt-4 h-screen bg-green-500">
            <h1 className="text-7xl">Exploding Kittens</h1>

            <img src={HeroImg} className="w-[800px] my-8 rounded-lg mx-auto" alt="hero"/>

            <div className="flex justify-center gap-8 bottom-32">
           
                <button className="bg-blue-800 text-white px-8 py-3 rounded-lg text-3xl"> <NavLink to='/how-to-play'>How to Play?</NavLink></button>
                <button className="bg-violet-800 text-white px-8 py-3 rounded-lg text-3xl"><NavLink to='/game'>Start Game</NavLink></button>
                <button className="bg-black text-white px-8 py-3 rounded-lg text-3xl"><NavLink to='/leaderboard'>LeaderBoard</NavLink></button>
                
            </div>
        </div>
    </div>
  )
}

export default StartPage