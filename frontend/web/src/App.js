import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";
import { Menu, Icon } from 'antd';




export default class App extends React.Component {

    componentDidMount() {
        console.log("root app mounting !!!")
        //var connection = getConnection();
    }

    render(){
        return (
            <Router>
                <div>
                    <Menu  mode="horizontal">
                        <Menu.Item key="mail" to="/">
                            <Link to="/"> <Icon type="bank" />Home</Link>
                        </Menu.Item>
                        <Menu.Item key="app" to="/search">
                            <Link to="/search"><Icon type="build" />Search</Link>
                        </Menu.Item>
                    </Menu>
                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/about">
                            <MainPage />
                        </Route>
                        <Route path="/search">
                            <SearchPage />
                        </Route>
                        <Route path="/">
                            <DetailPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

}


