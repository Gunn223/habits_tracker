import React from "react";
import Todos from "../components/Todos";
import HabitCard from "../components/HabitCard";

const HabitsPage = () => {
  const dateNow = new Date();

  // Format dengan toLocaleDateString
  const formattedDate = dateNow.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div id="content-wrapper" class="d-flex flex-column">
      <div style={{ backgroundImage: "url('/images/bg-habits-banner.png')" }}>
        <div
          className="container  mx-auto row text-black align-items-center justify-content-center flex-col p-3 "
          style={{ minHeight: "15%" }}
        >
          <div className="col">
            <h2 className="fw-semibold">
              Today's :<span className="opacity-50 ">{formattedDate}</span>
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
      <Todos>
        <div className="row mt-4 px-3">
          <div className="col ">
            <HabitCard />
          </div>
          <div className="col">
            <HabitCard />
          </div>
          <div className="col">
            <HabitCard />
          </div>
          <div className="col ">
            <HabitCard />
          </div>
        </div>
      </Todos>
    </div>
  );
};

export default HabitsPage;
