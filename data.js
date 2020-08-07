let responses = [];
const userResponsesSection = document.querySelector('#user-responses');

const fetchUserResponses = async () => {
  const response = await fetch(
    'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vTJMK9-N7hcpBuYG-SahcGfOJuKtXnUhvGAfgvBythXDTvZ4vwOX_E3uwlDDvXP3J9Iu6Fh-n9mFpOS/pub?output=csv'
  );
  const data = await response.text();
  const results = Papa.parse(data, { header: true });
  responses = results.data;
};

// How happy are you that it's Friday?: "5"
// Timestamp: "8/7/2020 13:25:20"
// What is the meaning of life?: "0x2A"
// What is your favorite RBI food?: "Chicken Sandwich"
// What is your favorite painting?: "https://drive.google.com/open?id=1z5GB7zGJymwBGtUNhPYlFEgF0FqYL14I"
// What is your name?: "Suhan"
// What programming skills do you have?: "HTML, CSS, JavaScript"
// What's your favorite sports team?: "Vancouver Canucks"
// When were you born?: "7/7/1989"

const renderUserResponse = userResponse => {
  const fridayHappines = userResponse["How happy are you that it's Friday?"];
  const meaningOfLife = userResponse['What is the meaning of life?'];
  const favoriteFood = userResponse['What is your favorite RBI food?'];
  const favoritePainting = userResponse['What is your favorite painting?'];
  const name = userResponse['What is your name?'];
  const skills = userResponse['What programming skills do you have?'];
  const favoriteTeam = userResponse["What's your favorite sports team?"];
  const birthdate = userResponse['When were you born?'];
  const googlePhotoId = favoritePainting.split('id=')[1];
  return `
    <div class="user-response">
      <h2>${name}</h2>
      <img src="https://drive.google.com/thumbnail?id=${googlePhotoId}" alt="painting" />
      <h3>I love Friday ${fridayHappines}</h3>
      <p>The meaning of life is ${meaningOfLife}</p>
      <h4>My favorite food is ${favoriteFood}</h4>
      <h5>My favorite team is ${favoriteTeam}</h5>
      <h6>Born on ${birthdate}</h6>
      <p>My skills: ${skills}</p>
    </div>
  `;
};

const fetchAndShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponsesHTML = eachUserResponseHTML.join('');
  userResponsesSection.innerHTML = allUserResponsesHTML;
};

fetchAndShowResponses();
