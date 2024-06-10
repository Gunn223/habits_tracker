import React from "react";

const HabitCard = () => {
  return (
    <div
      style={{
        width: "100%", // Menggunakan 100% agar responsif terhadap ukuran kontainer induk
        maxWidth: "500px", // Batasan lebar maksimum agar kartu tidak terlalu lebar
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
      <h5 className="text-center text-white w-100 mt-2">Wake Up Early</h5>
      <p className="text-center text-white w-100">
        <i className="fa-regular fa-clock"></i> 6.00 AM
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2 w-100 mt-2">
        <button className="btn btn-outline-primary flex-grow-1">
          <i className="fa-solid fa-check"></i>
        </button>
        <button className="btn btn-outline-success mx-2 flex-grow-1">
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="btn btn-outline-danger flex-grow-1">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
