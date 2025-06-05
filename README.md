# propertycentre-backend
Siwes 1 Project Server side 

---

## Stack

<div align="center">

<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="">![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)</a>

</div>

<div align="center">

<a href="">![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)</a>
<a href="">![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)</a>

</div>

Welcome to the backend project! This repository contains the codebase for the backend of our application. We encourage and welcome contributions from the community. If you're interested in contributing, please follow the guidelines below to get the project up and running locally.

# Getting Started
To get started with the project, follow the instructions below:

# Pre-requisites
Make sure you have the following installed on your machine:

- Node.js (version 12 or above)
- npm (comes with Node.js)
- mqsql server running
- postman

# Installation
Clone this repository to your local machine using the following command:

```

git clone git@github.com:Horlawhumy-dev/propertycentre-backend.git

```
Navigate to the project directory:
```
cd backend
````
Install the project dependencies:
```
npm install
```

# Configuration
The backend requires some configuration settings to run properly. Create a .env file in the root directory and provide the necessary environment variables. 

# Running the Application
To run the application locally, use the following command:

```
npm run dev 
```
This will start the server and you should be able to access it at http://localhost:3000.

# Running Tests
To run the automated tests for the backend, use the following command:


```
npm test

```
This will execute the test suite and provide the test results.

# Contributing
- We appreciate contributions from the community. If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository and create your branch from main.
  
- Pull development if it does not come cloned
  
- Create your local branch first from the development branch

- Make your changes and test them locally.

- Ensure your code follows our coding style and conventions.

- Write tests for the changes you made, ensuring full test coverage.

- Commit your changes with descriptive commit messages.

- Push your changes to your forked repository.

- Create a pull request to the development branch of the original repository, explaining the changes you made.

- We will review your pull request and merge it if everything looks good.



## Useful Links.

- [Postman Documentation]

---

### url:- https://localhost:3009
---

## Basic Features

- Login
- Registration


---
- Response statusCodes

```
  - 201: success || Created
  - 401: error || Unauthorized error
  - 400: error || Bad Request
  - 404: error || Not found
  - 403: error || Forbidden Request
  - 500: error || Internal Server Error
```
---

## User

| field            | data_type | constraints      | enums |
| ---------------- | --------- | ---------------- |-----|
| firstName        | string    | required         ||
| lastName         | string    | required         ||
| email            | string    | required, unique ||
| password         | string    | required         ||
| role         | string    | required         | 'Explorer','Service Provider','Accommodation Provider' |
---

### Signup User

- Route: api/v1/auth/signup
- Method: POST
- Body:

```
{
    "firstName":"josiah",
    "lastName":"ademeso",
    "email": "JOSiahademeso@gmail.com",
    "password":"secret123",
    "role": "Service Provider"

}
```

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully created an account"
}
```

---

### login User
- Route: api/v1/auth/login
- Method: POST
- Body:

```
{

    "email": "josiahademso@gmail.com",
    "password":"secrett"
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "login successfull",
    "data": {
        "id": 1,
        "firstName": "josiah",
        "lastName": "ademeso",
        "email": "ademeso"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6Impvc2lhaGFkZW1zb0BnbWFpbC5jb20iLCJpYXQiOjE2ODg3OTI3ODAsImV4cCI6MTY4ODk2NTU4MH0.mxMdRxr28L-xYOPcRQmFsm5Pul9iPdBmxj8l2k9eS_U"
}

```


---


### forget password
- Route: api/v1/auth/forgetPassword
- Method: POST
- Body:

```
{

    "email": "josiahademso@gmail.com",
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "A reset Link has been sent to your email "
}

```


---

### reset password
- Route: api/v1/auth/resetPassword/:token
- Method: POST
- Body:

```
{
    "password":"secrt10"
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "A reset Link has been sent to your email "
}
```


---

### verify Otp
- Route: api/v1/auth/verifyOtp
- Method: POST
- Body:

```
{
    "email": "josiahademeso@gmail.com",
    "token": "996345"
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully created and verified your account",
    "data": {
        "id": 1,
        "firstName": "josiah",
        "lastName": "ademeso",
        "email": "ademeso"
    }
}
```

---
### delete user
- Route: api/v1/auth/delete
- Method: DELETE
- Body:

```
{
    "email": "josiahademeso@gmail.com",
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully deleted ${user.firstName}'s account",
}

```

---

