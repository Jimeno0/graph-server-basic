# Examples of GrapQL request for the first part of the GraphQL course of Stephen Grider

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


query companies{
  apple: company(id: 2){
		...companyDetails
  }
  google: company(id: 1){
		...companyDetails
  }
}

fragment companyDetails on Company {
    name,
    description,
    users {
      firstName,
      age
    },
}

```
