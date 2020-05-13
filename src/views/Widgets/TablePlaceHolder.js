import React, { Component, Fragment } from "react";
import Skeleton from "@yisheng90/react-loading";

class TablePlaceHolder extends Component {
  render() {
    const rows = [], cols = [];

    for (let i = 0; i < this.props.numberOfColumns; i++) {
      cols.push(
        <td className="text-center" key={i}>
          <div>
            <Skeleton height={this.props.rowHeight} />
          </div>
        </td>
      );
    }

    for (let i = 0; i < this.props.numberOfRows; i++) {
      rows.push(<tr key={i}>{cols}</tr>);
    }

    return <Fragment>{rows}</Fragment>;
  }
}
export default TablePlaceHolder;
