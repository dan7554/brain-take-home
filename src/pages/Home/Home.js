import React, { Component } from 'react'
import './Home.scss'
import { connect } from 'react-redux'

class Home extends Component {
    render() {
        return (
            <div className="home">
                You are home!
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.page })

export default connect(mapStateToProps, null)(Home)