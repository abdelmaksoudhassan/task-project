## Description
Authentication, authorization and role system,
user can signup and signin,
admins have all permissions such as upgrade user role to be admin, add,edit, get and delete posts,
users only allowed to add, edit and get posts

# URLs
## /auth/signin (post)
  {
    email: "admin@gmail.com"
    password: "12345"
  }

  {
    email: "user@gmail.com"
    password: "12345"
  }

## /auth/signup (post)
must provide unique email and at least 5 length password

## /auth/userid (patch) - (admin role)
to upgrade user to be admin

## /post (post)
{ text: any data }
to create new post
## /post/postid (delete) - (admin role)
to delete post by id

## /post/postid (patch)
{ text: update data }
to edit post you must be an admin or post owner

## /post
to get all posts

## /post/postid
to get post by id

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
