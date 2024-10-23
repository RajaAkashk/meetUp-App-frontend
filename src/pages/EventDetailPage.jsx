import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { useState, useEffect } from "react";

// add the front end data is found.

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);

  console.log("eventId", eventId);

  const { data, loading, error } = useFetch(
    `https://meet-up-app-backend-delta.vercel.app/meetUp/${eventId}`
  );

  useEffect(() => {
    if (data) {
      setSelectedEvent(data.filteredData);
    }
  }, [data]);

  if (error) {
    return <h1 className="text-danger text-center">Error in fetching...</h1>;
  }

  console.log("Details page data", data);

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container">
          {selectedEvent ? (
            <div className="">
              <hr className="m-0 p-0 pb-2" />
              <div className="py-4 row">
                <div className="col-md-8">
                  <h1 className="display-6 fw-bold">{selectedEvent.title}</h1>
                  <div className="pt-4">
                    <p className="fs-6 fw-normal p-0">
                      Hosted By : <br />{" "}
                      <span className="fs-5 fw-medium p-0">
                        {selectedEvent.speakers.join(", ")}
                      </span>
                    </p>
                  </div>
                  <div className="py-2">
                    <img
                      src={selectedEvent.eventPictures}
                      alt="Event Picture"
                      className="img-fluid"
                      style={{ width: "33rem" }}
                    />
                  </div>

                  <div className="pt-4">
                    <p className="fs-3  fw-bold">Details:</p>
                    <p className="col-md-10">{selectedEvent.description}</p>
                  </div>

                  <div className="p">
                    <p className="fs-3 fw-bold ">Additional Information:</p>
                    <p className="fs-6 fw-medium">
                      Dress Code:{" "}
                      <span className=" fs-6 fw-normal">
                        {selectedEvent.dressCode}
                      </span>
                    </p>
                    <p className="fs-6 fw-medium">
                      Age Restriction:{" "}
                      <span className=" fs-6 fw-normal">
                        {selectedEvent.ageRestriction}
                      </span>
                    </p>
                  </div>

                  <div className="">
                    <p className="fs-3 pb-2 fw-bold">Events Tags:</p>
                    {selectedEvent.eventTags.map((eventTag, index) => (
                      <span
                        key={index}
                        className="p-2  me-3 bg-danger fs-6 rounded text-light"
                      >
                        {eventTag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-md-4 py-2">
                  <div className="bg-white rounded p-3">
                    <div className="d-flex">
                      <span>
                        <i className="bi bi-clock me-2"></i>
                      </span>
                      <p>
                        {selectedEvent.data} at {selectedEvent.timing}
                      </p>
                    </div>

                    <div className="d-flex">
                      <span>
                        <i className="bi bi-geo-alt me-2"></i>
                      </span>
                      <p>{selectedEvent.address}</p>
                    </div>

                    <div className="d-flex">
                      <span>
                        <i class="bi bi-currency-rupee me-2"></i>
                      </span>
                      <p>{selectedEvent.price}</p>
                    </div>
                  </div>

                  <div className="pt-5">
                    <p className="fs-3 fw-bold">
                      Speakers: ({selectedEvent.speakers.length})
                    </p>

                    <div className="row">
                      {selectedEvent.speakers.map((speaker, index) => (
                        <div className="col-md-6" key={index}>
                          <div className="card d-flex justify-content-center align-items-center p-2 pt-4 shadow-sm border-0">
                            <img
                              src={selectedEvent.speakersImage[index]}
                              className="card-img-top"
                              style={{
                                borderRadius: "50%",
                                width: "70px",
                                height: "70px",
                                objectFit: "cover",
                              }}
                              alt={speaker}
                            />
                            <div className="card-body text-center">
                              <h5 className="card-title pb-0 ">{speaker} </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <p
                      onClick={() => alert("Invitation Send!")}
                      className="btn btn-danger text-light px-5 fw-medium mt-5 "
                    >
                      RSVP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            loading && <p className="text-center fs-4 fw-medium">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
