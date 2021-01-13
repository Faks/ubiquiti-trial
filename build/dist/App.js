import * as React from "../_snowpack/pkg/react.js";
import __ from "../_snowpack/pkg/lodash.js";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.increment = 1;
    this.state = {
      name: null,
      value: 0,
      todo: []
    };
  }
  calculateSum() {
    return __.sumBy(this.state.todo, "value").toFixed(2);
  }
  onChangeTodo(item, complete, destroy = false) {
    let todo = this.state.todo;
    const destroyIndex = todo.indexOf(item);
    if (destroyIndex > -1) {
      todo.splice(destroyIndex, 1);
    }
    if (destroy) {
      this.setState({
        todo: [
          ...todo
        ]
      });
    } else {
      this.setState({
        todo: [
          ...todo,
          {
            id: item.id,
            name: item.name,
            value: item.value,
            complete
          }
        ]
      });
    }
    this.calculateSum();
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      todo: [
        ...this.state.todo,
        {
          id: this.increment++,
          name: this.state.name,
          value: parseFloat(this.state.value),
          complete: false
        }
      ]
    });
    setTimeout(() => {
      this.calculateSum();
    }, 600);
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "row g-3"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "col-md-12 col-lg-12"
    }, /* @__PURE__ */ React.createElement("h4", {
      className: "d-flex justify-content-between align-items-center mb-3"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "text-muted"
    }, "Groceries list"), /* @__PURE__ */ React.createElement("span", {
      className: "badge bg-secondary rounded-pill"
    }, this.state.todo ? this.state.todo.length : 0)), /* @__PURE__ */ React.createElement("ul", {
      className: "list-group mb-3"
    }, this.state.todo ? this.state.todo.map((item) => {
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("ul", {
        className: "list-group"
      }, /* @__PURE__ */ React.createElement("li", {
        className: "list-group-item d-flex justify-content-between align-items-center",
        key: item.id
      }, /* @__PURE__ */ React.createElement("span", {
        className: item.complete === true ? "col-9 text-success" : "col-9 text-danger"
      }, item.name, " - ", item.value.toFixed(2)), /* @__PURE__ */ React.createElement("span", {
        className: "col-1"
      }, /* @__PURE__ */ React.createElement("input", {
        className: "form-check-input",
        type: "checkbox",
        checked: item.complete,
        id: "flexCheckDefault",
        value: item.id,
        defaultChecked: false,
        defaultValue: 0,
        onChange: () => {
          if (item.complete === false) {
            this.onChangeTodo(item, true);
          } else {
            this.onChangeTodo(item, false);
          }
        }
      })), /* @__PURE__ */ React.createElement("span", {
        className: "col-2"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn btn-danger",
        type: "button",
        onClick: () => {
          this.onChangeTodo(item, true, true);
        }
      }, "Delete")))));
    }) : null), /* @__PURE__ */ React.createElement("form", {
      onSubmit: (event) => this.onSubmit(event),
      className: "card p-2"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "input-group"
    }, /* @__PURE__ */ React.createElement("input", {
      className: "form-control",
      type: "text",
      placeholder: "Grocery",
      onChange: (event) => {
        this.setState({
          name: event.target.value,
          value: this.state.value
        });
      }
    }), /* @__PURE__ */ React.createElement("input", {
      className: "form-control",
      type: "number",
      step: "0.1",
      placeholder: "Price",
      onChange: (event) => {
        this.setState({
          name: this.state.name,
          value: event.target.value
        });
      }
    }), /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      className: "btn btn-secondary"
    }, "Add"))), /* @__PURE__ */ React.createElement("div", {
      className: "col-12"
    }, "Total: ", this.state.todo ? this.calculateSum() : 0)));
  }
}
