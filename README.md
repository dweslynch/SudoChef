# SudoChef API Reference

***

# Authentication

## Creating a new account

### Node

> This endpoint includes an API key which corresponds to SudoChef's FireBase app

    https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPpZJJ5xm8wevrmdy9zB7k_dc_8wyXww0

### Request details

> This request should be sent with the following JSON body

```js
{
    email: [USER_EMAIL],
    password: [USER_PASSWORD],
    returnSecureToken: true
}
```

### Response details

> The server will respond with the following JSON object

```js
{
    idToken: [UNIQUE_TOKEN],
    email: [USER_EMAIL],
    refreshToken: [UNIQUE_REFRESH_TOKEN],
    expiresIn: [SECONDS_TILL_EXPIRATION],
    localId: [USER_UID]        
}
```

### Possible errors

> EMAIL_EXISTS:  An account already exists for this user

> TOO_MANY_ATTEMPTS_TRY_LATER:  Google has blocked the request due to too many sign-in attempts from the IP address

## Signing in with email and password

### Node

    https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPpZJJ5xm8wevrmdy9zB7k_dc_8wyXww0

### Request details

> This request should be sent with the following JSON body

```js
{
    email: [USER_EMAIL],
    password: [USER_PASSWORD],
    returnSecureToken: true
}
```

### Response details

> The server will respond with the following JSON object

```js
{
    idToken: [UNIQUE_TOKEN],
    email: [USER_EMAIL],
    refreshToken: [UNIQUE_REFRESH_TOKEN],
    expiresIn: [SECONDS_TILL_EXPIRATION],
    localId: [USER_UID],
    registered: [ACCOUNT_EXISTS]
}
```

### Possible errors

> INVALID_PASSWORD:  The password was wrong

## Signing in with GitHub

> This is not recommended due to the complexity of the request, which requires information that can only be obtained from a previous request to GitHub's OAuth service.  We recommend using the GUI version of the service at https://dweslynch.github.io/SudoChef/ instead

# User Profiles

### Node

> GET

    https://authtest-af1e0.firebaseio.com/profiles/[UID].json

Where `UID` is the ID returned by FireBase when signing in or creating an account.

### Response details

> The server will respond with the following JSON object

```js
{
    calendar: {                         // The user's scheduled recipes
        mon: {
            b: {                        // Breakfast
                authorid: [AUTHOR_ID],
                key: [RECIPE_KEY],
                name: [RECIPE_NAME]
            }
            l: { ... },
            d: { ... },
        }
        tue: { ... },
        wed: { ... },
        thu: { ... },
        fri: { ... },
        sat: { ... },
        sun: { ... }
    }
    inventory: {                        // All recipes the user has added
        author: [AUTHOR_NAME],
        authorid: [AUTHOR_ID],
        calories: [ESTIMATED_CALORIES], // May not exist
        description: [DESCRIPTION],
        name: [RECIPE_NAME],
        servings: [ESTIMATED_SERVINGS], // May not exist
        tags: {
            peanutFree: [true/false],
            ... :       [true/false]
        }
    },
    restrictions: {
        peanutFree: [true/false],
        ... :       [true/false]
    }
}
```

> You can also access any of the sub-values of this object by sending a GET request to the corresponding endpoint, with slashes delimiting descents in the heirarchy and .json at the end.

> This endpoint (and all sub-nodes) accept PUT requests with the desired data as the request body.

### Possible errors

> This endpoint only allows access when signed in as the corresponding user.

# Global Recipe List

## GETting recipes

### Node

> GET

    https://authtest-af1e0.firebaseio.com/recipes.json

### Response details

> The server will respond with the following JSON object

```js
{
    [UID]: {
        [RECIPE_KEY]: {
            author: [AUTHOR_NAME],
            authorid: [AUTHOR_ID],
            calories: [ESTIMATED_CALORIES], // May not exist
            description: [DESCRIPTION],
            instructions: [INSTRUCTIONS],
            name: [RECIPE_NAME],
            servings: [ESTIMATED_SERVINGS], // May not exist
            ingredients: {
                0: [FIRST_INGREDIENT],
                1: [SECOND_INGREDIENT],
                ... : [OTHER_INGREDIENTS]
            },
            tags: {
                peanutFree: [true/false],
                ... :       [true/false]
            }
        },
        ... : ...
    },
    ... : ...
}
```

> As before, requests can be made to sub-nodes

## POSTing new recipes

### Node

> POST

    https://authtest-af1e0.firebaseio.com/recipes/[AUTHOR_ID].json

### Request details

> The POST request should made with a recipe formatted as shown above as a JSON body

### Response details

> The server will respond with the following JSON object

```js
{
    name: [KEY]     // Where KEY is the new recipe key
}
```

# Mobile Codes

### Base Node

    https://authtest-af1e0.firebaseio.com/mobile.json

### POSTing mobile recipe lists

> POST requests to this endpoint should consist of the following JSON.  Note that it contains a JSON list denoted by brackets

```js
{
    [MOBILE_KEY]: [
        {
            name: [INGREDIENT_NAME],
            quantity: [INGREDIENT_QUANTITY],
            units: [INGREDIENT_UNITS]           // May not exist
        },
        ...
    ]
}
```


> The server will respond with the following JSON which is necessary to perform later GET requests

```js
{
    name: [MOBILE_KEY]
}
```

### GETting mobile recipe lists

> GET requests should be made to the above endpoint, with the following modification

    https://authtest-af1e0.firebaseio.com/mobile/[MOBILE_KEY].json

> The server will respond with a list of ingredients just like above, however they are formatted slightly differently

```js
{
    0: {
        name: [INGREDIENT_NAME],
        quantity: [INGREDIENT_QUANTITY],
        units: [INGREDIENT_UNITS]           // May not exist
    },
    ... : ...
}
```

# Writing Data

## POST

Post requests are used when pushing an object to a list-like node in the database, such as /`profiles/[UID]/inventory.json` or `/recipes/[UID].json`

They should only be used to create new entries because the server will assign a unique key to the data when appending it to the node and respond accordingly.

## PUT

Put requests are used when the exact parent node of an object is known, at endpoints such as /`recipes/[UID]/[RECIPE_KEY].json` or `/mobile/[MOBILE_KEY].json`

They will directly update children of the node that already exist, and create ones that do not.
