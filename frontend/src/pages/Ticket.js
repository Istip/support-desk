import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [show, setShow] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const { ticketId } = useParams();

  const dispatch = useDispatch();

  // Functions
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));

    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    <h3>Something went wrong.. Plese refresh!</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets">Go Back</BackButton>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>

        <hr />

        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={show}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add note</h2>
        <button className="btn-close" onClick={closeModal}>
          x
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button className="btn btn-block btn-danger">Close Ticket</button>
      )}
    </div>
  );
};

export default Ticket;
