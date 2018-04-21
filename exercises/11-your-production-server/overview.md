# YOUR PRODUCTION SERVER

In the last exercise, we successfully automated the deployment of a simple web
application to a Vagrant machine. In this exercise, we are going try it on a
live server, accessible to everyone on the internet.

## EXERCISE

Now it is time to spin up a new server with that provider so we can
test our configuration in the wild.

Visit https://calmteam.signin.aws.amazon.com/console and log in with the
username and password provided to you by the facilitator of the class. Then,
create a CentOS VM using the AMI `ami-b81dbfc5` to orchestrate, ensuring that
you select the "workshop" ssh key be added (this will be associated with the
user `centos`).

Use your playbook from the previous exercise to deploy your application.

You'll know you've been successful when your fellow attendees can see your
application in a browser via it's public IP address (e.g. http://52.5.119.57).

## LEARNING OBJECTIVES

- How do you provision a server with your cloud provider?
- How do you deploy your application to the server?
