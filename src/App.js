import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { loadData } from './requests.js';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {en: [{}]};
  }
  async componentDidMount () {
    const en = await loadData();
    this.setState({en});
}
  render () {
     const en = this.state.en;
     if (!en) {
       return null;
     }

     const displayData = en.map((content, index) =>
      <div key={index}>
      <br/>

        <h1>{content.key} </h1>
        <div> {content.value}</div>
        <hr/>
      </div>);

  return (
    <div className="App">
     <div>
     <form>
     <input
       placeholder="Search for..."
       // ref={input => this.search = input}
       // onChange={this.handleInputChange}
     />
     
   </form>
     </div>
    <br/>
        <div className="data" border="2">
        {displayData}
        </div>
    </div>
  );
}
}

export default App;
