import axios from 'axios'
import {url} from '../config'


    let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const muokkaa = async (muokattu) => {
    const id = muokattu._id
    const lahetettava = {
        otsikko: muokattu.otsikko,
        kuvaus: muokattu.kuvaus,
        tekija: muokattu.tekija
    }
    await axios.put(`${url}/api/tehtavat/${id}`, muokattu)
}

const lisaa = async content => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${url}/api/tehtavat`, content, config)
    return response.data    
}

const poista = async (id) => {

    const config = {
        headers: { Authorization: token },
    }
    const poistettu = await axios.delete(`${url}/api/tehtavat/${id}`, config)
    poistettu.then(console.log('poistettu'))
}

export default { muokkaa, poista, lisaa, setToken }