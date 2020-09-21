import axios from 'axios'
export default {
    async getForecast(query){
        // let requestString;
        // if(process.env.NODE_ENV === 'production'){
        //     requestString = 'http://collin-skycast-app.herokuapp.com/api/' + query;
        // } else {
        //     requestString = 'http://localhost:5000/api/'+ query;
        // }
        let res = await axios.get('http://collin-skycast-app.herokuapp.com/api/' + query).then((response)=>{
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