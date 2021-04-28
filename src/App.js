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
    const request = axios.get('https://pietarimurtomaki.com/api/tehtavat')
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
    </div>
  )
}

export default App;
