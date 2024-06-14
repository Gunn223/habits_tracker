import React, { useEffect, useState } from "react";
import Todos from "../components/Todos";
import HabitCard from "../components/HabitCard";
import { getDateNow } from "../utils/dateFormater";
import { useJwt } from "react-jwt";
import { Habits } from "../services/db/habits";
import ModalComp from "../components/ModalComp";
import { confirmSwal } from "../utils/SweetAlert";

const HabitsPage = () => {
  const [dataForm, setDataForm] = useState({
    id: null,
    description: "",
    habit: "",
    id_user: "",
    time: "",
    status: "",
    date: "",
    dateNow: "",
  });

  const { decodedToken, isExpired, reEvaluateToken } = useJwt(
    sessionStorage.getItem("auth")
  );
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [deletedCard, setDeletedCard] = useState("");
  const dateNow = getDateNow();
  const habit = new Habits();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await habit.getHabitByIdUser(
          decodedToken && decodedToken ? decodedToken.sub : ""
        );
        if (response.data) {
          const dateNow = new Date().toISOString().slice(0, 10);
          const filteredData = response.data.filter(
            (item) => item.date === dateNow && item.status === "unfinished"
          );

          setData(filteredData);
        }
      } catch (error) {
        console.log(`error from load data habits page ${error.message}`);
      }
    };
    loadData();
  }, [decodedToken, deletedCard]);

  const handleUpdatedHabit = async (e) => {
    e.preventDefault();
    const response = await habit.updateHabit(dataForm.id, dataForm);
    if (response.statusCode === 200) {
      confirmSwal("updated success", "update habit successful", false);
      setDeletedCard(response);
      setUpdateModalOpen(false);
    }
    try {
    } catch (error) {
      console.log(`error handleupdate habit ${error.message}`);
    }
  };
  const handleonChange = (event) => {
    const { name, value } = event.target;

    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFinishHabit = async (data) => {
    const response = await habit.updateHabit(data.id, data);
    if (response.statusCode === 200) {
      confirmSwal("updated success", "update habit successful", false);
      setDeletedCard(response);
    }
    try {
    } catch (error) {
      console.log(`error handleFinishHabit  ${error.message}`);
    }
  };
  return (
    <div id="content-wrapper" class="d-flex flex-column">
      <div style={{ backgroundImage: "url('/images/bg-habits-banner.png')" }}>
        <div
          className="container  mx-auto row text-black align-items-center justify-content-center flex-col p-3 "
          style={{ minHeight: "15%" }}
        >
          <div className="col">
            <h2 className="fw-semibold">
              Today's :<span className="opacity-50 ">{dateNow}</span>
            </h2>
          </div>
          <div className="col d-flex gap-2 align-items-center">
            <span>
              <img
                src="/images/flame_icon.png"
                alt="flame"
                width={60}
                className="flex-nowrap"
              />
            </span>
            <span>
              <h1 className="fw-bold">12</h1>
              <h3 className="fw-semibold">days Streak</h3>
            </span>
          </div>
        </div>
      </div>
      <Todos dateNow={dateNow} addHabit={(id) => setDeletedCard(id)}>
        <div className="row mt-4 px-3">
          {data &&
            data.length > 0 &&
            data.map((habit, index) => (
              <div className="col" key={index}>
                <HabitCard
                  updateModal={(state) => setUpdateModalOpen(state)}
                  data={habit}
                  deleted={(id) => setDeletedCard(id)}
                  updateddata={(data) => setDataForm(data)}
                  finishedHabit={(data) =>
                    handleFinishHabit({ ...data, status: "finished" })
                  }
                />
              </div>
            ))}
        </div>
      </Todos>
      {updateModalOpen && (
        <ModalComp
          title={"Update Habit"}
          isOpen={(state) => setUpdateModalOpen(state)}
        >
          <form onSubmit={handleUpdatedHabit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="habit" className="form-label">
                  Habit
                </label>
                <select
                  className="form-control"
                  id="habit"
                  name="habit"
                  onChange={handleonChange}
                  value={dataForm.habit}
                >
                  <option value="meditate">Meditate</option>
                  <option value="running">Running</option>
                  <option value="read books">Read Books</option>
                  <option value="write journal">Write Journal</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="date"
                  onChange={handleonChange}
                  value={dataForm.date}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  className="form-control"
                  id="time"
                  value={dataForm.time}
                  onChange={handleonChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deskripsi" className="form-label">
                  Deskripsi
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={handleonChange}
                  value={dataForm.description}
                  style={{ minHeight: "100px", resize: "vertical" }}
                  placeholder="Enter description"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </ModalComp>
      )}
    </div>
  );
};

export default HabitsPage;
