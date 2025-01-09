# **CarLink Saver**
The purpose of the application was meant to allow users to simply upload a link from (almost) **any** dealer's site for a vehicle listing  and let them store, organize, and view their saved listings.
This idea was seemed to be fairly unique as I have not seen (nor chatGPT when I asked) an application capable of storing from external links and not through their own platform.
Perhaps for the same reason it hasn't been made yet by someone else, I unfortunately have scrapped this project midway through developement. 

### Features Built / Expected
*Completed / Developed:*
- Django & React set-up
- User creation
- Endpoints and functionality for handling access / refresh tokens and account validation
- Working Landing, Login, Registration pages
- Protected Route for fractionally setup Dashboard page

*Attemped*
- Attempted to see how to handle dynamically rendered pages and extract information

*Planned*
- Flesh out Dashboard
- Let users to input link and pop up a *block* showing corresponding vehicle image and relevant info
- Allow users to hover over a listing block and see slightly more details unable to fit in their square ex : Featured Packaged, Drivetrain, etc
- *Starred* or *Favorites* feature and tab
- Sorting or drag and drop style of organizing listings.
- Remove buttons
- Of course , let users click the square and open a tab with the listing
- Update daily checking if car has been sold, (mark sold on listing's *block*)
- Remove listing feature

### What went Wrong? 

In short, I couldn't determine how to efffectly parse throught he HTML of a dynamically rendered page within an accepted user time constraint.
I first began by building a very simple web scraper to help see what patterns I should look for in the vehicle images. This is where I first realized my mistake of using BeautifulSoup4, in which this can only extract HTML from static websites.
As so, I had to quickly shift into using Selenium, a web-based driver, to parse the page. I learned that using the headless parser, (which I will need to use for deployment) took far too much time to render the pages to extract sufficient tags.
I first tested on a BMW USA, which turned to be fine without any delay. **However**, when testing Toyota's global website, a 6 second delay before attempting to extract deemed to be not enough time. Because of this, I've come to the conclusion that (specifically user experience) it is too long to wait for an individual listing, on top of the remaining delay of executing the rest of the instructions.

Hopefully I can return to this project in the future with more experience and new tools and see if I would be able to continue / finish this project as I would personally find this to be a usefull application for myself, and perhaps many others.
