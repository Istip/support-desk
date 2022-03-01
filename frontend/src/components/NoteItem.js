import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);

  if (!note) {
    return <Spinner />;
  }

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : 'white',
        color: note.isStaff ? '#fff' : '#111',
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
};

export default NoteItem;
