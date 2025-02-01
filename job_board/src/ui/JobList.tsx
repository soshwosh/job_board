"use client";
import Papa from "papaparse";
import { useEffect, useState } from "react";

// type Job = { [key: string]: string };
type Job = {
  jobTitle: string;
  companyName: string;
  location: string;
  description: string;
  requirements: string;
};

export default function JobList() {
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
    <div>
      {data.map((job, index) => (
        <div key={index}>
          <p>{job.jobTitle}</p>
          <p>{job.companyName}</p>
          <p>{job.location}</p>
          <p>{job.description}</p>
          <p>{job.requirements}</p>
        </div>
      ))}
    </div>
  );
}
