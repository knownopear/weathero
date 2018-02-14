import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import { graphql, compose } from 'react-apollo' // to help us run the queries
import gql from 'graphql-tag' // write graphql queries

import '../styles/App.css'

class App extends Component {

  render() {

    let {weather_query} = this.props
    console.log({weather_query})

    // the query is loading...
    if (weather_query && weather_query.loading) {
      return (
        <div>
          <img src="https://loading.io/spinners/bluecat/index.blue-longcat-spinner.svg"/>
        </div>
      )
    }

    // the query has errors
    if (weather_query && weather_query.error) {
      return (
        <div>
          { weather_query.error.message }
        </div>
      )
    }

  // the query is fine, we have received the data
    const weatherRender = weather_query.now_weather
    console.log(weatherRender)

    return (
      <div className="App">
        <h4>Temperature<sup> In °C, because imperial units are for losers</sup></h4>
        <p>{weatherRender.temperature}°C, but feels like {weatherRender.apparentTemperature}°C</p>

        <h4>Summary<sup> In case you have no ability to see the big picture</sup></h4>
        <p>{weatherRender.summary}</p>

        <h4>"How wet is the air?"</h4>
        <p>It's at {weatherRender.humidity * 100}% humidity</p>
      </div>
    )
  }
}


const WEATHER_QUERY = gql`
query weather_query {
  now_weather {
    temperature
    apparentTemperature
    summary
    uvIndex
    humidity
  }
}
`

export default compose(
  graphql(WEATHER_QUERY, {name: 'weather_query'})
)(App)
