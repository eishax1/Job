from pymongo import MongoClient
import random

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.Backend
job_collection = db.Job_vacancies

# Get distinct employment types
distinct_employment_types = job_collection.distinct('seniority_level')

# Print the distinct employment types
print("Distinct Employment Types:", distinct_employment_types)