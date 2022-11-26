# Degree-of-Relation 

This is a simple react application with typescript and a frontend library materialUI has been used with typescript to design the user interface. This application is a simple app where it simplify to find the relation degree among the users. 

## Where to check the application?

Go to **[live link](https://six-degree-of-separation.netlify.app/)** fom your browser and it will open with the home page.

## What are the technologies used in this application?


- ***React.js***
- ***Typescript***
- ***Material-UI***
- ***ECMAScript 6***
- ***GitHub***
- ***Netlify***


## How to run this project?

Clone the repository by giving this command the the terminal of the machine:

`git clone https://github.com/shuvo-h/degree-of-social-distance`

This command will download the necessary code from the github to test the project locally. \
After cloning the code, install the necessary node modules using the following command in the terminal:

`npm install`

This may take few time depending on the configuration of the machine and internet speed. After successfully installing the necessary node modules, The project is ready to run locally. Now to run the project, run the below command on the terminal:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.The page will reload if you make edits.



## what are the available functionality and how are they works?

There are mainly three major functionality in this project. 
1. Searching the relation degree
2. Adding new user with relation to a number of users.
3. Editing relationship or adding new relation to exist user's.

### First Activity

After successfully running the app, and to test the working functionality, at first add some user's either with relationship or no relation. To do this, Go to `ADD NEW USER` button which you will find at the lower section of the page. Click on it, which will expand the form with sufficient option to add a user. 

![Add user image](https://i.ibb.co/v1RJjLZ/add-user-degree-separation.png)

Fillup the full name and it will show you the existing name list just below the name field, Choose any existing user to make a relation with him/her. After selecting the user, there will be option to choose the relation type. After selecting the type, click `ADD ____ IS YOUR RELATIVE` button and repeat this for each user you want to make a connection. After making relation, click `ADD USER` to save the user in database(Here data is storing in localstorage)

There is another button `DEMO DB SETUP`. Use this button to add few static users in onClick. After clicking this demo data setup, reload the browser to load the data. 

### Second Activity

There is another button `MAKE NEW RELATION`. Click on to open the form where you will be able to make new relation between two user's. click on any two user and select the relation type you want to make. And finally click on `SET RELATIONSHIP` button to add/change the relation between them.

![change relationship](https://i.ibb.co/PcypFZb/change-relation.png)

### Final Activity

Go to top of the project and from the thwo select option, select two users to find relation degree between them. On the right side you can change the number of degree up to you want to serach. 

![degree of relation](https://i.ibb.co/DzHvBX0/degree-search.png)


## Learn More

This project is developed by [Shuvo Haldar](https://www.shuvohaldar.com). \
To know more, contact with him in [LinkedIn](https://www.linkedin.com/in/shuvo-haldar/)


