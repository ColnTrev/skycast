import axios from 'axios'
export default {
    async getForecast(query){
        let res = await axios.get('https://skycast-api.herokuapp.com/api/' + query).then((response)=>{
                return response.data;
            }).catch((error) => {
                return {
                    name: "Error",
                    state: ""
                }
            });

        return res;
    },
}