import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";

import {
    Table,
    Checkbox,
    Select,
    Row,
    Col,
    Divider,
    Slider,
} from 'antd'


import MenuBar from '../components/MenuBar';
import {
    searchArtist,
} from '../fetcher'


const { Option } = Select;

const artistColumns = [
    {
        title: 'Artist',
        dataIndex: 'artist',
        key: 'artist',
        sorter: (a, b) => a.artist.localeCompare(b.artist),
        render: (text, row) => <a href={`/artistsDetail/${row.artist}`}>{text}</a>
    },
    {
        title: 'Followers',
        dataIndex: 'followers',
        key: 'followers',
        sorter: (a, b) => a.followers - b.followers
    },
    {
        title: 'Number of Albums',
        dataIndex: 'numAlbums',
        key: 'numAlbums',
        sorter: (a, b) => a.numAlbums - b.numAlbums
    },
    {
        title: 'Group/Solo',
        dataIndex: 'GroupSolo',
        key: 'GroupSolo',
    },
];


class ArtistPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artistNameQuery: "",
            albums: 0,
            genreQuery: "",
            folThreshold: 0,
            billboard: false,
            grammy: false,

            ArtistResults: [],
        }
        //Add here
        this.handleArtistNameQueryChange = this.handleArtistNameQueryChange.bind(this)
        this.handleAlbumsQueryChange = this.handleAlbumsQueryChange.bind(this)
        this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this)
        this.handleFollowerThresholdChange = this.handleFollowerThresholdChange.bind(this)
        this.handleBillBoardCheckChange = this.handleBillBoardCheckChange.bind(this)
        this.handleGrammyCheckChange = this.handleGrammyCheckChange.bind(this)
        this.updateSearchArtistResults = this.updateSearchArtistResults.bind(this)
    }

    handleAlbumsQueryChange(value) {
        this.setState({ albums: value })
    }

    handleGenreQueryChange(value) {
        this.setState({ genreQuery: value })
    }

    handleArtistNameQueryChange(event) {
        this.setState({ artistNameQuery: event.target.value })
    }

    handleFollowerThresholdChange(value) {
        this.setState({ folThreshold: value })
    }

    handleBillBoardCheckChange(event) {
        this.setState({ billboard: event.target.checked })
    }

    handleGrammyCheckChange(event) {
        this.setState({ grammy: event.target.checked })
    }

    updateSearchArtistResults() {
        searchArtist(this.state.billboard, this.state.grammy, this.state.artistNameQuery, this.state.genreQuery, this.state.folThreshold, this.state.albums).then(res => {
            this.setState({ ArtistResults: res.results })
        })
    }

    componentDidMount() {
        searchArtist(this.state.billboard, this.state.grammy, this.state.artistNameQuery, this.state.genreQuery, this.state.folThreshold, this.state.albums).then(res => {
            this.setState({ ArtistResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh'}}>
                    <Row>
                        <Col flex={2}>
                            <FormGroup style={{ width: '12vw', margin: '0 10px' }}>
                                <label>Artist</label>
                                <FormInput placeholder="Artist name" value={this.state.artistNameQuery} onChange={this.handleArtistNameQueryChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '12vw', margin: '0 10px' }}>
                                <label>Genre</label>
                                <Select defaultValue="" style={{ width: '12vw', margin: '0 auto' }} onChange={this.handleGenreQueryChange}>
                                    <Option value="">all</Option>
                                    <Option value="pop">pop</Option>
                                    <Option value="rap">rap</Option>
                                    <Option value="soul">soul</Option>
                                    <Option value="r&b">blues</Option>
                                    <Option value="punk">punk</Option>
                                    <Option value="rock">rock</Option>
                                    <Option value="metal">metal</Option>
                                </Select>
                            </FormGroup>
                        </Col>
                        <Col flex={2} ><Checkbox style={{ margin: '30px 10px' }} onChange={this.handleBillBoardCheckChange}>
                            Billboard
                        </Checkbox></Col>
                        <Col flex={2}><Checkbox style={{ margin: '30px 10px' }} onChange={this.handleGrammyCheckChange}>
                            Grammy
                        </Checkbox></Col>
                    </Row>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Number of Albums</label>
                            <Slider step={1} defaultValue={0} min={0} max={150} onChange={this.handleAlbumsQueryChange} />

                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Followers</label>
                            <Slider step={10000} defaultValue={0} min={0} max={60000000} onChange={this.handleFollowerThresholdChange} />

                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh',background:'black' }} onClick={this.updateSearchArtistResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>
                </Form>
                <br></br>
                <Divider />
                <Table dataSource={this.state.ArtistResults} columns={artistColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
            </div>

        )
    }
}

export default ArtistPage

