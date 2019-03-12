# Concordia SOEN Schedule Designer (CSSD)
a software package to automate readjustments to the Departmental sequences and optimize the resulting sequences to meet any special needs of the user as for timing of sections

***
### Group Members

    Averynder Singh       40058958
    Ali Mahram            40077663
    Andre Legault         40031363
    Jimmy Onya            40066773
    Julia Bazarbachian    26781357
    Karim Hasbini         40053498
    Leslie Poso           40057877
    Niels Justin Louis    40077435
    Rubiat Zaman          40062082
    Victor Manea          40001995

### Installation:
1.    Download [Node.js](https://nodejs.org/) v8+ and [React](https://reactjs.org)
2.    Download the boiler plate code from Google drive set up
3.    Open Git / Github Desktop
4.    Go into branch labelled with your name
5.    Make sure github is properly installed: https://stackoverflow.com/questions/20666989/bower-enogit-git-is-not-installed-or-not-in-the-path
6.    Pull Latest changes

### Run Project
1.    Open Command Prompt
2.    Run this or open Node.js command prompt (C:\Windows\System32\cmd.exe /k "C:\Program Files\nodejs\nodevars.bat")
3.    Browse to main project folder
4.    Run (npm start)
5.    Repeat steps 1-3
6.    Run (cd client)
7.    Run (npm start)

### Check User Login
1.    In the user account of your db enter in netname = user, password = password
2.    Launch the application
3.    Enter Andre's App and Enter in username & password {user, pass}
4.    Go to http://localhost:3001/check to verify logged in or out
5.    Go to http://localhost:3001/logout to log out, all changes in console

### Setting up Database
1.    Run the 'test' script first
2.    Next run the 'soen341' script
3.    Open up MySQL Workbench
4.    Browse to the correct schema
5.    RIGHT Click on Stored Procedures
6.    Click on Create Stored Procedure
7.    Copy Paste the procedures script (Until line 14) and hit Apply
8.    Go to http://localhost:3001/concordia and enter into terminal

### Setting up Selenium for NodeJS
1.    Run npm install -g selenium-webdriver
2.    Set up ChromeDriver or Firefox's Gecko on your path: https://www.youtube.com/watch?v=dz59GsdvUF8
3.    Start the back end server
4.    Type in http://localhost:3001/concordia/yourusername/yourpass
5.    Replace yourusername and yourpass with whatever you use to enter concordia
6.    Visit the site and watch Google Chrome Login for you

Go to http://localhost:3000 and check to see if everything works
* ExpressJs exclusively on port 3001
* React with ExpressJs  on port 3000
* Concordia's Open Data on : http://localhost:3001/opendata
* Look at the PDF download : http://localhost:3000/dooks
