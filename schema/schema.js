const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve: (parent, args) => {
        return axios.get(`http://localhost:5000/companies/${parent.id}/users`)
          .then(res => res.data)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLInt},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve: (parent, args) => {
        return axios.get(`http://localhost:5000/companies/${parent.companyId}`)
          .then(res => res.data)
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return  axios.get(`http://localhost:5000/users/`)
          .then(res => res.data);
      },
    },
    user: {
      type: UserType,
      args:{id: {type: GraphQLInt}},
      resolve(parentValue, args){
        return  axios.get(`http://localhost:5000/users/${args.id}`)
          .then(res => res.data);
      },
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLInt}},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:5000/companies/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLString)},
        companyId: {type: GraphQLInt}
      },
      resolve: (parent, args) => {
        return axios.post(`http://localhost:5000/users`,args)
          .then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (parent, args) => {
        return axios.delete(`http://localhost:5000/users/${args.id}`)
          .then(res => res.data);
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        companyId: {type: GraphQLInt}
      },
      resolve: (parent,args) => {
        return axios.patch(`http://localhost:5000/users/${args.id}`, args)
          .then(res => res.data)
      }
  }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
