import React from 'react';
import Leaderboard from 'react-native-leaderboard';
import { Container, Header, Content, Button, Text } from 'native-base';
//...
const db = require('../util/dbAPI')

class leaderBDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [] 
        }
        this._query = this._query.bind(this)

    }

    componentDidMount() {
        this._query()
    }

    render() {
        return (
            <Container style={{ alignItems: "center" }}>
                <Button style={{ marginTop: 10, marginBottom: 10, width: 125, justifyContent: "center" }} onPress={() => { this._query() }}>
                    <Text>Refresh</Text>
                </Button>
                <Leaderboard
                    data={this.state.data}
                    sortBy='points'
                    labelBy='email'
                    evenRowColor='#f2f5f7'
                    oddRowColor='white'
                />
            </Container>


        )     //Params HERE https://github.com/JoeRoddy/react-native-leaderboard/blob/master/readme.md
    }
    _query = () => { //you will have to build queries like this using the methods ive created
        const collection = db.loadCollection('SwellnessTest', 'Points')
        var dbData = []
        collection.find({}, { limit: 10 }).toArray().then(result => {
            result.forEach(element => {
                dbData.push(element)
            })
            this.setState({ data: dbData })
        });
    }
}
export default leaderBDetail;