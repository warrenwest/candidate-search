import { useState, useEffect } from "react";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<GithubUser[]>([]);

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    const saved = localStorage.getItem("savedCandidates");
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  // Save the candidate to localStorage
  // const saveCandidate = (candidate: GithubUser) => {
  //   const updatedCandidates = [...savedCandidates, candidate];
  //   setSavedCandidates(updatedCandidates);
  //   localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  // };

  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(
      (user) => user.login !== login
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      <div>
        {savedCandidates.length === 0 ? (
          <p>No candidates saved yet.</p>
        ) : (
          <ul>
            {savedCandidates.map((candidate) => (
              <li key={candidate.login} style={{ marginBottom: "10px" }}>
                <img
                  src={candidate.avatar_url}
                  alt={candidate.login}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%", marginRight: "10px" }}
                />
                <a
                  href={candidate.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {candidate.login}
                </a>
                <p>{candidate.name || "No name provided"}</p>
                <p>{candidate.bio || "No bio available"}</p>
                <button
                  className="rejectCandidate"
                  onClick={() => removeCandidate(candidate.login)}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedCandidates;
