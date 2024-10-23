import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AllMeetUps from "./components/AllMeetUps";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header setSearchQuery={setSearchQuery}/>
      <AllMeetUps searchQuery={searchQuery}/>
    </>
  );
}

export default App;
