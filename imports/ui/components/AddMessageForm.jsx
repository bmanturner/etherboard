import { h, Component } from 'preact';
import Button from 'preact-mui/lib/button';

export default class AddMessageForm extends Component {
  constructor(props) {
    super(props);

    this.addMessage = this.addMessage.bind(this);

    this.state = {
      form: {
        message: '',
        amount: null
      },
      submitting: false
    };
  }

  setFormInput(field, e) {
    const { form } = this.state;
    form[field] = e.target.value;
    this.setState({ form });
  }

  addMessage() {
    const { form: { message, amount } } = this.state;
    if (!message || !amount) return;
    this.setState({ submitting: true });
    console.log(web3.eth.accounts);
    etherBoard.addSelfToLeaderboard(message, { from: web3.eth.accounts[0], value: web3.toWei(amount, 'szabo') }, (err, res) => {
      if (!err)  this.setState({ form: { message: '', amount: null } });
      this.setState({ submitting: false });
    });
  }

  render() {
    const { form: { message, amount }, submitting } = this.state;
    const { enabled } = this.props;
    const label = amount ? web3.fromWei(web3.toWei(amount, 'szabo'), 'ether') : 'Amount (szabo)';

    return (
      <div>
        <div class="mui-textfield mui-textfield--float-label">
          <input type="number" step="1" min="0" value={amount} onChange={this.setFormInput.bind(this, 'amount')} />
          <label>{label}</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
          <textarea maxLength="250" value={message} onChange={this.setFormInput.bind(this, 'message')}></textarea>
          <label>New Message</label>
        </div>
        <Button type="button" color="primary" disabled={!enabled || submitting} onClick={this.addMessage}>Add Message</Button>
      </div>
    );
  }
}
