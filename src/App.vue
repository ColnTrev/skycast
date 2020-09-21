<template>
      <main>
        <div class="search-box">
          <input type="text" 
          class="search-bar" 
          placeholder="City, ST"
          v-model="query"
          @keypress="getRequest"
           />
        </div>
        <div class="weather-wrapper" v-if="forecast">
          <div v-if="forecast.name !=='Error'">
            <div class="location-box">
              <div class="location">Forecast for {{forecast.cityData.name}} {{forecast.cityData.state}}</div>
              <div class="date">{{getDate()}}</div>
            </div>
            <div class="weather-box" v-if="forecast.name !== 'Error'">
              <div class="temperature">
                <div>{{Math.round(forecast.forecast.main.temp)}}°F</div>
              </div>
              <div class="status">  
                <div>{{forecast.forecast.weather[0].description}}</div>
                <div>feels like: {{Math.round(forecast.forecast.main.feels_like)}}</div>
              </div>
            </div>
          </div>
          <div class="error-msg" v-else>
            <p>We couldn't fulfill you're request! Try searching with "city, ST" for example: Las Vegas, NV.</p>
            <p>If you are checking for the nation's capital, try "Washington, DC"</p>
          </div>
        </div>
        <div v-else>
          <div class="app-description">
          <p>Welcome to the Sykcast Weather App powered by Open Weather API.</p>
        </div>
      </div>
    </main>
</template>

<script>
import ForecastService from './services/ForecastService.js';
export default {
  name: 'App',
  data() {
    return {
      query: '',
      forecast: null,
    }
  },
  methods: {
    async getRequest(e){
      if(e.key === "Enter" && this.query !== '') {
        await ForecastService.getForecast(this.query).then(item=>{
          if(item){
            this.forecast = item;
          }
        }).catch(error=>{
          this.forecast = {name: 'Error', state: ''};
        });
      }
    },
    getDate(){
      let today = new Date();
      let dd = String(today.getDate()).padStart(2,'0');
      let mm = String(today.getMonth()+1).padStart(2,'0');
      let yyyy = today.getFullYear();
      let formatted = mm + '/' + dd + '/' + yyyy;
      return formatted;
    }
  }
}
</script>


