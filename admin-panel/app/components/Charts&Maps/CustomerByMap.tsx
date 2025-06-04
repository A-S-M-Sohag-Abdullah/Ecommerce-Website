"use client";
import React from "react";
import WorldMap from "react-svg-worldmap";
import type { CountryContext, Data } from "react-svg-worldmap";
function CustomerByMap() {
  const data = [
    {
      country: "us",
      name: "United States",
      value: 29051,
      color: "bg-blue-500",
    },
    { country: "in", name: "India", value: 18041, color: "bg-[#FFC700]" },
    { country: "ru", name: "Russia", value: 5420, color: "bg-[#06A561]" }, // russia
    { country: "au", name: "Australia", value: 10430, color: "bg-[#33466A]" },
  ];

  const getStyle = ({
    countryValue,
    countryCode,
    minValue,
    maxValue,
    color,
  }: CountryContext) => ({
    fill:
      countryCode === "US"
        ? "#336DFF"
        : countryCode === "IN"
        ? "#FFC700"
        : countryCode === "AU"
        ? "#33466A"
        : countryCode === "RU"
        ? "#06A561"
        : "white",
    fillOpacity: 1,
    stroke: "gray",
    strokeWidth: 1,
    strokeOpacity: 0.5,
    cursor: "pointer",
  });
  return (
    <div className=" bg-white p-6 rounded-xl w-fit">
      <h2 className="text-lg font-semibold mb-4">Customer Demographics</h2>
      <div className="flex space-x-6">
        <div className="flex flex-col gap-4">
          {data
            .sort((a, b) => b.value - a.value)
            .map(({ name, value, color }) => (
              <div key={name} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 ${color} rounded-sm shrink-0`} />
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <div className="text-black font-bold text-base pl-6">
                  {value.toLocaleString()}
                </div>
              </div>
            ))}
        </div>
        <WorldMap
          color="red"
          value-suffix="people"
          size="lg"
          data={data}
          styleFunction={getStyle}
        />
      </div>
    </div>
  );
}

export default CustomerByMap;
