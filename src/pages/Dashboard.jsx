import React, { useState } from "react";
import { Bar, Line, Chart } from "react-chartjs-2";
import { useJwt } from "react-jwt";
import ModalComp from "../components/ModalComp";
import { User } from "../services/db/users";
import swal from "sweetalert";
import { encodeUser } from "../utils/encodeJwt";
import { getIatOneDayFromNow } from "../utils/dateFormater";
import { confirmSwal } from "../utils/SweetAlert";

const Dashboard = ({ CloseSidebar }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const user = new User();

  const { decodedToken, isExpired, reEvaluateToken } = useJwt(
    sessionStorage.getItem("auth")
  );

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    CloseSidebar(newSidebarState);
  };
  const handleonChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await user.addUser(data.email, data.name, data.password);
      console.log(response);
    } catch (error) {
      console.log(`error handle register user`);
    }
  };
  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await user.userLogin(data.name, data.password);

      if (res.statusCode === 400 || res.statusCode === 404) {
        setErrorMessage(res.message);

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
      if (res.statusCode == 200) {
        encodeUser({
          sub: res.data.userId,
          name: res.data.user,
          iat: getIatOneDayFromNow(),
        });
        setOpenModalLogin(confirmSwal("Login Success!", res.message, true));
      }
    } catch (error) {
      console.log(`error handle login user ${error.message}`);
    }
  };
  return (
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button
            id="sidebarToggleTop"
            onClick={toggleSidebar}
            class="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i class="fa fa-bars"></i>
          </button>
          <ul class="navbar-nav ml-auto">
            <div class="topbar-divider d-none d-sm-block"></div>
            <li class="nav-item dropdown no-arrow">
              {decodedToken ? (
                <div
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                    {decodedToken.name}
                  </span>
                  <img
                    class="img-profile rounded-circle"
                    src={
                      localStorage.getItem("urlProfile") ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/1024px-OOjs_UI_icon_userAvatar-progressive.svg.png"
                    }
                  />
                </div>
              ) : (
                <div
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center gap-1">
                    <button onClick={() => setOpenModalLogin(true)}>
                      Login
                    </button>
                    <button onClick={() => setOpenModal(true)}>Register</button>
                  </span>
                </div>
              )}
            </li>
          </ul>
        </nav>
        <div class="container-fluid">
          <h1 class="h3 mb-4 text-gray-800">Dashboard</h1>
          <div className="row gap-3">
            <div className="col-md-4 border p-3 ">
              <h5>Streak</h5>
              <h1>2 Days</h1>
              <h6>You Current Streak</h6>
            </div>
            <div className="col-md-4 border p-3">
              <h5>Task Today</h5>
              <div className="d-flex align-items-center gap-3">
                <h2>2 Completed</h2>
                <h2>2 Uncompleted</h2>
              </div>
              <h6>You Task Today</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Bar
                data={{
                  labels: [
                    "Senin",
                    "Selasa",
                    "Rabu",
                    "Kamis",
                    "Jumat",
                    "Sabtu",
                    "Minggu",
                  ],
                  datasets: [
                    {
                      label: "Statistik Mingguan",
                      data: [12, 19, 3, 5, 2, 3, 2],
                      borderWidth: 1,
                    },
                  ],
                }}
                type="bar"
              />
            </div>
            <div className="col">
              <Bar
                data={{
                  labels: ["2017", "2018", "2019", "2020", "2021", "2022"], // Tahun-tahun
                  datasets: [
                    {
                      label: "Statistik Tahunan", // Label data
                      data: [150, 200, 250, 300, 350, 400], // Data penjualan tahunan
                      borderWidth: 1, // Ketebalan border
                      backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna latar belakang
                      borderColor: "rgba(75, 192, 192, 1)", // Warna border
                    },
                  ],
                }}
                options={{}}
              />
            </div>
            <div className="col ">
              <Bar
                data={{
                  labels: ["2017", "2018", "2019", "2020", "2021", "2022"], // Tahun-tahun
                  datasets: [
                    {
                      label: "Statistik Tahunan", // Label data
                      data: [150, 200, 250, 300, 350, 400], // Data penjualan tahunan
                      borderWidth: 1, // Ketebalan border
                      backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna latar belakang
                      borderColor: "rgba(75, 192, 192, 1)", // Warna border
                    },
                  ],
                }}
                options={{}}
              />
            </div>
          </div>
        </div>
      </div>
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2024</span>
          </div>
        </div>
      </footer>
      {openModal && (
        <ModalComp title={"Sign Up"} isOpen={(state) => setOpenModal(state)}>
          <form onSubmit={handlRegisterUser}>
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                placeholder="Enter your full name"
                required
                name="name"
                onChange={handleonChange}
              />
            </div>

            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleonChange}
              />
              <small class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                name="password"
                onChange={handleonChange}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </ModalComp>
      )}
      {openModalLogin && (
        <ModalComp
          title={"Sign In"}
          isOpen={(state) => setOpenModalLogin(state)}
        >
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleLoginUser}>
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="fullname"
                placeholder="Enter your full name"
                required
                name="name"
                onChange={handleonChange}
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                name="password"
                onChange={handleonChange}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </ModalComp>
      )}
    </div>
  );
};

export default Dashboard;
