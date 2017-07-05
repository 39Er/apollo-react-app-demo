import React, { Component } from 'react';
import { ApolloClient, gql, graphql, ApolloProvider, createNetworkInterface } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

/**fetch('http://localhost:3001/graphql', {
  method: 'POST',
  mode: 'cors',
  body: '{"query":"query{hello}"}',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((response) => {
  return response.json();
}).then((data) => {
  console.log(data);
});*/
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3001/graphql',
  }),
});

const ownerQuery = gql`
  query {
    owner(id:"594cbb37c7f8585918139b97") {
      id
      username
      pets
    }
  }
`;
const OwnerForm = ({ data: { loading, error, owner } }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (<div>
    <p>aaa</p>
    <p>{owner.username}</p>
    <ul>
      {owner.pets.map(pet => <li key={pet}>{pet}</li>)}
    </ul>
  </div>);
};

const OwnerFormWithData = graphql(ownerQuery)(OwnerForm);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <OwnerFormWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
