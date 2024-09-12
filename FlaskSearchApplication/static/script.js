let dropdownBtn = document.getElementById("drop-text");
let list = document.getElementById("list");
let icon = document.getElementById("icon");
let span = document.getElementById("span");
let input = document.getElementById("search-input");
let listItems = document.querySelectorAll(".dropdown-list-item");
let inputPlaceholder = document.getElementById("input-placeholder");
let metricsContainer = document.getElementById("metrics-container");
let topUsers = document.getElementById("top-users");
let topTweets = document.getElementById("top-tweets");
let fetchTime = document.getElementById("fetch_time");
let resultLen = document.getElementById("result_len");
let searchResults = document.getElementById("searchResults");

let searchType = "string";

dropdownBtn.onclick = function () {
  if (list.classList.contains("show")) {
    icon.style.rotate = "0deg";
  } else {
    icon.style.rotate = "-180deg";
  }
  list.classList.toggle("show");
};


window.onclick = function (e) {
  if (e.target.id !== "drop-text" &&
      e.target.id !== "span" &&
      e.target.id !== "icon"
    ) {
    list.classList.remove("show");
      icon.style.rotate = "0deg";
  }
};

for (item of listItems) {
  item.onclick = function (e) {
    span.innerText = e.target.innerText;
    if (e.target.innerText === "Everything") {
      input.placeholder = "Search By Anything...";
      searchType = "string";
    } else {
      input.placeholder = "Search By " + e.target.innerText + "...";
      searchType = e.target.innerText.toLowerCase();
    }
  };
}

var searchWord, startDate, endDate;

function btnMetric() {    
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/metric",
        dataType: "json",
        success: buildMetric,
        error: function(xrh, status, error) { alert("Error in fetching data.") }
    });
}


function searchTweets(){
    searchWord = document.getElementById("search-input").value;
    stime = document.getElementById("start_date").value;
    etime = document.getElementById("end_date").value;
    
    console.log(stime)
    console.log(etime)
    if(searchWord===""){
        alert("Please enter a search word!!!");
        return;
    }
    stime = (stime==="") ? "na" : Date.parse(stime);
    etime = (etime==="") ? "na" : Date.parse(etime);
    
    getAPI(searchType, searchWord, stime, etime);
}

const getAPI = (type, word, stime, etime) => {
    console.log(stime);
    console.log(etime);
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/"+type +"/"+ word +"/"+ stime +"/"+ etime,
        // url: "http://localhost:5000/"+type +"/"+ word,
        dataType: "json",
        success: buildFeed,
        error: function (xrh, status, error) {
            console.log(error)
            alert("Error in fetching data.")
        }
    });
}



const authorClick = (id) => {
    console.log("id:" + id);
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/author/"+ id,
        dataType: "json",
        success: buildAuthor,
        error: function(xrh, status, error) { alert("Error in fetching data.") }
    });
}

