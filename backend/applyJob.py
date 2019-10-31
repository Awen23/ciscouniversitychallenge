from google.cloud import firestore
from google.cloud.exceptions import NotFound
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def applyJob(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
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
    
    # Respond to request
    headers = {
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json'
    }
    request_json = request.get_json()
    if request_json.get("jobTitle","") == "" or request_json.get("organisation","") == "":
        return ('no-title-or-organisation', 400, headers)

    db = firestore.Client()

    # Get Job Email
    job_collection = db.collection(u'jobs')
    comp_key = u"{}{}".format(request_json.get("organisation"), request_json.get("jobTitle")).tolower()
    try:
        job = job_collection.document(comp_key)
    except NotFound:
        return('no-such-job', 400, headers)
        
    jobDict = job.get().to_dict()
    job_email = jobDict.get("email", "")
    if job_email == "":
        return ("no-email", 400, headers)
    
    profile_link = request_json.get("profileLink", "")
    if profile_link == "":
        return("no-profile", 400, headers)

    message = Mail(
        from_email="willcruse123@gmail.com",
        to_emails=job_email,
        subject="New Job Application",
        plain_text_content="You have a new job application.\nView their profile here: {}".format(profile_link)
    )
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
    except Exception as e:
        return (str(e), 500, headers)
    return ('success', 200, headers)
    
    
    