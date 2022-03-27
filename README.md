# Weather forecast

The application provides weather information based on your location for the current day and the next 5 days. In addition, it has a graph of how the temperature change will behave for the next 24 hours. The information is obtained in degrees Celsius and degrees Fahrenheit. 

> To get the location data, you must accept that the browser accesses your location data. In addition, the application will store in the localStorage your preferred temperature unit, which can be either degree Celsius or degrees Fahrenheit.

## Steps to install the project locally

Install dependencies

`npm install`

Run the project server

`npm start`

Go to the browser: http://localhost:3001/

<br>

## Development process

Analysis of functional and non-functional requirements.

<br>

### 1. Review of the data sources

Definition of which API provides with all the data required by the project. The OpenWeatherMap API has been selected for this proposal. After creating the account and generating the API key on the OpenWeatherMap portal, API testing is performed in Postman.

> Onecall endpoint was used to bring the current weather, the weather for the next 5 days, and for the creation of the weather graph for the next 24 hours.

![OpenWeatherMap API Onecall](/readme_images/onecall.png "OpenWeatherMap API Onecall")

> Forecast endpoint was used to carry the city's data.

![OpenWeatherMap API Forecast](/readme_images/forecast.png "OpenWeatherMap API Forecast")

### 2. Definition of the project architecture

On the server side, the node.js express framework is used. On the client side, the react library is used.

![Architecture](/readme_images/architecture.png "Architecture")

### 3. Creation of basic wireframe

Figma was used for this purpose. The requirements were considered, and the user interface of similar applications was analyzed.

URL: https://www.figma.com/file/z00kyBIqdWhcLxwuLPQ1lR/Forecast?node-id=0%3A1

![Wireframe](/readme_images/wireframe.png "Wireframe")