const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-item">
        <li>
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="/SavedCandidates" className="nav-link">
            Potential Candidates
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
