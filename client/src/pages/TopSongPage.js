import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import {
    Table,
    Row,
    Col,
    Divider,

} from 'antd'
import { searchTopSongs } from '../fetcher'
import MenuBar from '../components/MenuBar';

const { Column } = Table;

class TopSongPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            awayQuery: "",
            homeQuery: "",
            matchesResults: [],
            selectedMatchId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedMatchDetails: null
        }
        this.handleAwayQueryChange = this.handleAwayQueryChange.bind(this)
        this.handleHomeQueryChange = this.handleHomeQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToMatch = this.goToMatch.bind(this)
    }
    handleAwayQueryChange(event) {
        this.setState({ awayQuery: event.target.value })
    }
    handleHomeQueryChange(event) {
        this.setState({ homeQuery: event.target.value })
    }
    goToMatch(matchId) {
        window.location = `/matches?id=${matchId}`
    }
    updateSearchResults() {
        searchTopSongs(this.state.homeQuery).then(res => {
            this.setState({ matchesResults: res.results })
        })
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Genre</label>
                            <FormInput placeholder="eg: Pop" value={this.state.homeQuery} onChange={this.handleHomeQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search Song</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Divider />
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { this.goToMatch(record.MatchId) },
                    };
                }} dataSource={this.state.matchesResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="name" dataIndex="name" key="name" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                </Table>
                <Divider />
            </div>
        )
    }
}

export default TopSongPage

