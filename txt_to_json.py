import os
import json

# Function to process a single file
def process_file(file_path, json_directory):
    # Extract the year from the file name
    year = int(file_path.split('yob')[1].split('.txt')[0])
    
    data = []
    # Read the file and process each line
    with open(file_path, 'r') as f:
        for line in f:
            name, gender, occurrences = line.strip().split(',')
            occurrences = int(occurrences)
            data.append({
                'year': year,
                'Name': name,
                'Gender': gender,
                'Occurrences': occurrences
            })
    
    # Create a JSON file for this year in the specified directory
    json_file_path = os.path.join(json_directory, f'yob{year}.json')
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Directory where the text files are located
text_files_directory = r'E:\work\analytics_projects\USA baby names\text files'
# Directory where the JSON files should be saved
json_files_directory = r'E:\work\analytics_projects\USA baby names\json files'

# Create the JSON files directory if it does not exist
os.makedirs(json_files_directory, exist_ok=True)

# Loop over all files in the directory
for filename in os.listdir(text_files_directory):
    if filename.endswith('.txt'):
        file_path = os.path.join(text_files_directory, filename)
        process_file(file_path, json_files_directory)