### get user by email
- Route: api/v1/auth/:emailaddress
- Method: GET
- Body:
- Authorization:Password secret

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully fetched josiah's account",
    "data": {
        "id": 1,
        "firstName": "josiah",
        "lastName": "ademeso",
        "email": "josiahademeso@gmail.com",
        "role": "Accommodation Provider",
        "AccommodationDetails": [
            {
                "id": 1,
                "name": "new hostel",
                "type": "i no sabi",
                "description": "2 bed room flat sef contain",
                "address": "damico",
                "noOfRooms": 12,
                "city": "ife",
                "state": "lagos",
                "images": [
                    "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694040056/ojygx4klgh6csojjccoi.png"
                ],
                "createdAt": "2023-09-06T22:40:57.191Z",
                "updatedAt": "2023-09-06T22:40:57.191Z",
                "UserId": 1
            }
        ],
        "AccommodationProfile": {
            "id": 1,
            "brandName": "josiahademeso@gmail.com's brand",
            "phoneNumber": null,
            "address": null,
            "email": "josiahademeso@gmail.com",
            "createdAt": "2023-09-06T22:40:25.549Z",
            "updatedAt": "2023-09-06T22:40:25.549Z",
            "UserId": 1
        },
        "ServiceProfile": null
    }
}

```

---
### get User By Id From Session 
- Route: api/v1/auth/session
- Method: GET
- session: user = {id,e.t.c}


- Responses

- Success

```
{
    "success": true,
    "message": "succesfully fetched josiah's account",
    "data": {
        "id": 1,
        "firstName": "josiah",
        "lastName": "ademeso",
        "email": "josiahademeso@gmail.com",
        "role": "Accommodation Provider",
        "AccommodationDetails": [
            {
                "id": 1,
                "name": "new hostel",
                "type": "i no sabi",
                "description": "2 bed room flat sef contain",
                "address": "damico",
                "noOfRooms": 12,
                "city": "ife",
                "state": "lagos",
                "images": [
                    "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694040056/ojygx4klgh6csojjccoi.png"
                ],
                "createdAt": "2023-09-06T22:40:57.191Z",
                "updatedAt": "2023-09-06T22:40:57.191Z",
                "UserId": 1
            }
        ],
        "AccommodationProfile": {
            "id": 1,
            "brandName": "josiahademeso@gmail.com's brand",
            "phoneNumber": null,
            "address": null,
            "email": "josiahademeso@gmail.com",
            "createdAt": "2023-09-06T22:40:25.549Z",
            "updatedAt": "2023-09-06T22:40:25.549Z",
            "UserId": 1
        },
        "ServiceProfile": null
    }
}
```

---
## Accomodation Profile

| field            | data_type | constraints      | enums |
| ---------------- | --------- | ---------------- |-----|
| brandName        | string    | required, unique         ||
| address          | string    | required         ||
| phoneNumber      | string    | required, unique ||

---

### create a profile --if neccessary

- Route: api/v1/profile/accommodation
- Method: POST
- Header: Bearer ${token}
- Body:

```
{
    "brandName":"brandy",
    "phoneNumber":"08167534061",
    "address":"34567892"
}
```

- Responses

- Success

```
{
		success: true,
		message: "succesfully created a profile",
		accommodationProfile :{
        "id": 3,
        "brandName": "brandy",
        "phoneNumber": "08167534061",
        "address": "34567892",
        "createdAt": "2023-08-23T15:28:32.415Z",
        "updatedAt": "2023-08-23T15:47:46.494Z",
        "UserId": 1
        }
	}
