import React, { Component } from 'react';

import Row from './Row';
import Pair from './Pair';

const width = 750

const boardStyle = {
  border: "1px solid rgba(0,0,0,0.8)",
  //borderRadius: 9,
  boxShadow: "0px 0px 6px rgba(0,0,0,0.3)",
  background: "white",
}

const headerStyle = {
  textAlign: "center",
  width: width,
}

const mainStyle = {
  position: "relative",
  width: width,
}

const leftHeaderStyle = {
  textAlign: "center",
  width: 200,
  color: "white",
  display: "none",
}

const rightHeaderStyle = {
  textAlign: "center",
  position: "absolute",
  left: 200,
  top: 0,
  width: 400,
  color: "white",
  display: "none",
}

const outStyle = {
  position: "absolute",
  left: width + 20,
  top: 10,
  width: 250,
  height: 250,
  textAlign: "center",
}

const parkingLotItemStyle = {
  listStyleType: "none",
}

const parkingLotInputStyle = {
  width: "100%",
}

export default class Board extends Component {
  render() {
    const rows = this.props.tracks.map((t, i) => (
       <Row
         key={i}
         track={t}
         trackName={this.props.trackNames[t]}
         badges={this.props.badges[t]}
         pair={this.props.assignments[t] || []}
         onCardDropped={this.props.onCardDropped}
         onCardHovered={this.props.onCardHovered}
         onTrackNameChanged={this.props.onTrackNameChanged}
         onBadgeAssigned={this.props.onBadgeAssigned}
         onToggleLock={this.props.onToggleLock}
         alternate={ i % 2 != 0 }
       >
      </Row>
    ))

    return (
      <div>
        <div style={headerStyle}>
          <h2>
            <img src="http://www.publicdomainpictures.net/pictures/80000/nahled/a-pair-of-pears.jpg" style={{position: "absolute", left: 60, top: -20, width: 200}} />
            <span style={{position: "relative", visibility: "hidden", left: -25}}>Pair Up</span>
          </h2>
        </div>
        <div style={mainStyle}>
          <div style={leftHeaderStyle}>Pairs</div>
          <div style={rightHeaderStyle}>Tracks</div>
          <div style={boardStyle}>
            {rows}
          </div>
          <div style={outStyle}>
            <br />
            Unassigned
            <Pair
              members={ this.props.assignments["unassigned"] || [] }
              onCardDropped={ (card) => this.props.onCardDropped(card, "unassigned") }
              onCardHovered={ (card) => this.props.onCardHovered(card, "unassigned") }
              onToggleLock={ x => x }
            />
            <br />
            Out
            <Pair
              members={ this.props.assignments["out"] || [] }
              onCardDropped={ (card) => this.props.onCardDropped(card, "out") }
              onCardHovered={ (card) => this.props.onCardHovered(card, "out") }
              onToggleLock={ x => x }
            />
            PMing
            <Pair
              members={ this.props.assignments["pm"] || [] }
              onCardDropped={ (card) => this.props.onCardDropped(card, "pm") }
              onCardHovered={ (card) => this.props.onCardHovered(card, "pm") }
              onToggleLock={ x => x }
            />
          </div>
          <div className="fa fa-random">&nbsp;Randomize: <span style={{cursor: "pointer", textDecoration: "underline"}} onClick={ this.props.randomizePlane }>CI Pair</span>&nbsp;|&nbsp;<span style={{cursor: "pointer", textDecoration:"underline"}} onClick={ this.props.randomize }>All Pairs</span> <span style={{color: "gray"}}>(Double-Click a Pair to Lock)</span></div>
        </div>
      </div>
    );
  }
}
