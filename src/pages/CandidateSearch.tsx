import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
}

const CandidateSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [randomUser, setRandomUser] = useState<GithubUser | null>(null);

  const fetchUser = async (username: string) => {
    setLoading(true);
    const result = await searchGithubUser(username);
    setUsers([result]); // Only one user based on search
    setLoading(false);
  };

  const fetchRandomUser = async () => {
    setLoading(true);
    try {
      const randomUsers = await searchGithub(); // Fetch random users
      if (randomUsers.length > 0) {
        setRandomUser(randomUsers[0]); // Take the first random user
      } else {
        console.error("No random users returned from API.");
        setRandomUser(null);
      }
    } catch (error) {
      console.error("Error fetching random users:", error);
      setRandomUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSaveCandidate = (candidate: GithubUser) => {
    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    savedCandidates.push(candidate);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    alert("Candidate saved!");
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        placeholder="Search for GitHub users"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={() => fetchUser(searchQuery)}>Search</button>

      {loading && <p>Loading...</p>}

      {users.length > 0 && !loading && (
        <div>
          <h3>User Details:</h3>
          <div className="userDetails">
            <img
              src={users[0].avatar_url}
              alt={users[0].login}
              width={50}
              height={50}
            />
            <a
              href={users[0].html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {users[0].login}
            </a>
            <p>{users[0].name || "No name provided"}</p>
            <p>{users[0].bio || "No bio available"}</p>
            <button
              className="saveCandidate"
              onClick={() => handleSaveCandidate(users[0])}
            >
              +
            </button>
          </div>
        </div>
      )}

      {randomUser && !loading && (
        <div>
          <h3>Random User:</h3>
          <img
            src={randomUser.avatar_url}
            alt={randomUser.login}
            width={50}
            height={50}
          />
          <a
            href={randomUser.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {randomUser.login}
          </a>
          <p>{randomUser.name || "No name provided"}</p>
          <p>{randomUser.bio || "No bio available"}</p>
          <button
            className="saveCandidate"
            onClick={() => handleSaveCandidate(randomUser)}
          >
            +
          </button>
          <button className="rejectCandidate" onClick={fetchRandomUser}>
            -
          </button>
        </div>
      )}
    </div>
  );
};
export default CandidateSearch;
