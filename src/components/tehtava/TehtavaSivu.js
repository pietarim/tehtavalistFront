import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import YksiTehtava from './YksiTehtava';

/* export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
} */

const TehtavaSivu = ({tehtavat, tehtavaPoistaminenKasittelija, kayttaja, muokkaaState}) => {
  const [nayta, setNayta] = useState(false)
  const [katkaisijaTeksti, setKatkaisijaTeksit] = useState('näytä')

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 900,
      margin: '0 auto'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

  function nayttaminen() {
    if (nayta) {
      setKatkaisijaTeksit('piilota')
    } else if (!nayta) {
      setKatkaisijaTeksit('näytä')
    }
    setNayta(!nayta);
  }


  const classes = useStyles();

    return(
      <div className={classes.root}>
        <h1 style={{textAlign: 'center', margin: '60px auto'}}>Tehtävät</h1>
        <hr></hr>
        {tehtavat.map(n => <YksiTehtava muokkaaState={muokkaaState} kayttaja={kayttaja} tehtavaPoistaminenKasittelija={tehtavaPoistaminenKasittelija} tehtava={n} />)}
      </div>
    )

  /* return (
    <div className={classes.root}>
      <YksiTehtava />
      <h2>Tähän tulee tehtäväsivu</h2>
      {tehtavat.map(n => <p key={n.id}>
        Tehtävä: {n.otsikko} omistaja: {n.omistajaId}
        <button onClick={() => nayttaminen()}>{katkaisijaTeksti}</button></p>)}
    </div>
  ); */
}

export default TehtavaSivu


/* 

ensimmäinen onko asia? {<p>asia</p>} : <p>toinen aasia</p>

*/