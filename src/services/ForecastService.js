import axios from 'axios'
export default {
    async getForecast(query){
        let reqString = '/' + query;
        let res = await axios.get(reqString).then((response)=>{
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