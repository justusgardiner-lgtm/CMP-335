async function getRepo() {
  let gitHubName = document.getElementById("name").value;
  let output = document.getElementById("output");

  if (!gitHubName) {
    output.innerHTML = "Please enter a GitHub username.";
    return;
  }

  let response = await fetch(
    `https://api.github.com/users/${gitHubName}/repos`
  );

  let repoData = await response.json();

  let html = "";

  for (let repo of repoData) {
    html += `<p>${repo.name}: ${repo.html_url}</p>`;
  }

  output.innerHTML = html;
}