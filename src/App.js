import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import maps from './maps'

class App extends Component {
  constructor() {
    super() 
    this.state = {
      map: maps.five.map,
      mines: [],
      dead: false,
    }
  }
  componentDidMount() {
    let mines = []
    let map = this.state.map.slice()
    for(let i = 0; i < map.length; i++) {
      let mine = []
      let flag = true
      while(flag) {
        let secondFlag = false
        mine[0] = ~~(Math.random() * (map.length - 1)) + 1
        mine[1] = ~~(Math.random() * (map.length - 1)) + 1
        mines.forEach(m => {
          if(m[0] === mine[0] && m[1] === mine[1]) {
            secondFlag = true
          }
        })
        if(!secondFlag){
          mines.push(mine)
          map[mine[0]][mine[1]] = '*'
          flag = false
        } 
      }
    }
    for(let i = 0; i < map.length; i++) {
      let row = map[i]
      for(let f = 0; f < row.length; f++) {
        let points = {
          t: [i, f]
        }
        if(row[f] === '8') {

        }
      }
    }


    this.setState({mines, map})
  }

  handleClick = (f, i) => {
    let {map} = this.state
    if(map[f][i] === '*') {
      this.setState({dead: true})
      alert('You Done Fucked Up!!!!')
    }
  }

  render() {
    let map = this.state.map.map((r, f) => {
      let row = r.map((c, i) => {
        if(this.state.dead){
          if(c === 0) {
            return(
              <div onClick={() => this.handleClick(f, i)} className='cube' style={{backgroundColor: 'black'}} key={i}></div>
            )
          } else if(c === '*') {
            return(
              <div className='cube' style={{backgroundColor: 'red'}} key={i}></div>
            )
          }

        } else {
          return(
            <div onClick={() => this.handleClick(f, i)} className='cube' style={{backgroundColor: 'black'}} key={i}></div>
          )

        }
      })
      return (
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}} key={f}>
          {row}
        </div>
      )
    })
    return (
      <div style={{height: '100vh', width: '100vw', outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'purple'}} tabIndex="0">
        {map}
      </div>
    );
  }
}

export default App;
