# Twitter Data Analysis and Search Application

The design and implementation of a Twitter search application focused on efficiently retrieving and analyzing data from Twitter datasets. Key challenges addressed include storing, caching, and querying Twitter data to optimize performance and user experience. The dataset summary outlines key details such as the number of users, tweets, and additional facets like URLs. Data preprocessing is emphasized due to the complexity of tweet structures, highlighting the need to store relevant information while discarding irrelevant fields. The design of the data storage architecture involves at least two data stores: one relational and one non-relational, with an emphasis on processing tweets individually to simulate real-time data ingestion. A caching mechanism is introduced to store frequently accessed data, reducing database access times and enhancing application responsiveness. Cache eviction strategies and advanced features such as data expiry mechanisms are discussed to manage cache staleness effectively. The search application design offers various search options, including search by string, hashtag, and user, with support for specifying time ranges. A relevance ranking algorithm is outlined, along with drill-down features enabling users to explore tweet metadata and top-level metrics. Performance evaluation through representative query tests measures query timings with and without cache. Implications of findings are discussed, highlighting the application's efficient handling of Twitter data retrieval and analysis tasks. In conclusion, this project provides insights into the design and implementation of a robust Twitter search application, offering practical solutions to challenges in data storage, caching, and querying. This work contributes to the field of social media analytics and sets the stage for future research in this domain. 

## Dataset:

The project utilizes a Twitter dataset named "corona-out-3", encompassing various aspects of Twitter activity, including user profiles, tweets, and associated metadata. User data comprises user IDs, names, screen names, locations, URLs, and other details, each uniquely identified by an ID. Tweet data encompasses individual tweets characterized by unique IDs, creation timestamps, textual content, and user information such as IDs, names, and follower counts. Data preprocessing involves converting timestamps to Unix format, extracting hashtags, and structuring data for efficient storage in relational and non-relational datastores. Implemented in Python, preprocessing iterates through tweets, processing content and user info, and stores formatted data. The process ensures efficient handling of incoming data streams, preventing overload and optimizing performance.

## Steps to run the search application:

  1. Import necessary libraries and set up MySQL and MongoDB
  2. Run the twitter dataset processing file to load data
  3. Run the search app with correct authentication to the datastores.

## Application Architecture

![image](https://github.com/KarthikNarra/Twitter-Search-Application/blob/master/Project_Architecture.jpg)


## Contributors:

Vineela Sunkara (https://github.com/VineelaSunkara1)

Karthik Narra (https://github.com/KarthikNarra)

Mounika Konda (https://github.com/MounikaKonda15)



## Contribution:

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. Be sure to follow the coding style and include tests for any new features or bug fixes.
