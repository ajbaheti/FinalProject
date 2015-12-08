# Pre-requisites
	1. You need to have Node.js installed on your machine.
	2. You need to have MongoDB installed on your machine.
	3. You should be connected to the internet.
# Installation
	1. Download the project zip folder and unzip it.
	2. You will see a file named "deaths-in-india-satp-dfe.csv". This is the database file.
	3. Open command shell and start mongodb server.
	4. Open another terminal window and import downloaded database in your mongodb with database name as 'india' and collection name as 'terror'.
	Command: "mongoimport --db india --collection terror --type csv --headerline --file 'path of .csv file'"
	
# Usage
 	1. Go to extracted folder on command shell.
 	2. Run below command:
 	'node bin/www'	This will start running the project.
 	3. Go to web browser and type 'localhost:3000'. Output should be on the screen.