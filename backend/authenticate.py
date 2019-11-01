from google.cloud import firestore
import json

def authenticate(request):

    if request.method == 'OPTIONS':
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

    emailGiven = request_json.get("email", "")
    pwdGiven = request_json.get("password", "")
    if emailGiven == "" or pwdGiven == "":
        return ('bad-boy', 400, headers)

    try:
        collection_path = "profiles"
        db = firestore.Client()
        doc = db.collection(collection_path).document(request_json.get('email')).get()
        dick = doc.to_dict()
        if dick["password"] == pwdGiven and dick["email"] == emailGiven:
            return (json.dumps({"success": True}), 200, headers)

    except Exception as e:
        return (str(e), 500, headers)

    return (json.dumps({"success": False}), 200, headers)