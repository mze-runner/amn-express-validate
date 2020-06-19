# AMN Express Validate

A simple wrapper around [`@hapi/joi`](#https://hapi.dev/module/joi/) validator and convert it into connect middleware.

## Get started

### Installation

```javascript
npm i amn-express-validate
```

### Examples

The middleware consume two parameters

-   schema - an ObjectSchema which defines validation rules.
-   source - an optional parameter 'body' or 'query' or 'params' to define which client input to validate. In case is not provided, the middleware pick all input from 'body' and 'query' and 'params'.

```javascript
const Joi = require('@hapi/joi');
const { validate } = require('amn-express-validate');

// validate req.body
const userSignUp = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
});

router.post('/user/signup',
    , validate(userSignUp, 'body')
    , singUpMiddleware
);

// validate req.params in url string
const postId = Joi.object().keys({
    pid: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
});

const postBody = Joi.object().keys({
    title: Joi.string().required(),
    text: Joi.string().options()
});

router.put('/post/:pid/',
    , validate(postId, 'params')
    , postUpdateMiddleware
);

// you can call validate multiply times
router.put('/post/:pid/',
    , validate(postId, 'params') // validate params
    , validate(postBody, 'body') // validate body
    , postUpdateMiddleware
);

```