function buildAuthor(response) {
    console.log("printing respose" + response);
    author = response['data']
    console.log(author);
    fetchTime.innerHTML = "Search Time: " + response['fetch_time']*1000 + " ms";
    var feedStr = `<div class="mx-auto flex h-screen w-full items-start justify-center bg-white text-sm text-gray-900 antialiased dark:bg-gray-900 dark:text-white">
  <div class="mx-auto w-full max-w-[600px] border-x border-gray-100 dark:border-gray-800">
    <!-- Name and tweet count header -->
    <div class="flex items-center space-x-4 p-1.5">
      <div class="flex items-start">
        <span class="text-xs text-gray-500 dark:text-gray-400">${author['tweets'].length} Tweets, ${author['retweets'].length} Retweets found</span>
        <span class="text-xs text-gray-500 dark:text-gray-400"></span>
      </div>
    </div>
    
    <div class="dark:bg-gray-900">
        <!-- Header image -->
        <div class="relative">
            <img src="static/1500x500.jpg" class="w-full h-60" alt="Header Image">
            <!-- Profile picture and edit button -->
            <div class="absolute inset-x-0 bottom-0 flex items-start justify-between px-4 py-3">
                <img class="-mt-[4.5rem] z-10 h-32 w-32 cursor-pointer rounded-full" src="${(author['url'] !== "" && author['url'] !== null) ? author['url'] : 'static/dummy.png'}" />
            </div>
        </div>
    </div>


    <!-- Name and handle -->
    <div class="mt-2 px-4">
      <h2 class="text-xl font-bold tracking-tight">${author['name']}</h2>
      <span class="text-gray-500 dark:text-gray-400">@${author['screen_name']}</span>
    </div>

    <!-- Bio -->
    <div class="mt-4 px-4">
      <span>${author['description']}</span>
    </div>

    <!-- Location, CTA and join date -->
    <div class="mt-3 flex items-center space-x-4 px-4">
      <div class="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 dark:text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <span class="text-gray-500 dark:text-gray-400">✍️ &nbsp;&nbsp;→</span>
      </div>
      <div class="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 dark:text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
        <a class="text-sky-500 hover:underline" href="https://r.bluethl.net" target="_blank">r.bluethl.net</a>
      </div>
      <div class="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 dark:text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>

        <span class="text-gray-700 dark:text-gray-400"> Joined ${new Date(author['created_at']).toLocaleString('default', { month: 'short' }) + ' ' + new Date(author['created_at']).getFullYear()}</span>
      </div>
    </div>

    <!-- Following/follower count -->
    <div class="mt-3 flex items-center space-x-4 px-4">
      <div class="cursor-pointer hover:underline">
        <span class="font-bold">${author['friends_count']}</span>
        <span class="text-gray-700 dark:text-gray-400">Following</span>
      </div>
      <div class="cursor-pointer hover:underline">
        <span class="font-bold">${author['followers_count']}</span>
        <span class="text-gray-700 dark:text-gray-400">Followers</span>
      </div>
    </div>`

    feedStr += '<div class="mt-3 flex justify-evenly">';
    feedStr += '<button id="defaultOpen" class="relative flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800" onclick="switchTab(event, \'tweet_block\')">'
    feedStr += '<span class="font-bold">Tweets</span>'
    feedStr += '<div class="absolute bottom-0 w-full border-b-[3px] border-sky-500">'  
    feedStr +='</button >';
    feedStr += '<button class="relative flex w-full cursor-pointer items-center justify-center p-4 transition duration-150 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800" onclick="switchTab(event, \'retweet_block\')">';
    feedStr += '<span class="font-bold">Retweets</span>'
    feedStr += '<div class="absolute bottom-0 w-full border-b-[3px] border-sky-500">'  
    feedStr +='</button >';
    feedStr += '</div>';

    feedStr += '<div id="tweet_block" class="tabcontent">';
    feedStr += makeTweetList(author['tweets']);
    feedStr += '</div>';

    feedStr += '<div id="retweet_block" class="tabcontent">';
    feedStr += makeReweetList(author['retweets']);
    feedStr += '</div>';

    feedStr += '</div>';
    searchResults.innerHTML = feedStr;


    document.getElementById("defaultOpen").click();
}

function makeTweetList(res){
    if(res.length===0) return "No tweets here!!";
    
    var feedStr = "";
    
    var i, mx = res.length<100 ? res.length:100;
    for(i=0; i<mx; i++){
        var tweet = res[i];
        feedStr += '<div class="h-45 w-[44rem] rounded-3xl bg-white/30 p-6 custom-shadow backdrop-blur-xl my-5">';

        feedStr += '<div class="flex items-center space-x-4">';
        feedStr += '<div>';
        feedStr += '<img alt="Profile Pic" src="static/dummy.png" class="h-24 w-24 rounded-full" />';
        feedStr += '</div>';
        feedStr += '<div>';
        feedStr += '<span class="flex items-center space-x-2">';
        feedStr += '<h1 class="text-3xl text-gray-900">' + tweet['user']['name'] + '</h1>';
        if(tweet['user']['verified']) feedStr += ' <img src="./static/verified.png" width="25" height="25" />';
        feedStr += '</span>';
        feedStr += '<h3 class="text-md text-gray-800">@' + tweet['user']['screen_name'] +'</h3>'
        feedStr += '</div>';
        feedStr += '</div>';

        feedStr += '<div class="py-8">';

        feedStr += '<div class="">';
        feedStr += '<h1 class="lg:md:text-4xl text-2xl font-bold text-gray-900">' + tweet['text']+'</h1>';
        feedStr += '</div>';

        feedStr += '<div class="py-4">';
        feedStr += '<div class="max-w-[44rem] mx-auto">';
        feedStr += '<div class="flex space-x-1 text-gray-700">';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[1] + '.</h3>';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[0] + '</h3>';
        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
        

        feedStr += '<div>';

        feedStr += '<div class="flex space-x-1 py-1 font-medium">';
        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['retweet_count'] / 1000 + 'K Retweets';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>·'
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['reply_count'] / 1000 + 'K Replies';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>·';
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['favorite_count'] / 1000 + 'K Likes';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>';
        feedStr += '</h3>';

        feedStr += '</div>';

        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
    }

    return feedStr;
}

const retweetClick = (id) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/retweet/"+ id,
        dataType: "json",
        success: buildRetweet,
        error: function(xrh, status, error) { alert("Error in fetching data.") }
    });
}

