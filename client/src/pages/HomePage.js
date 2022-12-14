import React from 'react';
import {
  Table,
  Row,
  Col,
  Slider,
} from 'antd'

import { FormGroup, Button } from "shards-react";

import MenuBar from '../components/MenuBar';
import { searchHitSongArtist, searchGrammyAwardTrending } from '../fetcher'


const artistColumns = [
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'Artist',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => <a href={`/artistsDetail/${row.artist}`}>{text}</a>
  },
  {
    title: 'Average popularity',
    dataIndex: 'avg_popularity',
    key: 'avg_popularity',
    sorter: (a, b) => a.avg_popularity-b.avg_popularity
  },
  {
    title: 'Number of Songs',
    dataIndex: 'numOfSongs',
    key: 'numOfSongs',
    sorter: (a, b) => a.numOfSongs- b.numOfSongs
  },
  {
    title: 'Followers',
    dataIndex: 'followers',
    key: 'followers',
    sorter: (a, b) => a.followers- b.followers
  },
];


const songColumns = [
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'Artist',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => <a href={`/artistsDetail/${row.artist}`}>{text}</a>
  },
  {
    title: 'Awarded Song',
    dataIndex: 'songName',
    key: 'songName',
    sorter: (a, b) => a.songName.localeCompare(b.songName)
  },
  {
    title: 'Grammy Year',
    dataIndex: 'grammyYear',
    key: 'grammyYear',
    sorter: (a, b) => a.grammyYear - b.grammyYear
  },
  {
    title: 'Year Difference',
    dataIndex: 'yearDiff',
    key: 'yearDiff',
    sorter: (a, b) => a.yearDiff - b.yearDiff
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      songNum: 0,
      popularity: 0,

      artistResults: [],
      songResults: [],
    }

    this.handleSongNumChange = this.handleSongNumChange.bind(this)
    this.handlePopularityChange = this.handlePopularityChange.bind(this)
    this.updateArtistResults = this.updateArtistResults.bind(this)
  }

  handleSongNumChange(value){
    this.setState({songNum: value})
  }

  handlePopularityChange(value){
    this.setState({popularity: value})
  }
  
  updateArtistResults(){
    console.log("hello")
    searchHitSongArtist(this.state.songNum, this.state.popularity).then(res=>{
      this.setState({artistResults: res.results})
    })
  }

  componentDidMount() {
    searchHitSongArtist(this.state.songNum, this.state.popularity).then(res=>{
      this.setState({artistResults: res.results})
    })

    searchGrammyAwardTrending().then(res=>[
      this.setState({songResults: res.results})
    ])
  }


  render() {
    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}><h3>Trending</h3></div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h4>Billboard Trend</h4>
          <Row>
            <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
              <label>Number of hit songs</label>
              <Slider step={1} defaultValue={0} min={0} max={150} onChange={this.handleSongNumChange} />

            </FormGroup></Col>
            <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
              <label>Average song popularity</label>
              <Slider step={1} defaultValue={0} min={0} max={100} onChange={this.handlePopularityChange} />

            </FormGroup></Col>
            <Col flex={2}><FormGroup style={{ width: '10vw' }}>
              <Button style={{ marginTop: '4vh' ,background:'black'}} onClick={this.updateArtistResults}>Search</Button>
            </FormGroup></Col>

          </Row>
          <Table dataSource={this.state.artistResults} columns={artistColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h4>Grammy Trend</h4>
          <Table dataSource={this.state.songResults} columns={songColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} />
        </div>


      </div>
    )
  }

}

export default HomePage

