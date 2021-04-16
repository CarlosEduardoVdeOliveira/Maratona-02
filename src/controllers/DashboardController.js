const Job = require("../models/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../models/Profile");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // Total de horas por dia para cada Job em progresso
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      // Ajustando o jobs
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      /**
       * Somando a quantidade de status
       * status = done
       * statusCount[done] += 1
       */
      statusCount[status] += 1;
      // Total de horas por dia para cada Job em progresso
      jobTotalHours =
        status === "progress"
          ? jobTotalHours + Number(job["daily-hours"])
          : jobTotalHours;
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hours"]),
      };
    });
    const freeHours = profile["hours-per-day"] - jobTotalHours;
    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
