import React, { Component } from 'react'
import TextInput from './TextInput'
import WayPointForm from './WayPointForm'


export default class ScenarioForm extends Component {
  constructor() {
    super()
    this.state = {
      waypointCount: 1
    }
  }

  addWaypointInput() {
    let { waypointCount } = this.state
    waypointCount += 1
    this.setState({ waypointCount })
  }

  removeWaypointInput() {
    let { waypointCount } = this.state
    if (waypointCount > 1) {
      waypointCount -= 1
      this.setState({ waypointCount })
    }
  }

  render() {
    const { onChange, newScenario, onClick } = this.props
    const { waypointCount } = this.state
    // const deleteButton = waypointCount ? (<button type="button" onClick={() => this.removeWaypointInput()}>Delete WayPoint</button>) : ''
    let waypointForms = []

    for (let i = 0; i < waypointCount; i += 1) {
      const newForm = <WayPointForm key={`WayPointForm${i}`} {...this.props} waypointCount={waypointCount} />
      waypointForms = [...waypointForms, newForm]
    }

    return (
      <form className="creationForm">
        <TextInput id="scenarioName" name="scenarioName" value={newScenario.scenarioName} onChange={onChange} type="text" placeholder="Enter Scenario Name" />
        {/* {deleteButton} */}
        {waypointForms}
        <button className="addWaypointBtn" type="button" onClick={() => this.addWaypointInput()}><span>+</span>Add WayPoint</button>
        <button className="btnClass" type="submit" onClick={onClick}>Submit Scenario</button>
      </form>
    )
  }
}
