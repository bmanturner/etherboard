import { h, Component } from 'preact';
import AddMessageForm from './AddMessageForm';

export default class InfoSection extends Component {
  render() {
    const { isDappEnabled } = this.props;

    return (
      <div className="mui--text-center">
        <h1 style={{ color: '#594433' }}>EtherBoard</h1>
        <AddMessageForm enabled={isDappEnabled} />
      </div>
    );
  }
}
