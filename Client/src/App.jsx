// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from './features/counter/counterSlice'
import GameBoard from './components/GameBoard'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import StartPage from './components/StartPage'
import Howto from './components/Howto'
import LeaderBoard from './components/LeaderBoard'

function App() {

  // const count = useSelector(state => state.counter.value)
  // const dispatch = useDispatch()

 


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<StartPage/>}/>
          <Route path='/game' element={<GameBoard/>}/>
          <Route path='/how-to-play' element={<Howto/>}/>
          <Route path='/leaderboard' element={<LeaderBoard/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
