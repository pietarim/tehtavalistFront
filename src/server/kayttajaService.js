import axios from 'axios'

const kirjaudu = async (body) => {
                          
    const lahetetty = await axios.post('http://localhost:3001/api/kirjautuminen', body)
    console.log(lahetetty.data)
    console.log(lahetetty.data.token)
    console.log('tässä on palautettu kirjautumisesta')
    return lahetetty.data

}

export default kirjaudu