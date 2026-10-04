```javascript
const API_KEY = "DEMO_KEY";

const dateInput = document.getElementById("dateInput");
const searchBtn = document.getElementById("searchBtn");
const todayBtn = document.getElementById("todayBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const apodContainer = document.getElementById("apodContainer");
const apodImage = document.getElementById("apodImage");
const apodVideo = document.getElementById("apodVideo");

const apodDate = document.getElementById("apodDate");
const apodTitle = document.getElementById("apodTitle");
const apodExplanation = document.getElementById("apodExplanation");
const apodCopyright = document.getElementById("apodCopyright");


// Get today's date
function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// Set maximum date to today
dateInput.max = getTodayDate();


// Fetch NASA APOD
async function getAPOD(date = "") {

    loading.style.display = "block";
    error.style.display = "none";
    apodContainer.style.display = "none";

    try {

        let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

        if (date) {
            url += `&date=${date}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("NASA API request failed");
        }

        const data = await response.json();

        displayAPOD(data);

    } catch (err) {

        console.error(err);

        error.style.display = "block";

    } finally {

        loading.style.display = "none";
    }
}


// Display NASA data
function displayAPOD(data) {

    apodDate.textContent = data.date;

    apodTitle.textContent = data.title;

    apodExplanation.textContent = data.explanation;


    // Display image
    if (data.media_type === "image") {

        apodImage.src = data.hdurl || data.url;

        apodImage.alt = data.title;

        apodImage.style.display = "block";

        apodVideo.style.display = "none";

        apodVideo.src = "";

    }

    // Display video
    else if (data.media_type === "video") {

        apodImage.style.display = "none";

        apodVideo.style.display = "block";

        apodVideo.src = data.url;
    }


    // Copyright
    if (data.copyright) {

        apodCopyright.textContent =
            `Image Credit: ${data.copyright}`;

    } else {

        apodCopyright.textContent =
            "Image Credit: NASA / Astronomy Picture of the Day";
    }


    apodContainer.style.display = "block";
}


// Search selected date
searchBtn.addEventListener("click", () => {

    const selectedDate = dateInput.value;

    if (!selectedDate) {

        alert("Please select a date first.");

        return;
    }

    getAPOD(selectedDate);
});


// Today's picture
todayBtn.addEventListener("click", () => {

    dateInput.value = getTodayDate();

    getAPOD();
});


// Load today's APOD when website opens
window.addEventListener("load", () => {

    dateInput.value = getTodayDate();

    getAPOD();
});
```
