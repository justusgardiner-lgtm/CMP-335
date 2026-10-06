async function getRepo() {
  let gitHubName = document.getElementById("name").value;
  let output = document.getElementById("output");
//If the entry is empty alert the user
  if (!gitHubName) {
    output.innerHTML = "Please enter a GitHub username.";
    return;
  }
// fetch API 
  let response = await fetch(
    `https://api.github.com/users/${gitHubName}/repos`
  );
// turn the API repsone into a Json array
  let repoData = await response.json();

  let html = "";
// for each object in the array add the name:https into the output inner HTMl
  for (let repo of repoData) {
    html += `<p>${repo.name}: ${repo.html_url}</p>`;
  }

  output.innerHTML = html;
}