col_keys = [ 'id', 'name', 'screen_name', 'location', 'url', 'description', 'verified','followers_count',
            'friends_count', 'listed_count', 'favourites_count', 'statuses_count', 'created_at' ]

def make_dict(item):
    kv = {}
    for i in range(len(col_keys)):
        kv[col_keys[i]] = item[i]
    return kv
    
def make_dict_list(lst):
    res = []
    for item in lst:
        res.append(make_dict(item))  
    print(res)
    return res

t_user = [ 'name', 'count' ]
def make_user_dict_list(lst):
    res = []
    for item in lst:
        kv = {}
        for i in range(len(t_user)):
            kv[t_user[i]] = item[i]
        res.append(kv)  
    return res

def extract_val(key, lst):
    res = []
    for item in lst:
        res.append(item[key])
    return res

def time_filter(data, stime, etime, fetch_time):
    if stime=="na" and etime=="na":
        return {'data': data, 'fetch_time': fetch_time }
    
    if stime=="na":
        res = []
        etime = int(etime)/1000
        for tweet in data:
            if tweet['created_at'] <= etime:
                res.append(tweet)
        return {'data': res, 'fetch_time': fetch_time }

    if etime=="na":
        res = []
        stime = int(stime)/1000
        for tweet in data:
            if tweet['created_at'] >= stime:
                res.append(tweet)
        return {'data': res, 'fetch_time': fetch_time }
    
    res = []
    stime, etime = int(stime)/1000, int(etime)/1000
    for tweet in data:
        if stime <= tweet['created_at'] <= etime:
            res.append(tweet)
    return {'data': res, 'fetch_time': fetch_time }