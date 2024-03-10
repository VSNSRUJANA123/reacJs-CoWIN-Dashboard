import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const getAllViews = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7dys: [],
    ageVaccination: [],
    genderVaccination: [],
    activeView: getAllViews.initial,
  }

  componentDidMount = () => {
    this.getResponse()
  }

  getResponse = async () => {
    this.setState({activeView: getAllViews.in_progress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const last7DaysVaccination = data.last_7_days_vaccination
      const format7Days = last7DaysVaccination.map(items => ({
        vaccineDate: items.vaccine_date,
        dose1: items.dose_1,
        dose2: items.dose_2,
      }))
      const vaccinationByAge = data.vaccination_by_age
      console.log('home:', vaccinationByAge)
      const vaccinationByGender = data.vaccination_by_gender
      console.log('gender:', vaccinationByGender)

      this.setState({
        activeView: getAllViews.success,
        last7dys: format7Days,
        ageVaccination: vaccinationByAge,
        genderVaccination: vaccinationByGender,
      })
    } else {
      this.setState({activeView: getAllViews.failure})
    }
  }

  renderLoading = () => (
    <div className="cowinContainer loadingContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {last7dys, genderVaccination, ageVaccination} = this.state
    return (
      <>
        <VaccinationCoverage last7dys={last7dys} />
        <VaccinationByGender genderVaccination={genderVaccination} />
        <VaccinationByAge ageVaccination={ageVaccination} />
      </>
    )
  }

  switchView = () => {
    const {activeView} = this.state
    switch (activeView) {
      case getAllViews.success:
        return this.renderSuccess()
      case getAllViews.failure:
        return this.renderFailure()
      case getAllViews.in_progress:
        return this.renderLoading()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="cowinContainer">
        <div className="logoContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        {this.switchView()}
      </div>
    )
  }
}
export default CowinDashboard
