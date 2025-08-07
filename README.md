 <h1>LeetCode User Details Fetcher</h1>

  <p>This project uses the <code>https://leetcode-stats-api.herokuapp.com</code> API to fetch and display a user's LeetCode statistics using JavaScript.</p>

  <h2>Features</h2>
  <ul>
    <li>Fetch LeetCode stats for any username</li>
    <li>Display total problems solved, difficulty-wise breakdown, and more</li>
    <li>Uses modern async/await and Fetch API</li>
  </ul>

  <h2>How to Use</h2>
  <ol>
    <li>Make sure you have internet access (API is hosted online)</li>
    <li>Edit the JavaScript call to <code>fetchUserDetails('your-username')</code></li>
    <li>Open the HTML file in your browser to see the output in console</li>
  </ol>

  <h2>Example Code</h2>
  <pre>
<code>
async function fetchUserDetails(username) {
  const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
</code>
  </pre>
