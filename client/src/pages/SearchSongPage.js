import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import {
    Table,
    Row,
    Col,
    Divider,

} from 'antd'
import { searchSpecificSong } from '../fetcher'
import MenuBar from '../components/MenuBar';

const { Column } = Table;

class SearchSongPage extends React.Component {
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
        const year = this.state.homeQuery ? this.state.homeQuery : '2010';
        searchSpecificSong(year).then(res => {
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
                            <label>Specific billboard songs which win grammy at least once at certain year</label>
                            <FormInput placeholder="Year (default 2010)" value={this.state.homeQuery} onChange={this.handleHomeQueryChange} />
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
                    <Column title="SongName" dataIndex="songName" key="songName" />
                    <Column title="Artist" dataIndex="Artist" key="Artist" />
                    <Column title="Danceability" dataIndex="Danceability" key="Danceability" />
                    <Column title="Duration" dataIndex="Duration" key="Duration" />
                    <Column title="Energy" dataIndex="Energy" key="Energy" />
                    <Column title="Liveness" dataIndex="Liveness" key="Liveness" />
                    <Column title="lyric" dataIndex="lyric" key="lyric" />
                </Table>
                <Divider />
            </div>
        )
    }
}

export default SearchSongPage

