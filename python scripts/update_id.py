from pymongo import MongoClient
import random

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.Backend
job_collection = db.Job_vacancies

# List of new recruiter IDs as new users have been added
recruiter_ids = ["675ba7ec58d0fef05831be6e" , "675ba7ed58d0fef05831be70"]  #homer and bart
all_jobs = job_collection.find({})

# Update each record with a randomly chosen recruiterId
for job in all_jobs:
    random_recruiter_id = random.choice(recruiter_ids)
    job_collection.update_one(
        {"_id": job["_id"]},
        {"$set": {"recruiterId": random_recruiter_id}}
    )
    print(f"Updated job {job['_id']} with recruiterId {random_recruiter_id}")

print("All records updated.")