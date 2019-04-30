import { connect } from 'react-redux'
import React from 'react'
import { XSvg, OSvg } from '@components'
import './TicTacToe.scss'

class TicTacToe extends React.Component {

    state = {
        pieceOne: null,
        pieceTwo: null,
        step: 0,
        game: [],
        turn: 'x'
    }

    updateStep = step => () => {
        switch (step) {
            case 'mode':
                this.setState({ step: 0 });
                break;
            case 'pick':
                this.setState({ step: 1 });
                break;
            case 'game':
                this.setState({ step: 2 });
                break;
            default:
                this.setState({ step: 0 });
                break;
        }
    }

    onSpotClick = spot => () => {
        const { pieceOne, pieceTwo, game, turn } = this.state

        if (!game[spot]) {
            const imageElement = new Image()
            const xPiece = pieceOne || '/assets/images/X.svg'
            const oPiece = pieceTwo || '/assets/images/O.svg'
            imageElement.src = turn === 'x' ? xPiece : oPiece
            imageElement.className = 'game__board-spot-image'
            imageElement.onload = () => {
                const spotContainer = window.currentDocument.querySelector(`#spot-${spot}`)
                if (spotContainer) {
                    spotContainer.appendChild(imageElement)
                }
            }
            game[spot] = turn
            this.setState({ game, turn: turn === 'x' ? 'o' : 'x' })
        }
    }

    onModeClick = mode => () => {
        this.setState({ mode })
    }

    inputFileUpload = piece => fileEvent => {
        fileEvent.stopPropagation()

        let reader = new FileReader()
        let file = fileEvent.target.files[0]

        reader.addEventListener("load", () => {
            this.setState({ [piece]: reader.result })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    selectPiece = piece => () => {
        this.setState({ selected: piece })
    }

    renderMode() {
        const { mode } = this.state
        const selectedClass = selected => selected === mode ? 'selected' : ''

        return (
            <div className="mode">
                <div className="mode__title">
                    Pick your mode!
            </div>
                <div className="mode__container">
                    <div className={`mode__button ${selectedClass('single')}`}onClick={this.onModeClick('single')}>
                        Singleplayer
                </div>
                    <div className={`mode__button ${selectedClass('multi')}`} onClick={this.onModeClick('multi')}>
                        Multiplayer
                </div>
                </div>
                <div className="mode__next-container">
                    {mode && <div className="mode__next" onClick={this.updateStep('pick')}>
                        Next
                    </div>}
                </div>
            </div>
        )
    }

    renderPick() {
        const { pieceOne, pieceTwo, selected, mode } = this.state
        const isMultiplayer = mode === 'multi'
        const isReady = selected || isMultiplayer
        const selectedClass = piece => selected === piece && !isMultiplayer ? 'selected' : ''
        const pieceStyle = { border: isMultiplayer ? 'none' : '', cursor: isMultiplayer ? 'initial' : '' }

        return (
            <div className="pick-pieces">
                <div className="pick-pieces__title">
                    {isMultiplayer ? "Upload your pieces!" : "Pick your piece!"}
                </div>
                <div className="pick-pieces__container">
                    <div className="pick-pieces__piece-one">
                        <div className="pick-pieces__player">
                        {isMultiplayer ? 'Player 1' : selected ? selected === 'pieceOne' ? 'Player 1' : 'Computer' : ''}
                        </div>
                        <div onClick={this.selectPiece('pieceOne')}>
                            {pieceOne && <img style={pieceStyle} src={pieceOne} className={selectedClass('pieceOne')} />}
                            {!pieceOne && <XSvg style={pieceStyle} className={selectedClass('pieceOne')} />}
                        </div>
                        <div className="pick-pieces__input-one">
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={this.inputFileUpload('pieceOne')} />
                            <div className="pick-pieces__label-one">
                                Upload Your Own
                            </div>
                        </div>
                    </div>
                    <div className="pick-pieces__piece-two">
                        <div className="pick-pieces__player">
                            {isMultiplayer ? 'Player 2' : selected ? selected === 'pieceTwo' ? 'Player 1' : 'Computer' : '' }
                        </div>
                        <div onClick={this.selectPiece('pieceTwo')}>
                            {pieceTwo && <img style={pieceStyle} src={pieceTwo} className={selectedClass('pieceTwo')} />}
                            {!pieceTwo && <OSvg style={pieceStyle} className={selectedClass('pieceTwo')} />}
                        </div>
                        <div className="pick-pieces__input-two">
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={this.inputFileUpload('pieceTwo')} />
                            <div className="pick-pieces__label-two" >
                                Upload Your Own
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pick-pieces__play-container">
                    {isReady && <div className="pick-pieces__play" onClick={this.updateStep('game')}>
                        Play
                    </div>}
                </div>
            </div>
        )
    }

    renderGame() {
        return (
            <div className="game">
                <div className="game__board">
                    <div id="spot-0" className="game__board-spot tl" onClick={this.onSpotClick(0)} />
                    <div id="spot-1" className="game__board-spot tm" onClick={this.onSpotClick(1)} />
                    <div id="spot-2" className="game__board-spot tr" onClick={this.onSpotClick(2)} />

                    <div id="spot-3" className="game__board-spot ml" onClick={this.onSpotClick(3)} />
                    <div id="spot-4" className="game__board-spot mm" onClick={this.onSpotClick(4)} />
                    <div id="spot-5" className="game__board-spot mr" onClick={this.onSpotClick(5)} />

                    <div id="spot-6" className="game__board-spot bl" onClick={this.onSpotClick(6)} />
                    <div id="spot-7" className="game__board-spot bm" onClick={this.onSpotClick(7)} />
                    <div id="spot-8" className="game__board-spot br" onClick={this.onSpotClick(8)} />

                </div>
            </div>
        )
    }

    render() {
        const { breakpoint } = this.props
        const { step } = this.state

        return (
            <div className={`tic-tac-toe ${breakpoint}`}>
                <div className="tic-tac-toe__mode" style={{ transform: `translateX(${-100 * step}%)` }}>
                    {this.renderMode()}
                </div>
                <div className="tic-tac-toe__pick" style={{ transform: `translateX(${-100 * step}%)` }}>
                    {this.renderPick()}
                </div>
                <div className="tic-tac-toe__game" style={{ transform: `translateX(${-100 * step}%)` }}>
                    {this.renderGame()}
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

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)
