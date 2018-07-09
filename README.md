# Grasswalker_project
Grasswalker is an attempt at cross collaborative data sharing in the academic community.
This README is a work in process, but for now contains the primitive steps to get the local
developmental version of the app up and running locally.


## Tools
[Python3](https://www.python.org/downloads/) 
[Pip installer](https://pip.pypa.io/en/stable/installing/)
[Virtual environments](https://virtualenv.pypa.io/en/stable/installation/)
[Node package manager](https://www.npmjs.com/get-npm)

## Quickstart
Full documentation is a work in progress. I will make an architecture diagram soon, but for the time being the following steps should get the app up and running.
1. Create a github account using the email you got the invite to collaborate on this repo.
2. Create a virtual environment to isolate the packages needed for Grasswalker on your computer
    - mkdir <Grasswalker_home_dir> (put this wherever you feel comfortable on your computer)
    - cd <Grasswalker_home_dir>
    - virtualenv env -p python3 (this will create the virtual environment on your computer, make sure you installed)
    - source env/bin/activate (this activates the environment)
    - pip install django (installs django into your environment)
3. Clone the repository (make sure you are in the home directory <Grasswalker_home_dir>)
    - git clone git@github.com:sunk0015/Grasswalker_project.git (instead of sunk0015 use your github usernmae)
    - Enter passphrase (your local machine password)
    - This should create the repository, a parent directory called Grasswalker_project. 
    - Under the parent directory are two subdirectories Grasswalker and grasswalker-web (corresponding to the backend server and the web server source code)
    
5. Start the backend server
    - cd Graswalker
    - pip install -r requirements.txt 
    - python manage.py makemigrations
    - python manage.py migrate
    - python manage.py runserver
    - verify the backend Django server is up by visiting http://localhost:8000 in browser
6. Start the frontend web server
    - cd grasswalker-web
    - npm start
    - http://localhost:3000 should pop up with the app front end
