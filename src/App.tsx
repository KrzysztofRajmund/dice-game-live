import React from 'react';
//redux
import { Provider } from 'react-redux';
import store from './store';
//components
import RollDice from './components/RollDice';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <RollDice />
      </div>
    </Provider>
  );
}

export default App;