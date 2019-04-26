import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { connect } from 'react-redux'
import { forceWidth } from '@ducks/Page'
import './DevbarWrapper.scss'

class DevbarWrapper extends Component {
    constructor(props) {
        super(props)
        if (Config.devbar.enabled) {
            this.setDefaultBreakpoint()
        }
    }

    setDefaultBreakpoint = () => {
        const { forceWidth } = this.props
        let frameWidth = '100%'
        if (!Config.devbar.defaultBreakpoint) {
            console.error('Default breakpoint undefined', Config)
        } else if (Object.keys(Config.breakpoints).includes(Config.devbar.defaultBreakpoint)) {
            frameWidth = Config.breakpoints[Config.devbar.defaultBreakpoint].max
        } else {
            console.error('Default breakpoint doesnt exist.', Config.devbar.defaultBreakpoint, Object.keys(Config.breakpoints))
        }
        forceWidth(frameWidth)
    }

    componentDidMount() {
        if (Config.devbar.enabled) {
            let frameBody = ReactDOM.findDOMNode(this.refs.frame).contentDocument.body,
                el = document.createElement('div')
                frameBody.appendChild(el)
            this.el = el
            this.updateIFrameContents()
            window.currentDocument = ReactDOM.findDOMNode(this.refs.frame).contentWindow.document
        } else {
            window.currentDocument = document
        }
    }

    componentDidUpdate() {
        if (Config.devbar.enabled) {
            this.updateIFrameContents()
        }
    }

    updateIFrameContents() {
        ReactDOM.render((
            this.props.children
        ), this.el)

        let parentStyleSheets = parent.document.styleSheets
        let cssString = ""
        let links = []
        for (let i = 0, count = parentStyleSheets.length; i < count; ++i) {
            if (parentStyleSheets[i].href === null && parentStyleSheets[i].cssRules) {
                let cssRules = parentStyleSheets[i].cssRules
                for (let j = 0, countJ = cssRules.length; j < countJ; ++j)
                    cssString += cssRules[j].cssText
            }
            else {
                if (parentStyleSheets[i].href !== null) {
                    let link = document.createElement("link")
                    link.href = parentStyleSheets[i].href
                    link.type = parentStyleSheets[i].type
                    link.rel = 'stylesheet'
                    links.push(link)
                } else {
                    cssString += parentStyleSheets[i].cssText  // IE8 and earlier
                }
            }
        }

        let style = document.createElement("style")
        style.type = "text/css"
        try {
            style.innerHTML = cssString
        }
        catch (ex) {
            style.styleSheet.cssText = cssString  // IE8 and earlier
        }
        let head = ReactDOM.findDOMNode(this.refs.frame).contentDocument.getElementsByTagName("head")[0]
        head.innerHTML = ''
        links.forEach((link) => {
            head.appendChild(link)
        })
        head.appendChild(style)
    }

    onBreakClick = (label, index) => {
        const { forceWidth } = this.props
        const lastBreakpoint = index + 1 === Config.breakpoints.length
        const frameWidth = lastBreakpoint ? '100%' : Config.breakpoints[label].max
        const windowWidth = $(window).width()
        // Cap the max at the actual window width
        forceWidth(frameWidth <= windowWidth ? frameWidth : windowWidth)
    }

    render() {
        if (!Config.devbar.enabled) {
            return this.props.children
        }

        const breakLabels = Object.keys(Config.breakpoints)
        const { forcedWidth, breakpoint } = this.props
        return (
            <div className='devbar-wrapper' >
                <span className='current-breakpoint'> {`${breakpoint}@${forcedWidth}px`} </span>
                <div className='breakpoints'>
                    {breakLabels.map((label, index) => {
                        const width = Config.breakpoints[label].max - Config.breakpoints[label].min
                        const left = Config.breakpoints[label].min
                        return (
                            <button
                                style={{ width, left }}
                                onClick={this.onBreakClick.bind(this, label, index)}
                                key={'break' + index}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>
                <iframe style={{ width: forcedWidth + 'px' }} ref='frame' className="frame" />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.page
})

const mapDispatchToProps = (dispatch) => ({
    forceWidth: value => dispatch(forceWidth(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(DevbarWrapper)