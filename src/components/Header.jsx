import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ setSearchQuery }) => {
  const [searchValue, setSearchValue] = useState();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <>
      <header className=" py-2 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <p className="fs-2 mt-2 text-danger fw-medium">MeetUp</p>
              </Link>
            </div>
            <div
              className="bg-white mt-3 d-flex rounded px-2 py-0"
              style={{ height: "40px" }}
            >
              <i class="bi bi-search mt-1 fs-5"></i>
              <input
                type="text"
                className="bg-white form-control mt-0 fs-5 border-0"
                placeholder="Search by event title and tags."
                value={searchValue}
                onChange={handleSearchChange}
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
