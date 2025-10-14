import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import Worker from "./components/Admin/Worker";
import Compandfedbk from "./components/Admin/Compandfedbk";
import { Routes, Route } from "react-router-dom";
import WorkerProfile from "./components/Worker/WorkerProfile";
import WorkerHistory from "./components/Worker/WorkerHistory";
import WorkerPayment from "./components/Worker/WorkerPayment";
import RequestInbox from "./components/Worker/RequestInbox";
import WorkerFeedback from "./components/Worker/WorkerFeedback";
import WorkerDetails from "./components/Worker/WorkerDetails";
import PoliceInbox from "./components/Police Inbox/PoliceInbox";
import PoliceDashboard from "./components/Police Inbox/PoliceDashboard";
import WorkerApproval from "./components/Police Inbox/WorkerApproval";
import Workerregistr from "./components/Worker/Workerregistr";
import UserRegistration from "./components/User/Userregister";
import WorkersTable from "./components/Admin/WorkersTable";
import AdminPanel from "./components/Admin/AdminPanel";
import UserHome from "./components/User/UserHome";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login/> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/PoliceInbox" element={<PoliceInbox />} />
        <Route path="/WorkerProfile" element={<WorkerProfile />} />
        <Route path="/WorkerHistory" element={<WorkerHistory />} />
        <Route path="/WorkerPayment" element={<WorkerPayment />} />
        <Route path="/feedback" element={<Compandfedbk />}></Route>
        <Route path="/Worker" element={<Worker />}></Route>
        <Route path="/RequestInbox" element={<RequestInbox />}></Route>
        <Route path="/Workerfeedback" element={<WorkerFeedback />}></Route>
        <Route path="/Workerdetails" element={<WorkerDetails />}></Route>
        <Route path="/Policehome" element={<PoliceDashboard />}></Route>
        <Route path="/Workeraprove" element={<WorkerApproval />}></Route>
        <Route path="/workerRegistration" element={<Workerregistr />} />
        <Route path="/userregister" element={<UserRegistration />} />
        <Route path="/admin" element={<AdminPanel/>}/>


        {/* --- */}
        <Route path="/viewWorkers" element={<WorkersTable/>}/>
        <Route path="/userhome" element={<UserHome/>}/>
        
      </Routes>
    </>
  );
}

export default App;
