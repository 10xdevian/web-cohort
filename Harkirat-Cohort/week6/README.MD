# Auth JWT

## Notes Link

---

- [week 6.1 || Authentincation , JWT ](https://petal-estimate-4e9.notion.site/Authentincation-a4b43c7cc1d14535a7b5b366080095fa)

- [week 5.2 || Middlewares and Cors](https://petal-estimate-4e9.notion.site/HTTP-Deep-dive-d59b6336fa5a46daa56c21063578d400?pvs=74)

---

In jwt we dont enctypt the string we just encode the string
   - that means when we encrypt we need key to decrypt that strint
   - but when we encode we can easily decode that string without secrect key but we cant verify


# Everythings that include in header that will send to every routes whenever we are sending the the request


### This is how we pass the data from middleware to routes  (Authmiddlware.js)
