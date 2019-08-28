import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Nav from 'components/TicTacToe/Nav';
import InfoTitle from 'components/TicTacToe/InfoTitle';
import ResultsPanel from 'components/TicTacToe/ResultsPanel';
import FieldCell from 'components/TicTacToe/FieldCell';
import TicTacToe from '../TicTacToe';

describe.only('<TicTacToe />', () => {
  let props;
  beforeEach(() => {
    props = {
      fieldLength: 9,
      winner: null,
      defaultPlayer: 'player1',
      player1: {
        value: 'x',
        wins: 0
      },
      player2: {
        value: 'o',
        wins: 0
      },
      setsPlayed: 0,
    };
  });
  describe('<Nav />', () => {
    it('component exists inside tic tac toe', () => {
      const renderedComponent = shallow(<TicTacToe {...props} />);
      expect(renderedComponent.find(Nav).length).toBe(1);
    });

    it('component has correct HTML', () => {
      const tree = renderer
        .create(<Nav onBack={() => {}} onForward={() => {}} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('should render a <InfoTitle />', () => {
    const renderedComponent = shallow(<TicTacToe {...props} />);
    expect(renderedComponent.find(InfoTitle).length).toBe(1);
  });

  it('should render a <ResultsPanel />', () => {
    const renderedComponent = shallow(<TicTacToe {...props} />);
    expect(renderedComponent.find(ResultsPanel).length).toBe(1);
  });

  it('should render a <FieldCell />', () => {
    const renderedComponent = shallow(<TicTacToe {...props} />);
    expect(renderedComponent.find(FieldCell).length).toBe(9);
  });
});
