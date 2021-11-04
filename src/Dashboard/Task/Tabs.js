import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
import SwipeableViews from "react-swipeable-views";
import { Taskbox } from "../Task/TaskBox.js";
import {
  AddTaskBlock,
  TaskBar,
  CommentBox,
  CommentTextRender,
} from "./mini-components/minicomponents.js";
import { storageService } from "../Utility/function";
import isEmpty from "lodash/isEmpty";
import "./Style.scss";

const styles = {
  tabs: {
    background: "#fff",
  },
  slide: {
    padding: 15,
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

  onCommentChange = (event) => {
    this.setState({
      comment: event.target?.value,
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

  onSubmit = (isCommentSubmit) => {
    const todoList = storageService().getObject("todoList");
    let array = todoList.map((item) => {
      if (
        item.index === this.props.taskbar[0]?.index &&
        item.title === this.props.taskbar[0]?.title
      ) {
        if (isCommentSubmit) {
          let obj = {
            ...item,
            comment: this.state.comment,
          };
          return obj;
        } else {
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
      }
      return item;
    });
    this.props.setTodoList(array);
    storageService().setObject("todoList", array);
    this.setState({ value: "", valueDec: "", comment: "" });
  };

  taskComplete = (idx, deleteComment) => {
    const todoList = storageService().getObject("todoList");
    todoList.map((item) => {
      var found = item?.subtask?.find(function (element) {
        return element?.index == idx;
      });
      if (found && !deleteComment) {
        item?.subtask?.splice(idx - 1, 1);
        item?.subtask?.map((item, idx) => {
          item.index = idx + 1;
          return {
            ...item,
          };
        });
      } else if (found && deleteComment) {
        item.comment = "";
        return {
          ...item,
        };
      }
    });
    this.props.setTodoList(todoList);
    storageService().setObject("todoList", todoList);
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
            {!isEmpty(this.props.taskbar) && (
              <TaskBar
                todoList={this.props.taskbar[0]?.subtask || []}
                taskComplete={this.taskComplete}
                onClose={this.onCancle}
              />
            )}

            {this.props.addTaskBlock && (
              <Taskbox
                handleChange={this.handleChangeTaskBox}
                handleChangeDec={this.handleChangeDec}
                onCancle={this.onCancle}
                onSubmit={() => this.onSubmit(false)}
                value={value}
                valueDec={valueDec}
                disabled={value?.length > 0 ? false : true}
              />
            )}
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            {!isEmpty(this.props.taskbar) && (
              <CommentTextRender
                taskbar={this.props.taskbar}
                deleteComment={this.taskComplete}
              />
            )}
            <CommentBox
              onSubmit={() => this.onSubmit(true)}
              onCommentChange={this.onCommentChange}
              comment={this.state.comment}
            />
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
