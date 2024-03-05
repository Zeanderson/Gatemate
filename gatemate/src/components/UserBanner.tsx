import { faBars, faGear, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import React from "react";

type BannerProps = {
  userName: string;
  className?: string;
  children?: React.ReactNode;
};

async function logout() {
  try {
    await axios.get("/api/v1/user/logout");
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export function UserBanner(props: BannerProps) {
  const [showModal, setShowModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('userSettings'); 

  //Example settings
  //User settings
  const [userSetting1, setUserSetting1] = useState(false);
  const [userSetting2, setUserSetting2] = useState(false);
  const [userSetting3, setUserSetting3] = useState(false);

  //Field settings
  const [fieldSetting1, setFieldSetting1] = useState(false);
  const [fieldSetting2, setFieldSetting2] = useState(false);
  const [fieldSetting3, setFieldSetting3] = useState(false);

  //Farm settings
  const [farmSetting1, setFarmSetting1] = useState(false);
  const [farmSetting2, setFarmSetting2] = useState(false);
  const [farmSetting3, setFarmSetting3] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div
      className={
        "flex flex-row rounded bg-Corp3 gap-2 py-2 pl-5 pr-5 items-center relative max-h-0.5" +
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
      </button>
      {dropdownVisible && (
        <div className="flex flex-col absolute right-12 bg-Corp2 rounded shadow-lg p-1 min-w-[10rem] items-center">
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
              logout();
            }}
          >
            {"Sign Out "}
            <FontAwesomeIcon icon={faDoorOpen} />
          </button>
        </div>
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl rounded-xl bg-Corp3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-row w-full outline-none focus:outline-none ">
              {/* Left Column with Options */}
              <div className="justify-center items-center flex flex-col p-5 bg-Corp2 rounded-t border-r border-Corp4 font-Arvo">
                <button
                  className={`rounded-full mb-2 text-Corp3 p-2 font-Arvo ${
                    selectedCategory === 'userSettings' ? 'bg-Corp1 w-full' : ''
                  }`}
                  onClick={() => handleCategoryChange('userSettings')}
                >
                  User Settings
                </button>
                <button
                  className={`rounded-full mb-2 text-Corp3 p-2 font-Arvo ${
                    selectedCategory === 'fieldSettings' ? 'bg-Corp1 w-full' : ''
                  }`}
                  onClick={() => handleCategoryChange('fieldSettings')}
                >
                  Field Settings
                </button>
                <button
                  className={`rounded-full mb-2 text-Corp3 p-2 font-Arvo ${
                    selectedCategory === 'farmSettings' ? 'bg-Corp1 w-full' : ''
                  }`}
                  onClick={() => handleCategoryChange('farmSettings')}
                >
                  Farm Settings
                </button>
              </div>

                {/* Right Column with Settings*/}
                <div className="p-5 bg-Corp2 rounded-r">
                  {selectedCategory === 'userSettings' && (
                    // User Settings content
                    <div className="p-5 bg-Corp2 rounded-xxl">
                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={userSetting1}
                              onChange={() => setUserSetting1(!userSetting1)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1 font-arvo">User Setting 1</span>
                        </label>
                      </div>

                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={userSetting2}
                              onChange={() => setUserSetting2(!userSetting2)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">User Setting 2</span>
                        </label>
                      </div>

                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={userSetting3}
                              onChange={() => setUserSetting3(!userSetting3)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">User Setting 3</span>
                        </label>
                      </div>
                    </div>
                  )}
                  {selectedCategory === 'fieldSettings' && (
                    // Field Settings content
                    <div className="p-5 bg-Corp2 rounded">
                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={fieldSetting1}
                              onChange={() => setFieldSetting1(!fieldSetting1)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">Field Setting 1</span>
                        </label>
                      </div>

                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={fieldSetting2}
                              onChange={() => setFieldSetting2(!fieldSetting2)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">Field Setting 2</span>
                        </label>
                      </div>

                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={fieldSetting3}
                              onChange={() => setFieldSetting3(!fieldSetting3)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">Field Setting 3</span>
                        </label>
                      </div>
                    </div>
                  )}
                  {selectedCategory === 'farmSettings' && (
                    // Farm Settings content
                    <div className="p-5 bg-Corp2 rounded-full">
                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={farmSetting1}
                              onChange={() => setFarmSetting1(!farmSetting1)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">Farm Setting 1</span>
                        </label>
                      </div>

                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={farmSetting2}
                              onChange={() => setFarmSetting2(!farmSetting2)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">Farm Setting 2</span>
                        </label>
                      </div>

                      <div className="flex items-center mb-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input 
                              type="checkbox" 
                              checked={farmSetting3}
                              onChange={() => setFarmSetting3(!farmSetting3)}
                              className = "sr-only peer"/>
                              <div 
                              className="relative w-11 h-6 bg-gray-200 dark:bg-Corp4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-Corp3 peer-checked:bg-Corp1 rounded-full">
                              </div>
                          <span className="ml-2 text-sm text-Corp1">Farm Setting 3</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white background-transparent font-bold uppercase px-6 py-2 rounded-full text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-Corp1 text-Corp3 active:bg-Corp2 font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
