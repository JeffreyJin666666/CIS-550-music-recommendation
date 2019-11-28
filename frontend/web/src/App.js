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
import LoginPage from "./Pages/LoginPage"
import { Menu, Icon } from 'antd';




export default class App extends React.Component {

    render(){
        return (
            <Router>
                <div>
                    <nav>
                        <Menu  mode="horizontal">
                            <Menu.Item key="mail" >
                                <Link to="/"> <Icon type="bank" />Home</Link>
                            </Menu.Item>
                            <Menu.Item key="app" >
                                <Link to="/search"><Icon type="build" />Search</Link>
                            </Menu.Item>
                            <Menu.Item key="user" >
                                <Link to="/login"><Icon type="build" />Login</Link>
                            </Menu.Item>


                        </Menu>

                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/search">
                            <SearchPage />
                        </Route>
                        <Route path="/">
                            <MainPage />
                        </Route>

                    </Switch>
                </div>
            </Router>
        );
    }

}


