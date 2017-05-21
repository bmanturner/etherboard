/* global web3 */

import { Meteor } from 'meteor/meteor';
import { h, Component } from 'preact';
import Web3 from 'web3';
import Container from 'preact-mui/lib/container';
import Row from 'preact-mui/lib/row';
import Col from 'preact-mui/lib/Col';
import InfoSection from '../components/InfoSection';
import LeaderboardSection from '../components/LeaderboardSection';
import api from '../../interface';

export default class HomePage extends Component {
  constructor() {
    super();

    this.loadBoard = this.loadBoard.bind(this);

    const isDappEnabled = typeof web3 !== 'undefined';
    const provider = isDappEnabled ? web3.currentProvider : new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(provider);

    this.state = {
      isDappEnabled,
      loading: true,
      numLeaders: null,
      maxLeaders: null,
      leaders: []
    };
  }

  componentWillMount() {
    etherBoard = web3.eth.contract(api).at(Meteor.settings.public.devContract);
    const loadBoard = _.debounce(this.loadBoard);
    const change = etherBoard.LeaderboardChanged();
    change.watch((err, event) => {
      if (err) console.log(err);
      else loadBoard();
    });
    loadBoard();
  }

  loadBoard() {
    this.setState({ loading: true, leaders: [] });
    etherBoard.maxLeaders((err, maxLeaders) => {
      if (!err) this.setState({ maxLeaders: parseInt(maxLeaders.toString(10), 10) });
    });

    etherBoard.numLeaders((err, numLeaders) => {
      if (!err) {
        numLeaders = parseInt(numLeaders.toString(10), 10);
        if (numLeaders === 0) this.setState({ loading: false });
        else {
          for (let i = 1; i <= numLeaders; i += 1) {
            etherBoard.getLeaderAtPosition.call(i, (err, leader) => {
              if (!err) {
                this.setState({
                  leaders: [...this.state.leaders, {
                    position: i,
                    address: leader[0],
                    amount: web3.fromWei(leader[1].toString(10), 'ether'),
                    txt: leader[2],
                    id: leader[3]
                  }],
                  loading: !(i === numLeaders)
                });
              }
            });
          }
        }
      }
    });
  }

  render() {
    const { isDappEnabled, loading, numLeaders, maxLeaders, leaders } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col xs={12} sm={5} md={4} lg={3}>
            <InfoSection isDappEnabled={this.state.isDappEnabled} />
          </Col>
          <Col xs={12} sm={7} md={8} lg={9}>
            <LeaderboardSection
              numLeaders={numLeaders}
              maxLeaders={maxLeaders}
              loading={loading}
              leaders={leaders}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
