interface MessageProps {
  messageType: string;
  messageText: string;
  removeMessage: () => void;
}

const style = {
  top: "auto",
};

export function Message({
  messageType,
  messageText,
  removeMessage,
}: MessageProps) {
  return (
    <section data-testid="message">
      <div className={`notification is-${messageType}`}>
        <button className="delete" style={style} onClick={removeMessage} />
        <span className="message-text">{messageText}</span>
      </div>
    </section>
  );
}
