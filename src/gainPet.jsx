import React from 'react';
import { gql, graphql } from 'react-apollo';

const gainPetMutation = gql`
  mutation gainPet($name:String!,$age:Int,$color:String,$owner:String){
    gainPet(pet:{
      name:$name,
      age: $age,
      color: $color,
      owner: $owner
    }){
      id
      username
    }
}`;

const GainPetForm = (props) => {
  let submitForm = () => {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let color = document.getElementById('color').value;
    let owner = document.getElementById('owner').value;
    props.gainPetMutation({
      variables: {
        name: name,
        age: age,
        color: color,
        owner: owner,
      },
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <form id="myForm">
      name: <input id="name" name="name" type="text" /><br />
      age: <input id="age" name="age" type="text" /><br />
      color: <input id="color" name="color" type="text" /><br />
      owner: <input id="owner" name="owner" type="text" /><br />
      <input
        id="btn"
        name="btn"
        type="button"
        onClick={() => { submitForm(); }}
        value="submit"
      />
    </form>
  );
};

/*
if multiple mutations,it likes:
  const ComponentWithMutations =
    graphql(submitNewUser, { name: 'newUserMutation' })(
      graphql(submitRepository, { name: 'newRepositoryMutation' })(Component)
    );
要给每个mutation的option的name一个值，防止都试图调用mutate
*/
const GainPetFormWithData = graphql(gainPetMutation, { name: 'gainPetMutation' })(GainPetForm);

export default GainPetFormWithData;