```

---
### update a profile 

- Route: api/v1/profile/accommodation
- Method: PUT
- Header: Bearer ${token}
- Body:

```
{
    "brandName":"brandy updated again",
    "phoneNumber":"08167534061",
    "address":"34567892"
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully updated your profile",
    "existingProfile": {
        "id": 3,
        "brandName": "brandy updated again",
        "phoneNumber": "08167534061",
        "address": "34567892",
        "createdAt": "2023-08-23T15:28:32.415Z",
        "updatedAt": "2023-08-23T15:47:46.494Z",
        "UserId": 1
    }
}
```

---
### get profile by brandName or userId 

- Route: api/v1/profile/accommodation?userId={3}&brandName={brandy}
- Method: GET
- Header: Bearer ${token}
- Body:


- Responses

- Success

```
{
    "success": true,
    "message": "Queried profile",
    "existingProfile": {
        "id": 6,
        "brandName": "brandy new",
        "phoneNumber": "08167534062",
        "address": "34567892ww",
        "email": "raphaelolowojuni@gmail.com",
        "createdAt": "2023-09-06T06:02:53.029Z",
        "updatedAt": "2023-09-06T06:02:53.029Z",
        "UserId": 1
    },
    "rating": "80%"
}
```

---
### rate Accommodation Profile

- Route: api/v1/profile/accommodation/rating/accommodation_profile_id
- Method: POST
- Header: Bearer ${token}
- Body:

```
{
    "noOfStars":4
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully rated this profile"
}
```

---
## Service Profile

| field            | data_type | constraints      | enums |
| ---------------- | --------- | ---------------- |-----|
| brandName        | string    | required, unique         ||
| address          | string    | required         ||
| phoneNumber      | string    | required, unique ||
|areaOfSpecialization | string    | required, unique ||

---

### create a profile --if neccessary

- Route: api/v1/profile/service
- Method: POST
- Header: Bearer ${token}
- Body:

```
{
    "brandName":"brandy",
    "phoneNumber":"08167534061",
    "address":"34567892",
    "areaOfSpecialization":"farmer"
}
```

- Responses

- Success

```
{
		success: true,
		message: "succesfully created a profile",
		accommodationProfile :{
        "id": 3,
        "brandName": "brandy",
        "phoneNumber": "08167534061",
        "address": "34567892",
        "areaOfSpecialization":"farmer"
        "createdAt": "2023-08-23T15:28:32.415Z",
        "updatedAt": "2023-08-23T15:47:46.494Z",
        "UserId": 1
        }
	}
```

---
### update a profile 

- Route: api/v1/profile/service
- Method: PUT
- Header: Bearer ${token}
- Body:

```
{
    "brandName":"brandy updated ",
    "phoneNumber":"08167534061",
    "address":"34567892",
    "areaOfSpecialization":"farmer"

}
```

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully updated your service profile",
    "existingProfile": {
        "id": 1,
        "brandName": "brandy updated ",
        "phoneNumber": "08167534061",
        "address": "34567892",
        "email": "projectsiwes@gmail.com",
        "areaOfSpecialization": "farmer",
        "createdAt": "2023-09-06T01:52:09.518Z",
        "updatedAt": "2023-09-06T01:55:38.198Z",
        "UserId": 3
    }
}   
```

---
### get profile by brandName or userId 

- Route: api/v1/profile/service?userId={3}&brandName={brandy updated}
- Method: GET
- Header: Bearer ${token}
- Body:


- Responses

- Success

```
{
    "success": true,
    "message": "Queried profile",
    "existingProfile": {
        "id": 1,
        "brandName": "josiahademeso@gmail.com's brand",
        "phoneNumber": null,
        "address": null,
        "email": "josiahademeso@gmail.com",
        "createdAt": "2023-09-14T06:19:46.914Z",
        "updatedAt": "2023-09-14T06:19:46.914Z",
        "UserId": 2,
        "User": {
            "firstName": "josiah",
            "lastName": "ademeso",
            "email": "josiahademeso@gmail.com",
            "role": "Accommodation Provider"
        },
        "Reviews": [
            {
                "id": 1,
                "message": "a good guy i trust his work",
                "createdAt": "2023-09-14T06:22:32.442Z",
                "updatedAt": "2023-09-14T06:22:32.442Z",
                "UserId": 2,
                "AccommodationProfileId": 1,
                "ServiceProfileId": null,
                "User": {
                    "firstName": "josiah",
                    "lastName": "ademeso",
                    "email": "josiahademeso@gmail.com",
                    "role": "Accommodation Provider"
                }
            },
            {
                "id": 2,
                "message": "a good guy i trust his work",
                "createdAt": "2023-09-14T06:22:48.027Z",
                "updatedAt": "2023-09-14T06:22:48.027Z",
                "UserId": 2,
                "AccommodationProfileId": 1,
                "ServiceProfileId": null,
                "User": {
                    "firstName": "josiah",
                    "lastName": "ademeso",
                    "email": "josiahademeso@gmail.com",
                    "role": "Accommodation Provider"
                }
            }
        ]
    },
    "rating": "10%"
}
```

---

### rate Service Profile

- Route: api/v1/profile/service/rating/service_profile_id
- Method: POST
- Header: Bearer ${token}
- Body:

```
{
    "noOfStars":4
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully rated this profile"
}
```

---

## user Profile

