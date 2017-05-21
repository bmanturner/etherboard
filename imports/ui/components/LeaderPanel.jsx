import { h, Component } from 'preact';
import Panel from 'preact-mui/lib/panel';

export default class LeaderPanel extends Component {
  constructor(props) {
    super(props)

    this.onResize = this.onResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const element = this.text;
    const parentHeight = element.parentElement.offsetHeight - 50;
    let elementHeight = element.offsetHeight;
    let fontSize = 11;

    while (elementHeight < parentHeight && fontSize < 60) {
      element.style.fontSize = `${fontSize}px`;
      elementHeight = element.offsetHeight;
      fontSize += 1;
    }
  }

  render() {
    const { position, empty, loading, leader = {} } = this.props;

    return (
      <Panel style={{ padding: 10, display: 'block', width: '100%' }}>
        <span class="mui--pull-right mui--text-caption mui--text-dark-hint">{leader.amount ? `${leader.amount} ETH` : '-'}</span>
        <br />
        <div style={{ height: 200, display: 'flex', alignItems: 'center' }}>
          <span
            ref={ref => { this.text = ref; }}
            class="mui--text-center"
            style={{
              display: 'inline-block',
              width: '100%',
              wordWrap: 'break-word',
              verticalAlign: 'middle'
            }}
          >
            {leader.txt || (loading ? 'Loading...' : 'Available!')}
          </span>
        </div>
        <span class="mui--pull-right" style={{ cursor: 'pointer' }}><i class="material-icons">add_circle_outline</i></span>
        <span class="mui--text-dark-hint">{position}.</span>
      </Panel>
    );
  }
}
