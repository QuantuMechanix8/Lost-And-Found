# IDEAS FOR PROJECT

## Supermarket Stock finder
Show which local supermarkets a user can find a given item in stock (w prices etc) 

### Main points:
 - ask local supermarkets for stock inventory login
 - parse that data send it to students etc.

### Pros:
 - v cool idea, would be super useful and obvs involves lotta data handling

### Cons:
 - supermarkets might not let us have access :(


## MMO club penguin style
club penguin/bin weevils/moshi monsters style game

### Main points:
 - we have a room per player (big database vibes icl) + friends + pets/furniture etc

### Pros:
 - Nostalgia (I miss the innocence of youth)

### Cons:
 - Lots of images/models n shit need to be created which isn't super cs-y


## Sleep comparison
Sleep data for users is uploaded and cohort can compare their sleep to others

### Main Points:
- Users would be able to see te average sleep time for specific cohorts of users, such as successful students etc
- Could also be used to see how tired people will be for tomorrow's lecture etc

### Pros:
- Somewhat useful and pretty novel
 
### Cons:
- Very hard to get reliable data (especially if we want it to be recent - such as for usage the next day)
- Limited scope and options for extending the project
- Some ethical concerns about advising sleep practices e.g. if the average A student goes to bed a 3am should we advertise that?


## Geographical Data visualiser
map of globe (or other submaps) and then options of different metrics to be visualised 
e.g. colouring/sizing/ordering countries by population, wealth, gender split, etc

### Main Points:
- Users would have a wide range of metrics which they could have visualised
- Perhaps metrics could be combined to make more interesting visuals
	e.g. combined visual for distance from equator and wealth, 

### Pros:
- IMO very fun and interesting to build, very interactive and pretty novel, with zoomable maps, pulldown menus etc
- Sufficient complexity for the project, with lots to write about in report

### Cons:
- Would require ALOT of data, and perhaps much of the project would be loading and cleaning of this data
- Data is quite static, without the need for a _proper_ database, as we would't be uploading any data during execution of program, only loading it
- Some limitations for how it can be extended


## Travel map/planner:
map where users submit places worth travelling to in an area to help people plan their trips

(Something I really could have used when travelling myself, or when friends went interrailing over reading week etc, to consolidate planning itinerary to one place)

### Main Points:
- Would be a more social extension of [google my_maps](https://www.google.com/maps/about/mymaps/), but specifically for travel, with one large map that everyone contributes to
- Could then be integrated with google maps or [rome2rio](https://www.rome2rio.com/) apis to allow route planning between pins
- Ratings (from google maps and also from users) would be accounted for in recommending travel routes, aswell as prices, categories (nature, landmarks, experiences etc)

### Pros:
- Very databasy, with the need to store, update and add new pins for each location, plus ratings for places (and hence presumably accounts for people)
- Loads of APIs to use, (especially google maps) for rendering maps, getting ratings, routing, etc
- Plenty of opportunities for extending, around budgets, flights, packing help etc - so many travel assistant things we could add


### Cons:
- Base idea is probably quite hard
- Requires quite a bit of data to "get rolling" so we'd have to find decently large list of travel places to add to it first (hopefully we would do this programmatically)





## Shared Timetable scheduler:
Students' shared calender which helps people find timeslots where their friends are all available

**May have already been done in a previous project so will need to investigate how we can do it** 
 

### Main points:
- Group calendar where student's upload their calendars (mostly university calendar but extends to personal too) and then can co-ordinate when they are free
- Project would recommend timings to schedule events (not just when both are free but perhaps take into consideration early mornings etc)
- Project could have 'soc accounts' which could see data about a large number of users (members of the soc) and could get large samples of when people were free
- Could potentially link to users' apple/google calendars automatically (There must be a way to do that right?) which is bonus data handling

### Pros:
- Algorithmically complex/interesting, lots of opportunity to flex computer skillz 
- Genuinely very useful 
- Some interesting ethics about data privacy etc which we will need to consider and write about in report 
- largely extendable (such as with scheduling for collections of people - like societies and groups)

### Cons:
- Not particularly novel idea
- May be difficult to get calendar data from users
- Base app might be too narrow as it is only a single feature of scheduling for multiple users
- Not much application outside of this project - we probably couldn't turn it into a whole product afterwards (if we wanted to do that)

### API Usage:
- Google Calendar (free) https://developers.google.com/calendar/api/concepts
- Outlook Calendar (free but doesn't work for personal calendars) https://learn.microsoft.com/en-us/graph/outlook-calendar-meeting-proposals
- Apple Calendar - may not be workable (apple moment)
- .ics format? requires users to do a lot of work tho
