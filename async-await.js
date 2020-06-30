const astrosUrl = "http://api.open-notify.org/astros.json";
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const peopleList = document.getElementById("people");
const btn = document.querySelector("button");

// Handle all fetch requests

// this replaces commented out below so errors can be handled
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getPeopleInSpace(url) {
  //const peopleResponse = await fetch(url);
  //const peopleJSON = await peopleResponse.json(); // gets the data
  const peopleJSON = await getJSON(url);
  // uses the data for each 'person' that is each object to add the name to wiki url
  // also pulls out the craft data to be used and added to each wiki object
  const profiles = peopleJSON.people.map(async (person) => {
    if (person.name == "Anatoly Ivanishin") {
      person.name = "Anatoli_Ivanishin";
    }
    const craft = person.craft;
    //const profileResponse = await fetch(wikiUrl + person.name);
    //const profileJSON = await profileResponse.json();
    const profileJSON = await getJSON(wikiUrl + person.name);
    console.log({ ...profileJSON, craft });
    return { ...profileJSON, craft }; //so creates a single data/promise object for each person along with merging craft to the object
  });

  console.log(Promise.all(profiles));
  return Promise.all(profiles); //so places them all into a single promise/array
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map((person) => {
    const section = document.createElement("section");
    peopleList.appendChild(section);
    section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  });
}

//parts commented indicate the previous async / await way of completing this ,
// the new way combines with promises as all async fuctions return a promise
// the new way is more readable
btn.addEventListener(
  "click",
  /* async */ (event) => {
    event.target.textContent = "Loading...";

    //const astros = await getPeopleInSpace(astrosUrl); prvious async/await only method before combining with promises
    getPeopleInSpace(astrosUrl)
      .then(generateHTML)
      .catch((e) => {
        peopleList.innerHTML = "<h3>Something went wrong!</h3>";
        console.error(e);
      })
      .finally(() => event.target.remove());
    // generateHTML(astros); SEE ABOVE , THIS WAS PREVIOUS WAY
    //event.target.remove();
  }
);
