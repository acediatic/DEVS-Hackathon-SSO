import sqlalchemy

connection_name = "innate-life-318504:australia-southeast1:devs-hackathon"
table_name = "siso"
db_name = "siso"
db_user = "root"
db_password = "devs"

# Database is MySQL
driver_name = 'mysql+pymysql'
query_string = dict({"unix_socket": "/cloudsql/{}".format(connection_name)})

def insert(request):
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

    first_name = request_json['fName']
    last_name = request_json['lName']
    isSignIn = request_json['isSignIn'] == 'true'

    insert_query = "insert into {} values ('{}', '{}', NOW(), null)".format(table_name, first_name, last_name)
    update_query = "UPDATE {} SET so = NOW() WHERE fName='{}' AND lName = '{}' AND ISNULL(so)".format(table_name, first_name, last_name)
    
    # Defaults to insert query.
    stmt = sqlalchemy.text(update_query if not isSignIn else insert_query)
    
    db = sqlalchemy.create_engine(
      sqlalchemy.engine.url.URL(
        drivername=driver_name,
        username=db_user,
        password=db_password,
        database=db_name,
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