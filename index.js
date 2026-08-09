const { initializationDatabase } = require("./db/db.connect");
const JobPost = require("./model/job_post.model");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Database will be initialized before server starts at the bottom


async function createNewJobPost(newJobPost) {
  try {
    const job = new JobPost(newJobPost);
    return await job.save();
  } catch (error) {
    console.error("Create job error:", error);
    throw error;
  }
}

app.post("/api/add-job", async (req, res) => {
  try {
    const job = await createNewJobPost(req.body);

    res.status(201).json({
      message: "New Job Post added successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


async function seedingBulkData(bulkData) {
  try {
    return await JobPost.insertMany(bulkData);
  } catch (error) {
    console.error("Seed data error:", error);
    throw error;
  }
}

app.post("/api/add-seedbulkdata", async (req, res) => {
  try {
    const jobs = await seedingBulkData(req.body);

    res.status(201).json({
      message: "Bulk Seed Job Posts added successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message, 
    });
  }
});


async function getAllJobsDetail() {
  try {
    return await JobPost.find();
  } catch (error) {
    console.error("Get all jobs error:", error);
    throw error;
  }
}

app.get("/api/all-job", async (req, res) => {
  try {
    const jobs = await getAllJobsDetail();

    res.status(200).json({
      message: "All Jobs",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

async function deletedAJobDetailByJobId(jobId) {
  try {
    const deletedJob = await JobPost.findByIdAndDelete(jobId);
    return deletedJob;
  } catch (error) {
    console.error("Delete job error:", error);
    throw error;
  }
}

app.delete("/api/delete-job/:id", async (req, res) => {
  try {
    const deletedJob = await deletedAJobDetailByJobId(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found", 
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      data: deletedJob,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message, 
    });
  }
});

async function getJobDetailById(jobId) {
  try {
    const job = await JobPost.findById(jobId);
    return job;
  } catch (error) {
    console.error("Get job error:", error);
    throw error;
  }
}

app.get("/api/get-job/:id", async (req, res) => {
  try {
    const job = await getJobDetailById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job found",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


async function updateJobDetailById(jobId, updatedData) {
  try {
    const updatedJob = await JobPost.findByIdAndUpdate(
      jobId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedJob;
  } catch (error) {
    console.error("Update job error:", error);
    throw error;
  }
}

app.put("/api/update-job/:jobId", async (req, res) => {
  try {
    const updatedJob = await updateJobDetailById(
      req.params.jobId,
      req.body
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found", 
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message, 
    });
  }
});


const PORT = process.env.PORT || 3001;

initializationDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to start server due to database connection issue:", error);
  process.exit(1);
});