# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


```JavaScript
OLd code.
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Corrected import
import './Weather.css';

// Import React Bootstrap components.
import { Container, Row, Col, Card } from 'react-bootstrap';

const Weather = () => {
    const [weatherData, setWeatherData] = useState({}); // Corrected initialization

    const CITY = "allahabad";
    const API_Key = '1e6b4adee09751e8a20ba35907014d3a';

    const weatherFunction = async () => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_Key}&units=metric`);
            setWeatherData(res.data);
        } catch (error) {
            console.log("Error:", error.message);
        }
    }

    useEffect(() => {
        console.log("useEffect..");
        weatherFunction();
    }, []);

    // get current Data and time.
    const getCurrentTime = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        const currentTime = new Date();
        const day = days[currentTime.getDay()];
        const month = months[currentTime.getMonth()];
        const year = currentTime.getFullYear();
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        let period = "AM";
    
        // Adjust hours to 12-hour format and determine AM/PM
        if (hours >= 12) {
            period = "PM";
            if (hours > 12) {
                hours -= 12;
            }
        }
        if (hours === 0) {
            hours = 12;
        }
    
        const formattedTime = `${day} ${month} ${currentTime.getDate()}, ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    
        console.log(currentTime);
        return formattedTime;
    };
    console.log(getCurrentTime());
    
    return (
        <div className="background-container">
            <Container>
                <Row>
                    <Col md={8}>
                        <Card className="text-center">
                            <Card.Header>Weather Apps</Card.Header>
                            {Object.keys(weatherData).length !== 0 && ( // Check if weatherData is not empty
                                <Card.Body>
                                    <Card.Title>{weatherData.name}, {weatherData.sys.country}</Card.Title>
                                    <Card.Text>
                                        Temp: {weatherData.main.temp} °C
                                        <br />
                                        {weatherData.weather[0].main}
                                        <br />
                                    </Card.Text>
                                </Card.Body>
                            )}
                            <Card.Footer className="text-muted">{getCurrentTime()}</Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Weather;


```
