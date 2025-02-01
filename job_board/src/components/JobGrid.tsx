"use client";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { Job } from "@/lib/types";
import JobCard from "./JobCard";

export default function JobGrid() {
  const [data, setData] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/data/jobs.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<Record<string, string>>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log(result.data);
            const parsedData = result.data.map((row) => ({
              jobTitle: row["Job Title"] || "",
              companyName: row["Company Name"] || "",
              location: row["Location"] || "",
              description: row["Job Description"] || "",
              requirements: row["Requirements"] || "",
            })) as Job[];
            setData(parsedData);
          },
        });
      });
  }, []);

  console.log(data[0]);

  return (
    <div className="m-5 grid grid-cols-1 gap-3 sm:grid-cols-3 md:m-10 md:grid-cols-4 md:gap-4">
      {data.map((job, index) => (
        <div key={index}>
          <JobCard job={job}></JobCard>
        </div>
      ))}
    </div>
  );
}
