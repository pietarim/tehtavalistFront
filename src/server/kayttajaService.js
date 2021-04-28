import axios from 'axios'

const kirjaudu = async (body) => {

    const osoite = process.env.onlineUrl
                          
    const lahetetty = await axios.post(`https://pietarimurtomaki.com/api/kirjautuminen`, body)
    return lahetetty.data

}

export default kirjaudu