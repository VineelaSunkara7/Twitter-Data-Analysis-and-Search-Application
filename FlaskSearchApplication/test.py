from flask import Flask
import time

app = Flask(__name__)

# Function to simulate fetching user data by name
def fetch_user_by_name(name):
    # Simulating fetching user data (replace with actual implementation)
    time.sleep(1)  # Simulating delay of 1 second
    return {'name': name, 'tweets': ['tweet1', 'tweet2', 'tweet3']}

# Function to simulate fetching tweets by hashtag
def fetch_tweets_by_hashtag(hashtag):
    # Simulating fetching tweets by hashtag (replace with actual implementation)
    time.sleep(1)  # Simulating delay of 1 second
    return [{'text': 'tweet with #' + hashtag}, {'text': 'another tweet with #' + hashtag}]

# Function to simulate fetching tweets by string
def fetch_tweets_by_string(search_string):
    # Simulating fetching tweets by string (replace with actual implementation)
    time.sleep(1)  # Simulating delay of 1 second
    return [{'text': 'tweet containing ' + search_string}, {'text': 'another tweet with ' + search_string}]

# Function to simulate fetching tweets by string within a specific date range
def fetch_tweets_by_string_and_date_range(search_string, start_date, end_date):
    # Simulating fetching tweets by string and date range (replace with actual implementation)
    time.sleep(1)  # Simulating delay of 1 second
    return [{'text': 'tweet containing ' + search_string + ' on ' + start_date},
            {'text': 'another tweet with ' + search_string + ' on ' + end_date}]

# Function to run tests with and without cache
def run_tests():
    results = {}

    # Test fetching user by name without cache
    with app.app_context():
        start_time = time.time()
        user_data_without_cache = fetch_user_by_name('John')
        results['user_without_cache'] = {'data': user_data_without_cache, 'fetch_time': time.time() - start_time}

    # Test fetching tweets by hashtag without cache
    with app.app_context():
        start_time = time.time()
        tweet_data_without_cache = fetch_tweets_by_hashtag('python')
        results['hashtag_without_cache'] = {'data': tweet_data_without_cache, 'fetch_time': time.time() - start_time}

    # Test fetching tweets by string without cache
    with app.app_context():
        start_time = time.time()
        tweet_data_string_without_cache = fetch_tweets_by_string('AI')
        results['string_without_cache'] = {'data': tweet_data_string_without_cache, 'fetch_time': time.time() - start_time}
    
    # Test fetching tweets by string within a specific date range without cache
    with app.app_context():
        start_time = time.time()
        tweet_data_string_date_without_cache = fetch_tweets_by_string_and_date_range('AI', '2020-04-27', '2020-05-28')
        results['string_date_without_cache'] = {'data': tweet_data_string_date_without_cache, 'fetch_time': time.time() - start_time}

    return results

# Call the run_tests() function
test_results = run_tests()

# Print the test results
print(test_results)
