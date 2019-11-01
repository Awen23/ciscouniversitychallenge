from google.cloud import firestore
import json

def searchJobs(request):
    #request of form -      [(jobKey,jobDictionary)]
    # person email - {profile details}

    """
    HTTP Post Data:
        {
            "email": "MEMBER@EMAIL.COM"
            "location": [LONG, LAT].
            "search-term": "SEARCH",
        }
    Job Data:
        [(jobkey, jobDictionary)]
    Person Data:
        {
            "email": ,
            "name": ,
            "skills": {
                "maths": LEVEL_OF_SKILL (int)
            }
        }

    """
    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    request_json = request.get_json()
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
    #REMOVE = [{}, {"skills": {"english": 2, "maths": 3}, "job": "prozzy", "email": "willcruse123@protonmail.com", "location": ["0", "0"]}]

    email = request_json.get("email", "")
    location = request_json.get("location", "")
    search_term = request_json.get("searchTerm", "")
    if email == "" or location == "" or search_term == "":
        return ('bad-boy', 400, headers)

    try:
        collection_path = "jobs"
        db = firestore.Client()
        jobStream = db.collection(collection_path).stream()
        allJobs = [job.to_dict() for job in jobStream]
        print(allJobs)
        temp = []
        for job in allJobs:
            employer = job.get("employer", "")
            job_title = job.get("job", "")
            if employer != "" and job_title != "":
                job_key = ("{}{}".format(employer, job_title)).lower()
                temp.append((job_key, job))

        collection_path = "profiles"
        profile = db.collection(collection_path).document(request_json.get("email")).get().to_dict()
        print(profile)
        # TO DO James Magic Time on temp
        bF = False
        for index in range(len(temp)-1,-1,-1):
            job_key, job = temp[index]
            for skill in job["skills"].keys():
                if profile["skills"].get(skill) is None or job["skills"].get(skill) > profile["skills"].get(skill):
                    if len(allJobs) == 0:
                        bF = True
                        break
                    allJobs.pop(index)
                    break
            if bF:
                break

        #to do return (json.dumps(FILTERED_JOBS), 200, header)
    except Exception as e:
        return (str(e), 500, headers)

    return (json.dumps(allJobs), 200, headers)