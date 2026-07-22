const { initializationDatabase } = require("./db/db.connect");
const JobPost = require("./model/job_post.model");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json());

initializationDatabase();

async function createNewJobPost(newJobPost) {
  try {
    const job_post = new JobPost(newJobPost);
    const savedPost = await job_post.save();
    return savedPost;
  } catch (error) {
    throw error;
  }
}

app.post("/api/add-job", async (req, res) => {
  try {
    const job = await createNewJobPost(req.body);
    if (job) {
      res
        .status(201)
        .json({ message: "New Job Post added successfully", data: job });
    } else {
      res.status(404).json({ error: "Something went wrong to job detail" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Job Detail" });
  }
});

async function seedingBulkData(bulkData) {
  try {
    const bulkSeeding = await JobPost.insertMany(bulkData);
    return bulkData;
  } catch (error) {
    throw error;
  }
}

app.post("/api/add-seedbulkdata", async (req, res) => {
  try {
    const job = await seedingBulkData(req.body);
    if (job) {
      res
        .status(201)
        .json({ message: "Bulk Seed Job-Post added successfully", data: job });
    } else {
      res.status(404).json({ error: "Something went wrong to job seedData" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Job Detail" });
    console.error(error.message)
  }
});

async function getAllJobsDetail(){
  try {
    const jobs = await JobPost.find()
    return jobs
  } catch (error) {
    throw error
  }
}

app.get('/api/all-job', async (req,res) => {
  try {
    const jobs = await getAllJobsDetail()
    if(jobs){
      res.status(201).json({message: 'All jobs Detail is this', data: jobs})
    }else{
      res.status(404).json({error: 'Something went wrong in this apis'})
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch Jobs data'})
  }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on this ${PORT}`);
});
