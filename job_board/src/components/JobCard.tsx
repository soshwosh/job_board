import { Job } from "@/lib/types";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-slate-200 h-full p-4 rounded-md hover:-translate-y-1 hover:duration-300 hover:bg-pink-300">
      <h1 className="text-xl pb-3">{job.jobTitle}</h1>
      <p>{job.companyName}</p>
      <p>{job.location}</p>
    </div>
  );
}
