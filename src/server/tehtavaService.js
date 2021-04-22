import axios from 'axios'
    let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const url = process.env.URL /* 'http://localhost:3001/api/tehtavat' */


const muokkaa = async (muokattu) => {
    const id = muokattu._id
    const lahetettava = {
        otsikko: muokattu.otsikko,
        kuvaus: muokattu.kuvaus,
        tekija: muokattu.tekija
    }
    await axios.put(`http://159.65.20.117/api/tehtavat/${id}`, muokattu)
}

const lisaa = async content => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post('http://159.65.20.117/api/tehtavat', content, config)
    return response.data    
}

const poista = async (id) => {

    const config = {
        headers: { Authorization: token },
    }
    const poistettu = await axios.delete(`http://159.65.20.117/api/tehtavat/${id}`, config)
    poistettu.then(console.log('poistettu'))
}

export default { muokkaa, poista, lisaa, setToken }