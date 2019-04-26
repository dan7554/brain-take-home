import React, { Component } from 'react'
import $ from "jquery"
import './Root.scss'
import { connect } from 'react-redux'
import { updateWidth } from '@ducks/Page'
import { Router, Switch, Route } from 'react-router'
import { Home } from '@pages'

class Root extends Component {
    updatePageWidth = () => {
        const { updateWidth, forcedWidth, width } = this.props
        const newWidth = forcedWidth > 0 ? forcedWidth : $(window).width()

        if (width !== newWidth) {
            updateWidth(newWidth)
        }
    }
    componentWillMount() {
        window.addEventListener('resize', this.updatePageWidth)
        this.updatePageWidth()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePageWidth)
    }
    render() {
        const { breakpoint } = this.props

        return (
            <div className={`root ${breakpoint}`}>
                <header className="site-header">
                    <h1>Boilerplate</h1>
                </header>
                <div className='root__content'>
                    <Router history={this.props.history}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </Router>
                    <footer className="site-footer">
                        <p> Made by an awesome developer. </p>
                    </footer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.page })

const mapDispatchToProps = dispatch => (
    {
        updateWidth: pixels => dispatch(updateWidth(pixels))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Root)