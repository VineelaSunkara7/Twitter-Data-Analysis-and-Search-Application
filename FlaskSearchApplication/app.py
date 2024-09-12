from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy;
from flask_marshmallow import Marshmallow
import os
import json
import time
from flask_cors import CORS
from cache import *
from test import run_tests
from tweets import get_top_tweets, getRetweetsByOriginalTweetID, getRetweetsbyUserID, getTweetbyID, getTweetsbyHashtag, getTweetsbyString, getTweetsbyUserID, getTweetsbyUserIDsList
from utils import extract_val, time_filter
from user import get_top_users, getUserByID, getUserByWord
import logging

# logging 
logging.basicConfig(
    level=logging.INFO,
    datefmt="%Y-%m-%d %H:%M:%S",
    format="%(asctime)s [%(levelname)s] %(message)s",
)
#init app
app = Flask(__name__)

CORS(app)


@app.route("/")
def index():
  return render_template('index.html')

@app.route("/user/<name>", methods=["GET"])
def getUserByName(name):
  start_time = time.time()
  res = getUserByWord(name)
  return json.dumps({'data': res, 'fetch_time': time.time() - start_time })


@app.route("/string/<word>/<stime>/<etime>", methods=["GET"])
def string_tweet(word, stime, etime):
    start_time = time.time()
    inCache, res = get_from_cache('string', word)
    if inCache:
        print("time taken:", time.time() - start_time)
        return json.dumps(time_filter(res, stime, etime, time.time() - start_time))
    
    res = getTweetsbyString(word)
    
    add_to_cache('string', word, res)
    logging.info("time taken:", time.time() - start_time)
    return json.dumps(time_filter(res, stime, etime, time.time() - start_time))

@app.route("/hashtag/<word>/<stime>/<etime>", methods=["GET"])
def hashtag_tweet(word, stime, etime):
    start_time = time.time()
    inCache, res = get_from_cache('hashtag', word)
    if inCache:
        return json.dumps(time_filter(res, stime, etime, time.time() - start_time))
        
    res = getTweetsbyHashtag(word)
    
    add_to_cache('hashtag', word, res)
    return json.dumps(time_filter(res, stime, etime, time.time() - start_time))

@app.route("/user/<word>/<stime>/<etime>", methods=["GET"])
def user_tweet(word, stime, etime):
    logging.info("word: %s", word)
    logging.info("stime: %s", stime)
    logging.info("etime: %s", etime)
    start_time = time.time()
    inCache, res = get_from_cache('user', word)
    if inCache:
        return json.dumps(time_filter(res, stime, etime, time.time() - start_time))
        
    usr_lst = getUserByWord(word)
    id_lst = extract_val('id', usr_lst)
    res = getTweetsbyUserIDsList(id_lst)
    
    add_to_cache('user', word, res)
    return json.dumps(time_filter(res, stime, etime, time.time() - start_time))


@app.route("/author/<id>", methods=["GET"])
def get_author(id):
    logging.info("author id: %s", id)
    start_time = time.time()
    inCache, res = get_from_cache('author', id)
    if inCache:
        return json.dumps({'data': res, 'fetch_time': time.time() - start_time })
    
    res = getUserByID(id)
    res['tweets'] = getTweetsbyUserID(id)
    res['retweets'] = getRetweetsbyUserID(id)
    logging.info("author: %s", res)
    add_to_cache('author', id, res)
    return json.dumps({'data': res, 'fetch_time': time.time() - start_time })

@app.route("/retweet/<id>", methods=["GET"])
def get_retweets(id):
    start_time = time.time()
    inCache, res = get_from_cache('retweet', id)
    if inCache:
        return json.dumps({'data': res, 'fetch_time': time.time() - start_time })
    
    res = getTweetbyID(id)
    res['retweets'] = getRetweetsByOriginalTweetID(id)
    
    add_to_cache('retweet', id, res)
    return json.dumps({'data': res, 'fetch_time': time.time() - start_time })


@app.route("/metric", methods=["GET"])
def get_metric():
    start_time = time.time()
    inCache, res = get_from_cache('metric', 'all')
    if inCache:
        return json.dumps({'data': res, 'fetch_time': time.time() - start_time })

    users = get_top_users()
    tweets = get_top_tweets()
#     users = u_temp
#     tweets = t_temp
    
    res = [users, tweets]
    
    add_to_cache('metric', 'all', res)
    return json.dumps({'data': res, 'fetch_time': time.time() - start_time })
#run test file
if __name__ == "__main__":
    test_output = run_tests()

    # Check if test_output is None
    if test_output is not None:
        # Write the test output to a file
        with open("test_output.txt", "w") as f:
            for key, value in test_output.items():
                if 'data' in value and 'fetch_time' in value:
                    line = f"{key}: {value['data']} | Fetch Time: {value['fetch_time'] * 1e9} ns\n"
                    f.write(line)
                else:
                    print(f"Test output for '{key}' is incomplete. Check your run_tests() function.")
    else:
        print("Test output is None. Check your run_tests() function.")
    #Run Server
    app.run(debug=True)