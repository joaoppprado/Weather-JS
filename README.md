# Weather JS 🌤️
A responsive weather web application built with Vanilla JavaScript to practice basic API consumption. It features real-time weather data, a 7-day forecast, location-based weather fetching, and dynamic day/night UI themes.

## 📸 Screenshots

Day time UI variant
<img width="1236" height="983" alt="image" src="https://github.com/user-attachments/assets/b7698ea6-1f96-4c8b-ad9b-be6629f22b3c" />


Night time UI variant
<img width="1314" height="984" alt="image" src="https://github.com/user-attachments/assets/55bb4fde-2270-4bca-9e9a-bb0a2aa7f526" />

## 🚀 Features

* **Current Weather & Forecast:** Fetches real-time data and a 7-day forecast.
* **Geolocation:** Automatically loads the weather for the user's current location upon granting permission.
* **Autocomplete Search:** Suggests cities dynamically as the user types.
* **Dynamic Theme:** The UI automatically switches between day and night gradients based on the local time of the searched region.
* **Horizontal Scroll:** Interactive scrolling for the 7-day forecast section.

## 🛠️ Technologies Used

* HTML5
* CSS3 (Custom Properties, Flexbox, Glassmorphism design)
* Vanilla JavaScript (ES6 Modules, Promises, Async/Await)
* [WeatherAPI.com](https://www.weatherapi.com/) (Data provider)

## ⚙️ How to Run Locally

Because this project uses ES6 Modules (`import`/`export`), it must be served via a local web server to avoid CORS policy errors. Opening the `index.html` file directly in the browser will not work.

1.  **Clone the repository:**

    ```bash
    
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    
    ```

3.  **Get an API Key:**
    * Create a free account at [WeatherAPI.com](https://www.weatherapi.com/).
    * Generate your API key.

4.  **Configure the Environment Variable:**
    * In the root of the project, create a folder named `environment`.
    * Inside the `environment` folder, create a file named `key.js`.
    * Add your API key to the file exactly as follows:

        ```javascript
        
        export const apiKey = "YOUR_API_KEY_HERE";
        
        ```
5.  **Run the application:**
    * If using **Visual Studio Code**, install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
    * Right-click on `index.html` and select **"Open with Live Server"**.


## 🤝 Credits

* **Weather Icons:** Animated weather icons by [Bas Milius](https://github.com/basmilius/weather-icons) (Meteocons).
* **UI Icons:** Interface icons provided by [Google Material Symbols](https://fonts.google.com/icons).
