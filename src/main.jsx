const API_KEY = import.meta.env.VITE_NASA_API_KEY;

// const date = document.querySelector("#datepicker").value;
// fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
const nasa_content_box_fetcher = async () => {
    let data;
    await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`).then(response => response.json()).then(data_fetched => {
        data = data_fetched 
        console.log(data_fetched)
    })
    if (data.media_type === "image") {
        const nasa_provided_graphic_content_element = document.createElement("img");
        nasa_provided_graphic_content_element.setAttribute("src", data.url)
        nasa_provided_graphic_content_element.setAttribute("id", "nasa_provided_graphic_content_element")
        document.querySelector("#tab_screen").prepend(nasa_provided_graphic_content_element)
        console.log("done")
    } else if (data.media_type == "video") {
        const nasa_provided_graphic_content_element = document.createElement("img");
        nasa_provided_graphic_content_element.setAttribute("video", data.url)
        document.querySelector("#tab_screen").prepend(nasa_provided_graphic_content_element)
        console.log("done")
    }
    document.querySelector("#title").innerText = data.title;
    let description_array = data.explanation.split("")
    const description_writer = async (array) => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        
        for (const charecter of array) {
            document.querySelector("#description").append(charecter)
            await sleep(50);
        }
    };
    
    description_writer(description_array)

    console.log(description_array)
    document.querySelector("#date").innerText = data.date;
    document.getElementById("loading").style.display = "none";
    document.getElementById("animation_pause").remove()
    document.getElementById("tab_main").style.display = "flex";

}
nasa_content_box_fetcher()