import React from "react";
import "../assets/css/style.css";
const Todos = ({ children }) => {
  return (
    <>
      <div className="row">
        <div className="col md-12">
          <div className="d-flex align-items-center text-black justify-content-between px-3 mt-2">
            <h3>Todo</h3>
            <div>
              <button className="btn btn-outline-secondary rounded-circle btn-fixed-size ">
                S
              </button>
              <button className="btn btn-outline-secondary rounded-circle btn-fixed-size">
                M
              </button>
              <button className="btn btn-outline-secondary rounded-circle btn-fixed-size">
                T
              </button>
              <button className="btn btn-outline-secondary rounded-circle btn-fixed-size">
                W
              </button>
              <button className="btn btn-outline-secondary rounded-circle btn-fixed-size">
                T
              </button>
              <button className="btn btn-outline-secondary rounded-circle btn-fixed-size">
                F
              </button>
              <button className="btn btn-outline-secondary rounded-circle btn-fixed-size">
                S
              </button>
            </div>
            <div>
              <button className="btn btn-outline-secondary">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Todos;
