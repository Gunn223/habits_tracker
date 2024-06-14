import React from "react";
import { getAmOrPm } from "../utils/dateFormater";
import { Habits } from "../services/db/habits";
import { WarningConfirmSwal } from "../utils/SweetAlert";

const HabitCard = ({
  data,
  deleted,
  updateModal,
  updateddata,
  finishedHabit,
}) => {
  const time = getAmOrPm(data.time);

  const habit = new Habits();
  const handleDeleteHabit = async (id) => {
    try {
      WarningConfirmSwal(
        "Are you sure?",
        "Once deleted, you will not be able to recover this habit!",
        () => habit.deleteHabit(id),
        "Habit has been deleted successfully!",
        "Your habit is safe!"
      );
      deleted(id);
    } catch (error) {
      console.log(`error handle delete habit ${error.message}`);
    }
  };
  const handleModalOpen = () => {
    updateModal(true);
    updateddata(data);
  };
  return (
    <div
      style={{
        width: "100%", // Menggunakan 100% agar responsif terhadap ukuran kontainer induk
        maxWidth: "400px", // Batasan lebar maksimum agar kartu tidak terlalu lebar
        height: "auto", // Otomatis menyesuaikan tinggi berdasarkan konten
        padding: "20px", // Menambahkan padding untuk ruang di dalam kartu
      }}
      className="border d-flex flex-wrap justify-content-center align-items-center bg-dark rounded-sm m-2"
    >
      <div className="d-flex flex-wrap align-items-center gap-2 w-100 justify-content-around">
        <img
          src="/icons/running_icon.png"
          alt="Running Man Icon"
          style={{ width: "20%", minWidth: "100px", maxWidth: "150px" }} // Ukuran yang lebih fleksibel untuk ikon
        />
        <span className="bg-white p-1 rounded-sm">
          <i className="fa-solid fa-bell fa-2x" style={{ flexShrink: 0 }}></i>
        </span>
      </div>
      <h5 className="text-center text-white w-100 mt-2">{data.habit}</h5>
      <span className="d-flex gap-3">
        <p className="text-center text-white w-100 text-nowrap ">
          <i class="fa-solid fa-calendar-days"></i> {data.date}
        </p>
        <p className="text-center text-white w-100">
          <i className="fa-regular fa-clock"></i> {data.time} {time}
        </p>
      </span>
      <div className="d-flex flex-wrap justify-content-center gap-2 w-100 mt-2">
        <button
          className="btn btn-outline-primary flex-grow-1"
          onClick={() => finishedHabit(data)}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button
          className="btn btn-outline-success mx-2 flex-grow-1"
          onClick={handleModalOpen}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          onClick={() => handleDeleteHabit(data.id)}
          className="btn btn-outline-danger flex-grow-1"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
