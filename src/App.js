import React, { Component } from 'react';
import './App.css';
import NewsPanel from './NewsPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Constructor variables
      value: "",
      theNews: [],
      value: null,
      start: null,
      end: null
    };
    this.handleSubmit.bind(this);
  }

  // handleSubmit deals with the first submit button, allows the user to search anything and will fetch all articles that resemble to what they typed in.
  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchData(this.state.value);
    this.setState({
      value: "",
    }, 
      () => {
        console.log(`this.state.value should be cleared. It's value is: ${this.state.value}`);
      }
    );
  }

  // secondHandleSubmit deals with the second submit button, allows the user to search an article by the start and end date. Articles will be fetched that match.
  secondHandleSubmit = (e) => {
    e.preventDefault();
    this.fetchDateSearch(this.state.start, this.state.end);
    this.setState({
      start: "",
      end: ""
    },
      () => {
        console.log(`this.state.value should be cleared. It's value is: ${this.state.start}`);
        console.log(`this.state.value should be cleared. It's value is: ${this.state.end}`);
      });
  }

  // handleChange keeps track of the first input box or the Search input textbox. Whatever the user inputs this function will keep track of it.
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    },
     () => {
       console.log("This state's value is now: " + this.state.value);
     }
    );
  }

  // secondHandleChange keeps track of the Start Date input textbox. 
  secondHandleChange = (e) => {
    this.setState({
      start: e.target.value,
    },
      () => {
        console.log("Begin = " + this.state.start);
        console.log("End = " + this.state.end);
      });
  }

  // thirdHandleChange keeps track of the End Date input textbox.
  thirdHandleChange = (e) => {
    this.setState({
      end: e.target.value,
    },
      () => {
        console.log("Begin = " + this.state.start);
        console.log("End = " + this.state.end);
      });
  }

  fetchData(input){
    // Fetch function and callback is used to transform the data to the JSON structure.
    let firstSearch = "https://hn.algolia.com/api/v1/search?query=";
    let secondSearch = "&tags=story";
    let search = firstSearch + input + secondSearch;
    console.log(search);

    fetch(search)
    .then(response => response.json()) // Transform the text data to JSON which comes back as a promise use then() to continue.
    .then((theNews) => {               // Store JSON data in state
      this.setState({
        theNews: theNews.hits,
      },
      ()=> {
        console.log(`the results ${this.state.theNews}`);
        console.log(this.state.theNews[0].title);

      });
    });
  }

  // Fetches the Articles depending on the start and end date.
  fetchDateSearch = (start, end) => {
    function dateTime(start) {
      var date = Date.parse(start);
      return date / 1000;
   }
  //  Variables used to store the start and end date.
   let userStart = dateTime(start);
   let userEnd = dateTime(end);

  //  Created URL used when searching for the start and end date.
    let firstSearch = "http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>";
    let secondSearch = ",created_at_i<";
    let search = firstSearch + userStart + secondSearch + userEnd;
    console.log(search);

   fetch(search)
    .then(response => response.json())
    .then((theNews) => {      
      this.setState({
        theNews: theNews.hits,
      },
    ()=> {
      console.log(`the results ${this.state.theNews}`);
      console.log(this.state.theNews[0].title);
    });
  });

  }
  render() {
    // Individually creates each article to be displayed.
    let theNewsPanel = [];
    for(let i =0; i < this.state.theNews.length; i++){
      theNewsPanel.push(<div><NewsPanel key={this.state.theNews[i]} result={this.state.theNews[i]}/> </div> )
    }

    return (
      <div className="Search">
        <h2> Search Algolia News Articles</h2>
        {/* The first form, allows the user to input anything to search for a news article. */}
        <form onSubmit={this.handleSubmit}>
        <label className="Submit">Search: <input value = {this.state.value} type="text" onChange={this.handleChange}/></label>
        <input type="submit" value="Submit"/>  
        </form>
        <br />
        {/* The next two forms, allow the user to input a start and end date to search for an article. */}
        <form onSubmit={this.secondHandleSubmit}>
        <label  className="Start">Start Date: <input start = {this.state.start} type="text" onChange={this.secondHandleSubmit} /></label>
        
        <label className="End"> End Date: <input end = {this.state.end} type="text" onChange={this.thirdHandleChange}/></label>
        <input type="submit" value="Submit"/>  
        </form>
        <br />
      {/* Displays all the articles according to the searches made my the user above. */}
      {theNewsPanel}

      </div>
    );
  }
}

export default App;
