# Auth JWT

## Notes Link

---

- [week 6.1 || Authentincation , JWT ](https://petal-estimate-4e9.notion.site/Authentincation-a4b43c7cc1d14535a7b5b366080095fa)

---

In jwt we dont enctypt the string we just encode the string

- that means when we encrypt we need key to decrypt that strint
- but when we encode we can easily decode that string without secrect key but we cant verify

# Everythings that include in header that will send to every routes whenever we are sending the the request

### This is how we pass the data from middleware to routes [Authmiddlware](./Authmiddlware.js)

# Full stack Todo app withoud mongodb with jwt auth and middleware [todoMern](./todoMern/)

1.  User can signup/signin
2.  User cant able to create todos without signin
3.  user can not see their todos is the user is not login
4.  we store the login token inside the browser so user dont need to login everytimes
5.  User can create/delete/update TODOs
6.  User can see their existing todos and mark them as done

# This is how we pass headers and body together in axios

```
await axios.post("http://localhost:3000/create", {
         title,
         description
      } ,{
        headers:{
          token:localStorage.getItem("token")
        },
      })
```
