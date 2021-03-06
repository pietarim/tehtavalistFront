import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import tehtavaService from '../../server/tehtavaService'
import Typography from '@material-ui/core/Typography';
import muokkaaState from '../../App'

const YksiTehtava = ({tehtava, tehtavaPoistaminenKasittelija, kayttaja, muokkaaState}) => {
    const [nayta, setNayta] = useState(true)
    const [nappi, setNappi] = useState('näytä')
    const [muokkaa, setMuokkaa] = useState(false)
    const [muokattuKuvaus, setMuokattuKuvaus] = useState()

    let array = []

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          maxWidth: 900,
          margin: '0 auto'
        }
      }));

      function muokkausoikeus() {
          if (tehtava.tekija === kayttaja) {
              return (
                  <div>
                      {!muokkaa ? <Button variant="contained" onClick={() => setMuokkaa(!muokkaa)}>muokkaa</Button> :
                    <div>
                        <form onSubmit={Muokkaa}>
                            <TextField fullWidth
                                className={classes.textFiled}
                                id="outlined-multiline-static"
                                label="Tehtävän kuvaus"
                                multiline
                                rows={5}
                                defaultValue="Kuvaus"
                                value={muokattuKuvaus}
                                onChange={kasitteleKuvaus}
                                variant="outlined"
                                style={{ margin: '25px 0' }}
                            />
                            <Button type="submit" primary={true} variant="contained" style={{ margin: '25px 15px' }}>
                                Muokkaa
                            </Button> 
                        </form>
                        <Button onClick={() => setMuokkaa(!muokkaa) } variant="contained" style={{ margin: '25px 15px' }}>
                            Peruuta
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => tehtavaPoistaminenKasittelija(tehtava._id)}>poista</Button>
                    </div>
                    }
                  </div>
              )
          }
      }

      const classes = useStyles();

      function nakymanVaihto() {
        if(nappi === 'näytä') {
            setNappi('piilota')
        } else if(nappi ==='piilota') {
            setNappi('näytä')
        }
        setNayta(!nayta)
      }

    const kasitteleKuvaus = (event) => {
        setMuokattuKuvaus(event.target.value)
    }

    const Muokkaa = (event) => {
        event.preventDefault()
        const muokattava = {
            _id: tehtava._id,
            otsikko: tehtava.otsikko,
            kommentti: muokattuKuvaus,
            tekija: tehtava.tekija
        }
        tehtavaService.muokkaa(muokattava)
        muokkaaState(muokattava)
    }


    return(
        <div /* className={classes.root} */>
            {nayta ? <div key={tehtava._id}>
                <p><b>Otsikko: </b>{tehtava.otsikko} <Button variant="contained" onClick={() => nakymanVaihto()}>{nappi}</Button></p>
                <hr></hr>
            </div> : 
            <div key={tehtava._id}>
                <p><b>Otsikko: </b>{tehtava.otsikko} <Button variant="contained" onClick={() => nakymanVaihto()}>{nappi}</Button></p>
                <Typography><b>Kuvaus: </b>{tehtava.kommentti}</Typography>
                <p><b>Omistaja: </b>{tehtava.tekija}</p>
                {muokkausoikeus()}
                <hr></hr>
            </div>}
        </div>
    )
}

export default YksiTehtava