# Instructions

Run the following shell commands
1. npm install
2. npm run dev
3. npm run json:server
4. Check queries with GraphiQL [ihttp://localhost:4000/graphql](http://localhost:4000/graphql)

# Examples of queries & mutations

* queries

```bash

query Users{
  users{
    id
    firstName
    age

  }
}

query companies{
  apple: company(id: 2){
		...companyDetails
  }
  google: company(id: 1){
		...companyDetails
  }
}

```
* mutations

```bash

mutation addUser{
  addUser(firstName: "Charliin", age: "45", companyId: 1){
    firstName,
    age,
    id,
    company {
      id
    }
  }
}

mutation deleteUser{
  deleteUser(id:22){
    firstName
  }
}

mutation editUser{
  editUser(id:29, firstName:"alfred"){
    firstName,
    age,
    id,
  }
}



```

* fragments

```bash
fragment companyDetails on Company {
    name,
    description,
    users {
      firstName,
      age
    },
}
```
