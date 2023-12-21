import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import Register from './components/Register';
import  "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import GameRoom from './components/GameRoom';
import Login from './components/Login';
import Cardmaker from './components/Cardmaker';
import Matchmaking from './components/Matchmaking';
import AllCards from './components/AllCards';
import UpdateCard from './components/UpdateCard';
import Win from './components/Win';
import Profile from './components/Profile';
import Reply from './components/Reply';
import Battle from './components/Battle';
import Notify from './components/Notify';
import GetCards from './components/GetCards';
import Store from './components/Store';
import View from './components/View';
import Chest from './components/Chest';
import Trade from './components/Trade';
import DeckSelect from './components/DeckSelect';
import ManageDeck from './components/ManageDeck';
import Starter from './components/Starter';
import StarterView from './components/StarterView';
import Avatar from './components/Avatar';
import FindTrainer from './components/FindTrainer';
import Learn from './components/Learn';
import Unban from './components/Unban';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Register/>} path="/" />
            <Route element={<Home/>} path="/home"/>
            <Route element={<GameRoom/>} path="/game/:id/:id2"/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Cardmaker/>} path="/cardmaker"/>
            <Route element={<Matchmaking/>} path="/matchmaking" />
            <Route element={<AllCards/>} path="/allcards" />
            <Route element={<UpdateCard/>} path="/updatecard/:name" />
            <Route element={<Win/>} path="/win/:game" />
            <Route element={<Profile/>} path="/profile/:id"/>
            <Route element={<Reply/>} path="/reply/:id/:user"/>
            <Route element={<Battle/>} path="/battle/:id"/>
            <Route element={<Notify/>} path="/notify/:type" />
            <Route element={<GetCards/>} path="/getcards" />
            <Route element={<Store/>} path="/store"/>
            <Route element={<View/>} path="/view/:poke/:type/:cost"/>
            <Route element={<Chest/>} path="/chest"/>
            <Route element={<Trade/>} path="/trade/:id" />
            <Route element={<DeckSelect/>} path="/deckselect"/>
            <Route element={<ManageDeck/>} path="/manageDeck/:deckName" />
            <Route element={<Starter/>} path="/starter"/>
            <Route element={<StarterView/>} path="/starterView/:start" />
            <Route element={<Avatar/>} path="/avatar"/>
            <Route element={<FindTrainer/>} path="/findTrainer"/>
            <Route element={<Learn/>} path="/learn"/>
            <Route element={<Unban/>} path="/unban"/>


          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
