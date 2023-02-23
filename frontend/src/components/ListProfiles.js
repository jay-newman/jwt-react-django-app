import React from 'react';


export default class PetProfileList extends React.Component {

  constructor(props) {

    super(props);


    this.state = {}

  }


  renderRows() {

    return  this.props.items.map(function(o) {

              return  <tr key={"item-" + o.id}>

                        <td>{o.pet_name}</td>

                        <td>{o.pet_type}</td>

                      </tr>

            });

  }


  render() {

    return (

      <table>

        <thead>

          <th>

            Item

          </th>

          <th>

            Price

          </th>

        </thead>

        <tbody>

          {this.renderRows()}

        </tbody>

      </table>

    );

  }

}