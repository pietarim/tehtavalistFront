/* import './App.css'; */
import SisaankirjautumisLomake from './components/SisaankirjautumisLomake'
import tehtavaService from './server/tehtavaService'
import TehtavaSivu from './components/tehtava/TehtavaSivu'
import TehtavaLomake from './components/TehtavaLomake'
import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


function App() {
  /* const initialKirj = localStorage.getItem('kayttaja') */
  const [value, setValue] = React.useState(2);
  const [kayttaja, setKayttaja] = useState()
  const [testiKayttaja, setTestiKayttaja] = useState()

  const [tehtava, setTehtava] = useState([])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  const muokkaaState = (muokattava) => {
    let uusiState = []
    tehtava.map(n => { if (n._id === muokattava._id) {
      uusiState = uusiState.concat(muokattava)
    } else {
      uusiState = uusiState.concat(n)
    } })
    setTehtava(uusiState)
    uusiState = []
  }

  const tehtavaPoistaminenKasittelija = async id => {
    tehtavaService.poista(id)
    /* await axios.delete(`http://localhost:3001/api/tehtavat/${id}`) */
    let arr = []
    tehtava.map(n => { if (n._id !== id) {
      arr = arr.concat(n)
    } })
    setTehtava(arr)
  }

  function kirUlos() {
    localStorage.removeItem('kirjautunutTunnus')
    setKayttaja(null)
  }

  useEffect(() => {
    const request = axios.get('http://159.65.20.117/api/tehtavat')
    request.then(response => setTehtava(response.data))
  }, [])
  useEffect(() => {
    const kirjautunutTunnus = window.localStorage.getItem('kirjautunutTunnus')
    if (kirjautunutTunnus) {
      const kayttajaTieto = JSON.parse(kirjautunutTunnus)
      tehtavaService.setToken(kayttajaTieto.token)
      setKayttaja(kayttajaTieto)
    }
  }, [])
  

  function kirjauduUlos() {
    window.localStorage.removeItem('kirjautunutTunnus')
    setKayttaja(null)
  }

  return (
    <div>
      {/* <h1>{kayttaja.tunnus}</h1> */}
      
      {/* <Router>
        <Paper square style={{width: '500px', margin: '0 auto'}}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Link to="/tehtavalista"><Tab label="Tehtävät" style={{margin: '0 auto'}} /></Link>
          <Link to="/lomake"><Tab label="Lisää tehtävä" style={{margin: '0 auto'}} /></Link>
          <Tab to="/lomake" label="kirjaudu ulos" style={{margin: '0 auto'}} />
        </Tabs>
      </Paper>
      <Switch>
        
        <Route path="/tehtavalista" render={() => (<TehtavaSivu tehtavat={tehtava} />)} />
        <Route path="/lomake" component={TehtavaLomake} />
        
      </Switch>
      
      </Router> */}
      {kayttaja ? 
        <div>
          <p>{kayttaja.nimi}: Kirjautunut sisään</p>
          <Router>
        <Paper square style={{width: '500px', margin: '0 auto'}}>
        
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Link to="/"><Tab label="Tehtävät" style={{margin: '0 auto'}} /></Link>
          <Link to="/lomake"><Tab label="Lisää tehtävä" style={{margin: '0 auto'}} /></Link>
          <Link to="/"><Tab onClick={() => kirjauduUlos()} label="kirjaudu ulos" style={{margin: '0 auto'}} /></Link>
        </Tabs>
      </Paper>
      <Switch>
        
        <Route exact path="/" render={() => (<TehtavaSivu muokkaaState={muokkaaState} tehtavaPoistaminenKasittelija={tehtavaPoistaminenKasittelija} tehtavat={tehtava} kayttaja={kayttaja.nimi} />)} />
        {/* <Route path="/lomake" component={TehtavaLomake} /> */}
        <Route path="/lomake" render={() => (< TehtavaLomake tehtava={tehtava} setTehtava={setTehtava} />)} /> 
      </Switch>
      
      </Router>
        </div>  
        :
        <div><SisaankirjautumisLomake setKayttaja={setKayttaja} /></div>
    } 
      


      {/* { !kirjautuminen ? 
      <SisaankirjautumisLomake kirjautuminen={kirjautuminen} setKirjautuminen={setKirjautuminen} /> :
      <div>
        <Button onClick={() => kirUlos()}>Kirjaudu ulos</Button> 
        <TehtavaSivu tehtavat={tehtava} />
      </div>
    } */}
    </div>
  )
}

export default App;
