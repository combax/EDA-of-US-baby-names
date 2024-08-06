import os
import json
from pymongo import MongoClient

# Directory containing the JSON files
json_files_directory = r'E:\work\analytics_projects\USA baby names\json files'

# Connect to the MongoDB local server
client = MongoClient('localhost', 27017)

# Access the BabyNames database and BabyNamesUSA collection
db = client['BabyNames']
collection = db['BabyNamesUSA']

# Loop over all JSON files in the directory
for filename in os.listdir(json_files_directory):
    if filename.endswith('.json'):
        file_path = os.path.join(json_files_directory, filename)
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            # Insert data into MongoDB collection
            collection.insert_many(data)

print("Data upload to MongoDB completed.")
