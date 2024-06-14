import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Dashboard from "./pages/Dashboard";
import "./assets/jquery/sbAdminJquery.js";
import "./assets/js/sbAdmin.js";
import "./assets/css/sbAdmin.css";
import "./assets/css/fontAwesomeIcon.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import ModalComp from "./components/ModalComp.jsx";
ChartJS.register(ArcElement, Tooltip, Legend);
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./services/firebase/config.js";
import swal from "sweetalert";
import { encodeUser } from "./utils/encodeJwt.js";
import HabitsPage from "./pages/HabitsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { formattedErrorCode } from "./utils/FormaterErrorCode.js";
import { Auth } from "./services/providers/provederAuth.js";
function App() {
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [openModal, setOpenModal] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [comp, setComp] = useState(<Dashboard />);
  const [errMessage, setErrMessage] = useState("");
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOnLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (!res.ok) {
        const data = {
          sub: res.user.uid,
          name: res.user.displayName || "Default",
          iat: res.user.reloadUserInfo.validSince,
        };
        encodeUser(data);
        swal("Good job!", "You clicked the button!", "success");
        localStorage.setItem(
          "urlProfile",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&s"
        );
      }
    } catch (error) {
      setErrMessage(formattedErrorCode(error.code));
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
      console.log("error login", error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const authProvider = new Auth(provider);
    const response = await authProvider.handlePopUpProvider();
    if (!response.ok) {
      const data = {
        sub: response.user.uid,
        name: response.user.displayName,
        iat: response.user.reloadUserInfo.validSince,
      };
      localStorage.setItem("urlProfile", response.user.photoURL);
      encodeUser(data);
      swal("Good job!", "You clicked the button!", "success");
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    localStorage.removeItem("urlProfile");
    window.location.reload();
  };
  // Fungsi untuk menangani perubahan rute berdasarkan nilai yang diberikan
  const handleRoute = (value) => {
    // Gunakan switch statement untuk menentukan komponen yang akan dirender
    switch (value) {
      // Jika nilai adalah "dashboard", atur komponen menjadi <Dashboard />
      case "dashboard":
        setActiveNav("dashboard");
        setComp(<Dashboard />);
        break;

      // Jika nilai adalah "habit", atur komponen menjadi <HabitsPage />
      case "habit":
        setActiveNav("habit");

        setComp(<HabitsPage />);
        break;

      // Jika nilai adalah "profile", atur komponen menjadi <ProfilePage />
      case "profile":
        setActiveNav("profile");

        setComp(<ProfilePage />);
        break;

      default:
        setComp(<Dashboard />);
        break;
    }
  };

  return (
    <>
      <main>
        <div id="page-top" className={"toggle" ? "sidebar-toggled" : ""}>
          <div id="wrapper">
            <ul
              class={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion  ${
                "toggle" ? "toggled" : ""
              } `}
              id="accordionSidebar"
            >
              <a class="sidebar-brand mb-3" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                  <i class="fa-solid fa-leaf"></i>
                </div>
                <div class="sidebar-brand-text mx-3 text-nowrap ">
                  Habit Tracker
                </div>
              </a>
              <hr class="sidebar-divider my-0" />

              <hr class="sidebar-divider" />
              <div class="sidebar-heading">Main</div>
              <li
                class={`nav-item ${activeNav === "dashboard" ? "active" : ""}`}
                onClick={() => handleRoute("dashboard")}
                style={{ cursor: "pointer" }}
              >
                <span class="nav-link">
                  <i class="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </span>
              </li>
              <li
                class={`nav-item ${activeNav === "habit" ? "active" : ""}`}
                onClick={() => handleRoute("habit")}
                style={{ cursor: "pointer" }}
              >
                <span class="nav-link ">
                  <i class="fa-regular fa-star"></i>
                  <span>Habits</span>
                </span>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Custom Components:</h6>
                    <a class="collapse-item" href="buttons.html">
                      Buttons
                    </a>
                    <a class="collapse-item" href="cards.html">
                      Cards
                    </a>
                  </div>
                </div>
              </li>
              <li
                class={`nav-item ${activeNav === "profile" ? "active" : ""}`}
                onClick={() => handleRoute("profile")}
                style={{ cursor: "pointer" }}
              >
                <span class="nav-link " href="#">
                  <i class="fa-solid fa-user"></i>
                  <span>Profile</span>
                </span>
                <div
                  id="collapsePages"
                  class="collapse"
                  aria-labelledby="headingPages"
                  data-parent="#accordionSidebar"
                ></div>
              </li>

              {/* <hr class="sidebar-divider" /> */}
              {/* <div class="sidebar-heading">Login</div> */}
              {sessionStorage.getItem("auth") && (
                <li
                  class="nav-item"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={handleLogout}
                >
                  <a class="nav-link " href="#">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    <span>Logout</span>
                  </a>
                  <div
                    id="collapsePages"
                    class="collapse"
                    aria-labelledby="headingPages"
                    data-parent="#accordionSidebar"
                  ></div>
                </li>
              )}
            </ul>
            {/* <Dashboard CloseSidebar={(toggle) => setToggle(toggle)} /> */}
            {/* <HabitsPage/> */}
            {/* <ProfilePage /> */}
            {comp}
          </div>
        </div>
        {openModal && (
          <ModalComp title={"Sign Up"} isOpen={(state) => setOpenModal(state)}>
            <form onSubmit={handleOnLoginSubmit}>
              {errMessage && <p className="text-danger">{errMessage}</p>}
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3 ">
                <p>
                  Sign In With
                  <a
                    href="#"
                    className="text-primary ms-1"
                    onClick={handleGoogleLogin}
                  >
                    Google
                  </a>
                </p>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </ModalComp>
        )}
        {openModalLogin && (
          <ModalComp
            title={"Sign Up"}
            isOpen={(state) => setOpenModalLogin(state)}
          >
            <form onSubmit={handleOnLoginSubmit}>
              {errMessage && <p className="text-danger">{errMessage}</p>}
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3 ">
                <p>
                  Sign In With
                  <a
                    href="#"
                    className="text-primary ms-1"
                    onClick={handleGoogleLogin}
                  >
                    Google
                  </a>
                </p>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </ModalComp>
        )}
      </main>
    </>
  );
}

export default App;
