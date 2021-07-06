import sqlalchemy

from ENVIRONMENT_VARIABLES import CONNECTION_NAME, TABLE_NAME, DB_NAME, DB_USER, DB_PASSWORD

# Database is MySQL
driver_name = 'mysql+pymysql'
query_string = dict({"unix_socket": "/cloudsql/{}".format(CONNECTION_NAME)})

''' Queries the Database with either a sign in (insert) or sign out (update). 
    Request contains fName, lName, and isSignIn, where fName is the first name 
    of the user, lName their last name, and isSignIn a boolean representing if they
    are signing in.'''


def queryDatabase(request):
    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        }
        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    request_json = request.get_json()

    # Retrieve user details from JSON object
    first_name = request_json['fName']
    last_name = request_json['lName']
    isSignIn = request_json['isSignIn'] == 'true'

    # If signing in, use INSERT. If signing out, use update (update corresponding sign-in tuple)
    insert_query = "insert into {} values ('{}', '{}', NOW(), null)".format(
        TABLE_NAME, first_name, last_name)
    update_query = "UPDATE {} SET so = NOW() WHERE fName='{}' AND lName = '{}' AND ISNULL(so)".format(
        TABLE_NAME, first_name, last_name)

    # Defaults to insert query.
    stmt = sqlalchemy.text(update_query if not isSignIn else insert_query)

    db = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername=driver_name,
            username=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            query=query_string,
        ),
        pool_size=5,
        max_overflow=2,
        pool_timeout=30,
        pool_recycle=1800
    )

    # Executes the query, returning 200 if successful.
    try:
        with db.connect() as conn:
            conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e))

    return ('', 200, headers)
