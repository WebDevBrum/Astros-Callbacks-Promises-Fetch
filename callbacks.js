const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText); 
      return callback(data);
    }
  };
  xhr.send();
}

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  section.innerHTML = `
    <img src=${data.thumbnail.source}>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
  `;
}


//good example
//btn.addEventListener('click', () => {
  //getJSON(astrosUrl, console.log);
//});

btn.addEventListener('click', (event) => {
  getJSON(astrosUrl, (json) => { // this was also works withjson in the video
      json.people.map( person => {
        getJSON(wikiUrl + person.name, generateHTML );
      });

  });
  event.target.remove();
});

//alternatively the (json) bit could of been a seperate //function much like generateHtMl eg
/*

getAstronauts(json) => {
      json.people.map( person => {
        getJSON(wikiUrl + person.name, generateHTML );
      });
      
      And we would then of just put getJson(astrosUrl, getAstronauts); (or something like that, see vid)
*/

// so we call callback(data)
// so first time is anonymous(json) which is anonymous(data) 
// giving data.people.map..... (from astros)

// next time is generateHtml(data) (data been data found in wiki)

//

// so the above
// first data is obtained from json(data) from astro url
//this then iterates over each person inside people and 
//appends person.name to the wiki via getJson again to create 
// generateHtml(data) from given wiki url (so would
// effectivley create multiple sections.

/*note astros returns

/ 20200615113602
// http://api.open-notify.org/astros.json

{
  "message": "success",
  "number": 5,
  "people": [
    {
      "craft": "ISS",
      "name": "Chris Cassidy"
    },
    {
      "craft": "ISS",
      "name": "Anatoly Ivanishin"
    },
    {
      "craft": "ISS",
      "name": "Ivan Vagner"
    },
    {
      "craft": "ISS",
      "name": "Doug Hurley"
    },
    {
      "craft": "ISS",
      "name": "Bob Behnken"
    }
  ]
} */

/* and wikipedia returns

// 20200615113925
// https://en.wikipedia.org/api/rest_v1/page/summary/Christopher_Cassidy

{
  "type": "standard",
  "title": "Christopher Cassidy",
  "displaytitle": "Christopher Cassidy",
  "namespace": {
    "id": 0,
    "text": ""
  },
  "wikibase_item": "Q52046",
  "titles": {
    "canonical": "Christopher_Cassidy",
    "normalized": "Christopher Cassidy",
    "display": "Christopher Cassidy"
  },
  "pageid": 6926332,
  "thumbnail": {
    "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chris_Cassidy_-_Official_NASA_Astronaut_Portrait_in_EMU.jpg/256px-Chris_Cassidy_-_Official_NASA_Astronaut_Portrait_in_EMU.jpg",
    "width": 256,
    "height": 320
  },
  "originalimage": {
    "source": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chris_Cassidy_-_Official_NASA_Astronaut_Portrait_in_EMU.jpg",
    "width": 5270,
    "height": 6588
  },
  "lang": "en",
  "dir": "ltr",
  "revision": "961574859",
  "tid": "871b7690-aa24-11ea-8ade-5d6ccf26e8f5",
  "timestamp": "2020-06-09T07:40:41Z",
  "description": "American astronaut and U.S. Navy SEAL",
  "description_source": "central",
  "content_urls": {
    "desktop": {
      "page": "https://en.wikipedia.org/wiki/Christopher_Cassidy",
      "revisions": "https://en.wikipedia.org/wiki/Christopher_Cassidy?action=history",
      "edit": "https://en.wikipedia.org/wiki/Christopher_Cassidy?action=edit",
      "talk": "https://en.wikipedia.org/wiki/Talk:Christopher_Cassidy"
    },
    "mobile": {
      "page": "https://en.m.wikipedia.org/wiki/Christopher_Cassidy",
      "revisions": "https://en.m.wikipedia.org/wiki/Special:History/Christopher_Cassidy",
      "edit": "https://en.m.wikipedia.org/wiki/Christopher_Cassidy?action=edit",
      "talk": "https://en.m.wikipedia.org/wiki/Talk:Christopher_Cassidy"
    }
  },
  "api_urls": {
    "summary": "https://en.wikipedia.org/api/rest_v1/page/summary/Christopher_Cassidy",
    "metadata": "https://en.wikipedia.org/api/rest_v1/page/metadata/Christopher_Cassidy",
    "references": "https://en.wikipedia.org/api/rest_v1/page/references/Christopher_Cassidy",
    "media": "https://en.wikipedia.org/api/rest_v1/page/media/Christopher_Cassidy",
    "edit_html": "https://en.wikipedia.org/api/rest_v1/page/html/Christopher_Cassidy",
    "talk_page_html": "https://en.wikipedia.org/api/rest_v1/page/html/Talk:Christopher_Cassidy"
  },
  "extract": "Christopher John \"Chris\" Cassidy is a NASA astronaut and United States Navy SEAL. Chris Cassidy achieved the rank of captain in the U.S. Navy. He was the Chief of the Astronaut Office at NASA from July 2015 until June 2017.",
  "extract_html": "<p><b>Christopher John \"Chris\" Cassidy</b> is a NASA astronaut and United States Navy SEAL. Chris Cassidy achieved the rank of captain in the U.S. Navy. He was the Chief of the Astronaut Office at NASA from July 2015 until June 2017.</p>"
}

*/