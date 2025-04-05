import os
import json
import time

data_folder = "../frontend/data/"

folders_to_empty = [
    "../frontend/uploads/",
    "../frontend/outputs/",
    "../frontend/public/materials",
    "../frontend/public/reports"

]
json_file_path = "../frontend/data/students.json"

def delete_except_students(folder):
    """Delete all files in the folder except 'students.json'."""
    try:
        for file_name in os.listdir(folder):
            file_path = os.path.join(folder, file_name)
            if os.path.isfile(file_path) and file_name != "students.json":
                os.remove(file_path)
                print(f"Deleted: {file_path}")
        print(f"Cleaned folder (except 'students.json'): {folder}")
    except Exception as e:
        print(f"Error cleaning folder {folder}: {e}")

def empty_folders(folders):
    """Delete all files and subfolders in specified folders."""
    for folder in folders:
        try:
            for file_name in os.listdir(folder):
                file_path = os.path.join(folder, file_name)
                if os.path.isfile(file_path):
                    os.remove(file_path)
                    print(f"Deleted file: {file_path}")
                elif os.path.isdir(file_path):
                    for root, dirs, files in os.walk(file_path, topdown=False):
                        for name in files:
                            os.remove(os.path.join(root, name))
                        for name in dirs:
                            os.rmdir(os.path.join(root, name))
                    os.rmdir(file_path)
                    print(f"Deleted folder: {file_path}")
            print(f"Emptied folder: {folder}")
        except Exception as e:
            print(f"Error emptying folder {folder}: {e}")



def clean_json_file(json_path):
    """Empty JSON file and set to an empty array []."""
    try:
        if os.path.exists(json_path):
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump([], f, ensure_ascii=False, indent=4)
            print(f" Cleaned JSON file: {json_path}")
        else:
            print(f" File not found: {json_path}")
    except Exception as e:
        print(f"Error cleaning JSON file: {e}")

if __name__ == "__main__":
    print("Resetting settings ")
    time.sleep(1)
    delete_except_students(data_folder)

    empty_folders(folders_to_empty)

    clean_json_file(json_file_path)

    print("Reset complete!")
