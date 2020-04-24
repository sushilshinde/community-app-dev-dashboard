import React, { Component, lazy, Suspense } from 'react';
import TablePlaceHolder from '../Widgets/TablePlaceHolder'
import { Wave } from 'react-animated-text';
import Loader from 'react-loader';
import axios from 'axios'
import moment from 'moment'
import "moment-timezone";
import {
  Badge, Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      deployments: [],
      error: false,
    };

    this.getDeployments = this.getDeployments.bind(this);
  }

  componentDidMount() {
    this.getDeployments();
  }

  getDeployments = async () => {
    try {
      //try to get data
      this.setState({ deployments: [] });
      const response = await axios.get(
        "https://api-dev-community-app.herokuapp.com/v1/api/deployments"
      );
      if (response.status) {
        //debugger;
        //const data =  response.json();
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
                    <button className="card-header-action btn btn-setting" onClick={this.getDeployments}>&nbsp;&nbsp;<i className="icon-reload fa-lg"></i></button>
                    <mark>Last refreshed on <i> {moment().local().format("h:mm:ss a, MMMM Do YYYY")}</i></mark>
                  </div>
                </CardHeader>
              <CardBody>
              <Loader loaded={this.state.deployments.length !== 0}>

              </Loader>
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
                    {
                    this.state.deployments.length === 0 ? <TablePlaceHolder numberOfColumns={5} numberOfRows={5} rowHeight={45}/> :
                    this.state.deployments.map((d,index) => {
                        const isJobRunning = d.jobStatus === "running";
                        return (
                          <tr key={index}>
                           <td className="text-center">
                            <div>
                              {d.env.name}
                            </div>
                            <div className="small text-muted">
                              <span>{d.env.api} backend</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <div>
                              <a href={`https://github.com/topcoder-platform/community-app/tree/${d.branchDeployed}`}  target="_blank">{d.branchDeployed}</a>
                            </div>
                               {isJobRunning ? <div className="small" style={{color: "red"}}><span><Wave text="Deployment in progress..."/></span></div> : <div className="small muted">
                            <span><a href={`${d.env.url}`} target="_blank">Home</a></span> | <span><a href={`${d.env.url}/challenges`} target="_blank">Listing</a></span> | <span><a href={`${d.env.url}/my-dashboard`} target="_blank">Dashboard</a></span>
                            </div>}
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
                            <div>{d.jobStatus === "running" ? <span style={{Color: "red"}}>Job started on {d.buildStartedOn}</span> : d.buildFinishedOn} IST</div>
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
                      })

                      }

                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              <div className="small text-muted">
              <span><a href="https://cci-reporter.herokuapp.com/" target="_blank">Legacy App </a></span> | <span><a href="https://github.com/topcoder-platform/community-app/blob/develop/docs/TCX-process.md" target="_blank">Topcoder X Process</a></span>
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
