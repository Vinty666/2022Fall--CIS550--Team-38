import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate
} from 'antd'

import { RadarChart } from 'react-vis';
import { format } from 'd3-format';
import MenuBar from '../components/MenuBar';
import {
    searchArtist,
    searchCollaborators,
    searchTopArtist,
    searchArtistWithFollowers,
    searchArtistsWithPopularitySongs,
    searchCoCooperator
} from '../fetcher'
const wideFormat = format('.3r');
const { Column } = Table;

const ArtistColumns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
    },
    {
        title: 'Nationality',
        dataIndex: 'Nationality',
        key: 'Nationality',
        sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
    },
    {
        title: 'Rating',
        dataIndex: 'Rating',
        key: 'Rating',
        sorter: (a, b) => a.Rating - b.Rating

    }
];


class ArtistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artistNameQuery: '',
            certainYearQuery:'',
            weekQuery:'',
            albumThresholdQuery:'',
            popThreshold:'',
            folThreshold:'',
            hitsThreshold:'',

            ArtistResults: [],
            CollaboratorResults:[],
            co_CollaboratorResults:[]
        }
        //Add here
        this.updateSearchArtistResults = this.updateSearchArtistResults.bind(this)
        this.updateCollaboratorResults=this.updateCollaboratorResults.bind(this)
        this.handleArtistNameQueryChange = this.handleArtistNameQueryChange.bind(this)
        this.handleAlbumQueryChange=this.handleAlbumQueryChange.bind(this)
        this.handleYearQueryChange=this.handleYearQueryChange.bind(this)
        this.handleWeekChange=this.handleWeekChange.bind(this)
        this.handlePopThresholdChange=this.handlePopThresholdChange.bind(this)
        this.handleFollowerThresholdChange=this.handleFollowerThresholdChange.bind(this)
        this.handleHitsThresholdChange=this.handleHitsThresholdChange.bind(this)
        this.goToMatch = this.goToMatch.bind(this)
    }
    handleWeekQueryChange
    handleYearQueryChange(event)
    {
        this.setState({certainYearQuery:event.target.value})
    }

    handleWeekChange(event)
    {
        this.setState({weekQuery:event.target.value})
    }

    handleArtistNameQueryChange(event) {
        this.setState({ artistNameQuery: event.target.value })
    }

    handleAlbumQueryChange(event)
    {
        this.setState({albumThresholdQuery: event.target.value})
    }

    handlePopThresholdChange(event)
    {
        this.setState({popThreshold:event.target.value})
    }
    handleFollowerThresholdChange(event)
    {
        this.setState({folThreshold:event.target.value})
    }
    handleHitsThresholdChange(event)
    {
        this.setState({hitThreshold:event.target.value})
    }

    goToMatch(matchId) {
        window.location = `/matches?id=${matchId}`
    }

    updateSearchArtistResults() {
        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
        //Query 1
        searchArtist(this.artistNameQuery,this.certainYearQuery,this.weekQuery,this.albumThresholdQuery).then(res=>{
            this.setState({ArtistResults:res})
        })

        // searchArtistWithFollowers(this.folThreshold).then(res=> {
        //     this.setState({ArtistResults:res})
        // })
    }
    updateCollaboratorResults()
    {
        searchCollaborators(this.artistNameQuery,this.popThreshold,this.folThreshold).then(res=>{
            this.setState({CollaboratorResults:res})
        })

        searchCoCooperator(this.artistNameQuery,this.folThreshold,this.hitsThreshold).then(res=>{
            this.setState({co_CollaboratorResults:res})
        })
    }
    componentDidMount() {
        // TASK 25: call getPlayer with the appropriate parameter and set update the correct state variable.
        // See the usage of getMatch in the componentDidMount method of MatchesPage for a hint!
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '8vw', margin: '0 auto' }}>
                            <label>Artist Name</label>
                            <FormInput placeholder="Artist Name" value={this.state.artistNameQuery} onChange={this.handleArtistNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '8vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <FormInput placeholder="Certain Year" value={this.state.certainYearQuery} onChange={this.handleYearQueryChange} />
                        </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '8vw', margin: '0 auto' }}>
                                <label>Week</label>
                                <FormInput placeholder="Week" value={this.state.weekQuery} onChange={this.handleWeekChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '8vw', margin: '0 auto' }}>
                                <label>Album Num</label>
                                <FormInput placeholder="Album" value={this.state.albumThresholdQuery} onChange={this.handleAlbumQueryChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                                <label>Popularity</label>
                                <FormInput placeholder="Popularity" value={this.state.popThreshold} onChange={this.handlePopThresholdChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                                <label>Followers</label>
                                <FormInput placeholder="Followers" value={this.state.folThreshold} onChange={this.handleFollowerThresholdChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' , color: 'black'}}>
                            <Button style={{ marginTop: '4vh', font:'4pt' }} onClick={this.updateSearchArtistResults}>Search Artist</Button>
                        </FormGroup>
                        </Col>
                        <Col flex={2}><FormGroup style={{ width: '14vw', color:'black' }}>
                            <Button style={{ marginTop: '4vh' , font:'4pt'}} onClick={this.updateCollaboratorResults}>Search Collaborator</Button>
                        </FormGroup>
                        </Col>
                    </Row>
                </Form>

                <br></br>
                <Divider />
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { this.goToMatch(record.MatchId) },
                    };
                }} dataSource={this.state.ArtistResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                    <Column title="" dataIndex="" key="" />
                    <Column title="Artist Name" dataIndex="Artist Name" key="Artist Name" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                </Table>
                <Divider />
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { this.goToMatch(record.MatchId) },
                    };
                }} dataSource={this.state.CollaboratorResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                    <Column title="" dataIndex="" key="" />
                    <Column title="Cooperator Name" dataIndex="Cooperator Name" key="Cooperator Name" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                    <Column title="" dataIndex="" key="" />
                </Table>
            </div>

        )
    }
}

export default ArtistPage

