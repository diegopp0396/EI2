import React, {Component} from 'react';
import classes from './Layout.module.css'


class footer extends Component{

    render(){
        return(
            <div className="bg-dark text-white p-4 text-center">
                <p>Copyright &copy; {new Date().getFullYear()} Dev Connector</p>
            </div>
        );
    }
}

export default footer;