# TritonGo
@ 5th December 2017 @

Demo: https://www.youtube.com/watch?v=g-3NB_9n02o&t=1s

# Team TritonGo Member:
Rica Chang, Xinmeng Li, Bodong Wang, Zhuoqun Xu, Ruochao Yan, Bohan Zhang, Bowen Zhang, Yu Zhong

# Introduction
TritonGo is an application developed for college students and deployed on iOS platform. This application is a robust, user-friendly software that helps organize and consolidate all of the user’s daily events into a single interactive calendar. In addition, all users can invite other users to public events by posting on the up-to-date feed of all available event. Before events begin, TritonGo provides arrival time estimation and detailed navigation for users to the destination through Google Maps. TritonGo functions not only as a calendar but also as an interactive platform for users to exchange interests, all while faithfully guiding users to their destinations.

# Login Credentials
	For testing purposes, the following accounts have been created for convenience. Certain events and entries have been created in the following accounts for demonstration purposes. The application also provides options of creating new accounts and recovering existing accounts at the login interface. Please feel free to create accounts and add entries.

Account #1:
Username: CSE@110.com
Password: 123456
Account #2:
Username: CSE2@110.com
Password: 123456



# Requirements
●	This application can only run on iOS platform
●	This application is recommended to be run on a simulator.
●	This application requires internet connection to function.
●	(If run on a simulator) The application requires installation of Node, Watchman, Xcode, and React Native to run.
●	The system should have at least 314.5 MB of space to install the application.

# Contacts for Technical Support
Yu Zhong				yuz871@eng.ucsd.edu
Zhuoqun (Robin) Xu			zhx068@ucsd.edu

# Installation Instructions (For Testing Purposes)
1.	Prepare a Mac OS X device with the latest version of XCode (9.1) installed.
2.	Install Node, Watchman, and React Native command line tools for the environment: https://facebook.github.io/react-native/docs/getting-started.html
3.	Download the zip named TritonGo onto Desktop to avoid problems with spaces in the path.
4.	Unzip the file.
5.	Open Terminal, type command cd ~/Desktop/TritonGo, and hit enter.
6.	Now you have been directed to the target folder, type command: npm install, wait until the installation is completed.
7.	Now, type the command 'react-native link', and wait until the linking process to finish.
8.	After successful installation and linking, navigate to the ios folder using the following command: cd ios
9.	Open the Xcode workspace using the command: open TritonGo.xcworkspace (NOTICE! It is not TritonGo.xcodeproj)
10.	Xcode will then start up soon, if any message box pops up to remind the user of unverified source of the project, ignore it and continue opening the project.
11.	Wait patiently for Xcode to process all the files, then hit the run button on the top left corner, or simply use the shortcut: Command+R.
12.	Wait until the simulator starts up, and a virtual iPhone interface will pop up and the application will be installed on the second screen.
13.	Press the TritonGo icon and the application is ready to run.
14.	If any errors occurred throughout the process, please contact the technical support listed above.

# How to Run
Simply press the TritonGo icon and the application is ready to run.

# Known Issues
1.	Event Creation Latency:
After creating the events, the user might have to wait until the response to see the created event.


# FAQ
1. The application crashes, what should I do?
Please use command + R to rerun the application. and also refer FAQ.6 or 7. If problems persist, please contact technical support asap.
2. I forgot my password, how do I recover my account?
	At the login page, hit the Forgot Password, enter the account email, and follow the instructions sent to the email to reset the password.
3. How do I create an event?
	Hit the icon “+” at the top right corner of the application.
4. How do I navigate to the destination?
	Hit the blue button accompanied with the created event, and then hit “Get Directions” and a navigation application will navigate you to the destination.  
5. Date events are not updated, what should I do?
	Make sure you connect to the network. Try to click the date button to see if it can update manually. User can select any date in calendar to maually update the different date events
6. The application crash with a error "undefined ... 'RNGooglePlacesNative.openPlacePickerModal'".
	Please look the installation instructions carefully. It requires to run with TritonGo.xcworkspace not the other way. The reason is because the Google API restriction.
7. The application crash with a error "No bundler...".
        Please notify that we assume user does not run any other react-native application in the back. This error is mostly the react-native packeger was not enable because either there is already existed packeger running (for other app) or either it does not run at all. Make sure that when you hit the run or use command+R to boot up the application, you should see a terminal automatically pop up saying "Scanning 604 folders for symlinks in .../TritonGo/node_modules" and the end show a line "Bundling `index.ios.js`  100.0% (960/960), done." If the error persist, feel free to call the technical support asap.
