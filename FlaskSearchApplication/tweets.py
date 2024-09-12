from pymongo import MongoClient, DESCENDING

uri = "mongodb+srv://kn489:GKZWupM3TksFxtTj@tweetinformation.ogl2qco.mongodb.net/?retryWrites=true&w=majority&appName=Tweetinformation"

drop_field = {'_id': 0}

def getTweetbyID(word):
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Tweets"]

    query = {"id": word}
    result = collection.find(query, drop_field).sort("score", DESCENDING)
    a=[]
    for i in result:
        a.append(i)
        
    return a[0] if len(a)>0 else {}

def getTweetsbyString(word):
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Tweets"]

    query = {"text": {"$regex": word, "$options": "i"} }
    result = collection.find(query, drop_field).sort("score", DESCENDING)
    a=[]
    for i in result:
        a.append(i)  
    return a

def getTweetsbyHashtag(word):
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Tweets"]

    query = {"hashtags": {"$regex": f"{word}", "$options": "i"}}
    result = collection.find(query, drop_field).sort("score", DESCENDING)
    a=[]
    for i in result:
        a.append(i) 
    return a

def getTweetsbyUserIDsList(lst):
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Tweets"]

    query = {"user.id": {"$in": lst}}
    result = collection.find(query, drop_field).sort("score", DESCENDING)
    a=[]
    for i in result:
        a.append(i)
    return a

def getTweetsbyUserID(word):
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Tweets"]

    query = {"user.id": word}
    result = collection.find(query, drop_field).sort("score", DESCENDING)
    a=[]
    for i in result:
        a.append(i)
    return a

def getRetweetsbyUserID(word):
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Retweets"]

    query = {"user.id": word}
    result = collection.find(query, drop_field).sort("score", DESCENDING)
    a=[]
    for i in result:
        a.append(i)
    return a

def getRetweetsByOriginalTweetID(word):
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Retweets"]

    query = {"retweeted_status.id": word}
    result = collection.find(query, drop_field).sort("score", DESCENDING)
    a=[]
    for i in result:
        a.append(i)
    return a


def get_top_tweets():
    client = MongoClient(uri)
    db = client["Twitter"]
    collection = db["Tweets"]
    
    query = {}
    result = collection.find(query, drop_field).sort("score", DESCENDING).limit(10)
    a=[]
    for i in result:
        a.append(i)
    return a