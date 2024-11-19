import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const AllMeetUps = ({ searchQuery }) => {
  const [selectedEventType, setSelectedEventType] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data, loading, error } = useFetch(
    "https://meet-up-app-backend-delta.vercel.app/"
  );
console.log(data)
  // Select an event type and filter data
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedEventType(value);
console.log("setSelectedEventType  :- ",value);

    if (value == "Online" || value == "Offline") {
      const filtered = data?.filter((meetUp) => meetUp.typeOfEvent == value);
      setFilteredData(filtered || []);
    }
     else if (value === "Both") {
      setFilteredData(data); // Show all events
    } else {
      setFilteredData(null);
    }
  };

  // Search and filter data locally
  useEffect(() => {
    if (searchQuery && data) {
      const filtered = data.filter((meetUp) =>
        meetUp.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered || []);
    } else if (!searchQuery) {
      setFilteredData(null);
    }
  }, [searchQuery, data]);

  const displayedData = filteredData || data; // Prioritize filtered data

  return (
    <div className="bg-light vh-100">
      <div className="container">
        <hr className="m-0" />
        {/* Heading and Event Selection */}
        <div className="py-4 d-flex justify-content-between">
          <div className="col-md-5">
            <h1 className="display-5 fw-bold">MeetUp Events</h1>
          </div>
          <div className="col-md-2">
            <select
              className="form-select mt-2"
              value={selectedEventType}
              onChange={handleSelectChange}
            >
              <option value="">Select Event Type</option>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>

        {/* Meet-Up Events */}
        <div className="row">
          {loading && (
            <p className="text-center pt-5 text-danger fs-4 fw-medium">
              Loading...
            </p>
          )}

          {displayedData?.length > 0 ? (
            displayedData.map((eventInfo) => (
              <div className="col-md-4 mb-5" key={eventInfo._id}>
              <Link to={`/events/${eventInfo._id}`} className="card col-md-10">
                <img
                  src={eventInfo.eventPictures}
                  className="card-img img-fluid"
                  alt="Event Image"
                  style={{
                    height: "14em",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <div className="card-img-overlay">
                  <p className="bg-white py-2 p-1 rounded col-md-3 text-center">
                    {eventInfo.typeOfEvent}
                  </p>
                </div>
              </Link>
              <p className="m-0 p-0 text-secondary">
                {eventInfo.data} - {eventInfo.timing}
              </p>
              <h5 className="text-dark fs-3 mt-1">{eventInfo.title}</h5>
            </div>
            ))
          ) : (
            !loading && (
              <p className="text-center pt-5 text-muted fs-4">
                No events found!
              </p>
            )
          )}
        </div>

        {error && (
          <p className="text-center text-danger">
            Error fetching data.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllMeetUps;
