import React, { createContext, useState } from "react";

export const addData = createContext("");
export const updateData = createContext("");
export const deleteData = createContext("");

const ContextProvider = ({ children }) => {
  const [userdata, setUserdata] = useState("");
  const [upData, setUpData] = useState("");
  const [delData, setDelData] = useState("");

  return (
    <addData.Provider value={{ userdata, setUserdata }}>
      <updateData.Provider value={{ upData, setUpData }}>
        <deleteData.Provider value={{ delData, setDelData }}>
          {children}
        </deleteData.Provider>
      </updateData.Provider>
    </addData.Provider>
  );
};

export default ContextProvider;
