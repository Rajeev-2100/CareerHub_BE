const mongoose = require("mongoose");

const jobPostSchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
  type: String,
  enum: ["Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"],
  required: true
},
  jobDescription: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
});

const jobPostModel = mongoose.model("Job_Post", jobPostSchema);

module.exports = jobPostModel;
