async function getGitHubData() {
  const username = document.getElementById('username').value;
  const url = `https://api.github.com/users/${username}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.message === "Not Found") {
      document.getElementById('resume').innerHTML = "User not found.";
      return;
    }

    const resumeHTML = \`
      <img src="\${data.avatar_url}" width="100" />
      <h2>\${data.name || data.login}</h2>
      <p>\${data.bio || "No bio available"}</p>
      <p>Public Repos: \${data.public_repos}</p>
      <p>Followers: \${data.followers}</p>
      <p>Following: \${data.following}</p>
      <a href="\${data.html_url}" target="_blank">Visit GitHub Profile</a>
    \`;
    
    document.getElementById('resume').innerHTML = resumeHTML;

    const reposUrl = `https://api.github.com/users/\${username}/repos`;
    const reposRes = await fetch(reposUrl);
    const repos = await reposRes.json();

    let reposHTML = "<h3>Repositories:</h3><ul>";
    repos.forEach(repo => {
      reposHTML += \`<li><a href="\${repo.html_url}" target="_blank">\${repo.name}</a></li>\`;
    });
    reposHTML += "</ul>";
    document.getElementById('resume').innerHTML += reposHTML;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

