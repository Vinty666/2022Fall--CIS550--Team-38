import React from 'react';
import { Card, CardBody, Progress } from "shards-react";
import {
    Table,
    Row,
    Col,
    Divider,
} from 'antd'

import { RadarChart } from 'react-vis';
import { format } from 'd3-format';

import MenuBar from '../components/MenuBar';
import { getSongDetailsSearch, getSongGrammySearch, getSongBillboardSongSearch } from '../fetcher'
const wideFormat = format('.3r');

const grammySong = [
    {
        title: 'Award',
        dataIndex: 'grammyAward',
        key: 'Award'
    },
    {
        title: 'Award Year',
        dataIndex: 'grammyYear',
        key: 'year',
        sorter: (a, b) => a.year - b.year
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre'
    }
]

const billboardSong = [
    {
        title: 'Weekly Rank',
        dataIndex: 'weeklyRank',
        key: 'weeklyRank',
        sorter: (a, b) => a.weeklyRank - b.weeklyRank
    },
    {
        title: 'Week',
        dataIndex: 'week',
        key: 'week',
        sorter: (a, b) => JSON.stringify(a.week).substring(1, 11).localeCompare(JSON.stringify(b.week).substring(1, 11)),
        render: (text, row) => JSON.stringify(row.week).substring(1, 11)
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre'
    }
]

class SongDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artistName: null,
            songName: null,
            songBasicDetails: null, // song name, artist name, duration, which album, popularity (rate), energy, liveness, loudness, tempo, danceability from songAttributes, genre from Billboard
            showLyrics: false,
            songBillboard: null, // releaseDate, peakRankOnBillboard, writingCredits, lyrics, features with whom, genre
            songGrammy: null // grammy award, grammyYear, genre, 
        }


    }

    checkIfShowLyrics(value) { // if showLyrics checkbox is clicked, show lyrics if there's any
        this.setState({ showLyrics: value });
    }

    componentDidMount() {
        const artist = window.location.href.split('/')[4].replace('%20', ' ')
        const song = window.location.href.split('/')[5].replaceAll('%20', ' ')
        console.log(artist, song)
        this.setState({ songName: song, artistName: artist })

        getSongDetailsSearch(song, artist).then(res => {
            this.setState({ songBasicDetails: res.results[0] })
        })

        getSongGrammySearch(song, artist).then(res => {
            if (res.length > 0) {
                this.setState({ songGrammy: res.results })
            }
        })

        getSongBillboardSongSearch(song, artist).then(res => {
            this.setState({ songBillboard: res.results })
        })

    }

    render() {
        return (
            <div>
                <MenuBar />
                {this.state.songBillboard ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h2>{this.state.songName}</h2>
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <h3>{this.state.artistName}</h3>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    Writer: {this.state.songBillboard[0].writingCredits}
                                </Col>
                                {this.state.songBasicDetails ? <div><Col>
                                    Duration: {this.state.songBasicDetails.duration}
                                </Col>
                                    <Col>
                                        Album: {this.state.songBasicDetails.album}
                                    </Col></div> : null}

                            </Row>
                            {this.state.songBasicDetails? <div><Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    Popularity: <Progress style={{ width: '20vw' }} value={this.state.songBasicDetails.popularity} >{this.state.songBasicDetails.popularity}</Progress>
                                </Col>
                            </Row></div> : null}
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    Genres: {this.state.songBillboard[0].genre}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Divider />
                </div> : null}


                {this.state.songBasicDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>

                    <Card style={{ marginTop: '2vh' }}>
                        <CardBody>
                            <Row>
                                <Col push={2} flex={2}>
                                    <RadarChart
                                        data={[this.state.songBasicDetails]}
                                        tickFormat={t => wideFormat(t)}
                                        startingAngle={0}
                                        // energy, liveness, loudness, tempo, danceability
                                        domains={[
                                            { name: 'Energy', domain: [0, 1], getValue: data => data.energy },
                                            { name: 'Liveness', domain: [0, 1], getValue: data => data.liveness },
                                            { name: 'Loudness', domain: [0, 1], getValue: data => data.loudness },
                                            { name: 'Tempo', domain: [0, 1], getValue: data => data.tempo },
                                            { name: 'Danceability', domain: [0, 1], getValue: data => data.danceability }
                                        ]}
                                        width={450}
                                        height={400}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

                {this.state.songGrammy ?
                    <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                        <h3>Grammy Awards</h3>
                        <Table dataSource={this.state.songGrammy} columns={grammySong} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} />
                        <Divider />
                    </div> : null}

                {this.state.songBillboard ?
                    <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                        <h3>Billboard</h3>
                        <Table dataSource={this.state.songBillboard} columns={billboardSong} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} />
                        <Row>
                            <h3>Lyrics</h3>
                        </Row>
                        <Row>
                            <text>{this.state.songBillboard[0].lyric}</text>
                        </Row>
                        <Divider />
                    </div> : null}




            </div>
        )
    }
}
export default SongDetailsPage