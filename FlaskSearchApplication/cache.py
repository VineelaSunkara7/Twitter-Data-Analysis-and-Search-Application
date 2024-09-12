import json
import os
import logging
cache_file_name = 'cache.json'
max_cache_size = 20
cache = {'string': {}, 'hashtag': {}, 'user': {}, 'author': {}, 'retweet': {}, 'metric': {}, 'date': {} }

def read_cache():
    
    if os.path.exists(cache_file_name):
#         try:
        with open(cache_file_name, 'r') as file:
            cache = json.load(file)
#         except:
#             cache = {'string': {}, 'hashtag': {}, 'user': {}, 'author': {}, 'retweet': {} }
    return cache
        
def write_cache(cache):
    with open(cache_file_name, 'w') as file:  
        json.dump(cache, file)
def clear_cache():
    for key in cache.keys():
        cache[key] = {}
    write_cache(cache)

'''def clear_cache():
    if os.path.exists(cache_file_name):
        os.remove(cache_file_name)
    return cache'''

def cache_print():
    for key in cache.keys():
        logging.info("Keys in "+key+" cache:")
        logging.info(list(cache[key].keys()))
def get_from_cache(cache_type, word):
    if cache_type in cache.keys() and word in cache[cache_type].keys():
        return True, cache[cache_type][word]
    return False, None

'''def get_from_cache(cache_type, word):
    if word in cache[cache_type].keys():
        return True, cache[cache_type][word]
    return False, None'''

def add_to_cache(cache_type, word, value):
    if len(cache[cache_type]) >= max_cache_size:
        cache[cache_type].pop( next(iter(cache[cache_type])) )
    cache[cache_type][word] = value
    write_cache(cache)
clear_cache()    