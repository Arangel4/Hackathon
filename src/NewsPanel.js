import React, { Component } from 'react';

const ArticleList = (props) => {
    let resultListJSX = null

    // Makes sure there are articles to be displayed.
    if(props.result !== null) {

        // Data will be displayed on the webpage as follows
        let titleJSX = <li>{`Title: ${props.results.title}`}</li>;
        let authorJSX = <li>{`Author: ${props.results.author}`}</li>;
        let createdJSX = <li>{`Published Date: ${props.results.created_at}`}</li>;
        let urlJSX = <li>{`Article URL: ${props.results.url}`}</li>;

    resultListJSX = <div className="Articles">
        <ul>
        <hr />
        <ul>{titleJSX}</ul>
        <ul>{authorJSX}</ul>
        <ul>{createdJSX}</ul>
        <ul> {urlJSX}</ul>
        </ul>
    </div>
    }

    return resultListJSX;
}

class NewsPanel extends Component {

    constructor(props){
        super(props);
        this.state= {
            value: ""
        };
      }

    render(){
        console.log(this.props.result);
        return <div>
            <ul><ArticleList results={this.props.result}/></ul>
            
        </div>
    }

}

export default NewsPanel;