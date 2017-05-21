import { h, Component } from 'preact';
import Modal from 'preact-mui/lib/modal';
import Panel from 'preact-mui/lib/panel';
import Textarea from 'preact-mui/lib/textarea';

export default class AddMessageModal extends Component {
  render() {
    return (
      <Modal openedBy="showAddMessageModal">
        <Panel style={{ width: '80vw', height: '60vh', display: 'flex', alignItems: 'center' }}>
          <Textarea label="Etherboard Message" />
        </Panel>
      </Modal>
    );
  }
}
