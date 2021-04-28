import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import YksiTehtava from './YksiTehtava';


const TehtavaSivu = ({tehtavat, tehtavaPoistaminenKasittelija, kayttaja, muokkaaState}) => {
  const [nayta, setNayta] = useState(false)

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
}

export default TehtavaSivu