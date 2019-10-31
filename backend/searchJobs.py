from google.cloud import firestore
import json

def searchJobs(request):
    #request of form -      [(jobKey,jobDictionary)]

    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        # flask.Flask.make_response>`.
        `make_response <http://flask.pocoo.org/docs/1.0/api/
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
    except Exception as e:
        return(str(e), 500, headers)


    #TODO James Magic Time

    #TODO return (json.dumps(FILTERED_JOBS), 200, header)
    return(json.dumps(allJobs), 200, headers)