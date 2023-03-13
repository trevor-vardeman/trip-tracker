# Trip Tracker

## Video Walkthrough
Click the image to open the video.

[![Link to YouTube video walkthrough](https://img.youtube.com/vi/-OxdtsirNug/0.jpg)](https://www.youtube.com/watch?v=-OxdtsirNug)

## Introduction
This app was created because while planning a vacation, I had no way of easily tracking potential trips I was about to take to one another. If we had two potential trip ideas, and we went with trip a, how many cities would we visit? How long is the overall trip? What's the total cost? How does all of that compare with trip b?

With this app, you can create both of those trips and very easily see their trip summaries side-by-side. When creating trips, you can add tags to them, remove tags from them, you can add and remove cities. When selecting a city, you can add transportation, accommodation, and activities to them. You can edit and delete all three of them as you see fit. You can also delete drafts if you no longer want them.

Additionally, you can save your drafts as final, inalterable plans. You can view those plans by upcoming and past, and can open them to see them in greater detail.

You can also see all the cities related to all of your drafts and plans, and they're also sorted by upcoming and past.

Finally, you can view all the tags associated to your trips, and can view which of the tags are the most popular.

## Technology
This app uses Ruby on Rails as an API, a PostgreSQL database, and a React front end. Here are some of the technologies used in the application:
* Ruby "2.7.6"
* Rails "~> 7.0.4", ">= 7.0.4.2"
* PostgreSQL "~> 1.1'="
* Node "16.x"
* React "^17.0.2"
* React-Router-Dom "^6.4.0"
* React-Bootstrap "^2.5.0"
* Google Cloud Storage "~> 1.11"
* React Select "^5.7.0"
* react-archer "^4.2.2"

## Deployed App
If you'd like to use the deployed app via Render, [click here](https://trip-tracker.onrender.com/).

## Installation Instructions
1. Navigate to the project's [GitHub page](https://github.com/trevor-vardeman/trip-tracker) and choose your favorite method of downloading the project. I use SSH, so I would click "Code", ensure "SSH" is chosen, and copy the link.
2. Then open your terminal and navigate to a directory in which you'd like to install the app. 
3. Type `git clone` followed by the link you copied from GitHub, and the app should be installed.
`git clone git@github.com:trevor-vardeman/trip-tracker.git`
4. cd into the project's folder:
`cd trip-tracker`
5. Then type the following command in your terminal to install the Rails dependences: 
`bundle install`
6. Creat the database:
`rails db:create`
7. To start the server, use this command:
`rails s`
8. Use the following command to install all the React dependencies:
`npm install --prefix client`
9. **Note:** If you received an error during the step above, open the "client" folder, delete the node_modules folder and package-lock.json file, cd back up to the main folder `cd ..`, then run `npm install --prefix client` 
10. To start the client, use the following command:
`npm start --prefix client`