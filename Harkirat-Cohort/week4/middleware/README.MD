# Find Error count (errorCount.js)
- You have been given an express server which has a few endpoints.
### Your task is to
- 1. Ensure that if there is ever an exception, the end user sees a status code of 404
- 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

# Find request count (requestCount.js)
- You have been given an express server which has a few endpoints.
- Your task is to create a global middleware (app.use) which will
- maintain a count of the number of requests made to the server in the global
- requestCount variable


# rate Limitter (rateLimitter.js)
- You have been given an express server which has a few endpoints.
- Your task is to create a global middleware (app.use) which will
- rate limit the requests from a user to only 5 request per second
- If a user sends more than 5 requests in a single second, the server
- should block them with a 404.
- User will be sending in their user id in the header as 'user-id'
- You have been given a numberOfRequestsForUser object to start off with which
- clears every one second
