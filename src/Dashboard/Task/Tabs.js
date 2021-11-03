import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SwipeableViews from "react-swipeable-views";
import { Taskbox } from "../Task/TaskBox.js";
import { AddTaskBlock, TaskBar } from "./mini-components/minicomponents.js";
import { storageService } from "../Utility/function";
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
    color: "black",
  },
  slide2: {
    color: "black",
  },
  slide3: {
    color: "black",
  },
};

class SwipingTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      value: "",
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

  handleChangeTaskBox = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleChangeDec = (event) => {
    this.setState({
      valueDec: event.target.value,
    });
  };

  onCancle = () => {
    this.props.setAddTaskBlock();
  };

  onSubmit = () => {
    const todoList = storageService().getObject("todoList");
    todoList.map((item) => {
      if (
        item.index === this.props.taskbar[0]?.index &&
        item.title === this.props.taskbar[0]?.title
      ) {
        const subtask = {
          title: this.state.value,
          details: this.state.valueDec,
          index: item?.subtask?.length + 1,
          createdTime: "", // Time(),
          complitionTime: "",
        };
        item?.subtask.push(subtask);
        return item;
      }
      return item;
    });
    this.props.setTodoList(todoList);
    storageService().setObject("todoList", todoList);
    this.setState({value: '', valueDec: ''});
  };

  render() {
    const { index, value, valueDec } = this.state;
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
            {!this.props.addTaskBlock && (
              <AddTaskBlock setAddTaskBlock={this.onCancle} />
            )}

            {this.props.addTaskBlock && (
              <Taskbox
                handleChange={this.handleChangeTaskBox}
                handleChangeDec={this.handleChangeDec}
                onCancle={this.onCancle}
                onSubmit={this.onSubmit}
                value={value}
                valueDec={valueDec}
                disabled={value?.length > 0 ? false : true}
              />
            )}
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            comments
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>
            Activity
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

const DemoTabs = (props) => {
  return <SwipingTabs {...props} />;
};

export default DemoTabs;
