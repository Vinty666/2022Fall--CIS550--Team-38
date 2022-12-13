import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";

import {
    Table,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Checkbox,
} from 'antd'


import MenuBar from '../components/MenuBar';
import {
    searchSong
} from '../fetcher'


const { Option } = Select;

const songColumns = [
    {
        title: 'Song',
        dataIndex: 'song',
        key: 'song',
        sorter: (a, b) => a.song.localeCompare(b.song),
        render: (text, row) => <a href={`/songDetails/${row.artist}/${row.song}`}>{text}</a>
    },
    {
        title: 'Artist',
        dataIndex: 'artist',
        key: 'artist',
        sorter: (a, b) => a.artist.localeCompare(b.artist),
        render: (text, row) => <a href={`/artistsDetail/${row.artist}`}>{text}</a>
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',

    }
];

class SongPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            song: "",
            genre: "",
            year: 2019,
            release: false,

            songResults: [],
        }
        this.handleSongChange = this.handleSongChange.bind(this)
        this.handleGenreChange = this.handleGenreChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.updateSearchSongResults = this.updateSearchSongResults.bind(this)
        this.handleReleaseChange = this.handleReleaseChange.bind(this)
    }


    handleGenreChange(value) {
        this.setState({ genre: value })
    }

    handleSongChange(event) {
        this.setState({ song: event.target.value })
    }

    handleYearChange(value) {
        this.setState({ year: value })
    }

    handleReleaseChange(event){
        this.setState({ release: event.target.checked })
    }

    updateSearchSongResults() {

        searchSong(this.state.song, this.state.genre, this.state.year, this.state.release).then(res => {
            this.setState({ songResults: res.results })
        })

    }


    componentDidMount() {
        searchSong(this.state.song, this.state.genre, this.state.year, this.state.release).then(res => {
            this.setState({ songResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh', color: 'FA5047' }}>
                    <Row>
                        <Col flex={2}>
                            <FormGroup style={{ width: '12vw', margin: '0 10px' }}>
                                <label>Song</label>
                                <FormInput placeholder="Song name" value={this.state.song} onChange={this.handleSongChange} />
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: '12vw', margin: '0 10px' }}>
                                <label>Genre</label>
                                <Select defaultValue="" style={{ width: '12vw', margin: '0 auto' }} onChange={this.handleGenreChange}>
                                    <Option value="">all</Option>
                                    <Option value="Pop">pop</Option>
                                    <Option value="Rap">rap</Option>
                                    <Option value="Trap">trap</Option>
                                    <Option value="R&B">blues</Option>
                                    <Option value="General">general</Option>
                                    <Option value="Country">country</Option>
                                    <Option value="Electronic">electronic</Option>
                                    <Option value="Rock">rock</Option>
                                    <Option value="Jazz">jazz</Option>
                                </Select>
                            </FormGroup>
                        </Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchSongResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>

                    <Row>
                        <Col flex={0.2} ><Checkbox style={{ margin: '30px 0px', }} onChange={this.handleReleaseChange}>
                            release in
                        </Checkbox></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0px 0px' }}>
                            <label>Year</label>
                            <Slider step={1} defaultValue={2019} min={1999} max={2019} onChange={this.handleYearChange} />

                        </FormGroup></Col>
                    </Row>
                </Form>
                <br></br>
                <Divider />
                <Table dataSource={this.state.songResults} columns={songColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
            </div>

        )
    }
}

export default SongPage

