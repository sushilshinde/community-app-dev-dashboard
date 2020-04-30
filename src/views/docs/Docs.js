import React, { Component } from 'react';

class Docs extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Guidline Docs
          </div>

          <div className="card-body">
          <p>Community app is one of most vibrant app on the Topcoder platform. In order to scale feature developments and issue fixes, we have documented processes and other information for co-pilots and community members.</p>
            <div className="bd-example">
              <h6>Topcoder X Process</h6>
              <p>All CPs working on TCX process needs to follow <a href="https://github.com/topcoder-platform/community-app/blob/develop/docs/TCX-process.md" target="_blank"> these steps  </a> in order to help pipeline deliver fixes</p>
              <br></br>
              <h6>Know platform test environments</h6>
              <p> Community app have multiple testing <a href="https://github.com/topcoder-platform/community-app/blob/develop/docs/deployment-env.md#deployment-environments" target="_blank"> environments  </a>, 
              to scale testing and multiple issues/features getting worked on parallelly</p>
              <br></br>
              <h6>Deploy your branch for QA</h6>
              <p> Well documented <a href="https://github.com/topcoder-platform/community-app/blob/develop/docs/deployment-env.md#deploy-your-branch-on-test-environments" target="_blank"> steps  </a> to help yourself deploy your branch for QA</p>
              <br></br>
              <h6>Commit logs rules</h6>
              <p> There is strict format for <a href="https://github.com/topcoder-platform/community-app/blob/develop/CONTRIBUTING.md" target="_blank">  commit code message  </a> </p>
            </div>
          </div>   
        </div>  
      </div>
    );
  }
}

export default Docs;
