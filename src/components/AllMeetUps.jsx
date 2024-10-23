import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const AllMeetUps = ({ searchQuery }) => {
  const [selectedEventType, setSelectedEventType] = useState("");
  const [meetUpData, setMeetUpData] = useState(null);
  const [searchMeetUpData, setSearchMeetUpData] = useState(null);

  const { data, loading, error } = useFetch(
    "https://meet-up-app-backend-delta.vercel.app/"
  );

  // select an event and fech data.
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedEventType(value);

    if (value === "Online" || value === "Offline") {
      const fetchMeetUpData = async () => {
        try {
          const response = await fetch(
            `https://meet-up-app-backend-delta.vercel.app/meetUp/events/${value}`
          );
          const result = await response.json();
          setMeetUpData(result.EventData);
          console.log("RESULT:", result.EventData);
        } catch (error) {
          console.log("error in fetching selected event data", error);
        }
      };
      fetchMeetUpData();
    } else {
      setMeetUpData(null);
    }
  };

  // Search and Fetch Data
  useEffect(() => {
    if (searchQuery) {
      console.log("searchQuery:-", searchQuery);
      const searchedMeetUp = async () => {
        try {
          const response = await fetch(
            `https://meet-up-app-backend-delta.vercel.app/meetUp/event/title/${searchQuery}`
          );
          const resultOfSearch = await response.json();
          setSearchMeetUpData(resultOfSearch.filteredData);
          console.log("resultOfSearch:- ", resultOfSearch.filteredData);
        } catch (error) {
          console.log("Error fromsearch and find event:", error);
        }
      };
      searchedMeetUp();
    } else {
      setSearchMeetUpData(null);
      console.log("searched data not found !!!");
    }
  }, [searchQuery]);

  return (
    <div className="bg-light">
      <div className="container">
        <hr className="m-0" />
        {/* for the heading and select event */}
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

        <div className="row">
          {/* Check if searchMeetUpData, meetUpData, or data is available */}
          {(searchMeetUpData || meetUpData || data)?.map((eventInfo) => (
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
          ))}

          {loading && <p className="text-center fs-4 fw-medium">Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default AllMeetUps;