| field            | data_type | constraints      | enums |
| ---------------- | --------- | ---------------- |-----|
| firstName        | string    | required, unique         ||
| lastName         | string    | required         ||
| email            | string    | required, unique ||
| role             | string    | required, unique ||
| imageUrl         | string  , form data  | required, unique ||

---

### create a userProfile --if neccessary

- Route: api/v1/profile/user
- Method: POST
- Header: Bearer ${token}
- Body:

```
{
    "firstName":"brandy",
    "lastName":"james",
    "role":"Explorer",
    "email":"farmer@gmail.com",
    "imageUrl":formdata

}
```

- Responses

- Success

```
{
    "success": true,
    "userProfile": [
        {
            "id": 1,
            "firstName": "brandy updtated",
            "lastName": "james",
            "role": "Explorer",
            "imageUrl": [
                "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694671407/siwesProject.png"
            ],
            "email": "farmer@gmail.com",
            "createdAt": "2023-09-14T05:52:35.956Z",
            "updatedAt": "2023-09-14T06:05:48.186Z",
            "UserId": 1
        }
    ]
}

```

---
### update a user profile

- Route: api/v1/profile/user
- Method: PUT
- Header: Bearer ${token}
- Body:

```
{
    "firstName":"brandy update",
    "lastName":"james",
    "role":"Explorer",
    "email":"farmer@gmail.com",
    "media": image using formdata

}
```

- Responses

- Success

```
{
    "success": true,
    "userProfile": [
        {
            "id": 1,
            "firstName": "brandy updtated",
            "lastName": "james",
            "role": "Explorer",
            "imageUrl": [
                "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694671407/siwesProject.png"
            ],
            "email": "farmer@gmail.com",
            "createdAt": "2023-09-14T05:52:35.956Z",
            "updatedAt": "2023-09-14T06:05:48.186Z",
            "UserId": 1
        }
    ]
}  
```

---
### get user profile 

- Route: api/v1/profile/user
- Method: GET
- Header: Bearer ${token}
- Body:


- Responses

- Success

```
{
    "success": true,
    "message": "Queried profile",
    "existingProfile": {
        "id": 1,
        "brandName": "brandy updated",
        "phoneNumber": "08167534061",
        "address": "34567892",
        "email": "projectsiwes@gmail.com",
        "areaOfSpecialization": "farmer",
        "createdAt": "2023-09-06T01:52:09.518Z",
        "updatedAt": "2023-09-06T02:09:08.130Z",
        "UserId": 3,
        "User": {
            "id": 3,
            "firstName": "siwes",
            "lastName": "ademeso",
            "passwordToken": null,
            "role": "Service Provider",

        }
    }
       "rating": "80%"
}
```

---


## Accomodation listing

##form

| field            | data_type | constraints      |
| ---------------- | --------- | ---------------- |
| name             | string    | required         |
| description      | string    | required         |
| type             | string    | required         |
| address          | string    | required         |
| noOfRooms        | number    | required         |
| noOfBathroom     | number    | required         |
| noOfKitchen      | number    | required         |
| city             | string    | required         |
| State            | string    | required         |
| images           | string    | required         |

---

### create an Accomodaton listing

- Route: api/v1/accommodation
- Method: POST
- Header: Bearer ${token}
- Body: form data

```
{
        "name": "new hostel",
        "description": "2 bed room flat sef contain",
        "type": "i no sabi",
        "address": "damico",
        "noOfRooms": 12,
        "noOfKitchen": 3,
        "noOfBathroom": 4,
        "city": "ife",
        "state": "lagos",
        "images": [] formdata,
}
```

- Responses

- Success

```
{
    "message": "succesfully listed product",
    "data": {
        "id": 1,
        "name": "new hostel testing",
        "description": "2 bed room flat sef contain",
        "type": "i no sabi",
        "address": "damico",
        "noOfRooms": 12,
        "city": "ife",
        "state": "lagos",
        "noOfKitchen": 3,
        "noOfBathroom": 4,
        "images": [
            "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694657991/siwesProject.png",
            "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694657994/siwesProject.png"
        ],
        "UserId": 1,
        "updatedAt": "2023-09-14T02:19:55.231Z",
        "createdAt": "2023-09-14T02:19:55.231Z"
    }
}
```

---
### update a Accommodation listing

- Route: api/v1/accommodation/accommodation_id
- Method: PUT
- Header: Bearer ${token}
- Body: form data

```
{
        "name": "root hostel updated",
        "description": "2 bed room flat sef contain",
        "type": "i no sabi",
        "address": "damico",
        "noOfRooms": 12,
        "city": "ife",
        "state": "lagos",
        "images": [] formdata,
}
```

