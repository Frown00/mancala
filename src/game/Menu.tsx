import React from "react";
import { HashRouter, Link,Route,Switch } from "react-router-dom";
import { Algorithm, BotName } from "./components/bots/Bot";
import Game from "./components/game/Game";

const MenuList = () => {
  return(
    <>
      <h1 style={{display: "flex", justifyContent: "center"}}>Play</h1>
      <Link className="menu-btn" to="/play/player-player">
            Player vs Player
        </Link>
      <Link className="menu-btn" to="/bot-setup-1">
        Player vs Bot
      </Link>
      <Link className="menu-btn" to="/bot-setup-2">
        Bot vs Bot
      </Link>
    </>
  )
}

interface IProps {
  bots: 1 | 2,
  handleChange: any,
  bot1Name?: BotName,
  bot1Algorithm?: Algorithm,
  bot1Depth?: number,
  bot2Name?: BotName,
  bot2Algorithm?: Algorithm,
  bot2Depth?: number,
}

const SetupList = (props: IProps) => {
  const select = [];
  const to = props.bots === 1 ? '/play/player-bot' : '/play/bot-bot';
  const availableBots = Object.values(BotName);
  const options: any[] = [];
  availableBots.map(name => options.push(<option key={name}>{name}</option>))
  if(props.bots > 0) {
    const setup = 
      <div style={{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        marginBottom: 25
      }} key={'bot1'}>
        <h2>Select Bot 1</h2>
        <label style={{marginBottom: 5, marginTop: 5 }}>Name (Different evaluation)</label>
        <select name={'bot1Name'} onChange={ props.handleChange } value={props.bot1Name}>
          {options}
        </select>
        <label style={{marginBottom: 5, marginTop: 5 }}>Algorithm</label>
        <select name={'bot1Algorithm'} onChange={ props.handleChange } value={props.bot1Algorithm}>
          <option>Minimax</option>
          <option>Alpha Beta</option>
        </select>
        <label style={{marginBottom: 5, marginTop: 5 }}>Depth</label>
        <input
          type="number" 
          min={1}
          max={100}
          name={'bot1Depth'} 
          onChange={ props.handleChange } 
          value={props.bot1Depth} 
        /> 
      </div>
    select.push(setup);
  }

  if(props.bots > 1) {
    const setup = 
      <div style={{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        marginBottom: 25
      }} key={'bot2'}>
        <h2>Select Bot 2</h2>
        <label style={{marginBottom: 5, marginTop: 5 }}>Name (Different evaluation)</label>
        <select name={'bot2Name'} onChange={ props.handleChange } value={props.bot2Name}>
          {options}
        </select>
        <label style={{marginBottom: 5, marginTop: 5 }}>Algorithm</label>
        <select name={'bot2Algorithm'} onChange={ props.handleChange } value={props.bot2Algorithm}>
          <option>Minimax</option>
          <option>Alpha Beta</option>
        </select>
        <label style={{marginBottom: 5, marginTop: 5 }}>Depth</label>
        <input 
          type="number" 
          min={1}
          max={100}
          name={'bot2Depth'} 
          onChange={ props.handleChange } 
          value={props.bot2Depth} 
        /> 
      </div>
    select.push(setup);
  }
  return(
    <>
      {select}
      <Link className="menu-btn" to={to}>
        Play
      </Link>
    </>
  )
}

interface IState {
  bot1Name?: BotName,
  bot1Algorithm?: Algorithm,
  bot1Depth?: number,
  bot2Name?: BotName,
  bot2Algorithm?: Algorithm,
  bot2Depth?: number,
}

export class Menu extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      bot1Name: BotName.BOT_1,
      bot1Algorithm: Algorithm.MINIMAX,
      bot1Depth: 3,
      bot2Name: BotName.BOT_2,
      bot2Algorithm: Algorithm.ALPHA_BETA,
      bot2Depth: 3,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render () {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={() => <MenuList />} />
          <Route exact path="/play/player-player" component={() => <Game />} />
          <Route exact path="/bot-setup-1" component={() => 
            <SetupList 
              bots={1} 
              handleChange={this.handleInputChange} 
              bot1Depth={this.state.bot1Depth}
              bot1Name={this.state.bot1Name}
              bot1Algorithm={this.state.bot1Algorithm}
            />
          } />
          <Route exact path="/bot-setup-2" component={() => 
            <SetupList 
              bots={2} 
              handleChange={this.handleInputChange} 
              bot1Depth={this.state.bot1Depth}
              bot1Name={this.state.bot1Name}
              bot1Algorithm={this.state.bot1Algorithm} 
              bot2Depth={this.state.bot2Depth}
              bot2Name={this.state.bot2Name}
              bot2Algorithm={this.state.bot2Algorithm} 
            />
          } />
          <Route exact path='/play/player-bot' component={() => 
            <Game bots={[{
              name: this.state.bot1Name, 
              algorithm: this.state.bot1Algorithm, 
              depth: this.state.bot1Depth
            }]} />} />
          <Route exact path='/play/bot-bot' component={() =>  
            <Game bots={[
              {
                name: this.state.bot2Name,
                algorithm: this.state.bot2Algorithm,
                depth: this.state.bot2Depth
              },
              {
                name: this.state.bot1Name, 
                algorithm: this.state.bot1Algorithm, 
                depth: this.state.bot1Depth
              },
            ]} />} />
        </Switch>
      </HashRouter>
    );
  }
}