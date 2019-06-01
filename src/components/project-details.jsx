import React from 'react';
import axios from 'axios';
import ProductsUsed from './products-used';
import Timeline from './timeline';

export default class ProjectDetails extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
      this.getProjects();
  }
  getProjects() {
      axios.get('/api/project-details.php')
          .then(response => {
              // handle success
              console.log(response);
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          .finally(function (response) {
            
          });
  }
    render() {
        return (
            <div>
                <div className="row bg-light p-4">
                    <div className="col-12 col-md-5">
                        <img src="https://bit.ly/2WxCQpY" className="img-fluid" alt="Project Image" />
                    </div>
                    <div className="col-12 col-md-7 mt-4 mt-md-0">
                        <h3>Flower Garden</h3>
                        <div className="font-weight-light mt-3">By: Pugnelius McPugpug</div>
                        <div className=" mt-4">Spicy jalapeno bacon ipsum dolor amet alcatra flank rump fatback pancetta porchetta pig swine pork chop bresaola drumstick salami t-bone ground round meatloaf. Pork loin alcatra cow spare ribs. Tenderloin spare ribs pig strip steak alcatra salami brisket chicken shankle tri-tip. Ribeye shank salami, capicola andouille doner beef ribs jowl ham kielbasa biltong boudin. Cupim short ribs fatback pork chop, doner corned beef ball tip turkey sausage kielbasa.</div>
                    </div>
                </div>
                <div className="row">
                    <ProductsUsed />
                </div>
                <div className="row bg-light">
                    <Timeline />
                </div>
            </div>
        )
    }
}