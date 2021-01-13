import * as React from "react";
import __ from "lodash";

export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: null,
            value: 0,
            todo: []
        };
    }
    
    private increment: number = 1;
    
    calculateSum() {
        return __.sumBy(this.state.todo, 'value').toFixed(2);
    }
    
    onChangeTodo(item: any, complete: boolean, destroy: boolean = false) {
        // Todo items
        let todo = this.state.todo;
        
        // Find item index
        const destroyIndex = todo.indexOf(item);
        
        // Destroy item from state collection
        if (destroyIndex > -1) {
            todo.splice(destroyIndex, 1);
        }
        
        if (destroy) {
            // Remove Item
            this.setState({
                todo: [
                    ...todo,
                ]
            });
        } else {
            // Update state
            this.setState({
                todo: [
                    ...todo,
                    {
                        id: item.id,
                        name: item.name,
                        value: item.value,
                        complete: complete
                    }
                ]
            });
        }
        
        // Recalculate sum
        this.calculateSum();
    }
    
    onSubmit(event: any) {
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
        })
        
        setTimeout(() => {
            this.calculateSum();
        }, 600)
    }
    
    render() {
        return (
            <div className="row g-3">
                <div className="col-md-12 col-lg-12">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Groceries list</span>
                        <span className="badge bg-secondary rounded-pill">
                            {
                                this.state.todo ? this.state.todo.length : 0
                            }
                        </span>
                    </h4>
                    
                    <ul className="list-group mb-3">
                        {
                            this.state.todo ? this.state.todo.map((item: any) => {
                                return <div>
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center"
                                            key={item.id}>
                                            <span className={
                                                item.complete === true ? 'col-9 text-success' : 'col-9 text-danger'}>
                                                 {item.name} - { item.value.toFixed(2) }
                                            </span>
                                            <span className="col-1">
                                                 <input className="form-check-input"
                                                        type="checkbox"
                                                        checked={item.complete}
                                                        id="flexCheckDefault"
                                                        value={item.id}
                                                        defaultChecked={false}
                                                        defaultValue={0}
                                                        onChange={() => {
                                                            if (item.complete === false) {
                                                                this.onChangeTodo(item, true);
                                                            } else {
                                                                this.onChangeTodo(item, false);
                                                            }
                                                        }}
                                                 />
                                            </span>
                                            <span className="col-2">
                                                <a className="btn btn-danger"
                                                   type="button"
                                                   onClick={() => {
                                                       this.onChangeTodo(item, true, true);
                                                   }}>
                                                    Delete
                                                </a>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            }) : null
                        }
                    </ul>
                    <form onSubmit={(event => this.onSubmit(event))} className="card p-2">
                        <div className="input-group">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Grocery"
                                   onChange={(event) => {
                                       this.setState({
                                           name: event.target.value,
                                           value: this.state.value,
                                       });
                                   }}
                            />
                            <input className="form-control"
                                   type="number"
                                   step='0.1'
                                   placeholder="Price"
                                   onChange={(event) => {
                                       this.setState({
                                           name: this.state.name,
                                           value: event.target.value
                                       });
                                   }}
                            />
                            <button type="submit"
                                    className="btn btn-secondary">Add
                            </button>
                        </div>
                    </form>
                    <div className="col-12">
                        Total: {
                        this.state.todo ? this.calculateSum() : 0
                    }
                    </div>

                </div>
            </div>
        )
    }
}