- Responses

- Success

```
{
    "message": "succesfully updated accommodation",
    "data": {
        "id": 3,
        "name": "root hostel updated",
        "type": "i no sabi",
        "description": "2 bed room flat sef contain",
        "address": "damico",
        "noOfRooms": "12",
        "city": "ife",
        "state": "lagos",
        "images": [],
        "createdAt": "2023-09-05T17:27:43.151Z",
        "updatedAt": "2023-09-05T18:53:08.947Z",
        "UserId": 1
    }
}
```

---
### get My Accommodations

- Route: api/v1/accommodation/user
- Method: GET
- Header: Bearer ${token}


- Responses

- Success

```
{
    "success": true,
    "accommodations": [
        {
            "id": 3,
            "name": "root hostel updated",
            "type": "i no sabi",
            "description": "2 bed room flat sef contain",
            "address": "damico",
            "noOfRooms": 12,
            "city": "ife",
            "state": "lagos",
            "images": [],
            "createdAt": "2023-09-05T17:27:43.151Z",
            "updatedAt": "2023-09-05T18:52:24.286Z",
            "UserId": 1
        }
    ]
}
```

---
### get accommodation by userId

- Route: api/v1/accommodation
- Method: GET
- Header: Bearer ${token}
- query: userId

- Responses

- Success

```
{
    "success": true,
    "accommodations": [
        {
            "id": 1,
            "name": "root hostel",
            "type": "i no sabi",
            "description": "2 bed room flat sef contain",
            "address": "damico",
            "noOfRooms": 12,
            "city": "ife",
            "state": "lagos",
            "images": [],
            "createdAt": "2023-09-05T16:15:30.601Z",
            "updatedAt": "2023-09-05T16:15:30.601Z",
            "UserId": 2
        },
        {
            "id": 2,
            "name": "root hostel",
            "type": "i no sabi",
            "description": "2 bed room flat sef contain",
            "address": "damico",
            "noOfRooms": 12,
            "city": "ife",
            "state": "lagos",
            "images": [],
            "createdAt": "2023-09-05T16:17:37.543Z",
            "updatedAt": "2023-09-05T16:17:37.543Z",
            "UserId": 1
        },
        {
            "id": 3,
            "name": "root hostel",
            "type": "i no sabi",
            "description": "2 bed room flat sef contain",
            "address": "damico",
            "noOfRooms": 12,
            "city": "ife",
            "state": "lagos",
            "images": [],
            "createdAt": "2023-09-05T17:27:43.151Z",
            "updatedAt": "2023-09-05T17:27:43.151Z",
            "UserId": 1
        }
    ]
}
```

---
### delete accommodation by accommodationId

