import axios from 'axios'
/* import env from "react-dotenv"; */

const kirjaudu = async (body) => {

    const osoite = process.env.onlineUrl
                          
    console.log(osoite)
    const lahetetty = await axios.post(`http://159.65.20.117/api/kirjautuminen`, body)
    console.log(lahetetty.data)
    console.log(lahetetty.data.token)
    console.log('tässä on palautettu kirjautumisesta')
    return lahetetty.data

}

export default kirjaudu