function buildRetweet(response){
    tweet = response['data']

    fetchTime.innerHTML = "Search Time: " + (response['fetch_time']*1000).toFixed(2) + " ms";
    resultLen.innerHTML = tweet['retweets'].length + " retweets found.";

    var feedStr = "";

    feedStr += '<div class="h-45 w-[44rem] rounded-3xl bg-white/30 p-6 custom-shadow backdrop-blur-xl my-5">';

    feedStr += '<div class="name">'+ tweet['user']['name'];
    if(tweet['user']['verified']) feedStr += ' <img src="./static/verified.png" width="14" height="14" />';
    feedStr += '</div>';

    feedStr += '<div class="time">'+ fromatDate(tweet['created_at']) +'</div>';
    feedStr += '<div class="screen_name">@'+ tweet['user']['screen_name'] +'</div>';
    feedStr += '<div class="tweet">'+ tweet['text'] +'</div>';
    
    feedStr += '<div class="bottom_bar">';
    feedStr += '<div  class="retweet_count">Retweets: '+ tweet['retweet_count'] +'</div>';
    feedStr += '<div class="favourite_count">Favourites: '+ tweet['favorite_count'] +'</div>';
    feedStr += '<div class="reply_count">Replies: '+ tweet['reply_count'] +'</div>';
    feedStr += '</div>';

    feedStr += '</div>';


    feedStr += '<h2>Retweets</h2>';
	feedStr += '<div id="retweet_block">';
	feedStr += makeReweetList(tweet['retweets']);
	feedStr += '</div>';
    
	feedStr += '</div>';
    searchResults.innerHTML = feedStr;
}

function makeReweetList(res){
    if(res.length===0) return "No retweets available!!";

    var feedStr = "";

    var tweet, i, mx = res.length<100 ? res.length:100;
    for(i=0; i<mx; i++){
        tweet = res[i];
        feedStr += '<div class="h-45 w-[44rem] rounded-3xl bg-white/30 p-6 custom-shadow backdrop-blur-xl my-5">';

        feedStr += '<div class="flex items-center space-x-4">';
        feedStr += '<div>';
        feedStr += '<img alt="Profile Pic" src="static/dummy.png" class="h-24 w-24 rounded-full" />';
        feedStr += '</div>';
        feedStr += '<div>';
        feedStr += '<span class="flex items-center space-x-2">';
        feedStr += '<h1 class="text-3xl text-gray-900">' + tweet['user']['name'] + '</h1>';
        if(tweet['user']['verified']) feedStr += ' <img src="./static/verified.png" width="25" height="25" />';
        feedStr += '</span>';
        feedStr += '<h3 class="text-md text-gray-800">@' + tweet['user']['screen_name'] +'</h3>'
        feedStr += '</div>';
        feedStr += '</div>';

        feedStr += '<div class="py-8">';

        feedStr += '<div class="">';
        feedStr += '<h1 class="lg:md:text-4xl text-2xl font-bold text-gray-900">' + tweet['text']+'</h1>';
        feedStr += '</div>';

        feedStr += '<div class="py-4">';
        feedStr += '<div class="max-w-[44rem] mx-auto">';
        feedStr += '<div class="flex space-x-1 text-gray-700">';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[1] + '.</h3>';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[0] + '</h3>';
        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
        

        feedStr += '<div>';

        feedStr += '<div class="flex space-x-1 py-1 font-medium">';
        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['retweet_count'] / 1000 + 'K Retweets';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>·'
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['reply_count'] / 1000 + 'K Replies';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>·';
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['favorite_count'] / 1000 + 'K Likes';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>';
        feedStr += '</h3>';

        feedStr += '</div>';

        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
    }
    return feedStr;
}

var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function fromatDate(dt){
    dt = new Date(dt*1000);
    return month[dt.getMonth()] +' '+ dt.getDate() +', '+ dt.getFullYear() +' - '+ dt.getHours() +':'+ dt.getMinutes() +':'+ dt.getSeconds();
}

