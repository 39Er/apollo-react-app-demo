import React, { Component } from 'react';
import { ApolloClient, gql, graphql, ApolloProvider, createNetworkInterface } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import GainPetFormWithForm from './gainPet';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3001/graphql',
  }),
});

const ownerQuery = gql`
  query Query($id:String!){
    owner(id:$id) {
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
    <p>{owner.id}</p>
    <p>{owner.username}</p>
    <ul>
      {owner.pets.map(pet => <li key={pet}>{pet}</li>)}
    </ul>
  </div>);
};

const OwnerFormWithData = graphql(ownerQuery, {
  options: ({ id }) => ({ variables: { id } }),
})(OwnerForm);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <OwnerFormWithData id={'594cbb37c7f8585918139b97'} />
          <GainPetFormWithForm />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
