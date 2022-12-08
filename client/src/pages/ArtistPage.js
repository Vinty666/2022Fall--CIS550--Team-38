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
        this.handleYearQueryChange=this.handleYearQueryChange.bind(this)
        this.handleWeekChange=this.handleWeekChange.bind(this)
        this.handlePopThresholdChange=this.handlePopThresholdChange.bind(this)
        this.handleFollowerThresholdChange=this.handleFollowerThresholdChange.bind(this)
        this.handleHitsThresholdChange=this.handleHitsThresholdChange.bind(this)
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
        this.setState({albumThresholdQuery:event.target.value})
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
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh', font:'5pt' }} onClick={this.updateSearchArtistResults}>Search Artist</Button>
                        </FormGroup>
                        </Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' , font:'5pt'}} onClick={this.updateCollaboratorResults}>Search Collaborator</Button>
                        </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <br></br>


                <Form style={{ width: '60vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <label>Artist Name</label>
                            <FormInput placeholder="Artist Name" value={this.state.artistNameQuery} onChange={this.handleArtistNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                                <label>Popularity</label>
                                <FormInput placeholder="Popularity" value={this.state.popThreshold} onChange={this.handlePopThresholdChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                                <label>Week</label>
                                <FormInput placeholder="WeekNumber" value={this.state.weekQuery} onChange={this.handleWeekChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                                <label>AlbumNumber</label>
                                <FormInput placeholder="AlbumNumber" value={this.state.albumThresholdQuery} onChange={this.handleAlbumQueryChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateCollaboratorResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>

                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Rating</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handleRatingChange} />

                        </FormGroup></Col>
                        {/* TASK 27: Create a column with a label and slider in a FormGroup item for filtering by Potential. See the column above for reference and use the onChange method (handlePotentialChange)  */}
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchArtistResults}>Search Artist</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>


                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */}

                <Divider />

                {this.state.selectedPlayerDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>

                        <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h3>{this.state.selectedPlayerDetails.Name}</h3>

                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <img src={this.state.selectedPlayerDetails.Photo} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
                        </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                <h5>{this.state.selectedPlayerDetails.Club}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedPlayerDetails.JerseyNumber}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedPlayerDetails.BestPosition}</h5>
                                </Col>
                            </Row>
                            <br>
                            </br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Age: {this.state.selectedPlayerDetails.Age}
                                </Col>
                                {/* TASK 28: add two more columns here for Height and Weight, with the appropriate labels as above */}
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                {this.state.selectedPlayerDetails.Nationality}
                                    <img src={this.state.selectedPlayerDetails.Flag} referrerpolicy="no-referrer" alt={null} style={{height:'3vh', marginLeft: '1vw'}}/>
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Value: {this.state.selectedPlayerDetails.Value}
                                </Col>
                                <Col>
                                Release Clause: {this.state.selectedPlayerDetails.ReleaseClause}
                                </Col>
                                {/* TASK 29: Create 2 additional columns for the attributes 'Wage' and 'Contract Valid Until' (use spaces between the words when labelling!) */}
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Skill</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.Skill} />
                            <h6>Reputation</h6>
                            {/* TASK 30: create a star rating component for 'InternationalReputation'. Make sure you use the 'disabled' option as above to ensure it is read-only*/}
                            <Divider/>
                            <h6>Best Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.BestOverallRating} >{this.state.selectedPlayerDetails.BestOverallRating}</Progress>
                                {/* TASK 31: create the headings and progress bars for 'Potential' and 'Rating'. Use the same style as the one above for 'Best Rating'.*/}
                                </Col >
                                <Col  push={2} flex={2}>
                                {/*TASK 32: In case the player is a GK, show a radar chart (replacing 'null' below) with the labels: Agility, Ball Control, Passing, Positioning, Stamina, Strength */}

                                    {this.state.selectedPlayerDetails.BestPosition === 'GK'?null:<RadarChart
                                data={[this.state.selectedPlayerDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Agility', domain: [0, 100], getValue: d => d.NAdjustedAgility },
                                    { name: 'Ball Control', domain: [0, 100], getValue: d => d.NBallControl },
                                    { name: 'Passing', domain: [0, 100], getValue: d => d.NPassing },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.NPositioning },
                                    { name: 'Stamina', domain: [0, 100], getValue: d => d.NStamina },
                                    { name: 'Strength', domain: [0, 100], getValue: d => d.NStrength }
                                ]}
                                width={450}
                                height={400}

                            />}

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default ArtistPage

