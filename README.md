# 4ways

<h2>To run this project</h2>

1.Download the zip file / clone the git https.  
2. cd projectdir  
3. npx vite => frontend , you will be redirected to a localhost port  
4. npm start=> backend in a different terminal under same dir
5. Copy the Node Id from the workspace and paste it in the viewer id to explore!

##About 4Ways

Objective/Aim:

To create an interactive and immersive 360-degree image viewer that
allows users to upload and view panoramic photos. This can be used
to create a virtual tour of a location or to showcase a product or
service or to show temporary changes in places for events.

Technical Details:
Frontend : Three.js , html, bootstrap and javascript
Backend: Express.js
Database : Firebase

##How it works

When user adds a image to the workspace , the image gets uploaded
in firebase cloud storage with a unique key, each image is associated
with a node, each node has properties such as img-base64 string, id,
north, east, west and south. Where directions point towards another
node.
While this happens , a array of nodes is maintained and when user
finally creates the project , this array is stored in firebase realtime
database.
While sharing with others , the unique key is shared , this key is
associated with a json which has all the nodes and ids of images.
When the other user starts navigating these images are loaded from
cloud storage.


##UI 
![image](https://github.com/JagnathReddy/4ways/assets/70469290/869366de-82c6-4fa5-8313-a58de2c1dc65)

![image](https://github.com/JagnathReddy/4ways/assets/70469290/dc54dcbb-4aa0-4b0b-9894-8eefdd1c460b)

![image](https://github.com/JagnathReddy/4ways/assets/70469290/09dd4ffe-63a4-4d45-befe-a49582d9f064)






