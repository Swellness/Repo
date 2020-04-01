import React, {Component} from 'react';
import Leaderboard from 'react-native-leaderboard';
//...

class leaderBDetail extends React.Component {
    constructor(props){
        super(props);
     
    
    this.state = {
        data: [
            {userName: 'Joe', highScore: 52},
            {userName: 'Jenny', highScore: 120},
            {userName: 'John', highScore: 160},
            {userName: 'J', highScore: 99},
            {userName: 'JJ', highScore: 482},
            //...
        ] //can also be an object of objects!: data: {a:{}, b:{}}
        
    }
    }
    
render() {
  return (
      <Leaderboard 
        data={this.state.data} 
        sortBy='highScore' 
        labelBy='userName'
        evenRowColor='#f2f5f7'
        oddRowColor= 'white'
        />)     //Params HERE https://github.com/JoeRoddy/react-native-leaderboard/blob/master/readme.md
}
}

export default leaderBDetail;