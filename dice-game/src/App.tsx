import React from 'react';
//redux
import { Provider } from 'react-redux';
import store from './store';
//components
import RollDice from './components/RollDice';
import Player from './components/Player';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <Player />
        <RollDice />
        <Player />
      </div>
    </Provider>
  );
}

export default App;