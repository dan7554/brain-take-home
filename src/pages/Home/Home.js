import React, { Component } from 'react'
import './Home.scss'
import { connect } from 'react-redux'
import { TicTacToe } from '@components'

class Home extends Component {
    render() {
        return (
            <div className="home">
                <TicTacToe />
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.page })

export default connect(mapStateToProps, null)(Home)