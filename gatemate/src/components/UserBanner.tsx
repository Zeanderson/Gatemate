import { faBars, faGear, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import React from "react";

type BannerProps = {
  userName: string;
  className?: string;
  children?: React.ReactNode;
};

export function UserBanner(props: BannerProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div
      className={
        "flex flex-row rounded-xl bg-indigo-950 gap-2 py-2 pl-5 pr-5 items-center relative max-h-0.5" +
        props.className
      }
    >
      <h1>{props.userName}</h1>
      <button
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
        {dropdownVisible && (
          <div className="flex flex-col absolute right-3 bg-slate-700 rounded shadow-lg p-1 min-w-[8rem] items-center">
            <button
              className="flex gap-1 items-center"
              onClick={() => {
                setShowModal(true);
              }}
            >
              {"Settings "}
              <FontAwesomeIcon icon={faGear} />
            </button>
            <button
              className="flex gap-1 items-center"
              onClick={() => {
                setDropdownVisible(false);
              }}
            >
              {"Sign Out "}
              <FontAwesomeIcon icon={faDoorOpen} />
            </button>
          </div>
        )}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none ">
            <div
              className={
                "relative w-auto my-6 mx-auto max-w-3xl rounded-xl bg-slate-700"
              }
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-lg text-black">User Settings</h3>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default UserBanner;