- Route: api/v1/accommodation/accommodation_id
- Method: DELETE
- Header: Bearer ${token}

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully deleted accommodation"
}
```

---
## Service listing

##form

| field            | data_type | constraints      |
| ---------------- | --------- | ---------------- |
| name             | string    | required         |
| description      | string    | required         |
| address          | string    | required         |
| city             | string    | required         |
| State            | string    | required         |
| images           | form data | required         |

---

### create an Service listing

- Route: api/v1/service
- Method: POST
- Header: Bearer ${token}
- Body: form data

```
{
        "name": "technovo",
        "description": "software Engineer",
        "address": "damico",
        "city": "ife",
        "state": "lagos",
        "images": [] formdata,
}
```

- Responses

- Success

```
{
    "message": "succesfully listed product",
    "data": {
        "id": 1,
        "name": "technovo",
        "description": "software engineer",
        "address": "damico",
        "city": "ife",
        "state": "lagos",
        "images": [],
        "UserId": 4,
        "updatedAt": "2023-09-14T02:28:06.954Z",
        "createdAt": "2023-09-14T02:28:06.954Z"
    }
}
```

---
### update a service

- Route: api/v1/service/service_id
- Method: PUT
- Header: Bearer ${token}
- Body: form data

```
{
        "name": "technovo update",
        "description": "software engineer",
        "address": "damico",
        "city": "ife",
        "state": "lagos",
        "images": [] formdata,
}
```

- Responses

- Success

```
{
    "message": "succesfully updated service",
    "data": {
        "id": 5,
        "name": "technovo update",
        "description": "software engineer",
        "address": "damico",
        "city": "ife",
        "images": [
            "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694659353/siwesProject.png"
        ],
        "state": "lagos",
        "createdAt": "2023-09-14T02:40:47.735Z",
        "updatedAt": "2023-09-14T02:42:34.217Z",
        "UserId": 4
    }
}
```

---
### get My service

- Route: api/v1/service/user
- Method: GET
- Header: Bearer ${token}


- Responses

- Success

```
{
    "success": true,
    "services": [
        {
            "id": 6,
            "name": "technovo new one",
            "description": "software engineer",
            "address": "damico",
            "city": "ife",
            "images": [
                "http://res.cloudinary.com/dhq33r9pa/image/upload/v1694662359/siwesProject.png"
            ],
            "state": "lagos",
            "createdAt": "2023-09-14T03:32:40.509Z",
            "updatedAt": "2023-09-14T03:32:40.509Z",
            "UserId": 6
        }
    ]
}
```

---
### get service by userId

- Route: api/v1/service
- Method: GET
- Header: Bearer ${token}
- query: userId

- Responses

- Success

```
{
    "success": true,
    "accommodations": [
        {
            "id": 1,
            "name": "root hostel",
            "type": "i no sabi",
            "description": "2 bed room flat sef contain",
            "address": "damico",
            "noOfRooms": 12,
            "city": "ife",
            "state": "lagos",
            "images": [],
            "createdAt": "2023-09-05T16:15:30.601Z",
            "updatedAt": "2023-09-05T16:15:30.601Z",
            "UserId": 2
        },
        {
            "id": 2,
            "name": "root hostel",
            "type": "i no sabi",
            "description": "2 bed room flat sef contain",
            "address": "damico",
            "noOfRooms": 12,
            "city": "ife",
            "state": "lagos",
            "images": [],
            "createdAt": "2023-09-05T16:17:37.543Z",
            "updatedAt": "2023-09-05T16:17:37.543Z",
            "UserId": 1
        },
        {
            "id": 3,
            "name": "root hostel",
            "type": "i no sabi",
            "description": "2 bed room flat sef contain",
            "address": "damico",
            "noOfRooms": 12,
            "city": "ife",
            "state": "lagos",
            "images": [],
            "createdAt": "2023-09-05T17:27:43.151Z",
            "updatedAt": "2023-09-05T17:27:43.151Z",
            "UserId": 1
        }
    ]
}
```

---

### get sevice by serviceId

- Route: api/v1/service/service_id
- Method: GET
- Header: Bearer ${token}

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully deleted accommodation"
}
```

---
### delete service by serviceId

- Route: api/v1/service/service_id
- Method: DELETE
- Header: Bearer ${token}

- Responses

- Success

```
{
    "success": true,
    "message": "succesfully deleted accommodation"
}
```

---

## add review to profile


| field            | data_type | constraints      |
| ---------------- | --------- | ---------------- |
| message          | string    | required         |


---

### add review to Accommodation profile

- Route: api/v1/profile/accommodation/review/id
- Method: POST
- Header: Bearer ${token}
- Body:

```
{
{
    "message":"a good guy i trust his work"
}
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "review sent successfully",
    "date": {
        "id": 2,
        "message": "a good guy i trust his work",
        "UserId": 2,
        "AccommodationProfileId": 1,
        "updatedAt": "2023-09-14T06:22:48.027Z",
        "createdAt": "2023-09-14T06:22:48.027Z",
        "ServiceProfileId": null
    }
}
```

---

---

### add review to service profile

- Route: api/v1/profile/service/review/serviceId
- Method: POST
- Header: Bearer ${token}
- Body:

```
{
{
    "message":"a good guy i trust his work"
}
}
```

- Responses

- Success

```
{
    "success": true,
    "message": "review sent successfully",
    "date": {
        "id": 2,
        "message": "a good guy i trust his work",
        "UserId": 2,
        "AccommodationProfileId": 1,
        "updatedAt": "2023-09-14T06:22:48.027Z",
        "createdAt": "2023-09-14T06:22:48.027Z",
        "ServiceProfileId": null
    }
}
```

---
### delete accommodation review

- Route:  api/v1/profile/accommodation/review/serviceId
- Method: DELETE
- Header: Bearer ${token}

- Responses

- Success

```
{
    "success": true,
    "message": "review deleted successfully"
}
```

---
- Route:  api/v1/profile/service/review/serviceId
- Method: DELETE
- Header: Bearer ${token}

- Responses

- Success

```
{
    "success": true,
    "message": "review deleted successfully"
}
```

---



## Contributors

- Josiah Ademeso (monte carlo)# property-center
