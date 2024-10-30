import React, { useState } from "react";
import data from "./data";

const Accordium = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const handleMultipleSelection = (getCurrentId) => {
    let cpyMulitple = [...multiple];
    const findIndexOfCurrentId = cpyMulitple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) cpyMulitple.push(getCurrentId);
    else cpyMulitple.splice(findIndexOfCurrentId, 1);
    setMultiple(cpyMulitple);
  };

  return (
    <div className="wrapper text-center p-5 bg-gray-100 min-h-screen flex flex-col items-center">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        className="bg-orange-500 p-3 m-3 rounded-lg text-white font-semibold transition-transform duration-200 hover:scale-105 hover:bg-orange-600 active:bg-orange-700"
      >
        {enableMultiSelection
          ? " Enable Single Selection"
          : "Enable Multi Selection"}
      </button>

      <div className="accordium w-full max-w-2xl flex flex-col">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            return (
              <div
                className="item bg-slate-500 m-2 rounded-lg p-4 text-white shadow-lg transition-all hover:shadow-xl"
                key={dataItem.id}
              >
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultipleSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title cursor-pointer flex justify-between items-center"
                >
                  <h3 className="font-medium">{dataItem.question}</h3>
                  <span className="text-xl font-bold">+</span>
                </div>

                {enableMultiSelection
                  ? multiple.indexOf(dataItem.id) !== -1 && (
                      <div className="content bg-slate-700 p-4 mt-4 rounded-lg">
                        {dataItem.answer}
                      </div>
                    )
                  : selected === dataItem.id && (
                      <div className="content bg-slate-700 p-4 mt-4 rounded-lg">
                        {dataItem.answer}
                      </div>
                    )}
              </div>
            );
          })
        ) : (
          <h1 className="text-gray-600 font-semibold">No data</h1>
        )}
      </div>
    </div>
  );
};

export default Accordium;
