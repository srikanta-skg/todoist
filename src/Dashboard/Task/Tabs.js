import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SwipeableViews from "react-swipeable-views";
import "./Style.scss";

const styles = {
  tabs: {
    background: "#fff",
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff",
  },
  slide1: {
    // backgroundColor: "#FEA900",
  },
  slide2: {
    // backgroundColor: "#B3DC4A",
  },
  slide3: {
    // backgroundColor: "#6AC0FF",
  },
};

class DemoTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div>
        <Tabs
          value={index}
          fullWidth
          onChange={this.handleChange}
          style={styles.tabs}
        >
          <Tab label="sub-tasks" />
          <Tab label="comments" />
          <Tab label="Activity" />
        </Tabs>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
          enableMouseEvents
        >
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
            sub-tasks
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            comments
            {/* <Select value={10} autoWidth={false}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select> */}
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>
            Activity
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default DemoTabs;
