import toast from 'react-hot-toast';

const notify = ({ text = 'Copied!', style = {} }) =>
  toast.success(text, { style });
export default notify;
