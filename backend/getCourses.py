from google.cloud import firestore
import json

def getCourses(request):

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
        collection_path = "courses"
        db = firestore.Client()
        courseStream = db.collection(collection_path).stream()
        allCourses = [c.to_dict() for c in courseStream]

    except Exception as e:
        return (str(e), 500, headers)

    return (json.dumps(allCourses), 200, headers)