import React from 'react';
import ProductsUsed from './products-used';

export default class ProjectDetails extends React.Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <img src="https://bit.ly/2WxCQpY" className="img-fluid" alt="Project Image" />
                        </div>
                        <div className="col-5">
                            <h3>Flower Garden</h3>
                            <div className="font-weight-light">By: Pugnelius McPugpug</div>
                            <div className=" mt-3">Spicy jalapeno bacon ipsum dolor amet alcatra flank rump fatback pancetta porchetta pig swine pork chop bresaola drumstick salami t-bone ground round meatloaf. Pork loin alcatra cow spare ribs. Tenderloin spare ribs pig strip steak alcatra salami brisket chicken shankle tri-tip. Ribeye shank salami, capicola andouille doner beef ribs jowl ham kielbasa biltong boudin. Cupim short ribs fatback pork chop, doner corned beef ball tip turkey sausage kielbasa.</div>
                        </div>
                        <ProductsUsed />
                    </div>
                </div>
                {/* <Timeline /> */}
            </div>
        )
    }
}