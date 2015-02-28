source - http://just-write.co/view-doc.php?id=72

Objective

As a user, I should be able 
to generate short links for long urls ( many short link per long url per user)
See analytics
Clicks on a specific short URL by day, by hour etc.
Clicks on the long URL aggregated from all short urls pointed to it. Note that one long url may have many short urls
Analytics may also include aggregation of date/time of click, ip, location, user agent etc. The more the better...


Technical Stack

The project will consist of two parts

Frontend A single page application which once loaded talks with the backend using a REST API
Backend A simple api stack which will support the functionality of the frontend to create short urls, list them and display their analytics


Deliverables

A simple Single page application where user can

login
Type in a long url and get a short url in return
See analytics of a specific short url
See analytics of a specific long url ( Aggregated from many short urls that point to it )
Documentation explaining how to setup the application on a bare server











