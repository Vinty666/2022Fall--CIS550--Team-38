import React from 'react';
import { Form, FormGroup, Button, Card, CardBody } from "shards-react";
import {
    Table,
    Row,
    Col,
    Divider,
    Slider
} from 'antd'
import { useParams } from "react-router-dom";

import MenuBar from '../components/MenuBar';
import { searchCollaborators, searchCoCooperator, getArtistDetailsSearch, getArtistGrammyAlbumSearch, getArtistGrammySongSearch } from '../fetcher'

const potentialCollabColumns = [
    {
        title: 'Name',
        dataIndex: 'artist',
        key: 'Name',
        sorter: (a, b) => a.artist.localeCompare(b.artist)
    }
]

const collaboratorsColumns = [
    {
        title: 'Name',
        dataIndex: 'artists',
        key: 'Name',
        sorter: (a, b) => a.artists.localeCompare(b.artists)
    },
    {
        title: 'Collab Song',
        dataIndex: 'songs',
        key: 'Collab Song'
    },
    {
        title: 'Follower',
        dataIndex: 'followers',
        key: 'Follower',
        sorter: (a, b) => a.followers - b.followers
    }
]

const grammyAlbums = [
    {
        title: 'Award',
        dataIndex: 'grammyAward',
        key: 'Award'
    },
    {
        title: 'Album',
        dataIndex: 'album',
        key: 'Album',
        sorter: (a, b) => a.album.localeCompare(b.album)
    },
    {
        title: 'Year',
        dataIndex: 'grammyYear',
        key: 'Year',
        sorter: (a, b) => a.grammyYear - b.grammyYear
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'Genre'
    }
]

const grammySongs = [
    {
        title: 'Award',
        dataIndex: 'grammyAward',
        key: 'Award'
    },
    {
        title: 'Song',
        dataIndex: 'songName',
        key: 'Song',
        sorter: (a, b) => a.songName.localeCompare(b.songName)
    },
    {
        title: 'Year',
        dataIndex: 'grammyYear',
        key: 'Year',
        sorter: (a, b) => a.grammyYear - b.grammyYear
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'Genre'
    }
]

class ArtistDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artistName: null,
            grammyAlbumAwardDetails: null,
            grammySongAwardDetails: null,
            artistBasicDetails: null,
            cooperatorFollowers: 0, // use for both cooperator & potential cooperator
            cooperatorSongPopularity: 0,
            cooperatedResults: null,
            potentialCollabHitsNum: 0,
            potentialCollabResults: null
        }

        this.handleCooperatorFollowersSearchChange = this.handleCooperatorFollowersSearchChange.bind(this)
        this.handleCooperatorSongPopSearchChange = this.handleCooperatorSongPopSearchChange.bind(this)

        this.handlePotentialCollabHitsNumSearchChange = this.handlePotentialCollabHitsNumSearchChange.bind(this)

        this.updateCooperatorSearchResults = this.updateCooperatorSearchResults.bind(this)
        this.updatePotentialCollabSearchResults = this.updatePotentialCollabSearchResults.bind(this)

    }

    handleCooperatorFollowersSearchChange(value) {
        this.setState({ cooperatorFollowers: value })
    }

    handleCooperatorSongPopSearchChange(value) {
        this.setState({ cooperatorSongPopularity: value })
    }


    handlePotentialCollabHitsNumSearchChange(value) {
        this.setState({ potentialCollabHitsNum: value })
    }

    updateCooperatorSearchResults() {
        searchCollaborators(this.state.artistName, this.state.cooperatorSongPopularity, this.state.cooperatorFollowers).then(res => {
            this.setState({ cooperatedResults: res.results })
        })
    }

    updatePotentialCollabSearchResults() {
        searchCoCooperator(this.state.artistName, this.state.cooperatorFollowers, this.state.potentialCollabHitsNum).then(res => {
            this.setState({ potentialCollabResults: res.results })
        })
    }

    componentDidMount() {
        const artist = window.location.href.split('/')[4].replace('%20', ' ')

        this.setState( {artistName: artist} )

        getArtistDetailsSearch(artist).then(res => {
            this.setState({ artistBasicDetails: res.results[0] })
        })

        getArtistGrammyAlbumSearch(artist).then(res => {
            if (res.results.length > 0){
                this.setState({ grammyAlbumAwardDetails: res.results })
            }
        })

        getArtistGrammySongSearch(artist).then(res => {
            if (res.results.length > 0){
                this.setState({ grammySongAwardDetails: res.results })
            }
        })

    }

    render() {
        return (
            <div>
                <MenuBar />
                {this.state.artistBasicDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h2>{this.state.artistBasicDetails.artistName}</h2>
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <h3>{this.state.artistBasicDetails.GroupSolo}</h3>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    First Album in: {this.state.artistBasicDetails.yearFirst_album}
                                </Col>
                                <Col>
                                    Number of Albums: {this.state.artistBasicDetails.numAlbums}
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    Gender: {this.state.artistBasicDetails.gender}
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    Followers: {this.state.artistBasicDetails.followers}
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    Genres: {this.state.artistBasicDetails.genres}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Hits: {this.state.artistBasicDetails.hits}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div> : null}

                <Divider />

                {/* this.state.grammyAwardDetails ?  */}
                {/* <Col flex={2} style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h2>Grammy Awards</h2>
                </Col> */}
                {this.state.grammyAlbumAwardDetails ?
                    <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                        <h3>Grammy Albums</h3>
                        <Table dataSource={this.state.grammyAlbumAwardDetails} columns={grammyAlbums} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} />
                    </div> : null}
                {this.state.grammySongAwardDetails ?
                    <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                        <h3>Grammy Songs</h3>
                        <Table dataSource={this.state.grammySongAwardDetails} columns={grammySongs} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} />
                    </div> : null}

                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Collaborators</h3>
                </div>
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Followers</label>
                            <Slider step={10000} defaultValue={0} min={0} max={60000000} onChange={this.handleCooperatorFollowersSearchChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Popularity</label>
                            <Slider step={1} defaultValue={0} min={0} max={100} onChange={this.handleCooperatorSongPopSearchChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button style={{ marginTop: '3vh' ,background:'black', color: 'yellow', border: '4px solid #e7e7e7', width: '250px'}} onClick={this.updateCooperatorSearchResults}>Search Collaborators</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Table dataSource={this.state.cooperatedResults} columns={collaboratorsColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} />

                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Potential Collaborators</h3>
                </div>
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Hits</label>
                            <Slider step={1} defaultValue={0} min={0} max={100} onChange={this.handlePotentialCollabHitsNumSearchChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button style={{ marginTop: '3vh' ,background:'black', color: 'yellow', border: '4px solid #e7e7e7', width: '250px'}} onClick={this.updatePotentialCollabSearchResults}>Search Potential Collaborators</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Table dataSource={this.state.potentialCollabResults} columns={potentialCollabColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} />
            </div>

        )
    }
}

export default ArtistDetailsPage;
