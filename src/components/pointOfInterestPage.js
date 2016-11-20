/* global document window */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getPoi } from '../actions/poiActions'
import { getWayPoint } from '../actions/wayPointsActions'
// import Vouchers from './Vouchers'
import ClueList from './ClueList'
import AddToNotebookButton from './AddToNotebookButton'
import StreetView from './StreetView'

class PointOfInterestPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pano: 'closed'
    }
  }

  componentWillMount() {
    this.props.getPoi(this.props.params.poiId)
    // this.props.getWayPoint(this.props.params.waypointId)
  }

  togglePano() {
    const { pano } = this.state
    let toggled = 'closed'
    if (pano === 'closed') toggled = 'open'
    this.setState({ pano: toggled })
  }

  checkEndGame = (id) => {
    const { waypoints } = this.props.scenario
    const wpIndex = id
    const finalWp = waypoints[waypoints.length - 1]._id
    let isLast = ''
    if (wpIndex === finalWp) isLast = <button className="endgameBtn" onClick={() => this.openEndGame()}><img src="/images/endgame.png" alt="end game" /></button>
    return isLast
  }

  openEndGame = () => {
    browserHistory.push('/:id/endgame')
  }

  openNotebook() {
    document.getElementById('notebook').className = 'open'
  }

  render() {
    const { poi, user, waypoint, scenario } = this.props
    // const { uid } = this.props
    const { pano } = this.state
    const waypointName = waypoint.waypointName
    const { poiName, clues, links, text, coords } = poi

    const streetViewContainer = (
      <div id="streetViewContainer">
        <StreetView google={window.google} coords={coords} />
      </div>
    )

    return (
      <div className="poiPage">
        <button className="notebookBtn" onClick={() => this.openNotebook()}><img src="/images/notebookBtn.png" alt="open notebook" /></button>
        <button className="backBtn" onClick={browserHistory.goBack}><img src="/images/backArrow.png" alt="back to waypoint" />back to waypoint</button>
        {this.checkEndGame(this.props.params.waypointId)}
          <button className="mapBtn" onClick={() => browserHistory.replace(`/${this.props.params.id}/map`)}><img src="/images/mapBtn.png" alt="to map" /></button>
          <button className="panoBtn" onClick={() => this.togglePano()}><img src="/images/pano.png" alt="open panorama" /></button>
          {pano === 'open' ? streetViewContainer : null}
          <div className="waypointSplash">
            <img src={links} alt={poiName} />
        </div>
        <div className="waypointBody">
          <h1 className="waypointName">{poiName}</h1>
          <article className="infoBlock">
            <h3>About this Point of Interest</h3>
            <p>{text}</p>
          </article>
          <ClueList clues={clues} waypointName={waypointName} />
          <AddToNotebookButton poiName={poiName} clues={clues} waypointName={waypointName} />
        </div>
      </div>
    )
  }
}

export default connect(state => ({ poi: state.poi, user: state.auth.user, waypoint: state.waypoint, scenario: state.scenario }), dispatch => ({
  getPoi(id) {
    dispatch(getPoi(id))
  },
  getWayPoint(id) {
    dispatch(getWayPoint(id))
  }
}))(PointOfInterestPage)