function switchTab(evt, tabName) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function buildFeed(response){
    res = response['data']
    console.log(res);
    fetchTime.innerHTML = "Search Time: " + response['fetch_time']*1000 + " ms";
    resultLen.innerHTML = res.length + " tweets found.";

    var feedStr = '<h2>Tweets</h2>';
    
    if(res.length===0) feedStr += "No tweet matched search Query.";

    var i, mx = res.length<100 ? res.length:100;
   
    for(var i=0; i<res.length; i++){
        var tweet = res[i];

        feedStr += '<div class="h-45 w-[44rem] rounded-3xl bg-white/30 p-6 custom-shadow backdrop-blur-xl my-5">';

        feedStr += '<div class="flex items-center space-x-4">';
        feedStr += '<div>';
        feedStr += '<img alt="Profile Pic" src="static/dummy.png" class="h-24 w-24 rounded-full" />';
        feedStr += '</div>';
        feedStr += '<div>';
        feedStr += '<span class="flex items-center space-x-2">';
        feedStr += '<h1 class="text-3xl text-gray-900 click_div" onclick="authorClick(\''+ tweet['user']['id'] +'\');">' + tweet['user']['name'] + '</h1>';
        if(tweet['user']['verified']) feedStr += ' <img src="./static/verified.png" width="25" height="25" />';
        feedStr += '</span>';
        feedStr += '<h3 class="text-md text-gray-800">@' + tweet['user']['screen_name'] +'</h3>'
        feedStr += '</div>';
        feedStr += '</div>';

        feedStr += '<div class="py-8">';

        feedStr += '<div class="">';
        feedStr += '<h1 class="lg:md:text-4xl text-2xl font-bold text-gray-900">' + tweet['text']+'</h1>';
        feedStr += '</div>';

        feedStr += '<div class="py-4">';
        feedStr += '<div class="max-w-[44rem] mx-auto">';
        feedStr += '<div class="flex space-x-1 text-gray-700">';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[1] + '.</h3>';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[0] + '</h3>';
        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
        

        feedStr += '<div>';

        feedStr += '<div class="flex space-x-1 py-1 font-medium">';
        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['retweet_count'] + 'K Retweets';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>·'
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['reply_count'] + 'K Replies';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>·';
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['favorite_count'] + 'K Likes';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>';
        feedStr += '</h3>';

        feedStr += '</div>';

        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
        // feedStr += '</div>';
    }

    searchResults.innerHTML = feedStr;
}

function buildMetric(response){
    fetchTime.innerHTML = "Search Time: " + (response['fetch_time']*1000).toFixed(2) + " ms";
    resultLen.innerHTML = "";
    var feedStr = "";

    feedStr += '<h2 class="metrics-heading">Top 10 Users</h2>';
    feedStr += '<table> <tr><th>Name</th><th>Followers</th></tr>';
    var users = response['data'][0];
    for(var i=0; i<users.length; i++){
        feedStr += '<tr><td>'+ users[i]['name'] +'</td><td>'+ users[i]['count'] +'</td></tr>';   
    }
    feedStr += '</table>';
    topUsers.innerHTML = feedStr;
    feedStr = "";
    feedStr += '<h2 class="metrics-heading">Top 10 Tweets</h2>';

    
    var res = response['data'][1];
    console.log(res.length)
    for(var i=0; i<res.length; i++){
        var tweet = res[i];
        // feedStr += '<div class="flex items-center justify-center">';

        feedStr += '<div class="h-45 w-[44rem] rounded-3xl bg-white/30 p-6 custom-shadow backdrop-blur-xl my-5">';

        feedStr += '<div class="flex items-center space-x-4">';
        feedStr += '<div>';
        feedStr += '<img alt="Profile Pic" src="static/dummy.png" class="h-24 w-24 rounded-full" />';
        feedStr += '</div>';
        feedStr += '<div>';
        feedStr += '<span class="flex items-center space-x-2">';
        feedStr += '<h1 class="text-3xl text-gray-900">' + tweet['user']['name'] + '</h1>';
        if(tweet['user']['verified']) feedStr += ' <img src="./static/verified.png" width="25" height="25" />';
        feedStr += '</span>';
        feedStr += '<h3 class="text-md text-gray-800">@' + tweet['user']['screen_name'] +'</h3>'
        feedStr += '</div>';
        feedStr += '</div>';

        feedStr += '<div class="py-8">';

        feedStr += '<div class="">';
        feedStr += '<h1 class="lg:md:text-4xl text-2xl font-bold text-gray-900">' + tweet['text']+'</h1>';
        feedStr += '</div>';

        feedStr += '<div class="py-4">';
        feedStr += '<div class="max-w-[44rem] mx-auto">';
        feedStr += '<div class="flex space-x-1 text-gray-700">';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[1] + '.</h3>';
        feedStr += '<h3>' + fromatDate(tweet['created_at']).split("-")[0] + '</h3>';
        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
        

        feedStr += '<div>';

        feedStr += '<div class="flex space-x-1 py-1 font-medium">';
        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['retweet_count'] / 1000 + 'K Retweets';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>·'
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['reply_count'] / 1000 + 'K Replies';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>·';
        feedStr += '</h3>';

        feedStr += '<h3 class="flex items-center space-x-2">' + tweet['favorite_count'] / 1000 + 'K Likes';
        feedStr += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-2 h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>';
        feedStr += '</h3>';

        feedStr += '</div>';

        feedStr += '</div>';
        feedStr += '</div>';
        feedStr += '</div>';
    }
    topTweets.innerHTML = feedStr;

}
