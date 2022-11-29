# ChatApp

## App Concept and implementation thoughts:

ChatApp is a the next best user friendly app for interacting with your friends and connecting with new ones. Our ideas were closely aligned with the Discord interface where we allowed for users to login and be directed to the home screen which displays all friends and the last open chat.

## Built Using

 - Vite
 - Firebase
 - React.js
 - Tailwind
 - Node.js

## Wireframes

![](./client/public/Screen%20Shot%202022-11-25%20at%2012.09.12%20pm.png)

Initially our plan was to create a group chat application where users can interact with 3 or more users in the same chat. Unfortunately, we did not have enough time to implement this feature as we ran into hurdles setting up the initial chat function between 2 users. Also, learning the firebase syntax was slightly more challenging than initially expected but by the end we had a good grasp on the core functions.

The homepage layout changed along the way from a WhatsApp interface where all friends were displayed in the sidebar to having the last chat open with another user.

Further features we did not have time to work with were voice messaging and notifications. Firebase storage does allow for for audio and even video content to be stored. Notofications were another stretch goal we discussed earlier in the planning phase. Having users notified when someone has made a friends request or when someone has messaged you and you're both not connected.

![](./client/public/Screen%20Shot%202022-11-25%20at%201.27.14%20pm.png)

## Application Navigation

Upon visiting ChatApp you will redirected to the login page where you can enter in your credentials. If you do not have an account you can click on our register link to sign up!

Once taken to our homepage you can search new friends by their username and simply click on their profile in the drop down to connect. From here select the user in your friends list and start the conversation where we can send messages and images. We can see a list of all our friends as well as their online/offline status.

In the navbar, you can select your profile and navigate to your profile page which displays all your information, as well as the option to edit your details. A bonus feature included was the option to toggle light mode and dark mode for your profile. This icon is also found on the homepage.

 ## Features

  - Full CRUD application
  - One to one messaging between users
  - upload images in chat and to profile
  - Search function to find users
  - Online/offline status of friends
  - Light and dark mode toggle
  - Reauthentication of users when deactivating account

## Acknowledgements

Big thank you to Dido and Rod for all your help. Working through our little bugs and road blocks to get us back on track was greatly appreciated.

This project was built by the dynamic and collaborative team of Jack, Adora and Gerald.

