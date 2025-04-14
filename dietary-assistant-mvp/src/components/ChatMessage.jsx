import { format } from 'date-fns';

export default function ChatMessage({ message }) {
  const isBot = message.sender === 'bot';
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');
  
  return (
    <div className={`${isBot ? 'message-bot' : 'message-user'}`}>
      <div className="whitespace-pre-wrap">{message.message}</div>
      <div className="text-xs text-gray-500 mt-1 text-right">{formattedTime}</div>
    </div>
  );
}