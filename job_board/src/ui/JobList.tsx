"use client";
import Papa from "papaparse";
import { useEffect } from "react";

export default function JobList() {
  useEffect(() => {
    fetch("/data/jobs.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: function (results) {
            console.log(results.data);
          },
        });
      });
  });

  return (
    <div>
      <h1>Job List</h1>
    </div>
  );
}
