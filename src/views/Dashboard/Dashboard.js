import React, { Component, lazy} from 'react';
import { Wave } from 'react-animated-text';
import axios from 'axios'
import moment from 'moment'
import "moment-timezone";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      deployments: [],
      error: false,
    };
  }

  componentDidMount() {
    this.getDeployments();
  }

  getDeployments = async () => {
    try {
      //try to get data
      const response = await axios.get(
        "https://api-dev-community-app.herokuapp.com/v1/api/deployments"
      );
      if (response.status) {
        this.setState({ deployments: response.data });
      } else {
        this.setState({ error: true });
      }
    } catch (e) {
      console.log(e)
      this.setState({ error: true });
    }
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
            <CardHeader>
                  Community App Deployments
                  <div className="card-header-actions text-muted">
                    {/*eslint-disable-next-line*/}
                    <a href="#" className="card-header-action btn btn-setting" onClick={this.getDeployments}><i className="icon-reload"></i></a>
                    <mark>Last refreshed on <i> {moment().local().format("h:mm:ss a, MMMM Do YYYY")}</i></mark>

                  </div>
                </CardHeader>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">Environment</th>
                      <th className="text-center">Branch Deployed</th>
                      <th className="text-center">Build Number</th>
                      <th className="text-center">Deployed on (IST)</th>
                      <th>Run Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.deployments.map((d,index) => {
                        const isJobRunning = d.jobStatus === "running";
                        return (
                          <tr key={index}>
                           <td className="text-center">
                            <div>
                              {d.env.name}
                            </div>
                            <div className="small text-muted">
                              <span><a href={`${d.env.url}`} target="_blank">Home</a></span> | <span><a href={`${d.env.url}/challenges`} target="_blank">Listing</a></span> | <span><a href={`${d.env.url}/my-dashboard`} target="_blank">Dashboard</a></span>
                            </div>
                          </td>
                          <td className="text-center">
                            <div>
                              <a href={`https://github.com/topcoder-platform/community-app/tree/${d.branchDeployed}`}  target="_blank">{d.branchDeployed}</a>
                            </div>

                              {isJobRunning ? <div className="small" style={{color: "red"}}><span><Wave text="Deployment in progress..."/></span></div> : ""}

                          </td>
                          <td className="text-center">
                            <div>
                              <a href={d.buildUrl} target="_blank">{d.buildNumber}</a>
                              </div>
                              <div className="small text-muted">
                                <span>Deployed by </span>{d.authorName}
                            </div>
                          </td>
                          <td className="text-center">
                            <div>{d.jobStatus === "running" ? <span style={{Color: "red"}}>Job started on {d.buildStartedOn}</span> : d.buildFinishedOn}</div>
                            <div className="small text-muted">
                              <span>
                                {d.jobStatus === "running" ? <span style={{Color: "red"}}>Job started on {d.buildStartedOnEDT}</span> : d.buildFinishedOnEDT} EDT
                              </span>
                            </div>
                          </td>
                          <td>
                            {isJobRunning ? <strong>Running</strong>: <strong>{d.buildTimeMillis}</strong>}
                          </td>
                        </tr>
                        );
                      })}

                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              <div className="small text-muted">
              <span><a href="https://cci-reporter.herokuapp.com/" target="_blank">Legacy App </a></span>
              </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>


      </div>
    );
  }
}

export default Dashboard;
